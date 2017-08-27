import AppDispatcher from '../AppDispatcher'
import { ActionCnst } from '../Constants'



export function NewMessageTimedOut() {
  AppDispatcher.dispatch({
    type: ActionCnst.Game.NewMessageTimedOut
  })
}

export function StartTimerNewMessage() {
  AppDispatcher.dispatch({
    type: ActionCnst.Game.StartTimerNewMessage
  })
}

// export function SetMissionPanelLocation(loc, ID) {
//   AppDispatcher.dispatch({
//     type: ActionCnst.Game.SetMissionPanelLocation,
//     payload: { loc, ID }
//   })
// }
