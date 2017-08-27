/* eslint-disable no-console */
import AppDispatcher from '../AppDispatcher'
import { ActionCnst, Cnst } from '../Constants'
import { EventEmitter } from 'events'

import { NewMessage as RadioNewMessage, NewMessageTimedOut as RadioTimedOut } from '../Actions/RadioActions'
import Mission from './Mission'

class GameStore extends EventEmitter {
  constructor(dispatcher) {
    super()

    this.Missions = []
    this.lastMissionID = 0

    this.Rank = ''

    this.StartTimerNewMessage()

  }

  EvaluateActions(action) {
    switch (action.type) {
      case ActionCnst.Game.StartTimerNewMessage: this.StartTimerNewMessage(); break
      case ActionCnst.Game.NewMessageTimedOut: this.NewMessageTimedOut(); break
      // case ActionCnst.Game.SetMissionPanelLocation: this.SetMissionPanelLocation(...action.payload); break
      default: break
    }
  }

  // wait for new msg is random between NewIncomingMessageMin and NewIncomingMessageMax
  StartTimerNewMessage() {
    const nextIncoming = Math.floor(Math.random() * Cnst.Game.Time.NewIncomingMessageMax) + Cnst.Radio.Time.NewIncomingMessageMin
    console.log('Game: New msg in ' + nextIncoming / 1000 + ' sec')
    setTimeout(() => {
      console.log('Game: New msg created')
      // Create new Mission
      this.CreateNewMission()
      // set new message in Radio
      RadioNewMessage()
      //restart timer new mission
      this.StartTimerNewMessage()
    }, nextIncoming)
  }


  NewMessageTimedOut() {
    // signal via Radio status the time out
    RadioTimedOut()

    // restart timer new mission
    this.StartTimerNewMessage()

    // reduce Rank
    this.Rank = this.Rank - 1
    // TODO: show rank
    console.log('Rank reducde to ' + this.Rank)
    if (this.Rank < 0) {
      //TODO: end game
      console.warn('END GAME, rank < 0')
    }
  }

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
