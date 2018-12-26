import AppDispatcher from '../AppDispatcher'
import { ActionCnst, Cnst } from '../Constants'

import launchStationStore from '../Stores/LaunchStationsStore'
import armoryStore from '../Stores/ArmoryStore'

import { ShowErrorStatus as LSshowErr, StartLoading as LSstartLoading } from './LaunchStationsActions'

const ShowErrorStatus = (status) => {
  AppDispatcher.dispatch({
    type: ActionCnst.Armory.ShowErrorStatus,
    payload: status,
  })
}

const StartLoading = () => {
  AppDispatcher.dispatch({
    type: ActionCnst.Armory.Load,
  })

  // start Loading selected ordnance in Launch Station
  LSstartLoading(armoryStore.Selected)
}

// show general error on Armory display and specific error on Launch Station display
const ShowErrorInArmoryAndLS = (armoryErr, LSerr) => {
  ShowErrorStatus(armoryErr)
  LSshowErr(LSerr)
}

const WrongStationSelected = () => {
  let errorMsg
  switch (armoryStore.Selected) {
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
  ShowErrorInArmoryAndLS(Cnst.Armory.Errors.WrongLaunchStation, errorMsg)
}

// check if correct Launch Station is Selected
// TODO: check is selected LS isn't already loaded of loading
const CheckSelectedLaunchStation = () => {
  // check if LS is selected
  if (launchStationStore.Selected === '') {
    ShowErrorInArmoryAndLS(Cnst.Armory.Errors.NoLSselected, Cnst.LaunchStations.Errors.NoLSselected)
    return
  }

  // check is selected LS is empty
  const loadingStatusSelectedLS = launchStationStore.Station[launchStationStore.Selected].loadingStatus
  if (loadingStatusSelectedLS !== Cnst.LaunchStations.StatusColor.empty) {
    // show error
    ShowErrorInArmoryAndLS(Cnst.Armory.Errors.SelectedLSnotEmpty, Cnst.LaunchStations.Errors.SelectedLSnotEmpty)
    return
  }

  // check correct type of LS is selected for selected ordnance
  if (armoryStore.Selected === Cnst.Ordnance.AA || armoryStore.Selected === Cnst.Ordnance.AS) {
    if (launchStationStore.Selected === Cnst.LaunchStations.Numbers.one
      || launchStationStore.Selected === Cnst.LaunchStations.Numbers.two) {
      StartLoading()
    }
    else {
      WrongStationSelected()
    }
  }

  if (armoryStore.Selected === Cnst.Ordnance.G) {
    if (launchStationStore.Selected === Cnst.LaunchStations.Numbers.A
      || launchStationStore.Selected === Cnst.LaunchStations.Numbers.B) {
      StartLoading()
    }
    else {
      WrongStationSelected()
    }
  }

  if (armoryStore.Selected === Cnst.Ordnance.T) {
    if (launchStationStore.Selected === Cnst.LaunchStations.Numbers.romanOn
      || launchStationStore.Selected === Cnst.LaunchStations.Numbers.romanTwo) {
      StartLoading()
    }
    else {
      WrongStationSelected()
    }
  }
}

export const AddOneToArmory = (ord) => {
  AppDispatcher.dispatch({
    type: ActionCnst.Armory.AddOneToArmory,
    payload: ord,
  })
}

export const Select = (ord) => {
  AppDispatcher.dispatch({
    type: ActionCnst.Armory.Select,
    payload: ord,
  })
}

export const Load = () => {
  // check if ordnance is selected
  if (armoryStore.Selected === '') {
    ShowErrorStatus(Cnst.Armory.Errors.NoOrdnanceSelected)
    return
  }
  // check if ordnance is still in store
  if (armoryStore.Amount[armoryStore.Selected] < 1) {
    ShowErrorStatus(Cnst.Armory.Errors.OrdnanceOutOfStock)
    return
  }

  // check if correct LaunchStation is selected
  CheckSelectedLaunchStation()
}
