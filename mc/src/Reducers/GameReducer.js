import { ActionCnst } from '../Constants'

const { Game: GameActie } = ActionCnst
const InitState = {
  Status: '',
  Missions: [],
  lastMissionID: 0,
  Rank: 5,
  MsgTimeoutTimer: 0,
}

const GameReducer = (state = InitState, actie) => {
  switch (actie.type) {
    case GameActie.StatusUpdate:
      return {
        ...state,
        Status: actie.StatusText,
      }
    // adjust the Rank
    case GameActie.UpdateRank:
      return {
        ...state,
        Rank: actie.NewRank,
      }
    // adjust missionID
    case GameActie.UpdateMissionID:
      return {
        ...state,
        lastMissionID: actie.NewLastMissionID,
      }
    // adjust missions
    case GameActie.UpdateMissions:
      return {
        ...state,
        Missions: actie.UpdatedMissions,
      }
    // store Msg time-out timer (to stop it later)
    case GameActie.StoreMsgTimeOutTimer:
      return {
        ...state,
        MsgTimeoutTimer: actie.MsgTimeoutTimer,
      }
    // clear the Msg time-out timer
    case GameActie.ClearMsgTimeOutTimer:
      return {
        ...state,
        MsgTimeoutTimer: 0,
      }
    default:
      return state
  }
}

export default GameReducer
