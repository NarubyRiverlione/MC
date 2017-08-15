/* eslint-disable no-console */
import AppDispatcher from '../AppDispatcher'
import { ActionCnst, Cnst } from '../Constants'
import { EventEmitter } from 'events'

import RadioStore from './RadioStore'

class FireComputersStore extends EventEmitter {
  constructor(dispatcher) {
    super()
    this.SelectedFC = ''

    this.SelectedMsgSlot = 1

    this.FCStatus = {}
    this.FCStatus[Cnst.FireComputers.Name.A] = Cnst.FireComputers.Results.empty
    this.FCStatus[Cnst.FireComputers.Name.B] = Cnst.FireComputers.Results.empty

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
    const SelectFC = this.SelectedFC !== fc ? fc : '' // clicked already selected == deselect
    this.SelectedFC = SelectFC
    this.emit(Cnst.FireComputers.Emit.FCselected)
  }

  ReadMsg() {
    const MsgStatus = RadioStore.SlotStatus[this.SelectedMsgSlot]
    console.log('FC: SelectedFC: ' + this.SelectedFC + ' Selected MsgSlot ' + this.SelectedMsgSlot + ' MsgStatus: ' + MsgStatus)

    // check if a FC is selected
    if (this.SelectedFC === '') {
      console.log('FC: no fc selected to read msg')
      this.Status = Cnst.FireComputers.Errors.NoFCselected
      this.emit(Cnst.FireComputers.Emit.ChangedFCstatus)
      return
    }
    // check if selected slot contains a msg
    if (MsgStatus === Cnst.Radio.Results.erase) {
      console.log('FC: Selected msg slot ' + this.SelectedMsgSlot + ' is empty')
      this.Status = Cnst.FireComputers.Errors.NoMsg
      this.emit(Cnst.FireComputers.Emit.ChangedFCstatus)
      return
    }
    // check if msg is decrypted
    if (MsgStatus === Cnst.Radio.Results.store) {
      console.log('FC: Selected msg ' + this.SelectedMsgSlot + ' is not decrypted')
      this.Status = Cnst.FireComputers.Errors.MsgNotDecoded
      this.emit(Cnst.FireComputers.Emit.ChangedFCstatus)
      return
    }

    // must be a decoded msg...
    // ..show reading status
    console.log('FC: Start reading msg ' + this.SelectedMsgSlot + ' into FC ' + this.SelectedFC)
    this.Status = Cnst.FireComputers.Actions.read + this.SelectedFC
    this.emit(Cnst.FireComputers.Emit.ChangedFCstatus)
    // hold read button down
    this.Reading = true
    this.emit(Cnst.FireComputers.Emit.FCisReading)


    setTimeout(() => {
      console.log('Fc: Done reading msg into FC ' + this.SelectedFC)
      this.Reading = false
      // show FC status idle
      this.Status = Cnst.Status.idle
      this.emit(Cnst.FireComputers.Emit.ChangedFCstatus)
      // release read button down
      this.emit(Cnst.FireComputers.Emit.FCdoneReading)
      // set status selected FC
      this.FCStatus[this.SelectedFC] = Cnst.FireComputers.Results.read
      this.emit(Cnst.FireComputers.Emit.FCupdateStatus)
    }
      , Cnst.FireComputers.Time.read
    )
  }

  SendMission() {
    // check if a FC is selected
    if (this.SelectedFC === '') {
      console.log('FC: no fc selected send mission')
      this.Status = Cnst.FireComputers.Errors.NoFCselected
      this.emit(Cnst.FireComputers.Emit.ChangedFCstatus)
      return
    }
    // check if selected FC has mission
    if (this.FCStatus[this.SelectedFC] !==Cnst.FireComputers.Results.read ) {
      console.log('FC: selected fc '+this.SelectedFC+' hasn no mission')
      this.Status = Cnst.FireComputers.Errors.NoMissionInSelectedFC
      this.emit(Cnst.FireComputers.Emit.ChangedFCstatus)
      return
    }

    console.log('Start sending mission from FC ' + this.SelectedFC + ' to Launch Station')
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
      // set selected FC to waiting
      this.FCStatus[this.SelectedFC] = Cnst.FireComputers.Results.empty
    }
      , Cnst.FireComputers.Time.send
    )
  }
}


const firecomputersStore = new FireComputersStore()
// elke instance van RadioStore doet eigen afhandeling van acties
AppDispatcher.register(firecomputersStore.EvaluateActions.bind(firecomputersStore))

export default firecomputersStore
