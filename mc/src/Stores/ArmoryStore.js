/* eslint-disable no-console */
import AppDispatcher from '../AppDispatcher'
import { ActionCnst, Cnst } from '../Constants'
import { EventEmitter } from 'events'

//import launchStationsStore from './LaunchStationsStore'

class ArmoryStore extends EventEmitter {
  constructor(dispatcher) {
    super()
    this.Selected = ''
    this.Amount = {}
    this.Amount[Cnst.Ordnance.AA] = 1 //9
    this.Amount[Cnst.Ordnance.G] = 5
    this.Amount[Cnst.Ordnance.AS] = 2
    this.Amount[Cnst.Ordnance.T] = 2
    this.Amount[Cnst.Ordnance.D] = 20

    this.Loading = false

    this.Status = Cnst.Status.idle
  }

  EvaluateActions(action) {
    switch (action.type) {
      case ActionCnst.Armory.Select: this.Select(action.payload); break
      case ActionCnst.Armory.Load: this.StartLoading(); break
      case ActionCnst.Armory.ChangeStatus: this.ChangeStatus(action.payload); break
      case ActionCnst.Armory.AddOneToArmory: this.AddOneToArmory(action.payload); break
      default: break
    }
  }

  ChangeStatus(status) {
    this.Status = status
    this.emit(Cnst.Armory.Emit.ChangedArmoryStatus)
  }

  Select(ord) {
    // deselect when same ordance is Selected again
    this.Selected = this.Selected === ord ? '' : ord
    this.emit(Cnst.Armory.Emit.selected)
  }


  StartLoading() {
    // hold Loading button down
    this.Loading = true
    this.emit(Cnst.Armory.Emit.Loading)
    // change amount in armory 
    this.Amount[this.Selected]--
    this.emit(Cnst.Armory.Emit.changeAmount)
    // change station of armory
    this.ChangeStatus(Cnst.Armory.Actions.loading)

    setTimeout(() => {
      // release Loading button, Loading take place in Launch Status
      this.Loading = false
      this.emit(Cnst.Armory.Emit.Loading)
      // set status idle
      this.ChangeStatus(Cnst.Status.idle)
    }
      , Cnst.Armory.Time.StartLoading)
  }

  AddOneToArmory(ordnance) {
    this.Amount[ordnance] = this.Amount[ordnance] + 1
    this.emit(Cnst.Armory.Emit.changeAmount)
  }
}

const armoryStore = new ArmoryStore()
// elke instance van RadioStore doet eigen afhandeling van acties
AppDispatcher.register(armoryStore.EvaluateActions.bind(armoryStore))

export default armoryStore

