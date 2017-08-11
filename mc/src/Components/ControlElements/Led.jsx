import React from 'react'
import PropTypes from 'prop-types'

export default class Led extends React.Component {
  constructor(props) {
    super(props)
    this.state = { On: this.props.On, CurrentColor: 0, Blinking: this.props.Blinking }
    this.Tick = this.props.Timer ? this.props.Timer * 2 : 0
    if (this.Tick > 0) this.Timer()
  }

  Timer = () => {
    const TimerID = setInterval(() => {
      // reduce Tick until 0
      this.Tick--
      if (this.Tick <= 0) {
        clearInterval(TimerID)
        this.setState({ Blinking: this.props.Blinking })
        this.setState({ On: false }) // set led off when time runs out
      }
      else {
        // change color based on timer (0-50% = color 0, 50-75%= color 1, 75-100% = color 2 & blinking)
        if (this.props.Colors.length === 3) {
          if (this.Tick > this.props.Timer) this.setState({ CurrentColor: 0 })
          if (this.Tick < this.props.Timer) this.setState({ CurrentColor: 1 })
          if (this.Tick < this.props.Timer / 2) {
            this.setState({ CurrentColor: 2 })
            this.setState({ Blinking: true })
          }
        }

        // blick if needed
        if (this.state.Blinking)
          this.setState({ On: !this.state.On })
      }

    }, 500)
  }

  render() {
    return (
      <div>
        <svg height="40" width="300">
          <circle cx="20" cy="20" r="12" stroke="black" strokeWidth="1" fill="none" />
          <circle cx="20" cy="20" r="10" stroke="grey" strokeWidth="1"
            // on = current color, off = background color
            fill={this.state.On ? this.props.Colors[this.state.CurrentColor] : this.props.BackgroundColor} />
          <text x="43" y="26" className='LedText' >{this.props.Caption}</text>
        </svg>
      </div>
    )
  }
}

Led.propTypes = {
  On: PropTypes.bool.isRequired,
  Colors: PropTypes.array.isRequired,
  BackgroundColor: PropTypes.string.isRequired,
  Caption: PropTypes.string.isRequired,
  Blinking: PropTypes.bool,
  Timer: PropTypes.number // seconds
}


