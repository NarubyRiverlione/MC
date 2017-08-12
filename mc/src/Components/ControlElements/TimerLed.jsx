import React from 'react'
import PropTypes from 'prop-types'
import MultiColorLed from './MultiColorLed'

export default class TimerLed extends React.Component {
  constructor(props) {
    super(props)
    this.state = { On: false, CurrentColor: 0 }
    this.Blinking = false
    this.Tick = 0
  }

  Timer = () => {
    // set Ticks to count down, evaluate evevry 500ms (to blink) ==> ticks = Time sec * 2 
    this.Tick = this.props.Time * 2

    const TimerID = setInterval(() => {
      // reduce Tick until 0,
      this.Tick = this.Tick - 500
      // set led off when time runs out or prop.RunTimer is false (stop timer)
      if (this.Tick <= 0 || !this.props.RunTimer) {
        clearInterval(TimerID)
        this.Blinking = false
        this.setState({ On: false })
        if (this.props.TimerDoneCB &&this.props.RunTimer) this.props.TimerDoneCB() // use CB, if provided, to warn timer is done
      }
      else {
        // change color based on timer (0-50% = color 0, 50-75%= color 1, 75-100% = color 2 & blinking)
        if (this.props.Colors.length === 3) {
          if (this.Tick > this.props.Time) this.setState({ CurrentColor: 0 })
          if (this.Tick < this.props.Time) this.setState({ CurrentColor: 1 })
          if (this.Tick < this.props.Time / 2) {
            this.setState({ CurrentColor: 2 })
            this.Blinking = true
          }
        }
        // blick if needed, else set solid On
        if (this.Blinking)
          this.setState({ On: !this.state.On })
        else if (!this.state.On)
          this.setState({ On: true })
      }

    }, 500)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.RunTimer && !this.props.RunTimer) {
      // start timer now    
      this.Timer()
    }
  }

  componentDidMount() {
    if (this.props.RunTimer) {
      // start timer now
      this.Timer()
    }
  }

  render() {
    return (
      <MultiColorLed
        On={this.state.On}
        Colors={this.props.Colors}
        CurrentColor={this.state.CurrentColor}
        BackgroundColor={this.props.BackgroundColor}
        Caption={this.props.Caption}
      />
    )
  }
}

TimerLed.propTypes = {
  Colors: PropTypes.array.isRequired,
  BackgroundColor: PropTypes.string.isRequired,
  Caption: PropTypes.string.isRequired,
  RunTimer: PropTypes.bool.isRequired,
  Time: PropTypes.number.isRequired, // msec
  TimerDoneCB: PropTypes.func
}


