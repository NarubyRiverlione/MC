import React from 'react'
import PropTypes from 'prop-types'

export default class Display extends React.Component {
  constructor(props) {
    super(props)
    this.state = InitState
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  render() {
    return (
      <div className="">
        <svg width="100%" height="60">
          <text x="20" y="35" fontSize="1.5em" fontWeight='bold' fill='white'>{this.props.Caption}</text>

          <rect x="100" y="5" width="120" height="40"
            style={{ fill: 'grey', stroke: 'black', strokeWidth: 2, opacity: 0.5 }} />
          <text x="120" y="30" fontSize="1.2em" fill='red' fontFamily=''>{this.props.Text}</text>
        </svg>
      </div>
    )
  }
}

const InitState = {

}

Display.propTypes = {
  Caption: PropTypes.string.isRequired,
  Text: PropTypes.string.isRequired

}