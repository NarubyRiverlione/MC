/* eslint-disable no-console */
import React from 'react'
// import PropTypes from 'prop-types'

import { Cnst } from '../../Constants'
import Button from '../ControlElements/Button'
import Display from '../ControlElements/Display'
import Selector from '../ControlElements/Selector'

import firecomputersStore from '../../Stores/FireComputersStore'
import * as FireComputerActions from '../../Actions/FireComputersActions'

export default class FireComputer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      SelectedFC: firecomputersStore.SelectedFC,
      FCStatus: firecomputersStore.FCStatus,
      Reading: firecomputersStore.Reading,
      Sending: firecomputersStore.Sending
    }
  }

  componentDidMount() {
    firecomputersStore.on(Cnst.FireComputers.Emit.FCselected, () => {
      console.log('FireComputer  ' + firecomputersStore.SelectedFC + ' selected.')
      this.setState({ SelectedFC: firecomputersStore.SelectedFC })
    })

    firecomputersStore.on(Cnst.FireComputers.Emit.msgSlotChanged, () => {
      console.log('FireComputer  msg slot ' + firecomputersStore.SelectedMsgSlot + ' selected.')
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
      this.setState({ Reading: firecomputersStore.Sending  })
    })

    firecomputersStore.on(Cnst.FireComputers.Emit.FCupdateStatus, () => {
      this.setState({ FCStatus: firecomputersStore.FCStatus })
    })
  }


  SelectMsg(slot) {
    FireComputerActions.SelectSlot(slot)
  }

  SelectFC(fc) {
    FireComputerActions.SelectFC(fc)
  }

  ShowStatusSelectedFC() {
    return this.state.SelectedFC === '' ? '' : this.state.FCStatus[this.state.SelectedFC]
  }

  Read() {
    FireComputerActions.ReadMsg()
  }

  Send() {

  }

  render() {
    return (
      <div className='grid-container' id='FireComputerPanel'>
        <div className='grid-y'>
          {/* Select FC*/}
          <div className='cell medium-4'>
            <div className='grid-x'>
              <div className='cell large-2'>
                <p className='text'>Select</p>
              </div>

              <div className='cell large-2'>
                <Button Caption='A' Width={50} TextColor='yellow' Color='slategrey'
                  SetPressed={this.state.SelectedFC === 'A' ? true : false} cb={this.SelectFC.bind(this)} />
              </div>

              <div className='cell large-2'>
                <Button Caption='B' Width={50} TextColor='yellow' Color='slategrey' Title=''
                  SetPressed={this.state.SelectedFC === 'B' ? true : false} cb={this.SelectFC.bind(this)} />
              </div>

              <div className='cell large-6'>
                <Display Width={250} Text={this.ShowStatusSelectedFC.bind(this)()} />
              </div>
            </div>

          </div>
          {/* Select Msg + actions */}
          <div className='grid-x medium-8'>

            {/* msg selector */}
            <div className='cell small-4'>
              <p>Select Slot</p>
              <div className='grid-x'>
                <div className='cell medium-1 '>
                  <p>1</p>
                  <p>2</p>
                  <p>3</p>
                </div>
                <div className='cell medium-10 medium-offset-1'>
                  <Selector Amount={3} r={50} Side='L'
                    Selected={this.state.SelectedMsg} cb={this.SelectMsg.bind(this)} />
                </div>
              </div>
            </div>
            {/* action buttons*/}
            <div className='small-8 grid-y'>
              <div className='cell small-2' />

              <div className='cell small-4' >
                <Button Caption={Cnst.FireComputers.Actions.read} Width={325} TextColor='yellow' Color='slategrey'
                  SetPressed={this.state.Reading} cb={this.Read.bind(this)} />
              </div>

              <div className='cell small-4'>
                <Button Caption={Cnst.FireComputers.Actions.send} Width={325} TextColor='yellow' Color='slategrey'
                  SetPressed={this.state.Sending} cb={this.Send.bind(this)} />
              </div>


            </div>

          </div>
        </div>
      </div>
    )
  }
}

