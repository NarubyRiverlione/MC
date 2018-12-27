import { ActionCnst, Cnst } from '../Constants'

const { Armory: ArmoryActie } = ActionCnst
const InitState = {
  Status: Cnst.Status.Idle,
  Selected: '',
  Amount: {
    [Cnst.Ordnance.AA]: 1, // 9
    [Cnst.Ordnance.G]: 5,
    [Cnst.Ordnance.AS]: 2,
    [Cnst.Ordnance.T]: 2,
    [Cnst.Ordnance.D]: 20,
  },
  Loading: false,
}

const ArmoryReducer = (state = InitState, action) => {
  switch (action.type) {
    // set Status
    case ArmoryActie.StatusUpdate:
      return {
        ...state,
        Status: action.StatusText,
      }
    // set Selected
    case ArmoryActie.Select:
      return {
        ...state,
        Selected: action.Selected,
      }
    default:
      return state
  }
}

export default ArmoryReducer
