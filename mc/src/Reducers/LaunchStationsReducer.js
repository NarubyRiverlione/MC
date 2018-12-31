import { ActionCnst, Cnst } from '../Constants'

const { LaunchStations: LaunchStationActie } = ActionCnst
const InitState = {
  Status: Cnst.Status.Idle,
  Stations:
  {
    [Cnst.LaunchStations.Numbers.one]: {
      missionID: -1,
      handleStatus: Cnst.LaunchStations.StatusColor.empty,
      ordnance: '',
    },
    [Cnst.LaunchStations.Numbers.two]: {
      missionID: -1,
      handleStatus: Cnst.LaunchStations.StatusColor.empty,
      ordnance: '',
    },
    [Cnst.LaunchStations.Numbers.A]: {
      missionID: -1,
      handleStatus: Cnst.LaunchStations.StatusColor.empty,
      ordnance: '',
    },
    [Cnst.LaunchStations.Numbers.B]: {
      missionID: -1,
      handleStatus: Cnst.LaunchStations.StatusColor.empty,
      ordnance: '',
    },
    [Cnst.LaunchStations.Numbers.romanOn]: {
      missionID: -1,
      handleStatus: Cnst.LaunchStations.StatusColor.empty,
      ordnance: '',
    },
    [Cnst.LaunchStations.Numbers.romanTwo]: {
      missionID: -1,
      handleStatus: Cnst.LaunchStations.StatusColor.empty,
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
    // update Stations
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
    // Firing
    case LaunchStationActie.Firing:
      return {
        ...state,
        Firing: true,
      }

    default:
      return state
  }
}

export default LaunchStationsReducer
