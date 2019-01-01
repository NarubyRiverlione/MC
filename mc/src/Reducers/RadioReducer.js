import { ActionCnst, Cnst } from '../Constants'

const { Radio: RadioActie } = ActionCnst
const { Radio: CnstRadio } = Cnst

const InitState = {
  Status: Cnst.Status.Idle,
  ErrorStatus: false,
  MessageIncoming: false,
  Slots: [
    { slotNR: 1, status: CnstRadio.Results.erase, missionID: -1 },
    { slotNR: 2, status: CnstRadio.Results.erase, missionID: -1 },
    { slotNR: 3, status: CnstRadio.Results.erase, missionID: -1 },
  ],
  SelectedSlot: 1,
  Buttons: [
    { [CnstRadio.Actions.store]: false },
    { [CnstRadio.Actions.decode]: false },
    { [CnstRadio.Actions.erase]: false },
  ],
}

const RadioReducer = (state = InitState, action) => {
  switch (action.type) {
    // update status tekst in top display
    case RadioActie.StatusUpdate:
      return {
        ...state,
        Status: action.StatusText,
        ErrorStatus: action.ErrorStatus,
      }
    // select a storage slot
    case RadioActie.SelectSlot:
      return {
        ...state,
        SelectedSlot: action.Selected,
      }
    // update button status
    case RadioActie.UpdateButton:
      return {
        ...state,
        Buttons: action.NewButtons,
      }
    //  set received new message flag
    case RadioActie.NewMessageReceived:
      return {
        ...state,
        MessageIncoming: true,
      }
    // clear new message flag
    case RadioActie.ClearNewMessageReceived:
      return {
        ...state,
        MessageIncoming: false,
      }
    // update slots
    case RadioActie.UpdateSlots:
      return {
        ...state,
        Slots: action.UpdatedSlots,
      }
    // new message timed-out, show error in Status
    case RadioActie.NewMessageTimedOut:
      return {
        ...state,
        Status: action.Status,
        MessageIncoming: action.NewMessage,
        ErrorStatus: action.ErrorStatus,
      }

    default:
      return state
  }
}

export default RadioReducer
