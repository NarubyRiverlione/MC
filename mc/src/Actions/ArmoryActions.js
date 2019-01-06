import { HandelingLaunchStation } from './LaunchStationsActions'
import { ShowErrorStatus, StatusUpdate } from './CommonActions'
import {
  ActionCnst, CstOrdnance, CstLaunchStations, CstArmory, Cnst,
} from '../Constants'

const { Armory: ArmoryActions, LaunchStations: LaunchStationActie } = ActionCnst

// show general error on Armory display and specific error on Launch Station display
const ShowErrorInArmoryAndLS = (ArmoryError, LaunchStationError) => (
  (dispatch) => {
    dispatch(ShowErrorStatus(ArmoryActions.StatusUpdate,
      ArmoryError, CstArmory.Time.error))
    dispatch(ShowErrorStatus(LaunchStationActie.StatusUpdate,
      LaunchStationError, CstLaunchStations.Time.error))
  })

// Loading into Launch Station is done
export const LoadingDone = () => (
  (dispatch) => {
    dispatch(StatusUpdate(ArmoryActions.StatusUpdate, Cnst.Status.Idle))
    dispatch({
      type: ArmoryActions.LoadingDone,
      Loading: false,
      Selected: '',
    })
  })
// Start loading ordnance into Launch Station
const StartLoading = () => (
  (dispatch, getState) => {
    const { Armory: { Selected, Amount } } = getState()
    // reduce amount of the ordnance
    const UpdatedAmount = { ...Amount }
    // eslint-disable-next-line no-plusplus
    UpdatedAmount[Selected]--
    dispatch({ type: ArmoryActions.UpdateAmount, UpdatedAmount })
    // show start loading msg
    dispatch(StatusUpdate(ArmoryActions.StatusUpdate, CstArmory.Actions.loading))
    // start Loading selected ordnance in Launch Station
    dispatch({ type: ArmoryActions.Loading })
    dispatch(HandelingLaunchStation(Selected, true))
  })

// show relevant error when wrong Launch Station is selected to load ordnance into
const ShowMsgWrongStationSelected = () => (
  (dispatch, getState) => {
    const { Armory: { Selected } } = getState()
    let errorMsg
    switch (Selected) {
      case CstOrdnance.AA:
        errorMsg = CstLaunchStations.Errors.WrongLaunchStation.AA; break
      case CstOrdnance.AS:
        errorMsg = CstLaunchStations.Errors.WrongLaunchStation.AS; break
      case CstOrdnance.G:
        errorMsg = CstLaunchStations.Errors.WrongLaunchStation.G; break
      case CstOrdnance.T:
        errorMsg = CstLaunchStations.Errors.WrongLaunchStation.T; break
      default:
        break
    }
    dispatch(ShowErrorInArmoryAndLS(CstArmory.Errors.WrongLaunchStation, errorMsg))
  })
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
      dispatch(ShowErrorInArmoryAndLS(
        CstArmory.Errors.NoLaunchStationSelected,
        CstLaunchStations.Errors.NoLaunchStationSelected,
      ))
      return
    }

    // check is selected LS is empty
    const handleStatusSelectedLS = LSstations[LSselected].handleStatus
    if (handleStatusSelectedLS !== CstLaunchStations.StatusColor.empty) {
      // show error
      dispatch(ShowErrorInArmoryAndLS(
        CstArmory.Errors.SelectedLSnotEmpty,
        CstLaunchStations.Errors.SelectedLSnotEmpty,
      ))
      return
    }

    /* check correct type of LS is selected for selected ordnance */
    // AA
    if (ArmorySelected === CstOrdnance.AA || ArmorySelected === CstOrdnance.AS) {
      if (LSselected === CstLaunchStations.Numbers.one
        || LSselected === CstLaunchStations.Numbers.two) {
        dispatch(StartLoading())
      }
      else {
        dispatch(ShowMsgWrongStationSelected())
      }
    }
    // G
    if (ArmorySelected === CstOrdnance.G) {
      if (LSselected === CstLaunchStations.Numbers.A
        || LSselected === CstLaunchStations.Numbers.B) {
        dispatch(StartLoading())
      }
      else {
        dispatch(ShowMsgWrongStationSelected())
      }
    }
    // T
    if (ArmorySelected === CstOrdnance.T) {
      if (LSselected === CstLaunchStations.Numbers.romanOn
        || LSselected === CstLaunchStations.Numbers.romanTwo) {
        dispatch(StartLoading())
      }
      else {
        dispatch(ShowMsgWrongStationSelected())
      }
    }
  })
// load ordnance into Launch Station, check if type is correct
export const Load = () => (
  (dispatch, getState) => {
    const { Armory: { Selected, Amount } } = getState()

    // check if ordnance is selected
    if (Selected === '') {
      dispatch(ShowErrorStatus(CstArmory.Errors.NoOrdnanceSelected))
      return
    }
    // check if ordnance is still in store
    if (Amount[Selected] < 1) {
      dispatch(ShowErrorStatus(CstArmory.Errors.OrdnanceOutOfStock))
      return
    }

    // check if correct LaunchStation is selected
    dispatch(CheckSelectedLaunchStation())
  })

// add ordnance back to armory form Launch Station (action 'remove')
export const AddOneToArmory = ordnance => (
  (dispatch, getState) => {
    const { Armory: { Amount } } = getState()
    // increment amount of the ordnance
    const UpdatedAmount = { ...Amount }
    // eslint-disable-next-line no-plusplus
    UpdatedAmount[ordnance]++
    dispatch({ type: ArmoryActions.UpdateAmount, UpdatedAmount })
  })

// select ordnance
export const SetSelected = Selected => (
  dispatch => dispatch({
    type: ArmoryActions.Select,
    Selected,
  }))

// set start amounts of ordnance in the armory (called at game start)
export const SetLoadout = LoadoutAmount => ({
  type: ArmoryActions.SetLoadout,
  LoadoutAmount,
})
