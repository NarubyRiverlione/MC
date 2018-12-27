import { combineReducers } from 'redux'

import GameReducer from './GameReducer'
import RadioReducer from './RadioReducer'
import FireComputerReducer from './FireComputerReducer'
import ArmoryReducer from './ArmoryReducer'
import LaunchStationsReducer from './LaunchStationsReducer'

const RootReducer = combineReducers({
  Game: GameReducer,
  Radio: RadioReducer,
  FireComputer: FireComputerReducer,
  Armory: ArmoryReducer,
  LaunchStations: LaunchStationsReducer,
})

export default RootReducer
