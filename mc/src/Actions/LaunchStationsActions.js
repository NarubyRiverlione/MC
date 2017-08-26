import AppDispatcher from '../AppDispatcher'
import { ActionCnst, Cnst } from '../Constants'

export function Select(caption) {
  const station =
    caption === Cnst.LaunchStations.Numbers.one || Cnst.LaunchStations.Numbers.two ?
      Cnst.LaunchStations.Name.rails :
      caption === Cnst.LaunchStations.Numbers.A || Cnst.LaunchStations.Numbers.B ?
        Cnst.LaunchStations.Name.VLT :
        caption === Cnst.LaunchStations.Numbers.romanOn || Cnst.LaunchStations.Numbers.romanTwo ?
          Cnst.LaunchStations.Name.tubes : ''

  AppDispatcher.dispatch({
    type: ActionCnst.LaunchStations.Select,
    payload: { station, caption }
  })
}

export function Remove() {
  AppDispatcher.dispatch({
    type: ActionCnst.LaunchStations.Remove
  })
}

export function Prepare() {
  AppDispatcher.dispatch({
    type: ActionCnst.LaunchStations.Preparing
  })
}

export function Repair() {
  AppDispatcher.dispatch({
    type: ActionCnst.LaunchStations.Repairing
  })
}

export function Fire() {
  AppDispatcher.dispatch({
    type: ActionCnst.LaunchStations.Fire
  })
}

export function ChangeStatus(status) {
  AppDispatcher.dispatch({
    type: ActionCnst.LaunchStations.ChangeStatus,
    payload: status
  })
}

export function StartLoading() {
  AppDispatcher.dispatch({
    type: ActionCnst.LaunchStations.StartLoading
  })
}