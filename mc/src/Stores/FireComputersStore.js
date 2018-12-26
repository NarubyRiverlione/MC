/* eslint-disable no-console */
import { EventEmitter } from 'events'
import AppDispatcher from '../AppDispatcher'
import { ActionCnst, Cnst } from '../Constants'

import RadioStore from './RadioStore'
import GameStore from './GameStore'
import launchStationStore from './LaunchStationsStore'

import { ShowErrorStatus as LSshowErr } from '../Actions/LaunchStationsActions'

class FireComputersStore extends EventEmitter {
  constructor(dispatcher) {
    super()
    this.SelectedFC = ''

    this.SelectedMsgSlot = 3

    this.FCS = [
      {
        name: Cnst.FireComputers.Name.A,
        status: Cnst.FireComputers.Results.empty,
        missionID: -1,
      },
      {
        name: Cnst.FireComputers.Name.B,
        status: Cnst.FireComputers.Results.empty,
        missionID: -1,
      },
    ]

    this.Sending = false
    this.Reading = false

    this.Status = Cnst.Status.idle
  }

  EvaluateActions(action) {
    switch (action.type) {
      case ActionCnst.FireComputers.SelectSlot: this.SelectSlot(action.payload); break
      case ActionCnst.FireComputers.ReadMsg: this.ReadMsg(); break
      case ActionCnst.FireComputers.SelectFireComputer: this.SelectFCcomputer(action.payload); break
      case ActionCnst.FireComputers.SendMission: this.SendMission(); break
      default: break
    }
  }

  SelectSlot(slot) {
    this.SelectedMsgSlot = slot
    this.emit(Cnst.FireComputers.Emit.msgSlotChanged)
  }

  SelectFCcomputer(fc) {
    this.SelectedFC = this.SelectedFC !== fc ? fc : '' // clicked already selected == deselect
    this.emit(Cnst.FireComputers.Emit.FCselected)
  }

  ReadMsg() {
    const SelectedRadioSlot = RadioStore.Slots.find(sl => sl.slot === this.SelectedMsgSlot)
    const { status, missionID } = SelectedRadioSlot

    const workingFC = this.FCS.filter(fc => fc.name === this.SelectedFC)

    console.log(`FC: SelectedFC: ${this.SelectedFC} Selected MsgSlot ${this.SelectedMsgSlot
    } MsgStatus: ${status}`)

    // check if a FC is selected
    if (this.SelectedFC === '') {
      console.log('FC: no fc selected to read msg')
      this.Status = Cnst.FireComputers.Errors.NoFCselected
      this.emit(Cnst.FireComputers.Emit.ChangedFCstatus)
      return
    }
    // check if selected slot contains a msg
    if (status === Cnst.Radio.Results.erase) {
      console.log(`FC: Selected msg slot ${this.SelectedMsgSlot} is empty`)
      this.Status = Cnst.FireComputers.Errors.NoMsg
      this.emit(Cnst.FireComputers.Emit.ChangedFCstatus)
      return
    }
    // check if msg is decrypted
    if (status === Cnst.Radio.Results.store) {
      console.log(`FC: Selected msg ${this.SelectedMsgSlot} is not decrypted`)
      this.Status = Cnst.FireComputers.Errors.MsgNotDecoded
      this.emit(Cnst.FireComputers.Emit.ChangedFCstatus)
      return
    }

    // must be a decoded msg...
    // ..show reading status
    console.log(`FC: Start reading msg ${this.SelectedMsgSlot} into FC ${this.SelectedFC}`)
    this.Status = Cnst.FireComputers.Actions.read + this.SelectedFC
    this.emit(Cnst.FireComputers.Emit.ChangedFCstatus)
    // hold read button down
    this.Reading = true
    this.emit(Cnst.FireComputers.Emit.FCisReading)

    setTimeout(() => {
      this.DoneLoading(workingFC, missionID)
    },
    Cnst.FireComputers.Time.read)
  }

  // when message is loaded into FC
  DoneLoading(workingFC, missionID) {
    console.log(`Fc: Done reading msg into FC ${this.SelectedFC}`)
    this.Reading = false

    // show FC status idle
    this.Status = Cnst.Status.idle
    this.emit(Cnst.FireComputers.Emit.ChangedFCstatus)

    // release read button down
    this.emit(Cnst.FireComputers.Emit.FCdoneReading)

    // show Mission type on FC display
    const mission = GameStore.Missions.find(m => m.ID === missionID)

    // set 'read + mission type' as status in selected FC
    const showMission = Cnst.FireComputers.Results.read + mission.Type
    this.FCS = this.UpdatedFCStatuses(workingFC, showMission)
    this.emit(Cnst.FireComputers.Emit.FCupdateStatus)

    // Store MissionID in FCS to pass on later to Launch Station
    this.FCS = this.StoredMissionIDinFCS(workingFC, missionID)
  }

