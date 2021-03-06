import {
  ActionCnst, Cnst, CstRadio, CstFireComputers, CstLaunchStations, CstMissions,
} from '../Constants'
import { ShowErrorStatus, StatusUpdate } from './CommonActions'
import {
  ReceivedMission as SendToLaunchStation,
} from './LaunchStationsActions'


const { FireComputers: FCActie, LaunchStations: LSActie } = ActionCnst

// select Fire Computer A or B to load msg into
export const SelectFC = SelectedFC => ({
  type: FCActie.SelectFireComputer,
  SelectedFC,
})

// select radio slot to load decoded msg from
export const SelectSlot = SelectedMsgSlot => ({
  type: FCActie.SelectSlot,
  SelectedMsgSlot,
})

// when message is loaded into FC
const DoneLoading = (workingFC, missionID) => (
  (dispatch, getState) => {
    const { Game: { Missions }, FireComputer: { FCS } } = getState()

    // show FC status idle
    dispatch(StatusUpdate(FCActie.StatusUpdate, Cnst.Status.Idle))
    // release read button down
    dispatch({ type: FCActie.ReadMsgDone })

    // show Mission type on FC display
    const mission = Missions.find(m => m.ID === missionID)
    // set 'read + mission type' as status in selected FC
    const showMission = CstFireComputers.Results.read + mission.Type

    const UpdatedFC = {
      ...workingFC,
      status: CstFireComputers.Results.read,
      display: showMission,
      missionID,
    }
    const UpdatedFCS = FCS.map((sl) => {
      let temp = Object.assign({}, sl)
      if (temp.name === workingFC.name) temp = UpdatedFC
      return temp
    })
    dispatch({
      type: FCActie.UpdateFCs,
      UpdatedFCS,
    })
  })
// start loading msg from selected radio slot into selected FC
export const LoadMsgIntoFC = () => (
  (dispatch, getState) => {
    const {
      Radio: { Slots },
      FireComputer: { SelectedMsgSlot, SelectedFC, FCS },
    } = getState()


    const SelectedRadioSlot = Slots.find(sl => sl.slotNR === SelectedMsgSlot)
    const { status: SlotStatus, missionID } = SelectedRadioSlot

    const WorkingFC = FCS.filter(fc => fc.name === SelectedFC)

    // check if a FC is selected
    if (SelectedFC === '') {
      // console.log('FC: no fc selected to read msg')
      dispatch(ShowErrorStatus(FCActie.StatusUpdate,
        CstFireComputers.Errors.NoFCselected, CstFireComputers.Time.error))
      return
    }
    // check if selected slot contains a msg
    if (SlotStatus === CstRadio.Results.erase) {
      // console.log(`FC: Selected msg slot ${SelectedMsgSlot} is empty`)
      dispatch(ShowErrorStatus(FCActie.StatusUpdate,
        CstFireComputers.Errors.NoMsg, CstFireComputers.Time.error))
      return
    }
    // check if msg is decrypted
    if (SlotStatus === CstRadio.Results.store) {
      // console.log(`FC: Selected msg ${SelectedMsgSlot} is not decrypted`)
      dispatch(ShowErrorStatus(FCActie.StatusUpdate,
        CstFireComputers.Errors.MsgNotDecoded, CstFireComputers.Time.error))
      return
    }

    // must be a decoded msg...
    // ..show loading status
    dispatch(StatusUpdate(FCActie.StatusUpdate,
      CstFireComputers.Actions.load + SelectedFC))

    // hold read button down
    dispatch({ type: FCActie.ReadMsg })

    setTimeout(() => {
      dispatch(DoneLoading(WorkingFC[0], missionID))
    }, CstFireComputers.Time.read)
  })

