/* eslint-disable no-console */
import React from 'react'
import PropTypes from 'prop-types'

import { Cnst } from '../../Constants'
import Button from '../ControlElements/Button'
import Display from '../ControlElements/Display'
import ButtonWithLed from '../ControlElements/ButtonWithLed'


const LaunchStations = ({
  Stations, Selected, SelectedStatus, Prepairing, Firing, Removing,
  Select, Remove, Fire,
}) => (
  <div className="grid-container" id="LaunchStationsPanel">
    <div className="grid-x">
      {/* stations */}
      <div className="grid-y medium-6">

        {/* Rails */}
        <div className="cell medium-4 smallBorder">
          <p>{Cnst.LaunchStations.Name.rails}</p>
          <div className="grid-x">
            <div className="cell medium-6">
              <ButtonWithLed
                LedOn
                LedColors={Cnst.LedColors}
                LedBackgroundColor={Cnst.LedBackgroundColor}
                LedCurrentColor={Stations[Cnst.LaunchStations.Numbers.one].handleStatus}
                ButtonCaption={Cnst.LaunchStations.Numbers.one}
                ButtonWidth={50}
                ButtonColor="grey"
                ButtonTextColor="darkblue"
                ButtonStatus={Selected === Cnst.LaunchStations.Numbers.one}
                ButtonCB={() => {
                  Select(Cnst.LaunchStations.Numbers.one)
                }}
              />
            </div>
            <div className="cell medium-6">
              <ButtonWithLed
                LedOn
                LedColors={Cnst.LedColors}
                LedBackgroundColor={Cnst.LedBackgroundColor}
                LedCurrentColor={Stations[Cnst.LaunchStations.Numbers.two].handleStatus}
                ButtonCaption={Cnst.LaunchStations.Numbers.two}
                ButtonWidth={50}
                ButtonColor="grey"
                ButtonTextColor="darkblue"
                ButtonStatus={Selected === Cnst.LaunchStations.Numbers.two}
                ButtonCB={() => {
                  Select(Cnst.LaunchStations.Numbers.two)
                }}
              />
            </div>
          </div>
        </div>

        {/* VLT */}
        <div className="cell medium-4 smallBorder">
          <p>{Cnst.LaunchStations.Name.VLT}</p>
          <div className="grid-x">
            <div className="cell medium-6">
              <ButtonWithLed
                LedOn
                LedColors={Cnst.LedColors}
                LedBackgroundColor={Cnst.LedBackgroundColor}
                LedCurrentColor={Stations[Cnst.LaunchStations.Numbers.A].handleStatus}
                ButtonCaption={Cnst.LaunchStations.Numbers.A}
                ButtonWidth={50}
                ButtonColor="grey"
                ButtonTextColor="darkblue"
                ButtonStatus={Selected === Cnst.LaunchStations.Numbers.A}
                ButtonCB={() => {
                  Select(Cnst.LaunchStations.Numbers.A)
                }}
              />
            </div>
            <div className="cell medium-6">
              <ButtonWithLed
                LedOn
                LedColors={Cnst.LedColors}
                LedBackgroundColor={Cnst.LedBackgroundColor}
                LedCurrentColor={Stations[Cnst.LaunchStations.Numbers.B].handleStatus}
                ButtonCaption={Cnst.LaunchStations.Numbers.B}
                ButtonWidth={50}
                ButtonColor="grey"
                ButtonTextColor="darkblue"
                ButtonStatus={Selected === Cnst.LaunchStations.Numbers.B}
                ButtonCB={() => {
                  Select(Cnst.LaunchStations.Numbers.B)
                }}
              />
            </div>
          </div>
        </div>

        {/* Tubes */}
        <div className="cell medium-4 smallBorder">
          <p>{Cnst.LaunchStations.Name.tubes}</p>
          <div className="grid-x">
            <div className="cell medium-6">
              <ButtonWithLed
                LedOn
                LedColors={Cnst.LedColors}
                LedBackgroundColor={Cnst.LedBackgroundColor}
                LedCurrentColor={Stations[Cnst.LaunchStations.Numbers.romanOn].handleStatus}
                ButtonCaption={Cnst.LaunchStations.Numbers.romanOn}
                ButtonWidth={50}
                ButtonColor="grey"
                ButtonTextColor="darkblue"
                ButtonStatus={Selected === Cnst.LaunchStations.Numbers.romanOn}
                ButtonCB={() => {
                  Select(Cnst.LaunchStations.Numbers.romanOn)
                }}
              />
            </div>
            <div className="cell medium-6">
              <ButtonWithLed
                LedOn
                LedColors={Cnst.LedColors}
                LedBackgroundColor={Cnst.LedBackgroundColor}
                LedCurrentColor={Stations[Cnst.LaunchStations.Numbers.romanTwo].handleStatus}
                ButtonCaption={Cnst.LaunchStations.Numbers.romanTwo}
                ButtonWidth={50}
                ButtonColor="grey"
                ButtonTextColor="darkblue"
                ButtonStatus={Selected === Cnst.LaunchStations.Numbers.romanTwo}
                ButtonCB={() => {
                  Select(Cnst.LaunchStations.Numbers.romanTwo)
                }}
              />
            </div>
          </div>
        </div>

      </div>

      {/* actions */}
      <div className="grid-y medium-6">
        <div className="cell medium-4 smallBorder">
          <p>Selected content</p>
          <Display Title="" Text={SelectedStatus} Width={230} />
        </div>

        <div className="grid-y medium-4 smallBorder">
          <div className="cell small-3" />
          <div className="grid-x small-9">
            <Button
              Caption={Cnst.LaunchStations.Actions.remove}
              Width={100}
              Color="grey"
              TextColor="darkblue"
              SetPressed={Removing}
              cb={Remove}
            />
          </div>
        </div>

        <div className="grid-y medium-4 smallBorder">
          <div className="cell small-3" />
          <div className="cell small-9">
            <Button
              Caption={Cnst.LaunchStations.Actions.fire}
              Width={230}
              Color="red"
              TextColor="black"
              SetPressed={Firing}
              cb={Fire}
            />
          </div>
        </div>
      </div>
    </div>
  </div>
)

LaunchStations.propTypes = {
  Stations: PropTypes.object.isRequired,
  Selected: PropTypes.string.isRequired,
  SelectedStatus: PropTypes.string.isRequired,
  // Prepairing: PropTypes.bool.isRequired,
  // Repairing: PropTypes.bool.isRequired,
  Firing: PropTypes.bool.isRequired,
  Removing: PropTypes.bool.isRequired,

  Select: PropTypes.func.isRequired,
  //  Prepare: PropTypes.func.isRequired,
  Remove: PropTypes.func.isRequired,
  //  Repair: PropTypes.func.isRequired,
  Fire: PropTypes.func.isRequired,
}

export default LaunchStations
