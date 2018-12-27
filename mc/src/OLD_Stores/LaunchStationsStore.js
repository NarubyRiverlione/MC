/* eslint-disable no-console */
import { EventEmitter } from 'events'
import AppDispatcher from '../AppDispatcher'
import { ActionCnst, Cnst } from '../Constants'

import { AddOneToArmory } from '../Actions/ArmoryActions'

class LaunchStationsStore extends EventEmitter {
  constructor(dispatcher) {
    super()
    this.Station = {}

    this.Selected = ''
    this.SelectedStatus = ''

    this.Station[Cnst.LaunchStations.Numbers.one] = {
      button: false,
      loadingStatus: Cnst.LaunchStations.StatusColor.empty,
      ordnance: '',
    }
    this.Station[Cnst.LaunchStations.Numbers.two] = {
      button: false,
      loadingStatus: Cnst.LaunchStations.StatusColor.empty,
      ordnance: '',
    }

    this.Station[Cnst.LaunchStations.Numbers.A] = {
      button: false,
      loadingStatus: Cnst.LaunchStations.StatusColor.empty,
      ordnance: '',
    }
    this.Station[Cnst.LaunchStations.Numbers.B] = {
      button: false,
      loadingStatus: Cnst.LaunchStations.StatusColor.empty,
      ordnance: '',
    }

    this.Station[Cnst.LaunchStations.Numbers.romanOn] = {
      button: false,
      loadingStatus: Cnst.LaunchStations.StatusColor.empty,
      ordnance: '',
    }
    this.Station[Cnst.LaunchStations.Numbers.romanTwo] = {
      button: false,
      loadingStatus: Cnst.LaunchStations.StatusColor.empty,
      ordnance: '',
    }


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
      case ActionCnst.LaunchStations.ShowErrorStatus: this.ShowErrorStatus(action.payload); break
      case ActionCnst.LaunchStations.StartLoading: this.StartLoading(action.payload); break
      // case ActionCnst.LaunchStations.DoneLoading: this.DoneLoading(); break
      default: break
    }
  }

  StartLoading(ordnance) {
    const loadThisStation = this.Selected // remeber after wait time, may be other LS is then selected
    const LS = this.Station[loadThisStation]

    // set ordnance type in LS
    LS.ordnance = ordnance

    // signal  loading in progress by setting led color
    LS.loadingStatus = Cnst.LaunchStations.StatusColor.loading
    this.emit(Cnst.LaunchStations.Emit.startLoading)

    // show selected LS status
    this.ShowSelectedStatus()

    // wait for loading time
    setTimeout(() => {
      // signal loading done by led color
      LS.loadingStatus = Cnst.LaunchStations.StatusColor.loaded
      this.emit(Cnst.LaunchStations.Emit.doneLoading)
      // show selected status
      this.ShowSelectedStatus()
    },
    Cnst.LaunchStations.Time.loading)
  }

  ShowErrorStatus(err) {
    this.Status = err
    this.emit(Cnst.LaunchStations.Emit.ChangedLaunchStationsStatus)

    setTimeout(() => {
      this.Status = Cnst.Status.idle
      this.emit(Cnst.LaunchStations.Emit.ChangedLaunchStationsStatus)
    }, Cnst.LaunchStations.Time.Error)
  }

  Select(slot) {
    this.DeselectAll()
    if (this.Selected !== slot.caption) { // only select if not alread selected
      this.Selected = slot.caption
      this.Station[slot.caption].button = true
    }
    else {
      this.Selected = ''
    }
    this.emit(Cnst.LaunchStations.Emit.selected)
    // show status of selected LS
    this.ShowSelectedStatus()
  }

  ShowSelectedStatus() {
    if (this.Selected === '') {
      // nothing selected, nothing to show
      this.SelectedStatus = ''
    }
    else {
      const loadingStatus = this.Station[this.Selected].loadingStatus
      // find key (= description) for statusColor
      let selStatusTxt = Object.keys(Cnst.LaunchStations.StatusColor)
        .find(key => Cnst.LaunchStations.StatusColor[key] === loadingStatus)

      // add ordnance type
      selStatusTxt += `: ${this.Station[this.Selected].ordnance}`

      this.SelectedStatus = selStatusTxt
    }

    this.emit(Cnst.LaunchStations.Emit.ChangedSelectedStatus)
  }


  Prepare() {
    this.Preparing = true
    this.emit(Cnst.LaunchStations.Emit.Preparing)
  }

  Remove() {
    const LS = this.Station[this.Selected] // to remember later on which LS

    // check if selected is not empty
    if (LS.loadingStatus === Cnst.LaunchStations.StatusColor.empty) {
      this.ShowErrorStatus(Cnst.LaunchStations.Errors.NoRemoveOfEmpty)
      return
    }

    // set status removing
    this.Removing = true
    LS.loadingStatus = Cnst.LaunchStations.StatusColor.removing
    this.emit(Cnst.LaunchStations.Emit.startRemoving)
    this.ShowSelectedStatus()

    setTimeout(() => {
      this.Removing = false
      // add one back to the Armory
      AddOneToArmory(LS.ordnance)
      // clear LaunchStation
      LS.ordnance = ''
      LS.loadingStatus = Cnst.LaunchStations.StatusColor.empty
      this.emit(Cnst.LaunchStations.Emit.doneRemoving)
      this.ShowSelectedStatus()
    },
    Cnst.LaunchStations.Time.removing)
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
