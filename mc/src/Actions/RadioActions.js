import { ActionCnst, Cnst } from '../Constants'
import { StopMsgTimeoutTimer } from './GameActions'

const { Radio: CnstRadio } = Cnst

export const SelectSlot = Selected => ({
  type: ActionCnst.Radio.SelectSlot,
  Selected,
})

export const StatusUpdate = StatusText => ({
  type: ActionCnst.Radio.StatusUpdate,
  StatusText,
})
// Game Action will send a new message to the radio
export const SendNewMessage = () => ({
  type: ActionCnst.Radio.NewMessageReceived,
})

export const UpdateButton = (ButtonName, Status) => (
  (dispatch, getState) => {
    const { Radio: { Buttons } } = getState()

    const UpdatedButton = { [ButtonName]: Status }
    const NewButtons = [...Buttons, UpdatedButton]

    dispatch({
      type: ActionCnst.Radio.UpdateButton,
      NewButtons,
    })
  }
)

export const ExecuteCmd = cmd => (
  (dispatch, getState) => {
    const {
      Radio: { Slots, SelectedSlot, MessageIncoming },
      Game: { lastMissionID },
    } = getState()

    const WorkingSlot = Slots.find(sl => sl.slotNR === SelectedSlot)

    /* trying to start decoding ? */
    if (cmd === CnstRadio.Actions.decode) {
      // there must be a message stored
      if (WorkingSlot.status !== CnstRadio.Results.store) {
        dispatch(StatusUpdate(CnstRadio.Errors.NoDecodeNothingStored))
        return
      }
    }
    /* trying to store a msg ? */
    else if (cmd === CnstRadio.Actions.store) {
      // there must be a new message waiting
      if (!MessageIncoming) {
        dispatch(StatusUpdate(CnstRadio.Errors.NoStoreNoNewMsg))
        return
      }
      // selected slot must be empty
      if (WorkingSlot.status !== CnstRadio.Results.erase) {
        dispatch(StatusUpdate(CnstRadio.Errors.SlotNotEmpty))
        return
      }
    }
    // /* trying to erase  a slot ? */
    // else if (cmd === CnstRadio.Actions.erase) {
    //   // TODO radio erase slot action
    //   console.warn('TODO erase action')
    //   return
    // }

    /* start cmd, update Radio Status display */
    // console.log('Start Radio action ' + cmd + ' on slot ' + this.Selected)
    const CmdStatusMsg = Cnst.Radio.Busy[cmd.toLowerCase()] + Cnst.Radio.Busy.onSlot + SelectedSlot
    dispatch(StatusUpdate(CmdStatusMsg))

    /* start timer for cmd execution */
    setTimeout(() => {
      // cmd done ==>  update Radio Status display
      dispatch(StatusUpdate(Cnst.Status.Idle))

      // set new status and missionID in selected slot
      const NewSlotStatus = {
        slotNR: SelectedSlot,
        status: Cnst.Radio.Results[cmd.toLowerCase()],
        missionID: lastMissionID,
      }
      // const UpdatedSlots = Object.assign([...Slots], { [SelectedSlot]: NewSlotStatus })
      const UpdatedSlots = Slots.map((sl) => {
        let temp = Object.assign({}, sl)
        if (temp.slotNR === SelectedSlot) temp = NewSlotStatus
        return temp
      })
      // update slots
      dispatch({ type: ActionCnst.Radio.UpdateSlots, UpdatedSlots })

      // msg is stored..
      if (cmd === Cnst.Radio.Actions.store) {
        // ... clear new msg time-out timer
        dispatch(StopMsgTimeoutTimer())
        // ... clear new msg flag
        dispatch({ type: ActionCnst.Radio.ClearNewMessageReceived })
      }

      // cmd done, release all buttons
      dispatch(UpdateButton(Cnst.Radio.Actions.store, false))
      dispatch(UpdateButton(Cnst.Radio.Actions.decode, false))
      dispatch(UpdateButton(Cnst.Radio.Actions.erase, false))
    }, Cnst.Radio.Time[cmd.toLowerCase()])
  }
)
// msg timed out, turn timer led out, show error in radio panel
// after Cnst.Radio.Time.ShowError set Status Idle to remove the error
export const NewMessageTimedOut = () => (
  (dispatch) => {
    dispatch({
      type: ActionCnst.Radio.NewMessageTimedOut,
      Status: CnstRadio.Errors.NewMessageTimedOut,
      NewMessage: false,
    })

    setTimeout(() => {
      //  clear error status, start timer new msg
      dispatch(StatusUpdate(Cnst.Status.Idle))
    }, Cnst.Radio.Time.ShowError)
  })
