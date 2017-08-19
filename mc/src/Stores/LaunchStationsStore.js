/* eslint-disable no-console */
import AppDispatcher from '../AppDispatcher'
import { ActionCnst, Cnst } from '../Constants'
import { EventEmitter } from 'events'

//import FireComputersStore from './FireComputersStore'

class LaunchStationsStore extends EventEmitter {
  constructor(dispatcher) {
    super()
    this.Station = {}

    this.Selected = ''
    this.LaunchStationStatus = ''

    this.Station[Cnst.LaunchStations.Name.rails] = {
      [Cnst.LaunchStations.Numbers.one]: { button: false, status: Cnst.LaunchStations.StatusColor.empty },
      [Cnst.LaunchStations.Numbers.two]: { button: false, status: Cnst.LaunchStations.StatusColor.empty },
    }
    this.Station[Cnst.LaunchStations.Name.VLT] = {
      [Cnst.LaunchStations.Numbers.A]: { button: false, status: Cnst.LaunchStations.StatusColor.empty },
      [Cnst.LaunchStations.Numbers.B]: { button: false, status: Cnst.LaunchStations.StatusColor.empty },
    }
    this.Station[Cnst.LaunchStations.Name.tubes] = {
      [Cnst.LaunchStations.Numbers.romanOn]: { button: false, status: Cnst.LaunchStations.StatusColor.empty },
      [Cnst.LaunchStations.Numbers.romanTwo]: { button: false, status: Cnst.LaunchStations.StatusColor.empty },
    }

    this.Firing = false
    this.Preparing = false
    this.Removing = false
    this.Repairing = false

    this.Status = Cnst.Status.idle
  }

  EvaluateActions(action) {
    switch (action.type) {
      case ActionCnst.LaunchStations.Select: this.Select(action.payload); break
      case ActionCnst.LaunchStations.Prepare: this.Prepare(); break
      case ActionCnst.LaunchStations.Remove: this.Remove(); break
      case ActionCnst.LaunchStations.Repair: this.Repair(); break
      default: break
    }
  }

  Select(slot) {
    this.Selected = slot
    this.emit(Cnst.LaunchStations.Emit.selected)
  }

  Prepare() {

  }

  Remove() {

  }

  Repair() {

  }

}


const launchStationsStore = new LaunchStationsStore()
// elke instance van RadioStore doet eigen afhandeling van acties
AppDispatcher.register(launchStationsStore.EvaluateActions.bind(launchStationsStore))

export default launchStationsStore
