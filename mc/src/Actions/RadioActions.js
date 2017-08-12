import AppDispatcher from '../AppDispatcher'
import { ActionCnst } from '../Constants'

export function SelectSlot(slot) {
  AppDispatcher.dispatch({
    type: ActionCnst.Radio.SelectSlot,
    slot
  })
}

export function ExecuteCmd(cmd) {
  AppDispatcher.dispatch({
    type: ActionCnst.Radio.ExecuteCmd,
    cmd
  })
}

export function NewMessageTimedOut(cmd) {
  AppDispatcher.dispatch({
    type: ActionCnst.Radio.NewMessageTimedOut,
    cmd
  })
}
