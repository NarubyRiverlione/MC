/* eslint-disable no-console */
import React from 'react'
//import PropTypes from 'prop-types'

import Button from '../ControlElements/Button'
import Display from '../ControlElements/Display'
import Cnst from '../../Constands'

export default class Radio extends React.Component {
  constructor(props) {
    super(props)
    this.state = InitState
  }


  SetSelected(caption) {
    this.state.Selected === caption ? this.setState({ Selected: '' }) : this.setState({ Selected: caption })
  }

  Load() {
    console.log('Load ' + this.state.Selected)
  }

  render() {
    return (
      <div className='grid-container' id='ArmoryDisplay'>
        <div className='grid-x'>
          {/* Select ordnace */}
          <div className='small-7 grid-y'>
            <div className='cell small-2'><p>Select Cnst.Ordnance</p></div>
            <div className='cell small-2'>
              <Button Caption={Cnst.Ordnance.AA} Width={250} Color='slategrey' TextColor='yellow'
                SetPressed={this.state.Selected === Cnst.Ordnance.AA} cb={this.SetSelected.bind(this)}
              />
            </div>
            <div className='cell small-2'>
              <Button Caption={Cnst.Ordnance.G} Width={250} Color='slategrey' TextColor='yellow'
                SetPressed={this.state.Selected === Cnst.Ordnance.G} cb={this.SetSelected.bind(this)}
              />
            </div>
            <div className='cell small-2'>
              <Button Caption={Cnst.Ordnance.AS} Width={250} Color='slategrey' TextColor='yellow'
                SetPressed={this.state.Selected === Cnst.Ordnance.AS} cb={this.SetSelected.bind(this)}
              />
            </div>
            <div className='cell small-2'>
              <Button Caption={Cnst.Ordnance.T} Width={250} Color='slategrey' TextColor='yellow'
                SetPressed={this.state.Selected === Cnst.Ordnance.T} cb={this.SetSelected.bind(this)}
              />
            </div>
            <div className='cell small-2'>
              <Button Caption={Cnst.Ordnance.D} Width={250} Color='slategrey' TextColor='yellow'
                SetPressed={this.state.Selected === Cnst.Ordnance.D} cb={this.SetSelected.bind(this)}
              />
            </div>
          </div>


          {/* amount in store */}
          <div className='small-2 grid-y'>
            <div className='cell small-2'><p># store</p></div>
            <div className='cell small-2'><Display Text={this.state.Amount.AA.toString().padStart(2, '0')} Width={50} /></div>
            <div className='cell small-2'><Display Text={this.state.Amount.G.toString().padStart(2, '0')} Width={50} /></div>
            <div className='cell small-2'><Display Text={this.state.Amount.AS.toString().padStart(2, '0')} Width={50} /></div>
            <div className='cell small-2'><Display Text={this.state.Amount.T.toString().padStart(2, '0')} Width={50} /></div>
            <div className='cell small-2'><Display Text={this.state.Amount.D.toString().padStart(2, '0')} Width={50} /></div>
          </div>

          {/* Send ordnace to Launch station */}
          <div className='small-3 grid-y'>
            <div className='cell small-5' />
            <div className='cell small-4'>
              <Button Caption='LOAD' Width={100} Color='slategrey' TextColor='yellow'
                SetPressed={this.state.Loading} cb={this.Load.bind(this)}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const InitState = {
  Amount: { AA: 9, G: 5, AS: 2, T: 2, D: 20 },
  Selected: '',
  Loading: false
}

