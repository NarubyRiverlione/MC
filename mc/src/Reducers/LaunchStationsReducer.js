import { ActionCnst, CstLaunchStations, Cnst } from '../Constants'

const { LaunchStations: LaunchStationActie } = ActionCnst

const InitState = {
  Status: Cnst.Status.Idle,
  ErrorStatus: false,
  Stations:
  {
    [CstLaunchStations.Numbers.one]: {
      missionID: -1,
      handleStatus: CstLaunchStations.StatusColor.empty,
      ordnance: '',
    },
    [CstLaunchStations.Numbers.two]: {
      missionID: -1,
      handleStatus: CstLaunchStations.StatusColor.empty,
      ordnance: '',
    },
    [CstLaunchStations.Numbers.A]: {
      missionID: -1,
      handleStatus: CstLaunchStations.StatusColor.empty,
      ordnance: '',
    },
    [CstLaunchStations.Numbers.B]: {
      missionID: -1,
      handleStatus: CstLaunchStations.StatusColor.empty,
      ordnance: '',
    },
    [CstLaunchStations.Numbers.romanOn]: {
      missionID: -1,
      handleStatus: CstLaunchStations.StatusColor.empty,
      ordnance: '',
    },
    [CstLaunchStations.Numbers.romanTwo]: {
      missionID: -1,
      handleStatus: CstLaunchStations.StatusColor.empty,
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
        ErrorStatus: action.ErrorStatus,
      }
    // selected a weapon
    case LaunchStationActie.Select:
      return {
        ...state,
        Selected: action.Selected,
      }
    // DeselectStations all LS stations
    case LaunchStationActie.DeselectStations:
      return {
        ...state,
        Selected: '',
      }
    // update display status of selected weapon
    case LaunchStationActie.UpdateSelectedStatus:
      return {
        ...state,
        SelectedStatus: action.SelectedStatus,
      }
    // update Stations for
    // received Mission and firings
    case LaunchStationActie.UpdatedStations:
    case LaunchStationActie.ReceivedMission:
      return {
        ...state,
        Stations: action.UpdatedStations,
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
    // start firing
    case LaunchStationActie.Firing:
      return {
        ...state,
        Firing: true,
      }
    // done firing
    case LaunchStationActie.Fired:
      return {
        ...state,
        Firing: false,
      }

    default:
      return state
  }
}

export default LaunchStationsReducer
