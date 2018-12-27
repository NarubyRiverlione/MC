/* eslint-disable no-console */
import React from 'react'
import PropTypes from 'prop-types'

import { Cnst } from '../../Constants'
import Button from '../ControlElements/Button'
import Display from '../ControlElements/Display'
import ButtonWithLed from '../ControlElements/ButtonWithLed'


const LaunchStations = ({
  Stations, SelectedStatus, Prepairing, Repairing, Firing, Removing,
  Select, Prepare, Remove, Repair, Fire,
}) => (
  <div className="grid-container" id="LaunchStationsPanel">
    <div className="grid-x">
      {/* stations */}
      <div className="grid-y small-6">

        {/* Rails */}
        <div className="cell small-4">
          <p>{Cnst.LaunchStations.Name.rails}</p>
          <div className="grid-x">
            <div className="cell small-6">
              <ButtonWithLed
                LedOn
                LedColors={Cnst.LedColors}
                LedBackgroundColor={Cnst.LedBackgroundColor}
                LedCurrentColor={Stations[Cnst.LaunchStations.Numbers.one].loadingStatus}
                ButtonCaption={Cnst.LaunchStations.Numbers.one}
                ButtonWidth={50}
                ButtonColor="slategrey"
                ButtonTextColor="yellow"
                ButtonStatus={Stations[Cnst.LaunchStations.Numbers.one].button}
                ButtonCB={() => {
                  Select(Cnst.LaunchStations.Numbers.one)
                }}
              />
            </div>
            <div className="cell small-6">
              <ButtonWithLed
                LedOn
                LedColors={Cnst.LedColors}
                LedBackgroundColor={Cnst.LedBackgroundColor}
                LedCurrentColor={Stations[Cnst.LaunchStations.Numbers.two].loadingStatus}
                ButtonCaption={Cnst.LaunchStations.Numbers.two}
                ButtonWidth={50}
                ButtonColor="slategrey"
                ButtonTextColor="yellow"
                ButtonStatus={Stations[Cnst.LaunchStations.Numbers.two].button}
                ButtonCB={() => {
                  Select(Cnst.LaunchStations.Numbers.two)
                }}
              />
            </div>
          </div>
        </div>

        {/* VLT */}
        <div className="cell small-4">
          <p>{Cnst.LaunchStations.Name.VLT}</p>
          <div className="grid-x">
            <div className="cell small-6">
              <ButtonWithLed
                LedOn
                LedColors={Cnst.LedColors}
                LedBackgroundColor={Cnst.LedBackgroundColor}
                LedCurrentColor={Stations[Cnst.LaunchStations.Numbers.A].loadingStatus}
                ButtonCaption={Cnst.LaunchStations.Numbers.A}
                ButtonWidth={50}
                ButtonColor="slategrey"
                ButtonTextColor="yellow"
                ButtonStatus={Stations[Cnst.LaunchStations.Numbers.A].button}
                ButtonCB={() => {
                  Select(Cnst.LaunchStations.Numbers.A)
                }}
              />
            </div>
            <div className="cell small-6">
              <ButtonWithLed
                LedOn
                LedColors={Cnst.LedColors}
                LedBackgroundColor={Cnst.LedBackgroundColor}
                LedCurrentColor={Stations[Cnst.LaunchStations.Numbers.B].loadingStatus}
                ButtonCaption={Cnst.LaunchStations.Numbers.B}
                ButtonWidth={50}
                ButtonColor="slategrey"
                ButtonTextColor="yellow"
                ButtonStatus={Stations[Cnst.LaunchStations.Numbers.B].button}
                ButtonCB={() => {
                  Select(Cnst.LaunchStations.Numbers.B)
                }}
              />
            </div>
          </div>
        </div>

        {/* Tubes */}
        <div className="cell small-4">
          <p>{Cnst.LaunchStations.Name.tubes}</p>
          <div className="grid-x">
            <div className="cell small-6">
              <ButtonWithLed
                LedOn
                LedColors={Cnst.LedColors}
                LedBackgroundColor={Cnst.LedBackgroundColor}
                LedCurrentColor={Stations[Cnst.LaunchStations.Numbers.romanOn].loadingStatus}
                ButtonCaption={Cnst.LaunchStations.Numbers.romanOn}
                ButtonWidth={50}
                ButtonColor="slategrey"
                ButtonTextColor="yellow"
                ButtonStatus={Stations[Cnst.LaunchStations.Numbers.romanOn].button}
                ButtonCB={() => {
                  Select(Cnst.LaunchStations.Numbers.romanOn)
                }}
              />
            </div>
            <div className="cell small-6">
              <ButtonWithLed
                LedOn
                LedColors={Cnst.LedColors}
                LedBackgroundColor={Cnst.LedBackgroundColor}
                LedCurrentColor={Stations[Cnst.LaunchStations.Numbers.romanTwo].loadingStatus}
                ButtonCaption={Cnst.LaunchStations.Numbers.romanTwo}
                ButtonWidth={50}
                ButtonColor="slategrey"
                ButtonTextColor="yellow"
                ButtonStatus={Stations[Cnst.LaunchStations.Numbers.romanTwo].button}
                ButtonCB={() => {
                  Select(Cnst.LaunchStations.Numbers.romanTwo)
                }}
              />
            </div>
          </div>
        </div>

      </div>

      {/* actions */}
      <div className="grid-y small-6">
        <div className="cell medium-4">
          <p>Status</p>
          <Display Title="" Text={SelectedStatus} Width={300} />
        </div>
        <div className="grid-y medium-6">
          <div className="grid-x">
            <div className="cell small-6">
              <Button
                Caption={Cnst.LaunchStations.Actions.prepare}
                Width={100}
                Color="slategrey"
                TextColor="yellow"
                SetPressed={Prepairing}
                cb={Prepare()}
              />
            </div>
            <div className="cell small-6">
              <Button
                Caption={Cnst.LaunchStations.Actions.remove}
                Width={100}
                Color="slategrey"
                TextColor="yellow"
                SetPressed={Removing}
                cb={Remove()}
              />
            </div>
          </div>
          <div className="cell small-6">
            <Button
              Caption={Cnst.LaunchStations.Actions.repair}
              Width={100}
              Color="slategrey"
              TextColor="yellow"
              SetPressed={Repairing}
              cb={Repair()}
            />
          </div>
        </div>
        <div className="cell medium-2">
          <Button
            Caption={Cnst.LaunchStations.Actions.fire}
            Color="Red"
            TextColor="yellow"
            SetPressed={Firing}
            cb={Fire.binNumbers}
          />
        </div>
      </div>
    </div>
  </div>
)

LaunchStations.propTypes = {
  Stations: PropTypes.object.isRequired,
  SelectedStatus: PropTypes.string.isRequired,
  Prepairing: PropTypes.bool.isRequired,
  Repairing: PropTypes.bool.isRequired,
  Firing: PropTypes.bool.isRequired,
  Removing: PropTypes.bool.isRequired,

  Select: PropTypes.func.isRequired,
  Prepare: PropTypes.func.isRequired,
  Remove: PropTypes.func.isRequired,
  Repair: PropTypes.func.isRequired,
  Fire: PropTypes.func.isRequired,
}

export default LaunchStations
