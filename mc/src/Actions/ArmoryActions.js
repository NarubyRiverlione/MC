
import { ActionCnst, Cnst } from '../Constants'

import { ShowErrorStatus as LSshowErr, HandelingLaunchStation } from './LaunchStationsActions'

const { Armory: ArmoryActions } = ActionCnst


export const StatusUpdate = StatusText => ({
  type: ArmoryActions.StatusUpdate,
  StatusText,
})

// show error in status of set time, then set idle status
const ShowErrorStatus = err => (
  (dispatch) => {
    dispatch(StatusUpdate(err))

    setTimeout(() => {
      dispatch(StatusUpdate(Cnst.Status.Idle))
    }, Cnst.Armory.Time.error)
  })


const StartLoading = () => (
  (dispatch, getState) => {
    const { Armory: { Selected, Amount } } = getState()
    // reduce amount of the ordnance
    const UpdatedAmount = { ...Amount }
    // eslint-disable-next-line no-plusplus
    UpdatedAmount[Selected]--
    dispatch({ type: ArmoryActions.UpdateAmount, UpdatedAmount })

    // start Loading selected ordnance in Launch Station
    dispatch({ type: ArmoryActions.Loading })
    dispatch(HandelingLaunchStation(Selected, true))
  })

export const LoadingDone = () => ({
  type: ArmoryActions.LoadingDone,
  Loading: false,
  Selected: '',
})

// show general error on Armory display and specific error on Launch Station display
const ShowErrorInArmoryAndLS = (armoryErr, LSerr) => (
  (dispatch) => {
    dispatch(ShowErrorStatus(armoryErr))
    dispatch(LSshowErr(LSerr))
  }
)


const ShowMsgWrongStationSelected = () => (
  (dispatch, getState) => {
    const { Armory: { Selected } } = getState()
    let errorMsg
    switch (Selected) {
      case Cnst.Ordnance.AA:
        errorMsg = Cnst.LaunchStations.Errors.WrongLaunchStation.AA; break
      case Cnst.Ordnance.AS:
        errorMsg = Cnst.LaunchStations.Errors.WrongLaunchStation.AS; break
      case Cnst.Ordnance.G:
        errorMsg = Cnst.LaunchStations.Errors.WrongLaunchStation.G; break
      case Cnst.Ordnance.T:
        errorMsg = Cnst.LaunchStations.Errors.WrongLaunchStation.T; break
      default:
        break
    }
    dispatch(ShowErrorInArmoryAndLS(Cnst.Armory.Errors.WrongLaunchStation, errorMsg))
  }
)

// check if correct Launch Station is Selected
// TODO: check is selected LS isn't already loaded of loading
const CheckSelectedLaunchStation = () => (
  (dispatch, getState) => {
    const {
      Armory: { Selected: ArmorySelected },
      LaunchStations: { Selected: LSselected, Stations: LSstations },
    } = getState()
    // check if LS is selected
    if (LSselected === '') {
      dispatch(ShowErrorInArmoryAndLS(Cnst.Armory.Errors.NoLSselected, Cnst.LaunchStations.Errors.NoLSselected))
      return
    }

    // check is selected LS is empty
    const handleStatusSelectedLS = LSstations[LSselected].handleStatus
    if (handleStatusSelectedLS !== Cnst.LaunchStations.StatusColor.empty) {
      // show error
      dispatch(ShowErrorInArmoryAndLS(
        Cnst.Armory.Errors.SelectedLSnotEmpty,
        Cnst.LaunchStations.Errors.SelectedLSnotEmpty,
      ))
      return
    }

    /* check correct type of LS is selected for selected ordnance */
    // AA
    if (ArmorySelected === Cnst.Ordnance.AA || ArmorySelected === Cnst.Ordnance.AS) {
      if (LSselected === Cnst.LaunchStations.Numbers.one
        || LSselected === Cnst.LaunchStations.Numbers.two) {
        dispatch(StartLoading())
      }
      else {
        dispatch(ShowMsgWrongStationSelected())
      }
    }
    // G
    if (ArmorySelected === Cnst.Ordnance.G) {
      if (LSselected === Cnst.LaunchStations.Numbers.A
        || LSselected === Cnst.LaunchStations.Numbers.B) {
        dispatch(StartLoading())
      }
      else {
        dispatch(ShowMsgWrongStationSelected())
      }
    }
    // T
    if (ArmorySelected === Cnst.Ordnance.T) {
      if (LSselected === Cnst.LaunchStations.Numbers.romanOn
        || LSselected === Cnst.LaunchStations.Numbers.romanTwo) {
        dispatch(StartLoading())
      }
      else {
        dispatch(ShowMsgWrongStationSelected())
      }
    }
  }
)


export const AddOneToArmory = ordnance => (
  (dispatch, getState) => {
    const { Armory: { Amount } } = getState()
    // increment amount of the ordnance
    const UpdatedAmount = { ...Amount }
    // eslint-disable-next-line no-plusplus
    UpdatedAmount[ordnance]++
    dispatch({ type: ArmoryActions.UpdateAmount, UpdatedAmount })
  }
)


export const SetSelected = Selected => (
  dispatch => dispatch({
    type: ActionCnst.Armory.Select,
    Selected,
  })
)


export const Load = () => (
  (dispatch, getState) => {
    const { Armory: { Selected, Amount } } = getState()

    // check if ordnance is selected
    if (Selected === '') {
      dispatch(ShowErrorStatus(Cnst.Armory.Errors.NoOrdnanceSelected))
      return
    }
    // check if ordnance is still in store
    if (Amount[Selected] < 1) {
      dispatch(ShowErrorStatus(Cnst.Armory.Errors.OrdnanceOutOfStock))
      return
    }

    // check if correct LaunchStation is selected
    dispatch(CheckSelectedLaunchStation())
  }
)
