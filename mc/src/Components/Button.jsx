import React from 'react'
import PropTypes from 'prop-types'

export default class Button extends React.Component {
  constructor(props) {
    super(props)
    this.Background = (!this.props.SetPressed ? 'dark' : 'light') + this.props.Color
    this.BorderColor = (!this.props.SetPressed ? 'light' : 'dark') + this.props.Color
    this.TextColor = (!this.props.SetPressed ? '' : 'light') + this.props.TextColor
  }

  componentDidMount() {

  }

  componentWillUpdate(nextProps) {
    this.Background = (!nextProps.SetPressed ? 'dark' : 'light') + this.props.Color
    this.BorderColor = (!nextProps.SetPressed ? 'light' : 'dark') + this.props.Color
    this.TextColor = (!nextProps.SetPressed ? '' : 'light') + this.props.TextColor
  }

  Click() {
    if (this.props.cb) { this.props.cb(this.props.Caption) }
  }

  render() {
    return (
      <div className="" onClick={this.Click.bind(this)}>
        <svg width="100%" height="60">
          <rect x="5" y="5" rx="20" ry="20" width="140" height="50"
            style={{ fill: this.Background, stroke: this.BorderColor, strokeWidth: 5 }} />
          <text x="20" y="37" fontSize="1.5em" fontWeight="bold" fill={this.TextColor}>{this.props.Caption}</text>
        </svg>
      </div>
    )
  }
}


Button.propTypes = {
  Caption: PropTypes.string.isRequired,
  Color: PropTypes.string.isRequired,
  TextColor: PropTypes.string.isRequired,
  SetPressed: PropTypes.bool,
  cb: PropTypes.func
}