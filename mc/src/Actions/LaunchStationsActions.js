import { IncExecuted } from './GameActions'
import { ActionCnst, Cnst, CstLaunchStations } from '../Constants'
import { LoadingDone as ArmoryLoadingDone, AddOneToArmory } from './ArmoryActions'


const { LaunchStations: LSActie } = ActionCnst

export const StatusUpdate = (StatusText, ErrorStatus = false) => ({
  type: LSActie.StatusUpdate,
  StatusText,
  ErrorStatus,
})
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


// show error in status of set time, then set idle status
export const ShowErrorStatus = err => (
  (dispatch) => {
    dispatch(StatusUpdate(err, true))

    setTimeout(() => {
      dispatch(StatusUpdate(Cnst.Status.Idle, false))
    }, CstLaunchStations.Time.error)
  })

const DeselectAll = () => ({
  type: LSActie.DeselectStations,
})

export const Select = stationName => (
  (dispatch) => {
    dispatch(DeselectAll())

    dispatch({ type: LSActie.Select, Selected: stationName })

    // show status of selected LS
    dispatch(ShowSelectedStatus())
  })

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
    dispatch(StatusUpdate(CstLaunchStations.Results.received))
  })

const DoneFiring = (Stations, FiringLS) => (
  (dispatch) => {
    // done firing
    dispatch({ type: LSActie.Fired })
    dispatch(StatusUpdate(Cnst.Status.Idle))

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
    dispatch(IncExecuted())
  })
export const Fire = () => (
  (dispatch, getState) => {
    const { LaunchStations: { Stations, Selected } } = getState()
    const FiringLS = Selected

    // no LS selected ?
    if (!Selected) {
      dispatch(ShowErrorStatus(CstLaunchStations.Errors.NoLaunchStationSelected))
      return
    }
    const LS = Stations[Selected]
    // is LS loaded ?
    if (!LS.ordnance) {
      dispatch(ShowErrorStatus(CstLaunchStations.Errors.LSisEmpty))
      return
    }
    // no mission loaded ?
    if (LS.missionID === -1) {
      dispatch(ShowErrorStatus(CstLaunchStations.Errors.NoMissionLoaded))
      return
    }

    // start firing
    dispatch({ type: LSActie.Firing })
    // status fired
    dispatch(StatusUpdate(CstLaunchStations.Results.fire))

    setTimeout(() => {
      dispatch(DoneFiring(Stations, FiringLS))
    }, CstLaunchStations.Time.firing)
  })


//   export const Prepare = () => ({ type: LSActie.Prepare })

// export const Repair = () => ({ type: LSActie.Repair })
