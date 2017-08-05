import React from 'react'
import PropTypes from 'prop-types'

export default class Led extends React.Component {
  render() {
    return (
      <div>
        <svg height="40" width="200">
          <circle cx="20" cy="20" r="12" stroke="black" strokeWidth="1" fill="none" />
          <circle cx="20" cy="20" r="10" stroke="grey" strokeWidth="1" fill={this.props.On ? 'Red' : 'lightgrey'} />
          <text x="43" y="26">{this.props.Caption}</text>
        </svg>
      </div>
    )
  }
}

Led.propTypes = {
  On: PropTypes.bool.isRequired,
  Caption: PropTypes.string
}