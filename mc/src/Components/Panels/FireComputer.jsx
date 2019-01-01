/* eslint-disable no-console */
import React from 'react'
import PropTypes from 'prop-types'

import { Cnst } from '../../Constants'
import Button from '../ControlElements/Button'
import Display from '../ControlElements/Display'
import Selector from '../ControlElements/Selector'


export default class FireComputer extends React.Component {
  ShowStatusSelectedFC() {
    const { SelectedFC, FCStates } = this.props
    switch (SelectedFC) {
      case Cnst.FireComputers.Name.A:
        return FCStates[0]
      case Cnst.FireComputers.Name.B:
        return FCStates[1]
      default:
        return ''
    }
  }


  render() {
    const {
      Sending, SelectedFC, SelectedMsgSlot, Reading,
      SelectFC, SelectSlot, ReadMsg, SendMission,
    } = this.props

    return (
      <div className="grid-container" id="FireComputerPanel">
        <div className="grid-y">
          {/* Select FC */}
          <div className="grid-x medium-1 smallBorder">
            <div className="cell large-2">
              <p className="text">Select</p>
            </div>

            <div className="cell large-2">
              <Button
                Caption={Cnst.FireComputers.Name.A}
                Width={50}
                TextColor="darkblue"
                Color="grey"
                SetPressed={SelectedFC === Cnst.FireComputers.Name.A}
                cb={(Selected) => {
                  SelectFC(Selected)
                }}
              />
            </div>

            <div className="cell large-2">
              <Button
                Caption={Cnst.FireComputers.Name.B}
                Width={50}
                TextColor="darkblue"
                Color="grey"
                Title=""
                SetPressed={SelectedFC === Cnst.FireComputers.Name.B}
                cb={(Selected) => {
                  SelectFC(Selected)
                }}
              />
            </div>

            <div className="cell large-6">
              <Display
                Width={250}
                Text={this.ShowStatusSelectedFC()}
              />
            </div>
          </div>

          <div className="cell medium-1">
            <br />
          </div>

          {/* Select Msg + actions */}
          <div className="grid-x medium-10">

            {/* msg selector */}
            <div className="cell small-4 smallBorder">
              <p>Msg slots</p>
              <div className="grid-x">
                <div className="cell medium-1 medium-offset-1">
                  <p>1</p>
                  <p>2</p>
                  <p>3</p>
                </div>
                <div className="cell medium-8 medium-offset-1">
                  <Selector
                    Amount={3}
                    r={50}
                    Side="L"
                    StartSelected={SelectedMsgSlot}
                    cb={(Selected) => {
                      SelectSlot(Selected)
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="cell small-1" />

            {/* action buttons */}
            <div className="small-7 grid-y">
              <div className="small-6 cell smallBorder">
                <div className="cell small-6">
                  <Button
                    Caption="READ message"
                    Width={270}
                    TextColor="darkblue"
                    Color="grey"
                    SetPressed={Reading}
                    cb={ReadMsg}
                  />
                </div>
                <div className="cell small-6 LedText" style={{ margin: 0 }}>
                  {Cnst.FireComputers.Actions.read}
                </div>
              </div>

              <div className="cell small-1" />

              <div className="cell small-5 smallBorder">
                <div className="cell small-6">
                  <Button
                    Caption="SEND mission"
                    Width={270}
                    TextColor="darkblue"
                    Color="grey"
                    SetPressed={Sending}
                    cb={SendMission}
                  />
                </div>
                <div className="cell small-6 LedText" style={{ margin: 0 }}>
                  {Cnst.FireComputers.Actions.send}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

FireComputer.propTypes = {
  Sending: PropTypes.bool.isRequired,
  Reading: PropTypes.bool.isRequired,
  SelectedFC: PropTypes.string.isRequired,
  SelectedMsgSlot: PropTypes.number.isRequired,
  FCStates: PropTypes.array.isRequired,

  SelectSlot: PropTypes.func.isRequired,
  SelectFC: PropTypes.func.isRequired,
  ReadMsg: PropTypes.func.isRequired,
  SendMission: PropTypes.func.isRequired,
}
