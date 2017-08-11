/* eslint-disable no-console */
import React from 'react'
import PropTypes from 'prop-types'

import Cnst from '../../Constands'
import Led from '../ControlElements/Led'
import Button from '../ControlElements/Button'
import Display from '../ControlElements/Display'
import Selector from '../ControlElements/Selector'

export default class Radio extends React.Component {
  constructor(props) {
    super(props)
    this.state = InitState
  }

  NewMessage() {
    // start incoming timer led
    this.setState({ IncomingMessage: true, IncomingTimer: 20 })
  }

  SelectedOtherSlot(slot) {
    this.setState({ SelectedSlot: slot })
    console.log('Radio slot ' + slot + ' selected.')
  }

  ExecuteAction(action) {
    // start action 
    console.log('Start Radio action ' + action + ' on slot ' + this.state.SelectedSlot)
    this.props.ChangeStatus(Cnst.Stations.Radio, 'Start ' + action + ' on slot ' + this.state.SelectedSlot)

    // temp slot status, needs to move to FLux
    let UpdateButtons = this.state.Buttons
    UpdateButtons[action.toLowerCase()] = true
    this.setState({ Buttons: UpdateButtons })

    setTimeout(() => {
      // end action
      console.log('End Radio action ' + action + ' on slot ' + this.state.SelectedSlot)
      this.props.ChangeStatus(Cnst.Stations.Radio, Cnst.Status.idle)

      UpdateButtons[action.toLowerCase()] = false
      this.setState({ Buttons: UpdateButtons })

      // show new status is selected slot
      let UpdateSlots = this.state.Slots

      UpdateSlots[this.state.SelectedSlot].status = Cnst.Radio.Results[action.toLowerCase()]
      this.setState({ Slots: UpdateSlots })
    }
      , 1000)
  }


  render() {
    return (
      <div className='' id='RadioPanel' >
        {/* INCOMING MESSAGE */}
        <Led Caption='Incoming message' On={this.state.IncomingMessage} Colors={['green', 'orange', 'red']} BackgroundColor={'Gainsboro'}
          Blinking={true} Timer={this.state.IncomingTimer} />

        <div className='grid-container'>
          <div className='grid-x'>
            {/* ACTION BUTTONS */}
            <div className='cell large-4' >
              <div className='grid-y'>
                <div className='cell medium-4'>
                  <Button Color='slategrey' Caption={Cnst.Radio.Actions.store} TextColor='yellow'
                    cb={this.ExecuteAction.bind(this)} SetPressed={this.state.Buttons.store} />
                </div>

                <div className='cell medium-4'>
                  <Button Color='slategrey' Caption={Cnst.Radio.Actions.decode} TextColor='yellow'
                    cb={this.ExecuteAction.bind(this)} SetPressed={this.state.Buttons.decode} />
                </div>

                <div className='cell medium-4'>
                  <Button Color='slategrey' Caption={Cnst.Radio.Actions.erase} TextColor='red'
                    cb={this.ExecuteAction.bind(this)} SetPressed={this.state.Buttons.erase} />
                </div>

              </div>
            </div>

            {/* STORAGE SLOTS */}
            <div className='cell large-8' >
              <p className='text'>SLOTS</p>

              <div className='grid-x'>
                {/* slot selector */}
                <div className='cell small-5 small-offset-1' >
                  <Selector Amount={3} r={60} cb={this.SelectedOtherSlot.bind(this)} Selected={this.state.SelectedSlot} />
                </div>

                {/* slot displays */}
                <div className='grid-y small-5' >
                  <div className='cell medium-4'>
                    <Display BackgroundColor='darkgrey' Title='1' Text={this.state.Slots[1].status} Width={100} />
                  </div>

                  <div className='cell medium-4'>
                    <Display BackgroundColor='darkgrey' Title='2' Text={this.state.Slots[2].status} Width={100} />
                  </div>

                  <div className='cell medium-4'>
                    <Display BackgroundColor='darkgrey' Title='3' Text={this.state.Slots[3].status} Width={100} />
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    )
  }
}

const InitState = {
  IncomingMessage: false,
  Slots: [{}, { status: 'Empty' }, { status: 'Empty' }, { status: 'Empty' }],
  Buttons: { 'store': false, 'decode': false, 'erase': false },
  SelectedSlot: 1
}


Radio.propTypes = {
  IncomingMessage: PropTypes.bool,
  ChangeStatus: PropTypes.func.isRequired
}