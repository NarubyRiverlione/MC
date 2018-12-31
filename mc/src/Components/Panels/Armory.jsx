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
      <div className="medium-7 grid-y">
        <div className="cell small-2"><p>Select ordnance</p></div>
        <div className="cell small-2">
          <Button
            Caption={Cnst.Ordnance.AA}
            Width={250}
            Color="slategrey"
            TextColor="yellow"
            SetPressed={Selected === Cnst.Ordnance.AA}
            cb={() => {
              SetSelected(Cnst.Ordnance.AA)
            }}
          />
        </div>
        <div className="cell small-2">
          <Button
            Caption={Cnst.Ordnance.G}
            Width={250}
            Color="slategrey"
            TextColor="yellow"
            SetPressed={Selected === Cnst.Ordnance.G}
            cb={() => {
              SetSelected(Cnst.Ordnance.G)
            }}
          />
        </div>
        <div className="cell small-2">
          <Button
            Caption={Cnst.Ordnance.AS}
            Width={250}
            Color="slategrey"
            TextColor="yellow"
            SetPressed={Selected === Cnst.Ordnance.AS}
            cb={() => {
              SetSelected(Cnst.Ordnance.AS)
            }}
          />
        </div>
        <div className="cell small-2">
          <Button
            Caption={Cnst.Ordnance.T}
            Width={250}
            Color="slategrey"
            TextColor="yellow"
            SetPressed={Selected === Cnst.Ordnance.T}
            cb={() => {
              SetSelected(Cnst.Ordnance.T)
            }}
          />
        </div>
        <div className="cell small-2">
          <Button
            Caption={Cnst.Ordnance.D}
            Width={250}
            Color="slategrey"
            TextColor="yellow"
            SetPressed={Selected === Cnst.Ordnance.D}
            cb={() => {
              SetSelected(Cnst.Ordnance.D)
            }}
          />
        </div>
      </div>


      {/* amount in store */}
      <div className="medium-2 grid-y">
        <div className="cell small-2"><p># store</p></div>
        <div className="cell small-2"><Display Text={Amount[Cnst.Ordnance.AA].toString().padStart(2, '0')} Width={50} /></div>
        <div className="cell small-2"><Display Text={Amount[Cnst.Ordnance.G].toString().padStart(2, '0')} Width={50} /></div>
        <div className="cell small-2"><Display Text={Amount[Cnst.Ordnance.AS].toString().padStart(2, '0')} Width={50} /></div>
        <div className="cell small-2"><Display Text={Amount[Cnst.Ordnance.T].toString().padStart(2, '0')} Width={50} /></div>
        <div className="cell small-2"><Display Text={Amount[Cnst.Ordnance.D].toString().padStart(2, '0')} Width={50} /></div>
      </div>

      {/* Send ordnance to Launch station */}
      <div className="large-3 grid-y">
        <div className="cell small-5" />
        <div className="cell small-4">
          <Button
            Caption={Cnst.Armory.Actions.load}
            Width={120}
            Color="slategrey"
            TextColor="yellow"
            SetPressed={Loading}
            cb={Load}
          />
        </div>
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
