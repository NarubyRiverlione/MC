import { ActionCnst, Cnst } from '../Constants'

const { Radio: RadioActie } = ActionCnst
const { Radio: CnstRadio } = Cnst

const InitState = {
  Status: Cnst.Status.Idle,
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

const RadioReducer = (state = InitState, actie) => {
  switch (actie.type) {
    // update status tekst in top display
    case RadioActie.StatusUpdate:
      return {
        ...state,
        Status: actie.StatusText,

      }
    // select a storage slot
    case RadioActie.SelectSlot:
      return {
        ...state,
        SelectedSlot: actie.Selected,
      }
    // update button status
    case RadioActie.UpdateButton:
      return {
        ...state,
        Buttons: actie.NewButtons,
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
        Slots: actie.UpdatedSlots,
      }
    // new message timed-out, show error in Status
    case RadioActie.NewMessageTimedOut:
      return {
        ...state,
        Status: actie.Status,
        MessageIncoming: actie.NewMessage,
      }

    default:
      return state
  }
}

export default RadioReducer
