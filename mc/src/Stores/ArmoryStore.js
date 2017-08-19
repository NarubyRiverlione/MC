/* eslint-disable no-console */
import AppDispatcher from '../AppDispatcher'
import { ActionCnst, Cnst } from '../Constants'
import { EventEmitter } from 'events'

//import FireComputersStore from './FireComputersStore'

class ArmoryStore extends EventEmitter {
  constructor(dispatcher) {
    super()
    this.Selected = ''
    this.Amount = { AA: 9, G: 5, AS: 2, T: 2, D: 20 }
    this.loading = false

  }
  EvaluateActions(action) {
    switch (action.type) {
      case ActionCnst.Armory.Select: this.Select(action.payload); break
      case ActionCnst.Armory.Load: this.Load(); break
      default: break
    }
  }

  Select(ord) {
    // deselect when same ordance is selected again
    this.Selected = this.Selected === ord ? '' : ord
    this.emit(Cnst.Armory.Emit.selected)
  }

  Load() {
    this.loading = true
    this.emit(Cnst.Armory.Emit.loading)
  }
}

const armoryStore = new ArmoryStore()
// elke instance van RadioStore doet eigen afhandeling van acties
AppDispatcher.register(armoryStore.EvaluateActions.bind(armoryStore))

export default armoryStore

