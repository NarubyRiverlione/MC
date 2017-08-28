/* eslint-disable no-console */
import React from 'react'
// import PropTypes from 'prop-types'

import { Cnst } from '../../Constants'

import radioStore from '../../Stores/RadioStore'
import * as RadioActions from '../../Actions/RadioActions'

import TimerLed from '../ControlElements/TimerLed'
import Button from '../ControlElements/Button'
import Display from '../ControlElements/Display'
import Selector from '../ControlElements/Selector'

export default class Radio extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      IncomingMessage: radioStore.NewMessage,
      Slots: radioStore.Slots.map(sl => sl.status),
      Buttons: {},
      SelectedSlot: radioStore.Selected
    }
  }

  ReleaseButtons() {
    let Buttons = {}
    Buttons[Cnst.Radio.Actions.store] = false
    Buttons[Cnst.Radio.Actions.decode] = false
    Buttons[Cnst.Radio.Actions.erase] = false
    this.setState({ Buttons })
  }

  SelectedOtherSlot(slot) {
    RadioActions.SelectSlot(slot)
  }

  ExecuteAction(cmd) {
    // hold pressed button down
    let Buttons = this.state.Buttons
    Buttons[cmd] = true
    this.setState({ Buttons })

    RadioActions.ExecuteCmd(cmd)
  }

  NewMessageTimedOut() {
    // Timeout is handle with timer in GameStore, not via view-action
  }

  componentWillMount() {
    radioStore.on(Cnst.Radio.Emit.UpdateNewMessage, () => {
      console.log('RADIO: UpdateNewMessage: ' + radioStore.NewMessage)
      this.setState({ IncomingMessage: radioStore.NewMessage })
    })

    radioStore.on(Cnst.Radio.Emit.SlotChanged, () => {
      //     console.log('RADIO: selected slot: ' + radioStore.Selected)
      this.setState({ SelectedSlot: radioStore.Selected })
    })

    radioStore.on(Cnst.Radio.Emit.DoneCmd, () => {
      // release all buttons
      this.ReleaseButtons()
    })

    radioStore.on(Cnst.Radio.Emit.ChangeSlot, () => {
      this.setState({ Slots: radioStore.Slots.map(sl => sl.status) })
    })
  }

  componentDidMount() {
    this.ReleaseButtons()
  }

  render() {
    return (
      <div className='' id='RadioPanel' >
        {/* INCOMING MESSAGE */}
        <TimerLed
          Caption='Incoming message'
          Colors={Cnst.LedColors} BackgroundColor={Cnst.LedBackgroundColor}
          RunTimer={this.state.IncomingMessage}
          Time={Cnst.Game.Time.NewMessageTimeOut}
          TimerDoneCB={this.NewMessageTimedOut.bind(this)}
        />

        <div className='grid-container'>
          <div className='grid-x'>
            {/* ACTION BUTTONS */}
            <div className='cell large-4' >
              <div className='grid-y'>
                <div className='cell medium-4'>
                  <Button Color='slategrey' Caption={Cnst.Radio.Actions.store} TextColor='yellow'
                    cb={this.ExecuteAction.bind(this)} SetPressed={this.state.Buttons[Cnst.Radio.Actions.store]} />
                </div>

                <div className='cell medium-4'>
                  <Button Color='slategrey' Caption={Cnst.Radio.Actions.decode} TextColor='yellow'
                    cb={this.ExecuteAction.bind(this)} SetPressed={this.state.Buttons[Cnst.Radio.Actions.decode]} />
                </div>

                <div className='cell medium-4'>
                  <Button Color='slategrey' Caption={Cnst.Radio.Actions.erase} TextColor='red'
                    cb={this.ExecuteAction.bind(this)} SetPressed={this.state.Buttons[Cnst.Radio.Actions.erase]} />
                </div>

              </div>
            </div>

            {/* STORAGE SLOTS */}
            <div className='cell large-8' >
              <p className='text'>SLOTS</p>

              <div className='grid-x'>
                {/* slot selector */}
                <div className='cell small-5 small-offset-1' >
                  <Selector Amount={3} r={60}
                    cb={this.SelectedOtherSlot.bind(this)}
                    Selected={this.state.SelectedSlot} />
                </div>

                {/* slot displays */}
                <div className='grid-y small-5' >
                  <div className='cell medium-4'>
                    <Display BackgroundColor='darkgrey' Title='1' Text={this.state.Slots[0]} Width={100} />
                  </div>

                  <div className='cell medium-4'>
                    <Display BackgroundColor='darkgrey' Title='2' Text={this.state.Slots[1]} Width={100} />
                  </div>

                  <div className='cell medium-4'>
                    <Display BackgroundColor='darkgrey' Title='3' Text={this.state.Slots[2]} Width={100} />
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