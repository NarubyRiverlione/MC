import { ActionCnst, Cnst, CstOrdnance } from '../Constants'

const { Armory: ArmoryActie } = ActionCnst

const InitState = {
  Status: Cnst.Status.Idle,
  ErrorStatus: false,
  Selected: '',
  Amount: {
    [CstOrdnance.AA]: 0,
    [CstOrdnance.G]: 0,
    [CstOrdnance.AS]: 0,
    [CstOrdnance.T]: 0,
    [CstOrdnance.D]: 0,
  },
  Loading: false,
}

const ArmoryReducer = (state = InitState, action) => {
  switch (action.type) {
    // set Loadout a begin of game
    case ArmoryActie.SetLoadout:
      return {
        ...state,
        Amount: action.LoadoutAmount,
      }
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
