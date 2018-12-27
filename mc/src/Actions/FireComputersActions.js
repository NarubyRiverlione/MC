import { ActionCnst, Cnst } from '../Constants'

import { StatusUpdate as LSshowErr } from './LaunchStationsActions'

const { FireComputers: FCActie } = ActionCnst


export const StatusUpdate = StatusText => ({
  type: FCActie.StatusUpdate,
  StatusText,
})

export const SelectFC = SelectedFC => ({
  type: FCActie.SelectFireComputer,
  SelectedFC,
})


export const SelectSlot = SelectedMsgSlot => ({
  type: FCActie.SelectSlot,
  SelectedMsgSlot,
})


// when message is loaded into FC
const DoneLoading = (workingFC, missionID) => (
  (dispatch, getState) => {
    const { Game: { Missions }, FireComputer: { FCS } } = getState()

    // show FC status idle
    dispatch(StatusUpdate(Cnst.Status.Idle))
    // release read button down
    dispatch({ type: FCActie.ReadMsgDone })

    // show Mission type on FC display
    const mission = Missions.find(m => m.ID === missionID)

    // set 'read + mission type' as status in selected FC
    const showMission = Cnst.FireComputers.Results.read + mission.Type

    const UpdatedFC = {
      ...workingFC,
      status: showMission,
      missionID,
    }
    const UpdatedFCS = FCS.map((sl) => {
      let temp = Object.assign({}, sl)
      if (temp.name === workingFC.name) temp = UpdatedFC
      return temp
    })
    dispatch({
      type: ActionCnst.FireComputers.UpdateFCs,
      UpdatedFCS,
    })
  })

// show error in status of set time, then set idle status
const ShowErrorStatus = err => (
  (dispatch) => {
    dispatch(StatusUpdate(err))

    setTimeout(() => {
      dispatch(StatusUpdate(Cnst.Status.Idle))
    }, Cnst.FireComputers.Time.error)
  })

// start read msg from selected slot into selected FC
export const ReadMsg = () => (
  (dispatch, getState) => {
    const {
      Radio: { Slots },
      FireComputer: { SelectedMsgSlot, SelectedFC, FCS },
    } = getState()


    const SelectedRadioSlot = Slots.find(sl => sl.slotNR === SelectedMsgSlot)
    const { status: SlotStatus, missionID } = SelectedRadioSlot

    const WorkingFC = FCS.filter(fc => fc.name === SelectedFC)

    console.log(`FC: SelectedFC: ${SelectedFC} Selected MsgSlot ${SelectedMsgSlot} MsgStatus: ${SlotStatus}`)

    // check if a FC is selected
    if (SelectedFC === '') {
      console.log('FC: no fc selected to read msg')
      dispatch(StatusUpdate(Cnst.FireComputers.Errors.NoFCselected))
      return
    }
    // check if selected slot contains a msg
    if (SlotStatus === Cnst.Radio.Results.erase) {
      console.log(`FC: Selected msg slot ${SelectedMsgSlot} is empty`)
      dispatch(StatusUpdate(Cnst.FireComputers.Errors.NoMsg))
      return
    }
    // check if msg is decrypted
    if (SlotStatus === Cnst.Radio.Results.store) {
      console.log(`FC: Selected msg ${SelectedMsgSlot} is not decrypted`)
      dispatch(StatusUpdate(Cnst.FireComputers.Errors.MsgNotDecoded))
      return
    }

    // must be a decoded msg...
    // ..show reading status
    console.log(`FC: Start reading msg ${SelectedMsgSlot} into FC ${SelectedFC}`)
    dispatch(StatusUpdate(Cnst.FireComputers.Actions.read + SelectedFC))

    // hold read button down
    dispatch({ type: FCActie.ReadMsg })

    setTimeout(() => {
      dispatch(DoneLoading(WorkingFC[0], missionID))
    }, Cnst.FireComputers.Time.read)
  })


export const SendMission = () => ({
  type: FCActie.SendMission,
})

export const ReadMsgDone = () => ({
  type: FCActie.ReadMsgDone,
})


const CheckCorrectLSforMission = (MissionType, SelectedLS) => {
  let IsCorrect = false
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

export const SendMissionDone = () => (
  (dispatch, getState) => {
    const {
      FireComputer: { SelectedFC, FCS },
      LaunchStations: { SelectedStatus: LSselectedStatus, Selected: SelectedLS },
    } = getState()

    const WorkingFC = FCS.filter(fc => fc.name === SelectedFC)
    const MissionType = FCS.filter(fc => fc.name === SelectedFC).map(fc => fc.WorkingFC)
    // check if a FC is selected
    if (!WorkingFC) {
      console.log('FC: no fc selected send mission')
      dispatch(ShowErrorStatus(Cnst.FireComputers.Errors.NoFCselected))
      return
    }
    // check if selected FC has mission
    if (WorkingFC.status !== Cnst.FireComputers.Results.read) {
      console.log(`FC: selected fc ${WorkingFC.name} has no mission`)
      dispatch(ShowErrorStatus(Cnst.FireComputers.Errors.NoMissionInSelectedFC))
      return
    }
    // check if selected LS is loaded
    if (LSselectedStatus !== Cnst.LaunchStations.StatusColor.loaded) {
      // general error on FCS
      dispatch(ShowErrorStatus(Cnst.FireComputers.Errors.CannotSend))
      // specific err on LS
      dispatch(LSshowErr(Cnst.LaunchStations.Errors.LSisEmpty))
      return
    }
    // check if selected LS is correct for this Mission Type
    if (!CheckCorrectLSforMission(MissionType, SelectedLS)) {
      // general error on FCS
      dispatch(ShowErrorStatus(Cnst.FireComputers.Errors.CannotSend))
      // specific on LS
      dispatch(LSshowErr(Cnst.LaunchStations.Errors.WrongLSforMission))
      return
    }

    // start sending Fire Mission to selected Launch Station
    console.log(`Start sending mission from FC ${WorkingFC.name} to Launch Station ${SelectedLS}`)
    dispatch(StatusUpdate(Cnst.FireComputers.Actions.send))
    this.emit(Cnst.FireComputers.Emit.ChangedFCstatus)
    // hold read button down
    dispatch({ type: FCActie.SendMission })


    setTimeout(() => {
      // show FC status idle
      dispatch(StatusUpdate(Cnst.Status.Idle))
      // release send button
      dispatch({ type: FCActie.SendMissionDone })
      // set selected FC to empty
      const UpdatedFC = {
        ...WorkingFC,
        status: Cnst.FireComputers.Results.empty,
        missionID: -1,
      }
      const UpdatedFCS = FCS.map((sl) => {
        let temp = Object.assign({}, sl)
        if (temp.name === WorkingFC.name) temp = UpdatedFC
        return temp
      })
      dispatch({ type: ActionCnst.FireComputers.UpdateFCs, UpdatedFCS })
    }, Cnst.FireComputers.Time.send)
  }
)
