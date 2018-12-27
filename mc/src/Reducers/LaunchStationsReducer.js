import { ActionCnst } from '../Constants'

const { LaunchStations: LaunchStationActie } = ActionCnst
const InitState = {
  Status: '',
}

const LaunchStationsReducer = (state = InitState, actie) => {
  switch (actie.type) {
    case LaunchStationActie.StatusUpdate:
      return [...state, {
        Status: actie.StatusText,
      }]

    default:
      return state
  }
}

export default LaunchStationsReducer
