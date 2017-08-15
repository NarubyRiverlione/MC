import AppDispatcher from '../AppDispatcher'
import { ActionCnst } from '../Constants'

export function SelectSlot(slot) {
  AppDispatcher.dispatch({
    type: ActionCnst.Radio.SelectSlot,
    payload:slot
  })
}

export function ExecuteCmd(cmd) {
  AppDispatcher.dispatch({
    type: ActionCnst.Radio.ExecuteCmd,
    payload:cmd
  })
}

export function NewMessageTimedOut() {
  AppDispatcher.dispatch({
    type: ActionCnst.Radio.NewMessageTimedOut
  })
}
