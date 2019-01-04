/* eslint-disable no-console */
import React from 'react'
import PropTypes from 'prop-types'

import Button from '../ControlElements/Button'
import Display from '../ControlElements/Display'
import { CstArmory, CstOrdnance } from '../../Constants'


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
              Caption={CstOrdnance.AA}
              Width={230}
              Color="grey"
              TextColor="darkblue"
              SetPressed={Selected === CstOrdnance.AA}
              cb={() => {
                SetSelected(CstOrdnance.AA)
              }}
            />
          </div>
          <div className="cell small-3">
            <Display Text={Amount[CstOrdnance.AA].toString().padStart(2, '0')} Width={50} />
          </div>
        </div>

        <div className="grid-x small-3">
          <div className="cell medium-9">
            <Button
              Caption={CstOrdnance.G}
              Width={230}
              Color="grey"
              TextColor="darkblue"
              SetPressed={Selected === CstOrdnance.G}
              cb={() => {
                SetSelected(CstOrdnance.G)
              }}
            />
          </div>
          <div className="cell small-3">
            <Display Text={Amount[CstOrdnance.G].toString().padStart(2, '0')} Width={50} />
          </div>
        </div>

        <div className="grid-x small-3">
          <div className="cell medium-9">
            <Button
              Caption={CstOrdnance.AS}
              Width={230}
              Color="grey"
              TextColor="darkblue"
              SetPressed={Selected === CstOrdnance.AS}
              cb={() => {
                SetSelected(CstOrdnance.AS)
              }}
            />
          </div>
          <div className="cell small-3">
            <Display Text={Amount[CstOrdnance.AS].toString().padStart(2, '0')} Width={50} />
          </div>
        </div>

        <div className="grid-x small-3">
          <div className="cell medium-9">
            <Button
              Caption={CstOrdnance.T}
              Width={230}
              Color="grey"
              TextColor="darkblue"
              SetPressed={Selected === CstOrdnance.T}
              cb={() => {
                SetSelected(CstOrdnance.T)
              }}
            />
          </div>
          <div className="cell small-3">
            <Display Text={Amount[CstOrdnance.T].toString().padStart(2, '0')} Width={50} />
          </div>
        </div>
      </div>


      {/* Send ordnance to Launch station */}
      <div className="medium-3 grid-y small-offset-1 smallBorder">
        <div className="cell small-4" />
        <div className="cell small-4">
          <Button
            Caption={CstArmory.Actions.load}
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
