import { ActionCnst, Cnst } from '../Constants'

const { LaunchStations: LaunchStationActie } = ActionCnst
const InitState = {
  Status: Cnst.Status.Idle,
  Stations:
  {
    [Cnst.LaunchStations.Numbers.one]: {
      button: false,
      loadingStatus: Cnst.LaunchStations.StatusColor.empty,
      ordnance: '',
    },
    [Cnst.LaunchStations.Numbers.two]: {
      button: false,
      loadingStatus: Cnst.LaunchStations.StatusColor.empty,
      ordnance: '',
    },
    [Cnst.LaunchStations.Numbers.A]: {
      button: false,
      loadingStatus: Cnst.LaunchStations.StatusColor.empty,
      ordnance: '',
    },
    [Cnst.LaunchStations.Numbers.B]: {
      button: false,
      loadingStatus: Cnst.LaunchStations.StatusColor.empty,
      ordnance: '',
    },
    [Cnst.LaunchStations.Numbers.romanOn]: {
      button: false,
      loadingStatus: Cnst.LaunchStations.StatusColor.empty,
      ordnance: '',
    },
    [Cnst.LaunchStations.Numbers.romanTwo]: {
      button: false,
      loadingStatus: Cnst.LaunchStations.StatusColor.empty,
      ordnance: '',
    },
  },
  Selected: '', // name of selected station
  SelectedStatus: '',
  Prepairing: false,
  Repairing: false,
  Firing: false,
  Removing: false,
}

const LaunchStationsReducer = (state = InitState, action) => {
  switch (action.type) {
    // update LS status
    case LaunchStationActie.StatusUpdate:
      return {
        ...state,
        Status: action.StatusText,
      }
    // selected a weapon
    case LaunchStationActie.Select:
      return {
        ...state,
        Selected: action.Selected,
        Stations: action.UpdatedStations,
      }
    // DeselectStations all LS stations
    case LaunchStationActie.DeselectStations:
      return {
        ...state,
        Stations: action.DeselectedStations,
        Selected: '',
      }
    // update status of selected weapon
    case LaunchStationActie.UpdateSelectedStatus:
      return {
        ...state,
        SelectedStatus: action.SelectedStatus,
      }
    // Prepairing
    case LaunchStationActie.Prepare:
      return {
        ...state,
        Prepare: true,
      }
    // Repairing
    case LaunchStationActie.Repair:
      return {
        ...state,
        Repairing: true,
      }
    // Firing
    case LaunchStationActie.Firing:
      return {
        ...state,
        Firing: true,
      }
    // Removing
    case LaunchStationActie.Remove:
      return {
        ...state,
        Removing: true,
      }
    default:
      return state
  }
}

export default LaunchStationsReducer
