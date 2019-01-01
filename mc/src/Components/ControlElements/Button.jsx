import React from 'react'
import PropTypes from 'prop-types'

export default class Button extends React.Component {
  state = { Background: '', BorderColor: '', ButtonTextColor: '' }

  componentDidMount() {
    this.UpdateButton()
  }

  componentDidUpdate(prevProps) {
    const { SetPressed } = this.props
    if (prevProps.SetPressed !== SetPressed) this.UpdateButton()
  }

  UpdateButton() {
    const { SetPressed, Color, TextColor } = this.props
    const Background = (!SetPressed ? 'dark' : 'light') + Color
    const BorderColor = (!SetPressed ? 'light' : 'dark') + Color
    const ButtonTextColor = (!SetPressed ? '' : 'light') + TextColor

    this.setState({ Background, BorderColor, ButtonTextColor })
  }

  Click() {
    const { cb, Caption } = this.props
    if (cb) {
      cb(Caption)
    }
  }

  render() {
    const { ButtonTextColor, Background, BorderColor } = this.state
    const { Width, Caption } = this.props
    return (
      <div
        className=""
        onClick={() => {
          this.Click()
        }}
      >
        <svg width="100%" height="60">
          <rect
            x="5"
            y="5"
            rx="10"
            ry="10"
            width={Width}
            height="50"
            style={{ fill: Background, stroke: BorderColor, strokeWidth: 5 }}
          />
          <text x={Width / 2 + 5} y="37" fontSize="1.25em" textAnchor="middle" fontWeight="bold" fill={ButtonTextColor}>{Caption}</text>
        </svg>
      </div>
    )
  }
}


Button.propTypes = {
  Width: PropTypes.number,
  Caption: PropTypes.string.isRequired,
  Color: PropTypes.string.isRequired,
  TextColor: PropTypes.string.isRequired,
  SetPressed: PropTypes.bool,
  cb: PropTypes.func,
}
Button.defaultProps = {
  Width: 150,
  SetPressed: false,
  cb: undefined,
}
