import { ActionCnst } from '../Constants'

const { Armory: ArmoryActie } = ActionCnst
const InitState = {
  Status: '',
}

const ArmoryReducer = (state = InitState, actie) => {
  switch (actie.type) {
    case ArmoryActie.StatusUpdate:
      return [...state, {
        Status: actie.StatusText,
      }]

    default:
      return state
  }
}

export default ArmoryReducer