// check if correct Launch Station is selected to send fire mision to
const CheckCorrectLSforMission = (MissionType, SelectedLS) => {
  let IsCorrect = false
  // AA -> Rails
  if (MissionType === CstMissions.Type[0]
    && (SelectedLS === CstLaunchStations.Numbers.one
      || SelectedLS === CstLaunchStations.Numbers.two)) IsCorrect = true

  // AS -> Rails
  if (MissionType === CstMissions.Type[2]
    && (SelectedLS === CstLaunchStations.Numbers.one
      || SelectedLS === CstLaunchStations.Numbers.two)) IsCorrect = true

  // G -> VLT
  if (MissionType === CstMissions.Type[1]
    && (SelectedLS === CstLaunchStations.Numbers.A
      || SelectedLS === CstLaunchStations.Numbers.B)) IsCorrect = true

  // T -> Tubes
  if (MissionType === CstMissions.Type[3]
    && (SelectedLS === CstLaunchStations.Numbers.romanOn
      || SelectedLS === CstLaunchStations.Numbers.romanTwo)) IsCorrect = true
  return IsCorrect
}
// send to Launch Station is done, clear Fire Computer
const DoneSendToLS = (WorkingFC, missionID, FCS) => (
  (dispatch) => {
    // show FC status idle
    dispatch(StatusUpdate(FCActie.StatusUpdate, Cnst.Status.Idle))
    // release send button
    dispatch({ type: FCActie.SendMissionDone })
    // clear  selected FC
    const UpdatedFC = {
      ...WorkingFC,
      status: CstFireComputers.Results.empty,
      display: CstFireComputers.Results.empty,
      missionID: -1,
    }
    const UpdatedFCS = FCS.map((sl) => {
      let temp = Object.assign({}, sl)
      if (temp.name === WorkingFC.name) temp = UpdatedFC
      return temp
    })
    dispatch({ type: FCActie.UpdateFCs, UpdatedFCS })

    // send fire mission to launch station
    dispatch(SendToLaunchStation(missionID))
  })
// send mission to selected Launch Station
export const SendMissionToLS = () => (
  (dispatch, getState) => {
    const {
      Game: { Missions },
      FireComputer: { SelectedFC, FCS },
      LaunchStations: { Stations, Selected: SelectedLS },
    } = getState()

    const WorkingFC = FCS.find(fc => fc.name === SelectedFC)

    // check if a FC is selected
    if (!WorkingFC) {
      // console.log('FC: no fc selected send mission')
      dispatch(ShowErrorStatus(CstFireComputers.Errors.NoFCselected))
      return
    }
    // check if selected FC has mission
    if (WorkingFC.status !== CstFireComputers.Results.read) {
      // console.log(`FC: selected fc ${WorkingFC.name} has no mission`)
      dispatch(ShowErrorStatus(CstFireComputers.Errors.NoMissionInSelectedFC))
      return
    }
    // check if a Launch station is selected
    if (SelectedLS === '') {
      // general error on FCS
      dispatch(ShowErrorStatus(CstFireComputers.Errors.CannotSend))
      // specific err on LS
      dispatch(StatusUpdate(LSActie.StatusUpdate,
        CstLaunchStations.Errors.NoLSselected, CstLaunchStations.Time.error))
      return
    }
    // check if selected LS is loaded
    const WorkingStation = Stations[SelectedLS]
    const { handleStatus } = WorkingStation
    if (handleStatus !== CstLaunchStations.StatusColor.loaded) {
      // general error on FCS
      dispatch(ShowErrorStatus(CstFireComputers.Errors.CannotSend))
      // specific err on LS
      dispatch(StatusUpdate(LSActie.StatusUpdate,
        CstLaunchStations.Errors.LSisEmpty, CstLaunchStations.Time.error))
      return
    }
    // check if selected LS is correct for this Mission Type
    const WorkingMission = Missions.find(m => m.ID === WorkingFC.missionID)
    const { Type: MissionType, ID: missionID } = WorkingMission
    if (!CheckCorrectLSforMission(MissionType, SelectedLS)) {
      // general error on FCS
      dispatch(ShowErrorStatus(CstFireComputers.Errors.CannotSend))
      // specific on LS
      dispatch(StatusUpdate(LSActie.StatusUpdate,
        CstLaunchStations.Errors.WrongLaunchStationForMission, CstLaunchStations.Time.error))
      return
    }

    // start sending Fire Mission to selected Launch Station
    // console.log(`Start sending mission from FC ${WorkingFC.name} to Launch Station ${SelectedLS}`)
    dispatch(StatusUpdate(CstFireComputers.Actions.send))
    dispatch(StatusUpdate(LSActie.StatusUpdate,
      CstLaunchStations.Actions.receiving, CstLaunchStations.Time.error))

    // hold read button down
    dispatch({ type: FCActie.SendMission })

    setTimeout(() => {
      dispatch(DoneSendToLS(WorkingFC, missionID, FCS))
    }, CstFireComputers.Time.send)
  })
