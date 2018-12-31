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
          <div className="cell medium-4">
            <div className="grid-x">
              <div className="cell large-2">
                <p className="text">Select</p>
              </div>

              <div className="cell large-2">
                <Button
                  Caption={Cnst.FireComputers.Name.A}
                  Width={50}
                  TextColor="yellow"
                  Color="slategrey"
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
                  TextColor="yellow"
                  Color="slategrey"
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

          </div>
          {/* Select Msg + actions */}
          <div className="grid-x medium-8">

            {/* msg selector */}
            <div className="cell small-4">
              <p>Select Slot</p>
              <div className="grid-x">
                <div className="cell medium-1 ">
                  <p>1</p>
                  <p>2</p>
                  <p>3</p>
                </div>
                <div className="cell medium-10 medium-offset-1">
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
            {/* action buttons */}
            <div className="small-8 grid-y">
              <div className="cell small-2" />

              <div className="cell small-4">
                <Button
                  Caption={Cnst.FireComputers.Actions.read}
                  Width={325}
                  TextColor="yellow"
                  Color="slategrey"
                  SetPressed={Reading}
                  cb={() => {
                    ReadMsg()
                  }}
                />
              </div>

              <div className="cell small-4">
                <Button
                  Caption={Cnst.FireComputers.Actions.send}
                  Width={325}
                  TextColor="yellow"
                  Color="slategrey"
                  SetPressed={Sending}
                  cb={() => {
                    SendMission()
                  }}
                />
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
