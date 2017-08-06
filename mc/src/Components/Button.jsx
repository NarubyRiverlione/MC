import React from 'react'
import PropTypes from 'prop-types'

export default class Button extends React.Component {
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
          <rect x="5" y="5" rx="20" ry="20" width="140" height="50"
            style={{ fill: this.props.BackgroundColor, stroke: 'black', strokeWidth: 5, opacity: 0.5 }} />
          <text x="20" y="37" fontSize="1.5em" fontWeight="bold" fill={this.props.TextColor}>{this.props.Caption}</text>
        </svg>
      </div>
    )
  }
}

const InitState = {

}

Button.propTypes = {
  Caption: PropTypes.string.isRequired,
  BackgroundColor: PropTypes.string.isRequired,
  TextColor: PropTypes.string.isRequired

}