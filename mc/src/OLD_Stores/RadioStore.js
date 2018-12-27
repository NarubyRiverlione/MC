/* eslint-disable no-console */
import { EventEmitter } from 'events'
import AppDispatcher from '../AppDispatcher'
import { ActionCnst, Cnst } from '../Constants'

import gameStore from './GameStore'

class RadioStore extends EventEmitter {
  constructor(dispatcher) {
    super()
    this.NewMessage = false

    this.Selected = 1

    this.Slots = [
      { slot: 1, status: Cnst.Radio.Results.erase, missionID: -1 },
      { slot: 2, status: Cnst.Radio.Results.erase, missionID: -1 },
      { slot: 3, status: Cnst.Radio.Results.erase, missionID: -1 },
    ]

    this.Status = Cnst.Status.idle
  }

  EvaluateActions(action) {
    switch (action.type) {
      case ActionCnst.Radio.SelectSlot: this.SelectSlot(action.payload); break
      case ActionCnst.Radio.ExecuteCmd: this.ExecuteCmd(action.payload); break
      case ActionCnst.Radio.NewMessage: this.NewMsg(); break
      case ActionCnst.Radio.NewMessageTimedOut: this.NewMessageTimedOut(); break
      default: break
    }
  }

  SelectSlot(slot) {
    this.Selected = slot
    console.log(`radio inside slot: ${this.Selected}`)
    this.emit(Cnst.Radio.Emit.SlotChanged)
  }

  ExecuteCmd(cmd) {
    const selectedSlot = this.Slots.find(sl => sl.slot === this.Selected)
    const workingSelected = this.Selected

    // trying to start decoding ?
    if (cmd === Cnst.Radio.Actions.decode) {
      // there must be a message stored
      if (selectedSlot.status !== Cnst.Radio.Results.store) {
        this.Status = Cnst.Radio.Errors.NoDecodeNothingStored
        this.emit(Cnst.Radio.Emit.ChangedRadioStatus)
        this.emit(Cnst.Radio.Emit.DoneCmd)
        return
      }
    }
    // trying to store a msg ?
    if (cmd === Cnst.Radio.Actions.store) {
      // there must be a new message waiting
      if (!this.NewMessage) {
        this.Status = Cnst.Radio.Errors.NoStoreNoNewMsg
        this.emit(Cnst.Radio.Emit.ChangedRadioStatus)
        this.emit(Cnst.Radio.Emit.DoneCmd)
        return
      }
    }

    // start cmd, update Radio Status display
    // console.log('Start Radio action ' + cmd + ' on slot ' + this.Selected)
    this.Status = Cnst.Radio.Busy[cmd.toLowerCase()] + Cnst.Radio.Busy.onSlot + workingSelected
    this.emit(Cnst.Radio.Emit.ChangedRadioStatus)


    setTimeout(() => {
      // end cmd,  update Radio Status display
      // console.log('End Radio action ' + cmd + ' on slot ' + this.Selected)
      this.Status = Cnst.Status.idle
      this.emit(Cnst.Radio.Emit.ChangedRadioStatus)

      // set new status and missionID in selected slot
      const newSlotStatus = {
        slot: workingSelected,
        status: Cnst.Radio.Results[cmd.toLowerCase()],
        missionID: gameStore.lastMissionID,
      }
      this.Slots = this.Slots.map(sl => (sl.slot === workingSelected ? newSlotStatus : sl))
      this.emit(Cnst.Radio.Emit.ChangeSlot)

      // msg is stored..
      if (cmd === Cnst.Radio.Actions.store) {
        // ... clear new msg status
        this.NewMessage = false
        this.emit(Cnst.Radio.Emit.UpdateNewMessage)
      }

      this.emit(Cnst.Radio.Emit.DoneCmd)
    },
    Cnst.Radio.Time[cmd.toLowerCase()])
  }

  // start new msg timer led
  NewMsg() {
    this.NewMessage = true
    this.emit(Cnst.Radio.Emit.UpdateNewMessage)
  }

  // msg timed out, turn timer led out, show error in radio panel
  NewMessageTimedOut() {
    this.Status = Cnst.Radio.Errors.NewMessageTimedOut
    this.emit(Cnst.Radio.Emit.ChangedRadioStatus)

    this.NewMessage = false
    this.emit(Cnst.Radio.Emit.UpdateNewMessage)

    setTimeout(() => {
      //  clear error status, start timer new msg
      this.Status = Cnst.Status.idle
      this.emit(Cnst.Radio.Emit.ChangedRadioStatus)
    }, Cnst.Radio.Time.ShowError)
  }
}


const radioStore = new RadioStore()
// elke instance van RadioStore doet eigen afhandeling van acties
AppDispatcher.register(radioStore.EvaluateActions.bind(radioStore))

export default radioStore
