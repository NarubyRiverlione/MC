import React from 'react'
import PropTypes from 'prop-types'
import MultiColorLed from './MultiColorLed'

export default class TimerLed extends React.Component {
  constructor(props) {
    super(props)
    this.state = { On: false, CurrentColor: 0 }
    // this.Blinking = false
    //   this.Tick = 0
  }

  componentDidMount() {
    this.CheckTimerNeedsStarting()
  }

  componentDidUpdate(prevProps) {
    const { RunTimer } = this.props
    if (!prevProps.RunTimer && RunTimer) {
      // start timer now
      this.Timer(500)
    }
  }

  Timer = (BlinkTime) => {
    const TimerID = setInterval(() => {
      const {
        Time, Colors, RunTimer, TimerDoneCB,
      } = this.props
      // set Ticks to count down, evaluate every 500 ms (to blink)
      let Tick = Time
      let Blinking = false
      const { On } = this.state
      // reduce Tick until 0,
      Tick -= 500
      // set led off when time runs out or RunTimer is false (stop timer)
      if (Tick <= 0 || !RunTimer) {
        clearInterval(TimerID)
        Blinking = false
        this.setState({ On: false })
        if (TimerDoneCB && RunTimer) TimerDoneCB() // use CB, if provided, to warn timer is done
      }
      else {
        // change color based on timer (0-50% = color 0, 50-75%= color 1, 75-100% = color 2 & blinking)
        if (Colors.length >= 3) {
          if (Tick > Time) this.setState({ CurrentColor: 0 })
          if (Tick < Time) this.setState({ CurrentColor: 1 })
          if (Tick < Time / 2) {
            this.setState({ CurrentColor: 2 })
            Blinking = true
          }
        }
        // blink if needed, else set solid On
        if (Blinking) {
          this.setState({ On: !On })
        }
        else if (!On) {
          this.setState({ On: true })
        }
      }
    }, BlinkTime)
  }


  CheckTimerNeedsStarting() {
    const { RunTimer } = this.props
    if (RunTimer) {
      // start timer now
      this.Timer(500)
    }
  }


  render() {
    const { On, CurrentColor } = this.state
    const { Colors, BackgroundColor, Caption } = this.props
    return (
      <MultiColorLed
        On={On}
        Colors={Colors}
        CurrentColor={CurrentColor}
        BackgroundColor={BackgroundColor}
        Caption={Caption}
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
  TimerDoneCB: PropTypes.func,
}
