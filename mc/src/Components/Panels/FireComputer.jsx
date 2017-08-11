/* eslint-disable no-console */
import React from 'react'
import PropTypes from 'prop-types'

//import Led from '../ControlElements/Led'
import Button from '../ControlElements/Button'
import Display from '../ControlElements/Display'
import Selector from '../ControlElements/Selector'

export default class FireComputer extends React.Component {
  constructor(props) {
    super(props)
    this.state = InitState
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  SelectMsg(slot) {
    this.setState({ SelectedMsg: slot })
    console.log('FireComputer msg ' + slot + ' selected.')
  }

  SelectFC(FC) {
    const SelectedFC = this.state.SelectedFC !== FC ? FC : '' // clicked already selected == deselect
    console.log('FireComputer  ' + SelectedFC + ' selected.')
    this.setState({ SelectedFC })

  }

  Read() {
    console.log('Start reading msg ' + this.state.SelectedMsg + ' into FC ' + this.state.SelectedFC)
    this.setState({ Reading: true })
    setTimeout(() => {
      this.setState({ Reading: false })
      this.state.SelectedFC === 'A' ? this.setState({ FCA_Text: 'Mission recieved' }) : this.setState({ FCB_Text: 'Mission recieved' })
    }, 1000)
  }

  Send() {
    console.log('Start sending mission from FC ' + this.state.SelectedFC + ' to Launch Station')
    this.setState({ Reading: true })
    setTimeout(() => {
      this.setState({ Reading: false })
      this.state.SelectedFC === 'A' ? this.setState({ FCA_Text: 'Mission send' }) : this.setState({ FCB_Text: 'Mission send' })
    }, 1000)
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
                <Display Width={250} Text={this.state.SelectedFC === 'A' ? this.state.FCA_Text : this.state.FCB_Text} />
              </div>
            </div>

          </div>
          {/* Select Msg + actions */}
          <div className='grid-x medium-8'>

            {/* msg selector */}
            <div className='cell small-4'>
              <p>Input Msg</p>
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
              <div className='small-5' />
              <div className='small-4 grid-x'>

                <div className='cell small-6' >
                  <Button Caption='Read' Width={80} TextColor='yellow' Color='slategrey'
                    SetPressed={this.state.Reading} cb={this.Read.bind(this)} />
                </div>

                <div className='cell small-6'>
                  <Button Caption='Send' Width={80} TextColor='yellow' Color='slategrey'
                    SetPressed={this.state.Reading} cb={this.Send.bind(this)} />
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
  SelectedMsg: 1,
  FCA_Text: 'Waiting mission',
  FCB_Text: 'Waiting mission',
  SelectedFC: '',
  Reading: false
}

FireComputer.propTypes = {

}

FireComputer.defaultProps = {

}