  // pure function: returns new created  state doesn't update
  UpdatedFCStatuses(workingFC, newStatus) {
    return this.FCS.map(fc => (fc === workingFC
      ? { ...fc, status: newStatus } // copy all props, change status
      : fc))
  }

  // pure function: returns new created  state doesn't update
  StoredMissionIDinFCS(workingFC, missionID) {
    return this.FCS.map(fc => (fc === workingFC
      ? { ...fc, missionID } // copy all props, change missionID
      : fc))
  }

  // show error in status of set time, then set idle status
  ShowErrorStatus(err) {
    this.Status = err
    this.emit(Cnst.FireComputers.Emit.ChangedFCstatus)

    setTimeout(() => {
      this.Status = Cnst.Status.idle
      this.emit(Cnst.FireComputers.Emit.ChangedFCstatus)
    }, Cnst.FireComputers.Time.error)
  }

  SendMission() {
    const workingFC = this.FCS.filter(fc => fc.name === this.SelectedFC)
    // check if a FC is selected
    if (!workingFC) {
      console.log('FC: no fc selected send mission')
      this.ShowErrorStatus(Cnst.FireComputers.Errors.NoFCselected)
      return
    }
    // check if selected FC has mission
    if (workingFC.status !== Cnst.FireComputers.Results.read) {
      console.log(`FC: selected fc ${workingFC.name} has no mission`)
      this.ShowErrorStatus(Cnst.FireComputers.Errors.NoMissionInSelectedFC)
      return
    }
    // check if selected LS is loaded
    if (launchStationStore.SelectedStatus !== Cnst.LaunchStations.StatusColor.loaded) {
      // general error on FCS
      this.ShowErrorStatus(Cnst.FireComputers.Errors.CannotSend)
      // specific on LS
      LSshowErr(Cnst.LaunchStations.Errors.LSisEmpty)
      return
    }

    // check if selected LS is correct for this Mission Type
    if (!this.CheckCorrectLSforMission()) {
      // general error on FCS
      this.ShowErrorStatus(Cnst.FireComputers.Errors.CannotSend)
      // specific on LS
      LSshowErr(Cnst.LaunchStations.Errors.WrongLSforMission)
      return
    }

    console.log(`Start sending mission from FC ${workingFC.name} to Launch Station ${launchStationStore.Selected}`)
    this.Status = Cnst.FireComputers.Actions.send
    this.emit(Cnst.FireComputers.Emit.ChangedFCstatus)
    // hold read button down
    this.Sending = true
    this.emit(Cnst.FireComputers.Emit.FCisSending)


    setTimeout(() => {
      // show FC status idle
      this.Status = Cnst.Status.idle
      this.emit(Cnst.FireComputers.Emit.ChangedFCstatus)

      // release send button
      this.Sending = false
      this.emit(Cnst.FireComputers.Emit.FCdoneSending)

      // set selected FC to empty
      this.FCS = this.UpdatedFCStatuses(workingFC, Cnst.FireComputers.Results.empty)
      this.FCS = this.StoredMissionIDinFCS(workingFC, -1)

      // this.FCStatus[workingWithFC] = Cnst.FireComputers.Results.empty
    },
    Cnst.FireComputers.Time.send)
  }


  CheckCorrectLSforMission(missionID) {
    let IsCorrect = false
    const MissionType = this.FCS.filter(fc => fc.name === this.SelectedFC).map(fc => fc.MissionType)
    const SelectedLS = launchStationStore.Selected

    // AA -> Rails
    if (MissionType === Cnst.Game.Missions.Type[0]
      && (SelectedLS === Cnst.LaunchStations.Numbers.one || SelectedLS === Cnst.LaunchStations.Numbers.two)) IsCorrect = true

    // AS -> Rails
    if (MissionType === Cnst.Game.Missions.Type[2]
      && (SelectedLS === Cnst.LaunchStations.Numbers.one || SelectedLS === Cnst.LaunchStations.Numbers.two)) IsCorrect = true

    // G -> VLT
    if (MissionType === Cnst.Game.Missions.Type[1]
      && (SelectedLS === Cnst.LaunchStations.Numbers.A || SelectedLS === Cnst.LaunchStations.Numbers.B)) IsCorrect = true

    // T -> Tubes
    if (MissionType === Cnst.Game.Missions.Type[3]
      && (SelectedLS === Cnst.LaunchStations.Numbers.romanOn || SelectedLS === Cnst.LaunchStations.Numbers.romanTwo)) IsCorrect = true
    return IsCorrect
  }
}


const firecomputersStore = new FireComputersStore()
// elke instance van RadioStore doet eigen afhandeling van acties
AppDispatcher.register(firecomputersStore.EvaluateActions.bind(firecomputersStore))

export default firecomputersStore
