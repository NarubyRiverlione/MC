import { ActionCnst, CstRadio } from '../Constants'
import { StopMsgTimeoutTimer } from './GameActions'
import { ShowErrorStatus, StatusUpdate } from './CommonActions'

const { Radio: ActionRadio } = ActionCnst

// select a radio slot
export const SelectSlot = Selected => ({
  type: ActionRadio.SelectSlot,
  Selected,
})

// Game action will send a new message to the radio
export const SendNewMessage = () => ({
  type: ActionRadio.NewMessageReceived,
})
// msg timed out, turn timer led out, show error in radio panel
export const NewMessageTimedOut = () => (
  (dispatch) => {
    // dispatch({
    //   type: ActionRadio.NewMessageTimedOut,
    //   Status: CstRadio.Errors.NewMessageTimedOut,
    //   ErrorStatus: true,
    //   NewMessage: false,
    // })

    // setTimeout(() => {
    //   //  clear error status, start timer new msg
    //   dispatch({ type: ActionRadio.SetIdle })
    // }, CstRadio.Time.error)

    // ... clear new msg flag
    dispatch({ type: ActionRadio.ClearNewMessageReceived })
    // ... show error
    dispatch(ShowErrorStatus(ActionRadio.StatusUpdate,
      CstRadio.Errors.NewMessageTimedOut, CstRadio.Time.error))
  })

// update pushed / release state of a cmd button
export const UpdateButton = (ButtonName, Status) => (
  (dispatch, getState) => {
    const { Radio: { Buttons } } = getState()

    const NewButtons = { ...Buttons, [ButtonName]: Status }
    dispatch({
      type: ActionRadio.UpdateButton,
      NewButtons,
    })
  })

// do the cmd of the button (after setTimeout in ExecuteCmd)
const DoCmd = (cmd, SelectedSlot) => (
  (dispatch, getState) => {
    const { Radio: { Slots }, Game: { lastMissionID } } = getState()

    // cmd done, release button
    dispatch(UpdateButton(cmd, false))
    // cmd done ==>  update Radio status & display
    dispatch({ type: ActionRadio.SetIdle })
    // set new status and missionID in selected slot
    const NewSlotStatus = {
      slotNR: SelectedSlot,
      status: CstRadio.Results[cmd.toLowerCase()],
      missionID: lastMissionID,
    }
    // update slot
    const UpdatedSlots = Slots.map((sl) => {
      let temp = Object.assign({}, sl)
      if (temp.slotNR === SelectedSlot) temp = NewSlotStatus
      return temp
    })
    dispatch({ type: ActionRadio.UpdateSlots, UpdatedSlots })

    // msg is stored..
    if (cmd === CstRadio.Actions.store) {
      // ... clear new msg time-out timer
      dispatch(StopMsgTimeoutTimer())
      // ... clear new msg flag
      dispatch({ type: ActionRadio.ClearNewMessageReceived })
    }
  })
// check if cmd is valid, if so start timer
export const ExecuteCmd = cmd => (
  (dispatch, getState) => {
    const {
      Radio: {
        Slots, SelectedSlot, MessageIncoming, Busy,
      },
    } = getState()

    const WorkingSlot = Slots.find(sl => sl.slotNR === SelectedSlot)

    /* Radio already busy ? */
    if (Busy) {
      dispatch(ShowErrorStatus(ActionRadio.StatusUpdate,
        CstRadio.Errors.AlreadyBusy, CstRadio.Time.error))
      return
    }
    /* trying to start decoding ? */
    if (cmd === CstRadio.Actions.decode) {
      // there must be a message stored
      if (WorkingSlot.status !== CstRadio.Results.store) {
        dispatch(ShowErrorStatus(ActionRadio.StatusUpdate,
          CstRadio.Errors.NoDecodeNothingStored, CstRadio.Time.error))
        return
      }
    }
    /* trying to store a msg ? */
    else if (cmd === CstRadio.Actions.store) {
      // there must be a new message waiting
      if (!MessageIncoming) {
        dispatch(ShowErrorStatus(ActionRadio.StatusUpdate,
          CstRadio.Errors.NoStoreNoNewMsg, CstRadio.Time.error))
        return
      }
      // selected slot must be empty
      if (WorkingSlot.status !== CstRadio.Results.erase) {
        dispatch(ShowErrorStatus(ActionRadio.StatusUpdate,
          CstRadio.Errors.SlotNotEmpty, CstRadio.Time.error))
        return
      }
    }

    /* start cmd */
    // set radio busy
    dispatch({ type: ActionRadio.SetBusy })
    // update Radio Status display
    const CmdStatusMsg = CstRadio.Busy[cmd.toLowerCase()] + CstRadio.Busy.onSlot + SelectedSlot
    dispatch(StatusUpdate(ActionRadio.StatusUpdate, CmdStatusMsg))
    // hold button down
    dispatch(UpdateButton(cmd, true))
    // start timer for cmd execution
    setTimeout(() => {
      // done waiting, do command
      dispatch(DoCmd(cmd, SelectedSlot))
    }, CstRadio.Time[cmd.toLowerCase()])
  })
