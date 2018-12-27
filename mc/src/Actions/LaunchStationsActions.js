
import { ActionCnst, Cnst } from '../Constants'

const { LaunchStations: LSActie } = ActionCnst


const ShowSelectedStatus = () => (
  (dispatch, getState) => {
    const { LaunchStations: { Selected, Stations } } = getState()

    if (Selected === '') {
      // nothing selected, nothing to show
      dispatch({ type: LSActie.UpdateSelectedStatus, SelectedStatus: '' })
    }
    else {
      const { loadingStatus } = Stations[Selected]
      // find key (= description) for statusColor
      let selStatusTxt = Object.keys(Cnst.LaunchStations.StatusColor)
        .find(key => Cnst.LaunchStations.StatusColor[key] === loadingStatus)

      // add ordnance type
      selStatusTxt += `: ${Stations[Selected].ordnance}`
      dispatch({ type: LSActie.UpdateSelectedStatus, SelectedStatus: selStatusTxt })
    }
  }
)

export const StatusUpdate = StatusText => ({
  type: LSActie.StatusUpdate,
  StatusText,
})

// show error in status of set time, then set idle status
export const ShowErrorStatus = err => (
  (dispatch) => {
    dispatch(StatusUpdate(err))

    setTimeout(() => {
      dispatch(StatusUpdate(Cnst.Status.Idle))
    }, Cnst.LaunchStations.Time.error)
  })

const DeselectAll = () => (
  (dispatch, getState) => {
    const { LaunchStations: { Stations } } = getState()

    const DeselectedStations = Object.assign({}, Stations)
    Object.keys(DeselectedStations).forEach((name) => {
      DeselectedStations[name].button = false
    })

    dispatch({
      type: LSActie.DeselectStations,
      DeselectedStations,
    })
  })

export const Select = stationName => (
  (dispatch, getState) => {
    dispatch(DeselectAll())
    const { LaunchStations: { Selected, Stations } } = getState()

    if (Selected !== stationName) { // only select if not already selected
      // update station
      const UpdatedStations = Object.assign({}, Stations)
      UpdatedStations[stationName].button = true

      dispatch({
        type: LSActie.Select,
        Selected: stationName,
        UpdatedStations,
      })

      // show status of selected LS
      dispatch(ShowSelectedStatus())
    }
  }
)

export const StartLoading = ordnance => (
  (dispatch, getState) => {
    const { LaunchStations: { Selected, Stations } } = getState()
    const loadThisStation = Selected // remember after wait time, may be other LS is then selected

    const UpdatedStations = Object.assign({}, Stations)
    const LS = UpdatedStations[loadThisStation]

    // set ordnance type in LS
    LS.ordnance = ordnance
    // signal  loading in progress by setting led color
    LS.loadingStatus = Cnst.LaunchStations.StatusColor.loading

    dispatch({
      type: LSActie.StartLoading,
      UpdatedStations,
    })

    // show selected LS status
    dispatch(ShowSelectedStatus())

    // wait for loading time
    setTimeout(() => {
      // signal loading done by led color
      LS.loadingStatus = Cnst.LaunchStations.StatusColor.loaded

      dispatch({
        type: LSActie.DoneLoading,
        UpdatedStations,
      })

      // show selected LS status
      dispatch(ShowSelectedStatus())
    }, Cnst.LaunchStations.Time.loading)
  }
)
// export const Select = caption => (
//   (dispatch) => {
//     let SelectedStation
//     switch (caption) {
//       case Cnst.LaunchStations.Numbers.one:
//       case Cnst.LaunchStations.Numbers.two:
//         SelectedStation = Cnst.LaunchStations.Name.rails; break
//       case Cnst.LaunchStations.Numbers.A:
//       case Cnst.LaunchStations.Numbers.B:
//         SelectedStation = Cnst.LaunchStations.Name.VLT; break
//       case Cnst.LaunchStations.Numbers.romanOn:
//       case Cnst.LaunchStations.Numbers.romanTwo:
//         SelectedStation = Cnst.LaunchStations.Name.tubes; break
//       default:
//         SelectedStation = null
//     }
//     if (SelectedStation) {
//       dispatch({
//         type: LSActie.Select,
//         SelectedStation,
//       })
//     }
//   })

export const Remove = () => (
  (dispatch) => {
    dispatch({ type: LSActie.Remove })
  })

export const Prepare = () => (
  (dispatch) => {
    dispatch({ type: LSActie.Prepare })
  })

export const Repair = () => (
  (dispatch) => {
    dispatch({ type: LSActie.Repair })
  })

export const Fire = () => (
  (dispatch) => {
    dispatch({ type: LSActie.Fire })
  })
