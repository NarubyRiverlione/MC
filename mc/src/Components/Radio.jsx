import React from 'react'
import PropTypes from 'prop-types'

import Led from './Led'
import Button from './Button'
import Display from './Display'

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

  render() {
    return (
      <div className="" id="RadioPanel" >
        {/* INCOMING MESSAGE */}
        <Led Caption='Incoming message' On={this.state.IncomingMessage} Colors={['green', 'orange', 'red']} BackgroundColor={'Gainsboro'}
          Blinking={true} Timer={this.state.IncomingTimer} />



        <div className="grid-container">
          <div className="grid-x">
            {/* ACTION BUTTONS */}
            <div className="cell medium-6" >
              <div className="grid-y">

                <div className="cell medium-4">
                  <Button BackgroundColor='darkgrey' Caption='STORE' TextColor='yellow' />
                </div>

                <div className="cell medium-4">
                  <Button BackgroundColor='darkgrey' Caption='DECODE' TextColor='yellow' />
                </div>

                <div className="cell medium-4">
                  <Button BackgroundColor='darkgrey' Caption='ERASE' TextColor='red' />
                </div>

              </div>
            </div>

            {/* STORAGE SLOTS */}
            <div className="cell medium-6" >
              <div className="grid-y">

                <div className="cell medium-4">
                  <Display BackgroundColor='darkgrey' Caption='Slot 1' Text='Empty' TextColor='yellow' />
                </div>

                <div className="cell medium-4">
                  <Display BackgroundColor='darkgrey' Caption='Slot 2' Text='Empty' TextColor='yellow' />
                </div>

                <div className="cell medium-4">
                  <Display BackgroundColor='darkgrey' Caption='Slot 3' Text='Empty' TextColor='yellow' />
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
  IncomingMessage: false
}


Radio.propTypes = {
  IncomingMessage: PropTypes.bool
}