import AppDispatcher from '../AppDispatcher'
import { ActionCnst } from '../Constants'

export function SelectFC(fc) {
  AppDispatcher.dispatch({
    type: ActionCnst.FireComputers.SelectFireComputer,
    payload: fc
  })
}

export function SelectSlot(slot) {
  AppDispatcher.dispatch({
    type: ActionCnst.FireComputers.SelectSlot,
    payload: slot
  })
}

export function ReadMsg() {
  AppDispatcher.dispatch({
    type: ActionCnst.FireComputers.ReadMsg
  })
}

export function SendMission() {
  AppDispatcher.dispatch({
    type: ActionCnst.FireComputers.SendMission
  })
}

