/* eslint-disable no-console */
import React from 'react'
//import PropTypes from 'prop-types'

import Button from '../ControlElements/Button'
import Display from '../ControlElements/Display'
import { Cnst } from '../../Constants'

import * as ArmoryActions from '../../Actions/ArmoryActions'
import armoryStore from '../../Stores/ArmoryStore'

export default class Armory extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      Selected: armoryStore.Selected,
      Loading: armoryStore.Loading,
      Amount: armoryStore.Amount
    }
  }

  SetSelected(caption) {
    ArmoryActions.Select(caption)
    // armoryStore.Selected === caption ? this.setState({ Selected: '' }) : this.setState({ Selected: caption })
  }

  Load() {
    ArmoryActions.Load()
    console.log('Load ' + armoryStore.Selected)
  }

  componentDidMount() {
    armoryStore.on(Cnst.Armory.Emit.selected, () => {
      console.log('Armory  ' + armoryStore.selected + ' selected.')
      this.setState({ Selected: armoryStore.Selected })
    })

    armoryStore.on(Cnst.Armory.Emit.loading, () => {
      console.log('Armory start loading ' + armoryStore.selected + '.')
      this.setState({ Loading: armoryStore.loading })
    })

  }
  render() {
    return (
      <div className='grid-container' id='ArmoryDisplay'>
        <div className='grid-x'>
          {/* Select ordnace */}
          <div className='medium-7 grid-y'>
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
          <div className='medium-2 grid-y'>
            <div className='cell small-2'><p># store</p></div>
            <div className='cell small-2'><Display Text={this.state.Amount.AA.toString().padStart(2, '0')} Width={50} /></div>
            <div className='cell small-2'><Display Text={this.state.Amount.G.toString().padStart(2, '0')} Width={50} /></div>
            <div className='cell small-2'><Display Text={this.state.Amount.AS.toString().padStart(2, '0')} Width={50} /></div>
            <div className='cell small-2'><Display Text={this.state.Amount.T.toString().padStart(2, '0')} Width={50} /></div>
            <div className='cell small-2'><Display Text={this.state.Amount.D.toString().padStart(2, '0')} Width={50} /></div>
          </div>

          {/* Send ordnace to Launch station */}
          <div className='large-3 grid-y'>
            <div className='cell small-5' />
            <div className='cell small-4'>
              <Button Caption={Cnst.Armory.Actions.load} Width={100} Color='slategrey' TextColor='yellow'
                SetPressed={this.state.Loading} cb={this.Load.bind(this)}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

