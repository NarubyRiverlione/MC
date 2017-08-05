import React from 'react'
import PropTypes from 'prop-types'

import Led from './Led'

export default class Radio extends React.Component {
  constructor(props) {
    super(props)
    this.state = InitState

  }

  Blink = () => {
    setInterval(() => {
      this.setState({ IncomingMessage: !this.state.IncomingMessage })
    }, 500)
  }

  componentDidMount() {
    this.Blink()
  }

  componentWillUnmount() {

  }

  render() {
    return (
      <div className="" >
        <Led Caption='Incomming message' On={this.state.IncomingMessage} />
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