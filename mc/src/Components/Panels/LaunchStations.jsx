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

    }
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  Select(caption) {
    LaunchStations.Select(caption)
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
                    LedCurrentColor={launchStationStore.Station[Cnst.LaunchStations.Name.rails][Cnst.LaunchStations.Numbers.one].status}
                    ButtonCaption={Cnst.LaunchStations.Numbers.one}
                    ButtonWidth={50}
                    ButtonColor='slategrey'
                    ButtonTextColor='yellow'
                    ButtonStatus={launchStationStore.Station[Cnst.LaunchStations.Name.rails][Cnst.LaunchStations.Numbers.one].button}
                    ButtonCB={this.Select.bind(this)}
                  />
                </div>
                <div className='cell small-6'>
                  <ButtonWithLed
                    LedOn={true} LedColors={Cnst.LedColors} LedBackgroundColor={Cnst.LedBackgroundColor}
                    LedCurrentColor={launchStationStore.Station[Cnst.LaunchStations.Name.rails][Cnst.LaunchStations.Numbers.two].status}
                    ButtonCaption={Cnst.LaunchStations.Numbers.two}
                    ButtonWidth={50}
                    ButtonColor='slategrey'
                    ButtonTextColor='yellow'
                    ButtonStatus={launchStationStore.Station[Cnst.LaunchStations.Name.rails][Cnst.LaunchStations.Numbers.two].button}
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
                    LedCurrentColor={launchStationStore.Station[Cnst.LaunchStations.Name.VLT][Cnst.LaunchStations.Numbers.A].status}
                    ButtonCaption={Cnst.LaunchStations.Numbers.A}
                    ButtonWidth={50}
                    ButtonColor='slategrey'
                    ButtonTextColor='yellow'
                    ButtonStatus={launchStationStore.Station[Cnst.LaunchStations.Name.VLT][Cnst.LaunchStations.Numbers.A].button}
                    ButtonCB={this.Select.bind(this)}
                  />
                </div>
                <div className='cell small-6'>
                  <ButtonWithLed
                    LedOn={true} LedColors={Cnst.LedColors} LedBackgroundColor={Cnst.LedBackgroundColor}
                    LedCurrentColor={launchStationStore.Station[Cnst.LaunchStations.Name.VLT][Cnst.LaunchStations.Numbers.B].status}
                    ButtonCaption={Cnst.LaunchStations.Numbers.B}
                    ButtonWidth={50}
                    ButtonColor='slategrey'
                    ButtonTextColor='yellow'
                    ButtonStatus={launchStationStore.Station[Cnst.LaunchStations.Name.VLT][Cnst.LaunchStations.Numbers.B].button}
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
                    LedCurrentColor={launchStationStore.Station[Cnst.LaunchStations.Name.tubes][Cnst.LaunchStations.Numbers.romanOn].status}
                    ButtonCaption={Cnst.LaunchStations.Numbers.romanOn}
                    ButtonWidth={50}
                    ButtonColor='slategrey'
                    ButtonTextColor='yellow'
                    ButtonStatus={launchStationStore.Station[Cnst.LaunchStations.Name.tubes][Cnst.LaunchStations.Numbers.romanOn].button}
                    ButtonCB={this.Select.bind(this)}
                  />
                </div>
                <div className='cell small-6'>
                  <ButtonWithLed
                    LedOn={true} LedColors={Cnst.LedColors} LedBackgroundColor={Cnst.LedBackgroundColor}
                    LedCurrentColor={launchStationStore.Station[Cnst.LaunchStations.Name.tubes][Cnst.LaunchStations.Numbers.romanTwo].status}
                    ButtonCaption={Cnst.LaunchStations.Numbers.romanTwo}
                    ButtonWidth={50}
                    ButtonColor='slategrey'
                    ButtonTextColor='yellow'
                    ButtonStatus={launchStationStore.Station[Cnst.LaunchStations.Name.tubes][Cnst.LaunchStations.Numbers.romanTwo].button}
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
              <Display Title='' Text={launchStationStore.LaunchStationStatus} Width={300} />
            </div>
            <div className='grid-y medium-6'>
              <div className='grid-x'>
                <div className='cell small-6'>
                  <Button Caption={Cnst.LaunchStations.Actions.prepare} Width={100}
                    Color='slategrey' TextColor='yellow'
                    SetPressed={launchStationStore.Prepairing} cb={this.Prepare.bind(this)} />
                </div>
                <div className='cell small-6'>
                  <Button Caption={Cnst.LaunchStations.Actions.remove} Width={100}
                    Color='slategrey' TextColor='yellow'
                    SetPressed={launchStationStore.Removing} cb={this.Remove.bind(this)} />
                </div>
              </div>
              <div className='cell small-6'>
                <Button Caption={Cnst.LaunchStations.Actions.repair} Width={100}
                  Color='slategrey' TextColor='yellow'
                  SetPressed={launchStationStore.Repairing} cb={this.Repair.bind(this)} />
              </div>
            </div>
            <div className='cell medium-2'>
              <Button Caption={Cnst.LaunchStations.Actions.fire} Color='Red' TextColor='yellow'
                SetPressed={launchStationStore.Firing} cb={this.Fire.bind(this)}
              />
            </div>
          </div>
        </div>
      </div >
    )
  }
}
