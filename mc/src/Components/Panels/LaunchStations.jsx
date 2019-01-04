import React from 'react'
import PropTypes from 'prop-types'

import { CstLaunchStations, Cnst } from '../../Constants'
import Button from '../ControlElements/Button'
import Display from '../ControlElements/Display'
import ButtonWithLed from '../ControlElements/ButtonWithLed'


const LaunchStations = ({
  Stations, Selected, SelectedStatus, Firing, Removing,
  Select, Remove, Fire,
}) => (
  <div className="grid-container" id="LaunchStationsPanel">
    <div className="grid-x">
      {/* stations */}
      <div className="grid-y medium-6">

        {/* Rails */}
        <div className="cell medium-4 smallBorder">
          <p>{CstLaunchStations.Name.rails}</p>
          <div className="grid-x">
            <div className="cell medium-6">
              <ButtonWithLed
                LedOn
                LedColors={Cnst.LedColors}
                LedBackgroundColor={Cnst.LedBackgroundColor}
                LedCurrentColor={Stations[CstLaunchStations.Numbers.one].handleStatus}
                ButtonCaption={CstLaunchStations.Numbers.one}
                ButtonWidth={50}
                ButtonColor="grey"
                ButtonTextColor="darkblue"
                ButtonStatus={Selected === CstLaunchStations.Numbers.one}
                ButtonCB={() => {
                  Select(CstLaunchStations.Numbers.one)
                }}
              />
            </div>
            <div className="cell medium-6">
              <ButtonWithLed
                LedOn
                LedColors={Cnst.LedColors}
                LedBackgroundColor={Cnst.LedBackgroundColor}
                LedCurrentColor={Stations[CstLaunchStations.Numbers.two].handleStatus}
                ButtonCaption={CstLaunchStations.Numbers.two}
                ButtonWidth={50}
                ButtonColor="grey"
                ButtonTextColor="darkblue"
                ButtonStatus={Selected === CstLaunchStations.Numbers.two}
                ButtonCB={() => {
                  Select(CstLaunchStations.Numbers.two)
                }}
              />
            </div>
          </div>
        </div>

        {/* VLT */}
        <div className="cell medium-4 smallBorder">
          <p>{CstLaunchStations.Name.VLT}</p>
          <div className="grid-x">
            <div className="cell medium-6">
              <ButtonWithLed
                LedOn
                LedColors={Cnst.LedColors}
                LedBackgroundColor={Cnst.LedBackgroundColor}
                LedCurrentColor={Stations[CstLaunchStations.Numbers.A].handleStatus}
                ButtonCaption={CstLaunchStations.Numbers.A}
                ButtonWidth={50}
                ButtonColor="grey"
                ButtonTextColor="darkblue"
                ButtonStatus={Selected === CstLaunchStations.Numbers.A}
                ButtonCB={() => {
                  Select(CstLaunchStations.Numbers.A)
                }}
              />
            </div>
            <div className="cell medium-6">
              <ButtonWithLed
                LedOn
                LedColors={Cnst.LedColors}
                LedBackgroundColor={Cnst.LedBackgroundColor}
                LedCurrentColor={Stations[CstLaunchStations.Numbers.B].handleStatus}
                ButtonCaption={CstLaunchStations.Numbers.B}
                ButtonWidth={50}
                ButtonColor="grey"
                ButtonTextColor="darkblue"
                ButtonStatus={Selected === CstLaunchStations.Numbers.B}
                ButtonCB={() => {
                  Select(CstLaunchStations.Numbers.B)
                }}
              />
            </div>
          </div>
        </div>

        {/* Tubes */}
        <div className="cell medium-4 smallBorder">
          <p>{CstLaunchStations.Name.tubes}</p>
          <div className="grid-x">
            <div className="cell medium-6">
              <ButtonWithLed
                LedOn
                LedColors={Cnst.LedColors}
                LedBackgroundColor={Cnst.LedBackgroundColor}
                LedCurrentColor={Stations[CstLaunchStations.Numbers.romanOn].handleStatus}
                ButtonCaption={CstLaunchStations.Numbers.romanOn}
                ButtonWidth={50}
                ButtonColor="grey"
                ButtonTextColor="darkblue"
                ButtonStatus={Selected === CstLaunchStations.Numbers.romanOn}
                ButtonCB={() => {
                  Select(CstLaunchStations.Numbers.romanOn)
                }}
              />
            </div>
            <div className="cell medium-6">
              <ButtonWithLed
                LedOn
                LedColors={Cnst.LedColors}
                LedBackgroundColor={Cnst.LedBackgroundColor}
                LedCurrentColor={Stations[CstLaunchStations.Numbers.romanTwo].handleStatus}
                ButtonCaption={CstLaunchStations.Numbers.romanTwo}
                ButtonWidth={50}
                ButtonColor="grey"
                ButtonTextColor="darkblue"
                ButtonStatus={Selected === CstLaunchStations.Numbers.romanTwo}
                ButtonCB={() => {
                  Select(CstLaunchStations.Numbers.romanTwo)
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
              Caption={CstLaunchStations.Actions.remove}
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
              Caption={CstLaunchStations.Actions.fire}
              Width={230}
              Color="green"
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
