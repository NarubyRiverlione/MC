/* eslint-disable no-console */
import AppDispatcher from '../AppDispatcher'
import { ActionCnst, Cnst } from '../Constants'
import { EventEmitter } from 'events'

class LaunchStationsStore extends EventEmitter {
  constructor(dispatcher) {
    super()
    this.Station = {}

    this.Selected = ''
    this.SelectedStatus = ''

    this.Station[Cnst.LaunchStations.Numbers.one] = { button: false, loadingStatus: Cnst.LaunchStations.StatusColor.empty }
    this.Station[Cnst.LaunchStations.Numbers.two] = { button: false, loadingStatus: Cnst.LaunchStations.StatusColor.empty }

    this.Station[Cnst.LaunchStations.Numbers.A] = { button: false, loadingStatus: Cnst.LaunchStations.StatusColor.empty }
    this.Station[Cnst.LaunchStations.Numbers.B] = { button: false, loadingStatus: Cnst.LaunchStations.StatusColor.empty }

    this.Station[Cnst.LaunchStations.Numbers.romanOn] = { button: false, loadingStatus: Cnst.LaunchStations.StatusColor.empty }
    this.Station[Cnst.LaunchStations.Numbers.romanTwo] = { button: false, loadingStatus: Cnst.LaunchStations.StatusColor.empty }


    this.Firing = false
    this.Preparing = false
    this.Removing = false
    this.Repairing = false

    this.Loading = []

    this.Status = Cnst.Status.idle
  }

  EvaluateActions(action) {
    switch (action.type) {
      case ActionCnst.LaunchStations.Select: this.Select(action.payload); break
      case ActionCnst.LaunchStations.Prepare: this.Prepare(); break
      case ActionCnst.LaunchStations.Remove: this.Remove(); break
      case ActionCnst.LaunchStations.Repair: this.Repair(); break
      case ActionCnst.LaunchStations.ChangeStatus: this.ChangeStatus(action.payload); break
      case ActionCnst.LaunchStations.StartLoading: this.StartLoading(); break
      // case ActionCnst.LaunchStations.DoneLoading: this.DoneLoading(); break
      default: break
    }
  }

  StartLoading() {
    // signal  loading in progress by setting led color
    this.Station[this.Selected].loadingStatus = Cnst.LaunchStations.StatusColor.loading
    this.emit(Cnst.LaunchStations.Emit.startLoading)
    const loadThisStation = this.Selected // remeber after wait time, may be other LS is then selected
    // show selected status
    this.ShowSelectedStatus()

    // wait for loading time
    setTimeout(() => {
      // signal loading done but led color
      this.Station[loadThisStation].loadingStatus = Cnst.LaunchStations.StatusColor.loaded
      this.emit(Cnst.LaunchStations.Emit.doneLoading)
      // show selected status
      this.ShowSelectedStatus()
    }
      , Cnst.LaunchStations.Time.loading)
  }

  // DoneLoading() {
  // }

  ChangeStatus(status) {
    this.Status = status
    this.emit(Cnst.LaunchStations.Emit.ChangedLaunchStationsStatus)
  }

  Select(slot) {
    this.DeselectAll()
    if (this.Selected !== slot.caption) { // only select if not alread selected
      this.Selected = slot.caption
      this.Station[slot.caption].button = true
    } else {
      this.Selected = ''
    }
    this.emit(Cnst.LaunchStations.Emit.selected)
    // show status of selected LS
    this.ShowSelectedStatus()
  }

  ShowSelectedStatus() {
    const loadingStatus = this.Station[this.Selected].loadingStatus
    // find key (= description) for statusColor
    let selStatusTxt = Object.keys(Cnst.LaunchStations.StatusColor)
      .find(key => Cnst.LaunchStations.StatusColor[key] === loadingStatus)

    this.SelectedStatus = selStatusTxt
    this.emit(Cnst.LaunchStations.Emit.ChangedSelectedStatus)
  }


  Prepare() {
    this.Preparing = true
    this.emit(Cnst.LaunchStations.Emit.Preparing)
  }

  Remove() {

  }

  Repair() {

  }

  DeselectAll() {
    this.Station[Cnst.LaunchStations.Numbers.one].button = false
    this.Station[Cnst.LaunchStations.Numbers.two].button = false

    this.Station[Cnst.LaunchStations.Numbers.A].button = false
    this.Station[Cnst.LaunchStations.Numbers.B].button = false

    this.Station[Cnst.LaunchStations.Numbers.romanOn].button = false
    this.Station[Cnst.LaunchStations.Numbers.romanTwo].button = false

  }
}


const launchStationsStore = new LaunchStationsStore()
// elke instance van RadioStore doet eigen afhandeling van acties
AppDispatcher.register(launchStationsStore.EvaluateActions.bind(launchStationsStore))

export default launchStationsStore
