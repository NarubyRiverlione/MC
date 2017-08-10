/* eslint-disable no-console */
import React from 'react'
import PropTypes from 'prop-types'

import Led from './Led'
import Button from './Button'
import Display from './Display'
import Selector from './Selector'

export default class Radio extends React.Component {
  constructor(props) {
    super(props)
    this.state = InitState
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  NewMessage() {
    // start incoming timer led
    this.setState({ IncomingMessage: true, IncomingTimer: 20 })
  }

  NewSelectedSlot(slot) {
    this.setState({ SelectedSlot: slot })
    console.log('Radio slot ' + slot + ' selected.')
  }

  ExecuteAction(action) {
    // start action 
    console.log('Start Radio action ' + action + ' on slot ' + this.state.SelectedSlot)
    // temp slot status, needs to move to FLux
    let UpdateButtons = this.state.Buttons
    UpdateButtons[action.toLowerCase()] = true
    this.setState({ Buttons: UpdateButtons })

    setTimeout(() => {
      // end action
      console.log('End Radio action ' + action + ' on slot ' + this.state.SelectedSlot)
      UpdateButtons[action.toLowerCase()] = false
      this.setState({ Buttons: UpdateButtons })
      // show new status is selected slot
      let UpdateSlots = this.state.Slots
      let DisplayText
      switch (action.toLowerCase()) {
        case 'store':
          DisplayText = 'Encrypted'; break
        case 'decode':
          DisplayText = 'Decrypted'; break
        case 'erase':
          DisplayText = 'Empty'; break
        default:
          DisplayText = 'UNKOWN !'; break

      }
      UpdateSlots[this.state.SelectedSlot].status = DisplayText
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
            <div className='cell medium-5' >
              <div className='grid-y'>
                <div className='cell medium-4'>
                  <Button Color='slategrey' Caption='STORE' TextColor='yellow' cb={this.ExecuteAction.bind(this)} SetPressed={this.state.Buttons.store} />
                </div>

                <div className='cell medium-4'>
                  <Button Color='slategrey' Caption='DECODE' TextColor='yellow' cb={this.ExecuteAction.bind(this)} SetPressed={this.state.Buttons.decode} />
                </div>

                <div className='cell medium-4'>
                  <Button Color='slategrey' Caption='ERASE' TextColor='red' cb={this.ExecuteAction.bind(this)} SetPressed={this.state.Buttons.erase} />
                </div>

              </div>
            </div>

            {/* STORAGE SLOTS */}
            <div className='cell medium-7' >
              <p className='text'>SLOTS</p>

              <div className='grid-x'>
                {/* slot selector */}
                <div className='cell medium-6' >
                  <Selector Amount={3} r={40} cb={this.NewSelectedSlot.bind(this)} Selected={this.state.SelectedSlot} />
                </div>

                {/* slot displays */}
                <div className='cell medium-6' >
                  <div className='grid-y'>

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
      </div>
    )
  }
}

const InitState = {
  IncomingMessage: false,
  Slots: [{}, { status: 'Empty' }, { status: 'Empty' }, { status: 'Empty' }],
  Buttons: { 'store': false, 'decode': false, 'erase': false },
  SelectedSlot: 3
}


Radio.propTypes = {
  IncomingMessage: PropTypes.bool
}