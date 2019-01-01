/* eslint-disable no-console */
import React from 'react'
import PropTypes from 'prop-types'

import Button from '../ControlElements/Button'
import Display from '../ControlElements/Display'
import { Cnst } from '../../Constants'


const Armory = ({
  Selected, Amount, Loading, SetSelected, Load,
}) => (
  <div className="grid-container" id="ArmoryDisplay">
    <div className="grid-x">
      {/* Select ordnance */}
      <div className="cell"><p>Select ordnance</p></div>

      <div className="medium-8 grid-y smallBorder">

        <div className="grid-x small-3">
          <div className="cell medium-9">
            <Button
              Caption={Cnst.Ordnance.AA}
              Width={230}
              Color="grey"
              TextColor="darkblue"
              SetPressed={Selected === Cnst.Ordnance.AA}
              cb={() => {
                SetSelected(Cnst.Ordnance.AA)
              }}
            />
          </div>
          <div className="cell small-3">
            <Display Text={Amount[Cnst.Ordnance.AA].toString().padStart(2, '0')} Width={50} />
          </div>
        </div>

        <div className="grid-x small-3">
          <div className="cell medium-9">
            <Button
              Caption={Cnst.Ordnance.G}
              Width={230}
              Color="grey"
              TextColor="darkblue"
              SetPressed={Selected === Cnst.Ordnance.G}
              cb={() => {
                SetSelected(Cnst.Ordnance.G)
              }}
            />
          </div>
          <div className="cell small-3">
            <Display Text={Amount[Cnst.Ordnance.G].toString().padStart(2, '0')} Width={50} />
          </div>
        </div>

        <div className="grid-x small-3">
          <div className="cell medium-9">
            <Button
              Caption={Cnst.Ordnance.AS}
              Width={230}
              Color="grey"
              TextColor="darkblue"
              SetPressed={Selected === Cnst.Ordnance.AS}
              cb={() => {
                SetSelected(Cnst.Ordnance.AS)
              }}
            />
          </div>
          <div className="cell small-3">
            <Display Text={Amount[Cnst.Ordnance.AS].toString().padStart(2, '0')} Width={50} />
          </div>
        </div>

        <div className="grid-x small-3">
          <div className="cell medium-9">
            <Button
              Caption={Cnst.Ordnance.T}
              Width={230}
              Color="grey"
              TextColor="darkblue"
              SetPressed={Selected === Cnst.Ordnance.T}
              cb={() => {
                SetSelected(Cnst.Ordnance.T)
              }}
            />
          </div>
          <div className="cell small-3">
            <Display Text={Amount[Cnst.Ordnance.T].toString().padStart(2, '0')} Width={50} />
          </div>
        </div>
      </div>


      {/* Send ordnance to Launch station */}
      <div className="medium-3 grid-y small-offset-1 smallBorder">
        <div className="cell small-4" />
        <div className="cell small-4">
          <Button
            Caption={Cnst.Armory.Actions.load}
            Width={110}
            Color="grey"
            TextColor="darkblue"
            SetPressed={Loading}
            cb={Load}
          />
        </div>
        <div className="cell small-4" />
      </div>
    </div>
  </div>
)

Armory.propTypes = {
  Selected: PropTypes.string.isRequired,
  Amount: PropTypes.object.isRequired,
  Loading: PropTypes.bool.isRequired,

  SetSelected: PropTypes.func.isRequired,
  Load: PropTypes.func.isRequired,
}

export default Armory
