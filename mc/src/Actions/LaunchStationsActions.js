import { IncExcecuted } from './GameActions'
import { ActionCnst, Cnst } from '../Constants'
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
      let selStatusTxt = Object.keys(Cnst.LaunchStations.StatusColor)
        .find(key => Cnst.LaunchStations.StatusColor[key] === handleStatus)

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
    }, Cnst.LaunchStations.Time.error)
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
      ? Cnst.LaunchStations.StatusColor.loaded
      : Cnst.LaunchStations.StatusColor.empty
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
      ? Cnst.LaunchStations.StatusColor.loading
      : Cnst.LaunchStations.StatusColor.removing

    const UpdatedStations = { ...Stations }
    UpdatedStations[Selected] = { ...LS }
    dispatch({ type: LSActie.UpdatedStations, UpdatedStations })

    // show selected LS status
    dispatch(ShowSelectedStatus())

    // wait for loading time
    setTimeout(() => {
      dispatch(DoneHandeling(LS, loading, Stations, Selected))
    }, Cnst.LaunchStations.Time.loading)
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
    dispatch(StatusUpdate(Cnst.LaunchStations.Results.received))
  })

const DoneFiring = (Stations, FiringLS) => (
  (dispatch) => {
    // done firing
    dispatch({ type: LSActie.Fired })

    // clear selected LS
    const EmptyLS = {
      handleStatus: Cnst.LaunchStations.StatusColor.empty,
      missionID: -1,
      ordnance: '',
    }
    const UpdatedStations = { ...Stations }
    UpdatedStations[FiringLS] = { ...EmptyLS }
    dispatch({ type: LSActie.UpdatedStations, UpdatedStations })

    // inc succesfull missions
    dispatch(IncExcecuted())
  })
export const Fire = () => (
  (dispatch, getState) => {
    const { LaunchStations: { Stations, Selected } } = getState()
    const FiringLS = Selected
    // start firing
    dispatch({ type: LSActie.Firing })

    setTimeout(() => {
      dispatch(DoneFiring(Stations, FiringLS))
    }, Cnst.LaunchStations.Time.firing)
  })


//   export const Prepare = () => ({ type: LSActie.Prepare })

// export const Repair = () => ({ type: LSActie.Repair })
