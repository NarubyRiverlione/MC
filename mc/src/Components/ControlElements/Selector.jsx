import React from 'react'
import PropTypes from 'prop-types'


const cx = r => r + 5
const cy = r => r + 20

export default class Selector extends React.Component {
  constructor(props) {
    super(props)
    this.state = { MidX: 0, MidY: 0 }
    const { StartSelected } = this.props
    this.Selected = StartSelected
  }

  componentDidMount() {
    this.CalcSelectedNotch()
  }

  CalcSelectedNotch() {
    const { Side, Amount, r } = this.props

    const AngleNotch = 180.0 / (Amount + 1)
    const Align = Side === 'R' ? -1 : 1
    const AngleSelectedNotch = 90.0 + (this.Selected * AngleNotch * Align)
    const RadialNotch = AngleSelectedNotch * Math.PI / 180.0

    const MidX = cx(r) + r * Math.cos(RadialNotch) + (15 * Align)
    const MidY = cy(r) - r * Math.sin(RadialNotch)
    this.setState({ MidX, MidY })
  }

  SelectNextNotch() {
    const { Amount, cb } = this.props
    const NewSelectedNotch = this.Selected + 1 > Amount ? 1 : this.Selected + 1
    this.Selected = NewSelectedNotch
    this.CalcSelectedNotch()

    // cb will change prop Selected
    if (cb) {
      cb(this.Selected)
    }
  }


  render() {
    const { r } = this.props
    const { MidX, MidY } = this.state

    return (
      <div onClick={() => this.SelectNextNotch()}>
        <svg height={r * 2 + 30} width={r * 2 + 10}>
          {/* Knob */}
          <circle cx={cx(r)} cy={cy(r)} r={r} stroke="darkgrey" strokeWidth="1" fill="none" />
          <circle cx={cx(r)} cy={cy(r)} r={r - 3} stroke="grey" strokeWidth="5" fill="grey" />
          {/* Marker */}
          <circle cx={MidX} cy={MidY} r={10} stroke="white" fill="darkgrey" />
        </svg>
      </div>
    )
  }
}

Selector.propTypes = {
  Amount: PropTypes.number.isRequired,
  StartSelected: PropTypes.number,
  r: PropTypes.number.isRequired,
  cb: PropTypes.func,
  Side: PropTypes.oneOf(['L', 'R']),
}

Selector.defaultProps = {
  StartSelected: 1,
  Side: 'R',
}
