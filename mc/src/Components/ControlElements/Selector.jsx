import React from 'react'
import PropTypes from 'prop-types'

export default class Selector extends React.Component {
  constructor(props) {
    super(props)
    this.cx = this.props.r + 5
    this.cy = this.props.r + 20
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
    const Align = this.props.Side === 'R' ? -1 : 1
    const AngleSelectedNotch = 90.0 + (this.selectedNotch * AngleNotch * Align)
    const RadialNotch = AngleSelectedNotch * Math.PI / 180.0

    this.MidX = this.cx + this.props.r * Math.cos(RadialNotch) + (15 * Align)
    this.MidY = this.cy - this.props.r * Math.sin(RadialNotch)

  }

  SelectNextNotch() {
    const NewSelectedNotch = this.selectedNotch + 1 > this.props.Amount ? 1 : this.selectedNotch + 1
    if (this.props.cb) { this.props.cb(NewSelectedNotch) } // cb will change prop Selected
  }


  render() {
    return (
      <div onClick={this.SelectNextNotch.bind(this)}>
        <svg height={this.props.r * 2 + 30} width={this.props.r * 2 + 10}>
          {/* Knob */}
          <circle cx={this.cx} cy={this.cy} r={this.props.r} stroke="darkgrey" strokeWidth="1" fill="none" />
          <circle cx={this.cx} cy={this.cy} r={this.props.r - 3} stroke="grey" strokeWidth="5" fill="grey" />
          {/* Marker */}
          <circle cx={this.MidX} cy={this.MidY} r={10} stroke="white" fill="darkgrey" />
        </svg>
      </div>
    )
  }
}

Selector.propTypes = {
  Amount: PropTypes.number.isRequired,
  Selected: PropTypes.number,
  r: PropTypes.number.isRequired,
  cb: PropTypes.func,
  Side: PropTypes.oneOf(['L', 'R'])
}

Selector.defaultProps = {
  Selected: 1,
  Side: 'R'
}