import { ActionCnst } from '../Constants'

const { FireComputers: FireComputerActie } = ActionCnst
const InitState = {
  Status: '',
}

const FireComputerReducer = (state = InitState, actie) => {
  switch (actie.type) {
    case FireComputerActie.StatusUpdate:
      return [...state, {
        Status: actie.StatusText,
      }]

    default:
      return state
  }
}

export default FireComputerReducer
