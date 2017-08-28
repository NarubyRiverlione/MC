/* eslint-disable no-console */
import React from 'react'
import ControlPanel from './Components/Panels/ControlPanel'
import { Cnst } from './Constants'

// import gameStore from './Stores/GameStore'
import radioStore from './Stores/RadioStore'
import firecomputersStore from './Stores/FireComputersStore'
import launchStationsStore from './Stores/LaunchStationsStore'
import armoryStore from './Stores/ArmoryStore'


export default class App extends React.Component {
  constructor(props) {
    super(props)

    let Stations = {}
    Stations[Cnst.Stations.Radio] = { Status: radioStore.Status }
    Stations[Cnst.Stations.FireComputers] = { Status: firecomputersStore.Status }
    Stations[Cnst.Stations.Armory] = { Status: armoryStore.Status }
    Stations[Cnst.Stations.LaunchStations] = { Status: launchStationsStore.Status }

    this.state = { Stations }
  }


  SetStationStatus(station, newStatus) {
    let Stations = this.state.Stations
    Stations[station].Status = newStatus
    this.setState(Stations)
  }

  componentWillMount() {
    // change Station Displays
    radioStore.on(Cnst.Radio.Emit.ChangedRadioStatus, () => {
      this.SetStationStatus(Cnst.Stations.Radio, radioStore.Status)
    })

    firecomputersStore.on(Cnst.FireComputers.Emit.ChangedFCstatus, () => {
      this.SetStationStatus(Cnst.Stations.FireComputers, firecomputersStore.Status)
    })

    launchStationsStore.on(Cnst.LaunchStations.Emit.ChangedLaunchStationsStatus, () => {
      this.SetStationStatus(Cnst.Stations.LaunchStations, launchStationsStore.Status)
    })

    armoryStore.on(Cnst.Armory.Emit.ChangedArmoryStatus, () => {
      this.SetStationStatus(Cnst.Stations.Armory, armoryStore.Status)
    })
  }

  render() {
    return (
      <div className="Application" >
        <div className="grid-container ShowContainer">
          <div className="grid-y grid-padding-y grid-padding-x">

            <div className="cell medium-6 ShowCellY">
              <div className="grid-x grid-margin-x ShowGrid" >

                <div className="cell medium-6 ShowCell" >
                  <ControlPanel
                    Name={Cnst.Stations.Radio}
                    StatusStatus={this.state.Stations[Cnst.Stations.Radio].Status}
                  />
                </div>

                <div className="cell medium-6  ShowCell" >
                  <ControlPanel
                    Name={Cnst.Stations.FireComputers}
                    StatusStatus={this.state.Stations[Cnst.Stations.FireComputers].Status}
                  />
                </div>

              </div>
            </div>


            <div className="cell medium-6 ShowCellY">
              <div className="grid-x grid-margin-x ShowGrid">

                <div className="cell medium-6 ShowCell">
                  <ControlPanel
                    Name={Cnst.Stations.Armory}
                    StatusStatus={this.state.Stations[Cnst.Stations.Armory].Status}
                  />
                </div>

                <div className="cell medium-6 ShowCell">
                  <ControlPanel
                    Name={Cnst.Stations.LaunchStations}
                    StatusStatus={this.state.Stations[Cnst.Stations.LaunchStations].Status}
                  />
                </div>

              </div>
            </div>

          </div>

        </div>
      </div >

    )
  }
}