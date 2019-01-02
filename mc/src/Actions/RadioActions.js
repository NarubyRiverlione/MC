import { ActionCnst, Cnst } from '../Constants'
import { StopMsgTimeoutTimer } from './GameActions'

const { Radio: CnstRadio } = Cnst


export const SelectSlot = Selected => ({
  type: ActionCnst.Radio.SelectSlot,
  Selected,
})

export const StatusUpdate = (StatusText, ErrorStatus = false) => ({
  type: ActionCnst.Radio.StatusUpdate,
  StatusText,
  ErrorStatus,
})

// show error in status of set time, then set idle status
const ShowErrorStatus = err => (
  (dispatch) => {
    dispatch(StatusUpdate(err, true))

    setTimeout(() => {
      dispatch({ type: ActionCnst.Radio.SetIdle })
    }, Cnst.Radio.Time.error)
  })

// Game Action will send a new message to the radio
export const SendNewMessage = () => ({
  type: ActionCnst.Radio.NewMessageReceived,
})

export const UpdateButton = (ButtonName, Status) => (
  (dispatch, getState) => {
    const { Radio: { Buttons } } = getState()

    const NewButtons = { ...Buttons, [ButtonName]: Status }
    dispatch({
      type: ActionCnst.Radio.UpdateButton,
      NewButtons,
    })
  })

const DoCmd = (cmd, SelectedSlot) => (
  (dispatch, getState) => {
    const { Radio: { Slots }, Game: { lastMissionID } } = getState()

    // cmd done, release button
    dispatch(UpdateButton(cmd, false))
    // cmd done ==>  update Radio status & display
    dispatch({ type: ActionCnst.Radio.SetIdle })
    // set new status and missionID in selected slot
    const NewSlotStatus = {
      slotNR: SelectedSlot,
      status: Cnst.Radio.Results[cmd.toLowerCase()],
      missionID: lastMissionID,
    }
    // update slot
    const UpdatedSlots = Slots.map((sl) => {
      let temp = Object.assign({}, sl)
      if (temp.slotNR === SelectedSlot) temp = NewSlotStatus
      return temp
    })
    dispatch({ type: ActionCnst.Radio.UpdateSlots, UpdatedSlots })

    // msg is stored..
    if (cmd === Cnst.Radio.Actions.store) {
      // ... clear new msg time-out timer
      dispatch(StopMsgTimeoutTimer())
      // ... clear new msg flag
      dispatch({ type: ActionCnst.Radio.ClearNewMessageReceived })
    }
  })

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
      dispatch(ShowErrorStatus(CnstRadio.Errors.AlreadyBusy))
      return
    }
    /* trying to start decoding ? */
    if (cmd === CnstRadio.Actions.decode) {
      // there must be a message stored
      if (WorkingSlot.status !== CnstRadio.Results.store) {
        dispatch(ShowErrorStatus(CnstRadio.Errors.NoDecodeNothingStored))
        return
      }
    }
    /* trying to store a msg ? */
    else if (cmd === CnstRadio.Actions.store) {
      // there must be a new message waiting
      if (!MessageIncoming) {
        dispatch(ShowErrorStatus(CnstRadio.Errors.NoStoreNoNewMsg))
        return
      }
      // selected slot must be empty
      if (WorkingSlot.status !== CnstRadio.Results.erase) {
        dispatch(ShowErrorStatus(CnstRadio.Errors.SlotNotEmpty))
        return
      }
    }

    /* start cmd */
    // set radio busy
    dispatch({ type: ActionCnst.Radio.SetBusy })
    // update Radio Status display
    const CmdStatusMsg = Cnst.Radio.Busy[cmd.toLowerCase()] + Cnst.Radio.Busy.onSlot + SelectedSlot
    dispatch(StatusUpdate(CmdStatusMsg))
    // hold button down
    dispatch(UpdateButton(cmd, true))
    // start timer for cmd execution
    setTimeout(() => {
      // done waiting, do command
      dispatch(DoCmd(cmd, SelectedSlot))
    }, Cnst.Radio.Time[cmd.toLowerCase()])
  })
// msg timed out, turn timer led out, show error in radio panel
// after Cnst.Radio.Time.ShowError set  Idle status to remove the error
export const NewMessageTimedOut = () => (
  (dispatch) => {
    dispatch({
      type: ActionCnst.Radio.NewMessageTimedOut,
      Status: CnstRadio.Errors.NewMessageTimedOut,
      ErrorStatus: true,
      NewMessage: false,
    })

    setTimeout(() => {
      //  clear error status, start timer new msg
      dispatch({ type: ActionCnst.Radio.SetIdle })
    }, Cnst.Radio.Time.ShowError)
  })
