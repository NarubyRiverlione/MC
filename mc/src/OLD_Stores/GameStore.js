/* eslint-disable no-console */
import { EventEmitter } from 'events'
import AppDispatcher from '../AppDispatcher'
import { Cnst } from '../Constants'

import { NewMessage as RadioNewMessage, NewMessageTimedOut as RadioTimedOut } from '../Actions/RadioActions'
import Mission from './Mission'

class GameStore extends EventEmitter {
  constructor(dispatcher) {
    super()

    this.Missions = []
    this.lastMissionID = 0

    this.Rank = 5

    // first msg in Cnst first msg, then start random timer for next msg
    this.StartNewMessageTimer(Cnst.Game.Time.FirstMsg)
  }

  EvaluateActions(action) {
    switch (action.type) {
    // case ActionCnst.Game.NewMessageTimedOut: this.NewMessageTimedOut(); break
    // case ActionCnst.Game.SetMissionPanelLocation: this.SetMissionPanelLocation(...action.payload); break
      default: break
    }
  }

  // wait for new msg  use fixed time if provided,
  // else random between NewIncomingMessageMin and NewIncomingMessageMax
  StartNewMessageTimer(fixedTimer) {
    const nextRandomIncoming = Math.floor(Math.random() * Cnst.Game.Time.NewIncomingMessageMax) + Cnst.Game.Time.NewIncomingMessageMin
    const nextIncoming = fixedTimer || nextRandomIncoming

    console.log(`Game: New msg in ${(nextIncoming / 1000).toString()} sec`)

    setTimeout(() => {
      // create and show new msg
      this.CreateNewMsg()
      // restart timer new msg
      this.StartNewMessageTimer()
    },
    nextIncoming)
  }

  CreateNewMsg() {
    console.log('Game: New msg created')
    // Create new Mission
    this.CreateNewMission()
    // show new message warning in Radio
    RadioNewMessage()
    // start time out timer
    this.StartMsgTimeoutTimer()
  }

  // time in which a new msg must be stored
  StartMsgTimeoutTimer() {
    setTimeout(() => {
      this.NewMessageTimedOut()
      // signal via Radio status the time out
      RadioTimedOut()
    },
    Cnst.Game.Time.NewMessageTimeOut)
  }

  // new msg timed out, deal with fail
  NewMessageTimedOut() {
    // reduce Rank
    this.Rank = this.Rank - 1
    // TODO: show rank
    console.log(`Rank reducde to ${this.Rank}`)
    if (this.Rank < 0) {
      // TODO: end game
      console.warn('END GAME, rank < 0')
    }
  }

  // create a mission inside the msg
  CreateNewMission() {
    this.lastMissionID = this.lastMissionID + 1
    const NewMission = new Mission(this.lastMissionID)
    // add new mission
    this.Missions = this.Missions.concat(NewMission)
  }
}


const gameStore = new GameStore()
// elke instance van RadioStore doet eigen afhandeling van acties
AppDispatcher.register(gameStore.EvaluateActions.bind(gameStore))

export default gameStore
