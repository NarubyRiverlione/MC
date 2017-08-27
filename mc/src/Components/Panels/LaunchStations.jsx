/* eslint-disable no-console */
import React from 'react'

import { Cnst } from '../../Constants'
import Button from '../ControlElements/Button'
import Display from '../ControlElements/Display'
import ButtonWithLed from '../ControlElements/ButtonWithLed'

import launchStationStore from '../../Stores/LaunchStationsStore'
import * as LaunchStationsActions from '../../Actions/LaunchStationsActions'

export default class LaunchStations extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      Stations: launchStationStore.Station,
      Prepairing: launchStationStore.Preparing,
      Removing: launchStationStore.Removing,
      Repairing: LaunchStations.Repairing,
      Firing: LaunchStations.Firing,
      SelectedStatus: launchStationStore.SelectedStatus
    }
  }

  componentDidMount() {
    launchStationStore.on(Cnst.LaunchStations.Emit.startRemoving, () => {
      console.log('Launch Station: start removing')
      this.setState({ Stations: launchStationStore.Station })
    })

    launchStationStore.on(Cnst.LaunchStations.Emit.doneRemoving, () => {
      console.log('Launch Station: done removing')
      this.setState({ Stations: launchStationStore.Station })
    })

    launchStationStore.on(Cnst.LaunchStations.Emit.startLoading, () => {
      console.log('Launch Station: start loading')
      this.setState({ Stations: launchStationStore.Station })
    })

    launchStationStore.on(Cnst.LaunchStations.Emit.selected, () => {
      console.log('Launch Station: selected: ' + launchStationStore.Selected)
      this.setState({ Stations: launchStationStore.Station })
    })

    launchStationStore.on(Cnst.LaunchStations.Emit.doneLoading, () => {
      console.log('Launch Station: done loading')
      this.setState({ Stations: launchStationStore.Station })
    })

    launchStationStore.on(Cnst.LaunchStations.Emit.ChangedSelectedStatus, () => {
      this.setState({ SelectedStatus: launchStationStore.SelectedStatus })
    })
  }

  componentWillUnmount() {

  }

  Select(caption) {
    LaunchStationsActions.Select(caption)
  }

  Fire() {
    LaunchStationsActions.Fire()
  }

  Prepare() {
    LaunchStationsActions.Prepare()
  }

  Remove() {
    LaunchStationsActions.Remove()
  }

  Repair() {
    LaunchStationsActions.Repair()
  }

  render() {
    return (
      <div className='grid-container' id='LaunchStationsPanel'>
        <div className='grid-x'>
          {/* stations */}
          <div className='grid-y small-6'>

            {/* Rails */}
            <div className='cell small-4'>
              <p>{Cnst.LaunchStations.Name.rails}</p>
              <div className='grid-x'>
                <div className='cell small-6'>
                  <ButtonWithLed
                    LedOn={true} LedColors={Cnst.LedColors} LedBackgroundColor={Cnst.LedBackgroundColor}
                    LedCurrentColor={this.state.Stations[Cnst.LaunchStations.Numbers.one].loadingStatus}
                    ButtonCaption={Cnst.LaunchStations.Numbers.one}
                    ButtonWidth={50}
                    ButtonColor='slategrey'
                    ButtonTextColor='yellow'
                    ButtonStatus={this.state.Stations[Cnst.LaunchStations.Numbers.one].button}
                    ButtonCB={this.Select.bind(this)}
                  />
                </div>
                <div className='cell small-6'>
                  <ButtonWithLed
                    LedOn={true} LedColors={Cnst.LedColors} LedBackgroundColor={Cnst.LedBackgroundColor}
                    LedCurrentColor={this.state.Stations[Cnst.LaunchStations.Numbers.two].loadingStatus}
                    ButtonCaption={Cnst.LaunchStations.Numbers.two}
                    ButtonWidth={50}
                    ButtonColor='slategrey'
                    ButtonTextColor='yellow'
                    ButtonStatus={this.state.Stations[Cnst.LaunchStations.Numbers.two].button}
                    ButtonCB={this.Select.bind(this)}
                  />
                </div>
              </div>
            </div>

            {/* VLT */}
            <div className='cell small-4'>
              <p>{Cnst.LaunchStations.Name.VLT}</p>
              <div className='grid-x'>
                <div className='cell small-6'>
                  <ButtonWithLed
                    LedOn={true} LedColors={Cnst.LedColors} LedBackgroundColor={Cnst.LedBackgroundColor}
                    LedCurrentColor={this.state.Stations[Cnst.LaunchStations.Numbers.A].loadingStatus}
                    ButtonCaption={Cnst.LaunchStations.Numbers.A}
                    ButtonWidth={50}
                    ButtonColor='slategrey'
                    ButtonTextColor='yellow'
                    ButtonStatus={this.state.Stations[Cnst.LaunchStations.Numbers.A].button}
                    ButtonCB={this.Select.bind(this)}
                  />
                </div>
                <div className='cell small-6'>
                  <ButtonWithLed
                    LedOn={true} LedColors={Cnst.LedColors} LedBackgroundColor={Cnst.LedBackgroundColor}
                    LedCurrentColor={this.state.Stations[Cnst.LaunchStations.Numbers.B].loadingStatus}
                    ButtonCaption={Cnst.LaunchStations.Numbers.B}
                    ButtonWidth={50}
                    ButtonColor='slategrey'
                    ButtonTextColor='yellow'
                    ButtonStatus={this.state.Stations[Cnst.LaunchStations.Numbers.B].button}
                    ButtonCB={this.Select.bind(this)}
                  />
                </div>
              </div>
            </div>

            {/* Tubes*/}
            <div className='cell small-4'>
              <p>{Cnst.LaunchStations.Name.tubes}</p>
              <div className='grid-x'>
                <div className='cell small-6'>
                  <ButtonWithLed
                    LedOn={true} LedColors={Cnst.LedColors} LedBackgroundColor={Cnst.LedBackgroundColor}
                    LedCurrentColor={this.state.Stations[Cnst.LaunchStations.Numbers.romanOn].loadingStatus}
                    ButtonCaption={Cnst.LaunchStations.Numbers.romanOn}
                    ButtonWidth={50}
                    ButtonColor='slategrey'
                    ButtonTextColor='yellow'
                    ButtonStatus={this.state.Stations[Cnst.LaunchStations.Numbers.romanOn].button}
                    ButtonCB={this.Select.bind(this)}
                  />
                </div>
                <div className='cell small-6'>
                  <ButtonWithLed
                    LedOn={true} LedColors={Cnst.LedColors} LedBackgroundColor={Cnst.LedBackgroundColor}
                    LedCurrentColor={this.state.Stations[Cnst.LaunchStations.Numbers.romanTwo].loadingStatus}
                    ButtonCaption={Cnst.LaunchStations.Numbers.romanTwo}
                    ButtonWidth={50}
                    ButtonColor='slategrey'
                    ButtonTextColor='yellow'
                    ButtonStatus={this.state.Stations[Cnst.LaunchStations.Numbers.romanTwo].button}
                    ButtonCB={this.Select.bind(this)}
                  />
                </div>
              </div>
            </div>

          </div>

          {/* actions*/}
          <div className='grid-y small-6'>
            <div className='cell medium-4'>
              <p>Status</p>
              <Display Title='' Text={this.state.SelectedStatus} Width={300} />
            </div>
            <div className='grid-y medium-6'>
              <div className='grid-x'>
                <div className='cell small-6'>
                  <Button Caption={Cnst.LaunchStations.Actions.prepare} Width={100}
                    Color='slategrey' TextColor='yellow'
                    SetPressed={this.state.Prepairing} cb={this.Prepare.bind(this)} />
                </div>
                <div className='cell small-6'>
                  <Button Caption={Cnst.LaunchStations.Actions.remove} Width={100}
                    Color='slategrey' TextColor='yellow'
                    SetPressed={this.state.Removing} cb={this.Remove.bind(this)} />
                </div>
              </div>
              <div className='cell small-6'>
                <Button Caption={Cnst.LaunchStations.Actions.repair} Width={100}
                  Color='slategrey' TextColor='yellow'
                  SetPressed={this.state.Repairing} cb={this.Repair.bind(this)} />
              </div>
            </div>
            <div className='cell medium-2'>
              <Button Caption={Cnst.LaunchStations.Actions.fire} Color='Red' TextColor='yellow'
                SetPressed={this.state.Firing} cb={this.Fire.bind(this)}
              />
            </div>
          </div>
        </div>
      </div >
    )
  }
}
