/* eslint-disable no-console */
import AppDispatcher from '../AppDispatcher'
import { ActionCnst, Cnst } from '../Constants'
import { EventEmitter } from 'events'

class RadioStore extends EventEmitter {
  constructor(dispatcher) {
    super()
    this.NewMessage = false

    this.SelectedSlot = 1

    // this.CmdButtons = {}
    // this.CmdButtons[Cnst.Radio.Actions.store] = false
    // this.CmdButtons[Cnst.Radio.Actions.decode] = false
    // this.CmdButtons[Cnst.Radio.Actions.erase] = false

    this.SlotStatus = ['', Cnst.Radio.Results.erase, Cnst.Radio.Results.erase, Cnst.Radio.Results.erase]

    this.Status = Cnst.Status.idle

    this.StartTimerNewMessage()
  }

  EvaluateActions(action) {
    switch (action.type) {
      case ActionCnst.Radio.SelectSlot: this.SelectSlot(action.payload); break
      case ActionCnst.Radio.ExecuteCmd: this.ExecuteCmd(action.payload); break
      case ActionCnst.Radio.NewMessageTimedOut: this.NewMessageTimedOut(); break
      default: break
    }
  }

  SelectSlot(slot) {
    this.SelectedSlot = slot
    this.emit(Cnst.Radio.Emit.SlotChanged)
  }

  ExecuteCmd(cmd) {
    // trying to start decoding ?
    if (cmd === Cnst.Radio.Actions.decode) {
      // there must be a message stored
      if (this.SlotStatus[this.SelectedSlot] !== Cnst.Radio.Results.store) {
        this.Status = Cnst.Radio.Errors.NoDecodeNothingStored
        this.emit(Cnst.Radio.Emit.ChangedRadioStatus)
        this.emit(Cnst.Radio.Emit.DoneCmd)
        return
      }
    }
    // trying to store a msg ?
    if (cmd === Cnst.Radio.Actions.store) {
      //there must be a new message waiting
      if (!this.NewMessage) {
        this.Status = Cnst.Radio.Errors.NoStoreNoNewMsg
        this.emit(Cnst.Radio.Emit.ChangedRadioStatus)
        this.emit(Cnst.Radio.Emit.DoneCmd)
        return
      }
    }

    // start cmd, update Radio Status display 
    // console.log('Start Radio action ' + cmd + ' on slot ' + this.SelectedSlot)
    this.Status = Cnst.Radio.Busy[cmd.toLowerCase()] + Cnst.Radio.Busy.onSlot + this.SelectedSlot
    this.emit(Cnst.Radio.Emit.ChangedRadioStatus)


    setTimeout(() => {
      // end cmd,  update Radio Status display 
      // console.log('End Radio action ' + cmd + ' on slot ' + this.SelectedSlot)
      this.Status = Cnst.Status.idle
      this.emit(Cnst.Radio.Emit.ChangedRadioStatus)

      // show new status in selected slot display
      this.SlotStatus[this.SelectedSlot] = Cnst.Radio.Results[cmd.toLowerCase()]
      this.emit(Cnst.Radio.Emit.ChangeSlot)

      if (cmd === Cnst.Radio.Actions.store) {
        // msg is store, clear new msg status, start timer next new msg
        this.NewMessage = false
        this.emit(Cnst.Radio.Emit.UpdateNewMessage)
        this.StartTimerNewMessage()
      }

      this.emit(Cnst.Radio.Emit.DoneCmd)

    }
      , Cnst.Radio.Time[cmd.toLowerCase()])
  }

  StartTimerNewMessage() {
    // wait for new msg is random between NewIncomingMessageMin and NewIncomingMessageMax
    const nextIncoming = Math.floor(Math.random() * Cnst.Radio.Time.NewIncomingMessageMax) + Cnst.Radio.Time.NewIncomingMessageMin
    console.log('New msg in ' + nextIncoming / 1000 + ' sec')
    setTimeout(() => {
      console.log('New msg created')
      this.NewMessage = true
      this.emit(Cnst.Radio.Emit.UpdateNewMessage)
    }, nextIncoming)
  }

  NewMessageTimedOut() {
    // TODO: move to GameStore, reduce Rank, sound alert
    this.Status = Cnst.Radio.Errors.NewMessageTimedOut
    this.emit(Cnst.Radio.Emit.ChangedRadioStatus)
    this.NewMessage = false
    
    setTimeout(() => {
      this.Status = Cnst.Status.idle
      this.emit(Cnst.Radio.Emit.ChangedRadioStatus)      
      this.StartTimerNewMessage()
    }, 2000)
  }

}


const radioStore = new RadioStore()
// elke instance van RadioStore doet eigen afhandeling van acties
AppDispatcher.register(radioStore.EvaluateActions.bind(radioStore))

export default radioStore
