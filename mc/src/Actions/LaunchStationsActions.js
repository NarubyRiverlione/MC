import { MissionDone } from './GameActions'
import { ActionCnst, Cnst, CstLaunchStations } from '../Constants'
import { LoadingDone as ArmoryLoadingDone, AddOneToArmory } from './ArmoryActions'
import { ShowErrorStatus, StatusUpdate } from './CommonActions'

const { LaunchStations: LSActie } = ActionCnst

// show status (content) of selected launch station in dedicated display
// (not generic control panel display)
const ShowSelectedStatus = () => (
  (dispatch, getState) => {
    const { LaunchStations: { Selected, Stations } } = getState()

    if (Selected === '') {
      // nothing selected, nothing to show
      dispatch({ type: LSActie.UpdateSelectedStatus, SelectedStatus: '' })
    }
    else {
      const { handleStatus } = Stations[Selected]
      // find key (= description) for statusColor
      let selStatusTxt = Object.keys(CstLaunchStations.StatusColor)
        .find(key => CstLaunchStations.StatusColor[key] === handleStatus)

      // add ordnance type when LS is not empty
      if (handleStatus !== 2) selStatusTxt += `: ${Stations[Selected].ordnance}`

      dispatch({ type: LSActie.UpdateSelectedStatus, SelectedStatus: selStatusTxt })
    }
  })

// deselect all launch stations
const DeselectAll = () => ({
  type: LSActie.DeselectStations,
})
// select a launch station
export const Select = stationName => (
  (dispatch) => {
    // release  all station buttons
    dispatch(DeselectAll())
    // hold the button of the  selected
    dispatch({ type: LSActie.Select, Selected: stationName })
    // show status of selected LS
    dispatch(ShowSelectedStatus())
  })

// loading or removing ordnance is done
const DoneHandeling = (LS, loading, Stations, Selected) => (
  (dispatch) => {
    const WorkingLS = { ...LS }
    // signal loading done by led color
    WorkingLS.handleStatus = loading
      ? CstLaunchStations.StatusColor.loaded
      : CstLaunchStations.StatusColor.empty
    // reset missionID when removing
    if (!loading) WorkingLS.missionID = -1

    const DoneStations = { ...Stations }
    DoneStations[Selected] = { ...WorkingLS }
    dispatch({
      type: LSActie.UpdatedStations,
      UpdatedStations: DoneStations,
    })
    if (loading) dispatch(ArmoryLoadingDone())
    else dispatch(AddOneToArmory(WorkingLS.ordnance))

    // show selected LS status
    dispatch(ShowSelectedStatus())
  })
// start loading or removing an ordnance into a launch station
export const HandelingLaunchStation = (ordnance, loading = true) => (
  (dispatch, getState) => {
    const { LaunchStations: { Selected, Stations } } = getState()
    const LS = { ...Stations[Selected] }

    // loading: set ordnance type in LS so it can be removing later
    if (loading) LS.ordnance = ordnance

    // signal handeling in progress by setting led color
    LS.handleStatus = loading
      ? CstLaunchStations.StatusColor.loading
      : CstLaunchStations.StatusColor.removing

    const UpdatedStations = { ...Stations }
    UpdatedStations[Selected] = { ...LS }
    dispatch({ type: LSActie.UpdatedStations, UpdatedStations })

    // show selected LS status
    dispatch(ShowSelectedStatus())

    // wait for loading time
    setTimeout(() => {
      dispatch(DoneHandeling(LS, loading, Stations, Selected))
    }, CstLaunchStations.Time.loading)
  })

// received a fire mission for a fire computer to a launch station
export const ReceivedMission = missionID => (
  (dispatch, getState) => {
    const { LaunchStations: { Selected, Stations } } = getState()
    const LS = { ...Stations[Selected] }
    LS.missionID = missionID

    const UpdatedStations = { ...Stations }
    UpdatedStations[Selected] = { ...LS }
    dispatch({
      type: LSActie.UpdatedStations,
      UpdatedStations,
    })
    // show mission received on status display
    dispatch(StatusUpdate(LSActie.StatusUpdate, CstLaunchStations.Results.received))
  })

// firing is done
const DoneFiring = (Stations, FiringLS) => (
  (dispatch) => {
    const { missionID } = Stations[FiringLS]
    // done firing
    dispatch({ type: LSActie.Fired })
    dispatch(StatusUpdate(LSActie.StatusUpdate, Cnst.Status.Idle))

    // clear selected LS
    const EmptyLS = {
      handleStatus: CstLaunchStations.StatusColor.empty,
      missionID: -1,
      ordnance: '',
    }
    const UpdatedStations = { ...Stations }
    UpdatedStations[FiringLS] = { ...EmptyLS }
    dispatch({ type: LSActie.UpdatedStations, UpdatedStations })
    // show empty station
    dispatch(ShowSelectedStatus())

    // inc succesfull missions
    dispatch(MissionDone(missionID))
  })
// start firing
export const Fire = () => (
  (dispatch, getState) => {
    const { LaunchStations: { Stations, Selected }, Game: { Missions } } = getState()
    const FiringLS = Selected

    // no LS selected ?
    if (!Selected) {
      dispatch(ShowErrorStatus(LSActie.StatusUpdate,
        CstLaunchStations.Errors.NoLaunchStationSelected, CstLaunchStations.Time.error))
      return
    }
    const LS = Stations[Selected]
    // is LS loaded ?
    if (!LS.ordnance) {
      dispatch(ShowErrorStatus(LSActie.StatusUpdate,
        CstLaunchStations.Errors.LSisEmpty, CstLaunchStations.Time.error))
      return
    }
    // no mission loaded ?
    if (LS.missionID === -1) {
      dispatch(ShowErrorStatus(LSActie.StatusUpdate,
        CstLaunchStations.Errors.NoMissionLoaded, CstLaunchStations.Time.error))
      return
    }
    // mission already done ?
    const { Done } = Missions[LS.missionID]
    if (Done) {
      dispatch(ShowErrorStatus(LSActie.StatusUpdate,
        CstLaunchStations.Errors.MissionAlreadyDone, CstLaunchStations.Time.error))
      return
    }
    // start firing
    dispatch({ type: LSActie.Firing })
    // status fired
    dispatch(StatusUpdate(LSActie.StatusUpdate, CstLaunchStations.Results.fire))

    setTimeout(() => {
      dispatch(DoneFiring(Stations, FiringLS))
    }, CstLaunchStations.Time.firing)
  })
