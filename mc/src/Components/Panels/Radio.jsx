/* eslint-disable no-console */
import React from 'react'
import PropTypes from 'prop-types'

import { Cnst } from '../../Constants'

import TimerLed from '../ControlElements/TimerLed'
import Button from '../ControlElements/Button'
import Display from '../ControlElements/Display'
import Selector from '../ControlElements/Selector'


export default class Radio extends React.Component {
  ExecuteAction(cmd) {
    // hold pressed button down
    const { ExecuteCmd, UpdateButton } = this.props
    UpdateButton(cmd, true)
    ExecuteCmd(cmd)
  }

  render() {
    const {
      MessageIncoming, Buttons, StatusSlots, SelectedSlot,
      SelectSlot,
    } = this.props

    return (
      <div className="" id="RadioPanel">
        {/* INCOMING MESSAGE */}
        <TimerLed
          Caption="Incoming message"
          Colors={Cnst.LedColors}
          BackgroundColor={Cnst.LedBackgroundColor}
          RunTimer={MessageIncoming}
          Time={Cnst.Game.Time.NewMessageTimeOut}
        />

        <div className="grid-container">
          <div className="grid-x">
            {/* ACTION BUTTONS */}
            <div className="cell large-4">
              <div className="grid-y">
                <div className="cell medium-4">
                  <Button
                    Color="slategrey"
                    Caption={Cnst.Radio.Actions.store}
                    TextColor="yellow"
                    cb={() => {
                      this.ExecuteAction(Cnst.Radio.Actions.store)
                    }}
                    SetPressed={Buttons[Cnst.Radio.Actions.store]}
                  />
                </div>

                <div className="cell medium-4">
                  <Button
                    Color="slategrey"
                    Caption={Cnst.Radio.Actions.decode}
                    TextColor="yellow"
                    cb={() => {
                      this.ExecuteAction(Cnst.Radio.Actions.decode)
                    }}
                    SetPressed={Buttons[Cnst.Radio.Actions.decode]}
                  />
                </div>

                <div className="cell medium-4">
                  <Button
                    Color="slategrey"
                    Caption={Cnst.Radio.Actions.erase}
                    TextColor="red"
                    cb={() => {
                      this.ExecuteAction(Cnst.Radio.Actions.erase)
                    }}
                    SetPressed={Buttons[Cnst.Radio.Actions.erase]}
                  />
                </div>

              </div>
            </div>

            {/* STORAGE SLOTS */}
            <div className="cell large-8">
              <p className="text">SLOTS</p>

              <div className="grid-x">
                {/* slot selector */}
                <div className="cell small-5 small-offset-1">
                  <Selector
                    Amount={3}
                    r={60}
                    cb={(Selected) => {
                      SelectSlot(Selected)
                    }}
                    Selected={SelectedSlot}
                  />
                </div>

                {/* slot displays */}
                <div className="grid-y small-5">
                  <div className="cell medium-4">
                    <Display BackgroundColor="darkgrey" Title="1" Text={StatusSlots[0]} Width={120} />
                  </div>

                  <div className="cell medium-4">
                    <Display BackgroundColor="darkgrey" Title="2" Text={StatusSlots[1]} Width={120} />
                  </div>

                  <div className="cell medium-4">
                    <Display BackgroundColor="darkgrey" Title="3" Text={StatusSlots[2]} Width={120} />
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

Radio.propTypes = {
  MessageIncoming: PropTypes.bool.isRequired,
  StatusSlots: PropTypes.array.isRequired,
  Buttons: PropTypes.array.isRequired,
  SelectedSlot: PropTypes.number.isRequired,

  SelectSlot: PropTypes.func.isRequired,
  ExecuteCmd: PropTypes.func.isRequired,
  UpdateButton: PropTypes.func.isRequired,
}
