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
      <div className="grid-container" id="RadioPanel">
        <div className="grid-y">
          {/* INCOMING MESSAGE */}
          <div className="cell medium-1">
            <TimerLed
              Caption="Incoming message"
              Colors={Cnst.LedColors}
              BackgroundColor={Cnst.LedBackgroundColor}
              RunTimer={MessageIncoming}
              Time={Cnst.Game.Time.NewMessageTimeOut}
            />
          </div>
          {/* ACTION BUTTONS */}
          <div className="grid-x medium-11">
            <div className="grid-y large-4 smallBorder">

              <div className="cell medium-4">
                <Button
                  Color="grey"
                  Caption={Cnst.Radio.Actions.store}
                  TextColor="darkblue"
                  cb={() => {
                    this.ExecuteAction(Cnst.Radio.Actions.store)
                  }}
                  SetPressed={Buttons[Cnst.Radio.Actions.store]}
                />
              </div>

              <div className="cell medium-4">
                <Button
                  Color="grey"
                  Caption={Cnst.Radio.Actions.decode}
                  TextColor="darkblue"
                  cb={() => {
                    this.ExecuteAction(Cnst.Radio.Actions.decode)
                  }}
                  SetPressed={Buttons[Cnst.Radio.Actions.decode]}
                />
              </div>

              <div className="cell medium-4">
                <Button
                  Color="grey"
                  Caption={Cnst.Radio.Actions.erase}
                  TextColor="red"
                  cb={() => {
                    this.ExecuteAction(Cnst.Radio.Actions.erase)
                  }}
                  SetPressed={Buttons[Cnst.Radio.Actions.erase]}
                />
              </div>


            </div>

            <div className="grid- y small-1" />
            {/* STORAGE SLOTS */}
            <div className="cell large-7 smallBorder">
              <p className="text">Message slots</p>

              <div className="grid-x">
                {/* slot selector */}
                <div className="cell small-6">
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
                <div className="grid-y small-6">
                  <div className="cell medium-4">
                    <Display BackgroundColor="darkgrey" Title="1" Text={StatusSlots[0]} Width={100} />
                  </div>

                  <div className="cell medium-4">
                    <Display BackgroundColor="darkgrey" Title="2" Text={StatusSlots[1]} Width={100} />
                  </div>

                  <div className="cell medium-4">
                    <Display BackgroundColor="darkgrey" Title="3" Text={StatusSlots[2]} Width={100} />
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
