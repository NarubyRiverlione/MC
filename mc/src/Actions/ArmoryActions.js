
import { ActionCnst, Cnst } from '../Constants'

import { ShowErrorStatus as LSshowErr, StartLoading as LSstartLoading } from './LaunchStationsActions'

const { Armory: ArmoryActions } = ActionCnst

const ShowErrorStatus = status => (
  dispatch => dispatch({
    type: ArmoryActions.ShowErrorStatus,
    status,
  })
)

const StartLoading = () => (
  (dispatch, getState) => {
    const { Armory: { Selected } } = getState()

    dispatch({ type: ArmoryActions.Load })
    // start Loading selected ordnance in Launch Station
    dispatch(LSstartLoading(Selected))
  })

// show general error on Armory display and specific error on Launch Station display
const ShowErrorInArmoryAndLS = (armoryErr, LSerr) => (
  (dispatch) => {
    dispatch(ShowErrorStatus(armoryErr))
    dispatch(LSshowErr(LSerr))
  }
)

const WrongStationSelected = () => (
  (dispatch, getState) => {
    const { Armory: { Selected } } = getState()
    let errorMsg
    switch (Selected) {
      case Cnst.Ordnance.AA:
        errorMsg = Cnst.LaunchStations.Errors.WrongLaunchStation.AA; break
      case Cnst.Ordnance.AG:
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
    const loadingStatusSelectedLS = LSstations[LSselected].loadingStatus
    if (loadingStatusSelectedLS !== Cnst.LaunchStations.StatusColor.empty) {
      // show error
      dispatch(ShowErrorInArmoryAndLS(
        Cnst.Armory.Errors.SelectedLSnotEmpty,
        Cnst.LaunchStations.Errors.SelectedLSnotEmpty,
      ))
      return
    }

    // check correct type of LS is selected for selected ordnance
    if (ArmorySelected === Cnst.Ordnance.AA || ArmorySelected === Cnst.Ordnance.AS) {
      if (LSselected === Cnst.LaunchStations.Numbers.one
        || LSselected === Cnst.LaunchStations.Numbers.two) {
        dispatch(StartLoading())
      }
      else {
        dispatch(WrongStationSelected())
      }
    }

    if (ArmorySelected === Cnst.Ordnance.G) {
      if (LSselected === Cnst.LaunchStations.Numbers.A
        || LSselected === Cnst.LaunchStations.Numbers.B) {
        StartLoading()
      }
      else {
        WrongStationSelected()
      }
    }

    if (ArmorySelected === Cnst.Ordnance.T) {
      if (LSselected === Cnst.LaunchStations.Numbers.romanOn
        || LSselected === Cnst.LaunchStations.Numbers.romanTwo) {
        StartLoading()
      }
      else {
        WrongStationSelected()
      }
    }
  }
)

export const AddOneToArmory = ord => (
  dispatch => dispatch({
    type: ActionCnst.Armory.AddOneToArmory,
    payload: ord,
  })
)

export const SetSelected = ord => (
  dispatch => dispatch({
    type: ActionCnst.Armory.Select,
    payload: ord,
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
