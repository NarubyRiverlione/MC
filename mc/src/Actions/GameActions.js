import Mission from '../Mission'
import {
  SendNewMessage,
  NewMessageTimedOut as RadioTimedOut,
} from './RadioActions'

import { ActionCnst, Cnst } from '../Constants'

const { Game: CnstGame } = Cnst

// stop msg time-out time
export const StopMsgTimeoutTimer = () => (
  (dispatch, getState) => {
    const { Game: { MsgTimeoutTimer } } = getState()
    // stop timer
    if (MsgTimeoutTimer) {
      clearTimeout(MsgTimeoutTimer)
    }
    // clear timer from Store
    dispatch({
      type: ActionCnst.Game.ClearMsgTimeOutTimer,
    })
  })

// new msg timed out, deal with fail
const ReduceRank = () => (
  (dispatch, getState) => {
    const { Game: { Rank } } = getState()
    const ReducedRank = Rank - 1
    // reduce Rank
    dispatch({
      type: ActionCnst.Game.UpdateRank,
      NewRank: ReducedRank,
    })

    // TODO: end game
    if (ReducedRank < 0) {
      console.warn('END GAME, rank < 0')
    }
  })
// incr executed missions
export const IncExcecuted = () => (
  (dispatch, getState) => {
    const { Game: { ExecutedMissions } } = getState()
    const IncExecuted = ExecutedMissions + 1
    // reduce Rank
    dispatch({
      type: ActionCnst.Game.IncExecutedMissions,
      NewIncExecutedMissions: IncExecuted,
    })
  })

// create a mission inside the msg
const CreateNewMission = () => (
  (dispatch, getState) => {
    const { Game: { lastMissionID, Missions, ReceivedMissions } } = getState()
    // increment mission ID  & received missions
    const NewLastMissionID = lastMissionID + 1
    const NewReceivedMissions = ReceivedMissions + 1
    dispatch({
      type: ActionCnst.Game.UpdateMissionID,
      NewLastMissionID,
      NewReceivedMissions,
    })

    // add new mission
    const NewMission = new Mission(NewLastMissionID)
    const UpdatedMissions = Missions.concat(NewMission)
    dispatch({
      type: ActionCnst.Game.UpdateMissions,
      UpdatedMissions,
    })

    // create & start msg time-out timer
    const MsgTimeoutTimer = setTimeout(() => {
      // reduce rank
      dispatch(ReduceRank())
      // signal via Radio status the time out
      dispatch(RadioTimedOut())
    }, CnstGame.Time.NewMessageTimeOut)

    // store time-out time so it can be stop later
    dispatch({
      type: ActionCnst.Game.StoreMsgTimeOutTimer,
      MsgTimeoutTimer,
    })
  })

// wait for new msg  use fixed time if provided,
// else random between NewIncomingMessageMin and NewIncomingMessageMax
const StartNewMessageTimer = fixedTimer => (
  (dispatch) => {
    const nextRandomIncoming = Math.floor(Math.random() * CnstGame.Time.NewIncomingMessageMax)
      + CnstGame.Time.NewIncomingMessageMin

    const nextIncoming = fixedTimer || nextRandomIncoming

    console.log(`Game: New msg in ${(nextIncoming / 1000).toString()} sec`)

    setTimeout(() => {
      // Create new Mission
      dispatch(CreateNewMission())
      // show new message warning in Radio
      dispatch(SendNewMessage())

      // restart timer new msg
      /* */
      // dispatch(StartNewMessageTimer())
    }, nextIncoming)
  })

export default StartNewMessageTimer
