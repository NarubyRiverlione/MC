import Mission from '../Mission'
import {
  SendNewMessage,
  NewMessageTimedOut as RadioTimedOut,
} from './RadioActions'
import { SetLoadout } from './ArmoryActions'
import { ActionCnst, CstArmory, CstGame } from '../Constants'

const { Game: ActionsGame } = ActionCnst

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
      type: ActionsGame.ClearMsgTimeOutTimer,
    })
  })

// new msg timed out, deal with fail
const ReduceRank = () => (
  (dispatch, getState) => {
    const { Game: { Rank } } = getState()
    const ReducedRank = Rank - 1
    // reduce Rank
    dispatch({
      type: ActionsGame.UpdateRank,
      NewRank: ReducedRank,
    })

    // TODO: end game
    if (ReducedRank < 0) {
      console.warn('END GAME, rank < 0')
    }
  })
// incr executed missions
const IncExecuted = () => (
  (dispatch, getState) => {
    const { Game: { ExecutedMissions } } = getState()
    const NewIncExecutedMissions = ExecutedMissions + 1
    // reduce Rank
    dispatch({
      type: ActionsGame.IncExecutedMissions,
      NewIncExecutedMissions,
    })
  })

// set mission done, inc done counter
export const MissionDone = missionID => (
  (dispatch, getState) => {
    const { Game: { Missions } } = getState()
    const UpdatedMissions = Missions.map((m) => {
      const update = { ...m }
      if (update.ID === missionID) update.Done = true
      return update
    })
    dispatch({ type: ActionsGame.DoneMission, UpdatedMissions })
    dispatch(IncExecuted())
  }
)
// create a mission inside the msg
const CreateNewMission = () => (
  (dispatch, getState) => {
    const { Game: { lastMissionID, Missions, ReceivedMissions } } = getState()
    // increment mission ID  & received missions
    const NewLastMissionID = lastMissionID + 1
    const NewReceivedMissions = ReceivedMissions + 1
    dispatch({
      type: ActionsGame.UpdateMissionID,
      NewLastMissionID,
      NewReceivedMissions,
    })

    // add new mission
    const NewMission = new Mission(NewLastMissionID)
    const UpdatedMissions = Missions.concat(NewMission)
    dispatch({
      type: ActionsGame.AddNewMission,
      UpdatedMissions,
    })

    // create & start msg time-out timer
    const MsgTimeoutTimer = setTimeout(() => {
      // reduce rank
      dispatch(ReduceRank())
      // signal via Radio status the time out
      dispatch(RadioTimedOut())
    }, CstGame.Time.NewMessageTimeOut)

    // store time-out time so it can be stop later
    dispatch({
      type: ActionsGame.StoreMsgTimeOutTimer,
      MsgTimeoutTimer,
    })
  })

// wait for new msg  use fixed time if provided,
// else random between NewIncomingMessageMin and NewIncomingMessageMax
const StartNewMessageTimer = fixedTimer => (
  (dispatch) => {
    const nextRandomIncoming = Math.floor(Math.random() * CstGame.Time.NewIncomingMessageMax)
      + CstGame.Time.NewIncomingMessageMin

    const nextIncoming = fixedTimer || nextRandomIncoming

    // console.log(`Game: New msg in ${(nextIncoming / 1000).toString()} sec`)

    setTimeout(() => {
      // Create new Mission
      dispatch(CreateNewMission())
      // show new message warning in Radio
      dispatch(SendNewMessage())

      // restart timer new msg
      dispatch(StartNewMessageTimer())
    }, nextIncoming)
  })


const SetupGame = () => (
  (dispatch) => {
    // set armory loadout
    // TODO: set random ?
    const { StartLoadout } = CstArmory
    dispatch(SetLoadout(StartLoadout))

    // get first mission in FirstMsg time sec
    dispatch(StartNewMessageTimer(CstGame.Time.FirstMsg))
  }
)

export default SetupGame
