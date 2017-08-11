/* eslint-disable no-console */
import AppDispatcher from '../AppDispatcher'
import { ActionCnst, Cnst } from '../Constants'
import { EventEmitter } from 'events'

class RadioStore extends EventEmitter {
  constructor(dispatcher) {
    super()
    this.NewMessage = false

    this.SelectedSlot = 1

    this.CmdButtons = {}
    this.CmdButtons[Cnst.Radio.Actions.store] = false
    this.CmdButtons[Cnst.Radio.Actions.decode] = false
    this.CmdButtons[Cnst.Radio.Actions.erase] = false

    this.SlotStatus = ['', Cnst.Radio.Results.erase, Cnst.Radio.Results.erase, Cnst.Radio.Results.erase]

    this.Status = Cnst.Status.idle

    this.StartTimerNewMessage()
  }

  EvaluateActions(action) {
    switch (action.type) {
      case ActionCnst.Radio.SelectSlot: this.SelectSlot(action.slot); break
      case ActionCnst.Radio.ExecuteCmd: this.ExecuteCmd(action.cmd); break
      default: break
    }
  }

  SelectSlot(slot) {
    this.SelectedSlot = slot
    this.emit('SlotChanged')
  }

  ExecuteCmd(cmd) {
    // trying to start decoding ?
    if (cmd === Cnst.Radio.Actions.decode) {
      // there must be a message stored
      if (this.SlotStatus[this.SelectedSlot] !== Cnst.Radio.Results.store) {
        this.Status = Cnst.Radio.Errors.NoDecodeNothingStored
        this.emit('ChangedRadioStatus')
        return
      }
    }
    // trying to store a msg ?
    if (cmd === Cnst.Radio.Actions.store) {
      //there must be a new message waiting
      if (!this.NewMessage) {
        this.Status = Cnst.Radio.Errors.NoStoreNoNewMsg
        this.emit('ChangedRadioStatus')
        return
      }
    }

    // start cmd, update Radio Status display 
    // console.log('Start Radio action ' + cmd + ' on slot ' + this.SelectedSlot)
    this.Status = 'Start ' + cmd + ' on slot ' + this.SelectedSlot
    this.emit('ChangedRadioStatus')
    // set pressed state of cmd button
    this.CmdButtons[cmd] = true
    this.emit('ChangeCmdButton')

    setTimeout(() => {
      // end cmd,  update Radio Status display 
      // console.log('End Radio action ' + cmd + ' on slot ' + this.SelectedSlot)
      this.Status = Cnst.Status.idle
      this.emit('ChangedRadioStatus')
      // depress cmd button
      this.CmdButtons[cmd] = false
      this.emit('ChangeCmdButton')
      // show new status in selected slot display
      this.SlotStatus[this.SelectedSlot] = Cnst.Radio.Results[cmd.toLowerCase()]
      this.emit('ChangeSlot')

      if (cmd === Cnst.Radio.Actions.store) {
        // msg is store, clear new msg led, start timer next new msg
        this.NewMessage = false
        this.StartTimerNewMessage()
      }
    }
      , Cnst.Radio.Time[cmd.toLowerCase()])
  }

  StartTimerNewMessage() {
    const nextIncoming = Math.floor(Math.random() * Cnst.Radio.Time.NewIncomingMessageMax) + Cnst.Radio.Time.NewIncomingMessageMin
    setTimeout(() => {
      this.NewMessage = true
      this.emit('NewMessage')
    }, nextIncoming)
  }

}


const radioStore = new RadioStore()
// elke instance van RadioStore doet eigen afhandeling van acties
AppDispatcher.register(radioStore.EvaluateActions.bind(radioStore))

export default radioStore
