import { ActionCnst, Cnst } from '../Constants'

const { Armory: ArmoryActie } = ActionCnst

const InitState = {
  Status: Cnst.Status.Idle,
  ErrorStatus: false,
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
        ErrorStatus: action.ErrorStatus,
      }
    // set Selected
    case ArmoryActie.Select:
      return {
        ...state,
        Selected: action.Selected,
      }
    // start loading
    case ArmoryActie.Loading:
      return {
        ...state,
        Loading: true,
      }
    //  loading done
    case ArmoryActie.LoadingDone:
      return {
        ...state,
        Loading: action.Loading,
        Selected: action.Selected,
      }
    // update amount
    case ArmoryActie.UpdateAmount:
      return {
        ...state,
        Amount: action.UpdatedAmount,
      }
    default:
      return state
  }
}

export default ArmoryReducer
