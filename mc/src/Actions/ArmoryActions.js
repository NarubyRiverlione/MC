import AppDispatcher from '../AppDispatcher'
import { ActionCnst } from '../Constants'

export function Select(ord) {
  AppDispatcher.dispatch({
    type: ActionCnst.Armory.Select,
    payload: ord
  })
}

export function Load() {
  AppDispatcher.dispatch({
    type: ActionCnst.Armory.Load
  })
}
