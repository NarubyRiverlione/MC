/* eslint-disable no-console */
import React from 'react'
import ControlPanel from './Components/Panels/ControlPanel'
import Cnst from './Constands'

export default class App extends React.Component {
  constructor(props) {
    super(props)

    let Stations = {}
    Stations[Cnst.Stations.Radio] = { Status: 'Idle', SelectedSlot:1 }
    Stations[Cnst.Stations.FireComputers] = { Status: 'Idle' }
    Stations[Cnst.Stations.Armory] = { Status: 'Idle' }
    Stations[Cnst.Stations.LaunchStations] = { Status: 'Idle' }

    this.state = { Stations }
  }


  SetStationStatus(station, newStatus) {
    let Stations = this.state.Stations
    Stations[station].Status = newStatus
    this.setState(Stations)
  }

  RadioSelectedOtherSlot(newSlot) {
    let Stations = this.state.Stations
    Stations[Cnst.Stations.Radio].SelectedSlot = newSlot
    this.setState(Stations)
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
                    ChangeStatus={this.SetStationStatus.bind(this)}
                  />
                </div>

                <div className="cell medium-6  ShowCell" >
                  <ControlPanel
                    Name={Cnst.Stations.FireComputers}
                    StatusStatus={this.state.Stations[Cnst.Stations.FireComputers].Status}
                    ChangeStatus={this.SetStationStatus.bind(this)} />
                </div>

              </div>
            </div>


            <div className="cell medium-6 ShowCellY">
              <div className="grid-x grid-margin-x ShowGrid">

                <div className="cell medium-6 ShowCell">
                  <ControlPanel
                    Name={Cnst.Stations.Armory}
                    StatusStatus={this.state.Stations[Cnst.Stations.Armory].Status}
                    ChangeStatus={this.SetStationStatus.bind(this)} />
                </div>

                <div className="cell medium-6 ShowCell">
                  <ControlPanel
                    Name={Cnst.Stations.LaunchStations}
                    StatusStatus={this.state.Stations[Cnst.Stations.LaunchStations].Status}
                    ChangeStatus={this.SetStationStatus.bind(this)} />
                </div>

              </div>
            </div>

          </div>

        </div>
      </div>

    )
  }
}