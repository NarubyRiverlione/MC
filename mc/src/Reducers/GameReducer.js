import { ActionCnst } from '../Constants'

const { Game: GameActie } = ActionCnst
const InitState = {
  Status: '',
  Missions: [],
  lastMissionID: 0,
  Rank: 5,
  ReceivedMissions: 0,
  ExecutedMissions: 0,
  MsgTimeoutTimer: 0,
}

const GameReducer = (state = InitState, action) => {
  switch (action.type) {
    case GameActie.StatusUpdate:
      return {
        ...state,
        Status: action.StatusText,
      }
    // adjust the Rank
    case GameActie.UpdateRank:
      return {
        ...state,
        Rank: action.NewRank,
      }
    // add missionID, inc Received Missions
    case GameActie.UpdateMissionID:
      return {
        ...state,
        lastMissionID: action.NewLastMissionID,
        ReceivedMissions: action.NewReceivedMissions,
      }
    // adjust missions
    case GameActie.UpdateMissions:
      return {
        ...state,
        Missions: action.UpdatedMissions,
      }
    // store Msg time-out timer (to stop it later)
    case GameActie.StoreMsgTimeOutTimer:
      return {
        ...state,
        MsgTimeoutTimer: action.MsgTimeoutTimer,
      }
    // clear the Msg time-out timer
    case GameActie.ClearMsgTimeOutTimer:
      return {
        ...state,
        MsgTimeoutTimer: 0,
      }
    // inc succesfull missions
    case GameActie.IncExecutedMissions:
      return {
        ...state,
        ExecutedMissions: action.NewIncExecutedMissions,
      }
    default:
      return state
  }
}

export default GameReducer
