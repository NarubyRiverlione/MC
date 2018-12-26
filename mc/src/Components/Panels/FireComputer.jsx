/* eslint-disable no-console */
import React from 'react'
// import PropTypes from 'prop-types'

import { Cnst } from '../../Constants'
import Button from '../ControlElements/Button'
import Display from '../ControlElements/Display'
import Selector from '../ControlElements/Selector'

import firecomputersStore from '../../Stores/FireComputersStore'
import * as FireComputerActions from '../../Actions/FireComputersActions'


const SelectMsg = (slot) => {
  FireComputerActions.SelectSlot(slot)
}

const SelectFC = (fc) => {
  FireComputerActions.SelectFC(fc)
}

const Read = () => {
  FireComputerActions.ReadMsg()
}

const Send = () => {
  FireComputerActions.SendMission()
}

export default class FireComputer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      SelectedFC: firecomputersStore.SelectedFC,
      SelectedMsg: firecomputersStore.SelectedMsgSlot,
      FCStates: firecomputersStore.FCS.map(fc => fc.status),
      Reading: firecomputersStore.Reading,
      Sending: firecomputersStore.Sending,
    }
  }

  componentDidMount() {
    firecomputersStore.on(Cnst.FireComputers.Emit.FCselected, () => {
      //    console.log('FireComputer  ' + firecomputersStore.SelectedFC + ' selected.')
      this.setState({ SelectedFC: firecomputersStore.SelectedFC })
    })

    firecomputersStore.on(Cnst.FireComputers.Emit.msgSlotChanged, () => {
      //     console.log('FireComputer  msg slot ' + firecomputersStore.SelectedMsgSlot + ' selected.')
      this.setState({ SelectedMsg: firecomputersStore.SelectedMsgSlot })
    })

    firecomputersStore.on(Cnst.FireComputers.Emit.FCisReading, () => {
      this.setState({ Reading: firecomputersStore.Reading })
    })
    // at the moment FCupdateReading and FCdoneReading are same, may be later need to trigger other thing
    firecomputersStore.on(Cnst.FireComputers.Emit.FCdoneReading, () => {
      this.setState({ Reading: firecomputersStore.Reading })
    })

    firecomputersStore.on(Cnst.FireComputers.Emit.FCisSending, () => {
      this.setState({ Send: firecomputersStore.Sending })
    })
    // at the moment FCisSending and FCdoneSending are same, may be later need to trigger other thing
    firecomputersStore.on(Cnst.FireComputers.Emit.FCdoneSending, () => {
      this.setState({ Reading: firecomputersStore.Sending })
    })

    firecomputersStore.on(Cnst.FireComputers.Emit.FCupdateStatus, () => {
      this.setState({ FCStates: firecomputersStore.FCS.map(fc => fc.status) })
    })
  }


  ShowStatusSelectedFC() {
    const { SelectedFC, FCStates } = this.state
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
      Sending, SelectedFC, SelectedMsg, Reading,
    } = this.state

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
                  Caption="A"
                  Width={50}
                  TextColor="yellow"
                  Color="slategrey"
                  SetPressed={SelectedFC === 'A'}
                  cb={SelectFC()}
                />
              </div>

              <div className="cell large-2">
                <Button
                  Caption="B"
                  Width={50}
                  TextColor="yellow"
                  Color="slategrey"
                  Title=""
                  SetPressed={SelectedFC === 'B'}
                  cb={SelectFC()}
                />
              </div>

              <div className="cell large-6">
                <Display Width={250} Text={this.ShowStatusSelectedFC.bind(this)()} />
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
                    Selected={SelectedMsg}
                    cb={SelectMsg()}
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
                  cb={Read()}
                />
              </div>

              <div className="cell small-4">
                <Button
                  Caption={Cnst.FireComputers.Actions.send}
                  Width={325}
                  TextColor="yellow"
                  Color="slategrey"
                  SetPressed={Sending}
                  cb={Send()}
                />
              </div>

            </div>
          </div>
        </div>
      </div>
    )
  }
}
