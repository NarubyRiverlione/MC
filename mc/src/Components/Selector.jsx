import React from 'react'
import PropTypes from 'prop-types'

export default class Selector extends React.Component {
  constructor(props) {
    super(props)
    this.cx = this.props.r + 2
    this.cy = this.props.r * 2
  }

  componentWillMount() {
    this.selectedNotch = this.props.Selected
    this.Calc()
  }

  componentWillUpdate(nextProps) {
    this.selectedNotch = nextProps.Selected
    this.Calc()
  }

  Calc() {
    const AngleNotch = 180.0 / (this.props.Amount + 1)
    const AngleSelectedNotch = 90.0 - (this.selectedNotch) * AngleNotch
    const RadialNotch = AngleSelectedNotch * Math.PI / 180.0

    this.MidX = this.cx + this.props.r * Math.cos(RadialNotch)
    this.MidY = this.cy - this.props.r * Math.sin(RadialNotch)

  }

  SelectNextNotch() {
    const NewSelectedNotch = this.selectedNotch + 1 > this.props.Amount ? 1 : this.selectedNotch + 1
    if (this.props.cb) { this.props.cb(NewSelectedNotch) } // cb will change prop Selected
  }


  render() {
    return (
      <div onClick={this.SelectNextNotch.bind(this)}>
        <svg height="150" width={this.props.r * 2 + 20}>
          {/* Knob */}
          <circle cx={this.cx} cy={this.cy} r={this.props.r} stroke="black" strokeWidth="1" fill="none" />
          <circle cx={this.cx} cy={this.cy} r={this.props.r - 2} stroke="grey" strokeWidth="2" fill="lightGrey" />
          {/* Marker */}
          <circle cx={this.MidX} cy={this.MidY} r={5} stroke="red" fill="red" />
        </svg>
      </div>
    )
  }
}

Selector.propTypes = {
  Amount: PropTypes.number.isRequired,
  Selected: PropTypes.number,
  r: PropTypes.number.isRequired,
  cb: PropTypes.func
}

Selector.defaultProps = {
  Selected: 1
}