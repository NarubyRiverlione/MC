
import React from 'react'
import PropTypes from 'prop-types'

import Button from './Button'
import MultiColorLed from './MultiColorLed'

const ButtonWithLed = ({
  LedOn, LedColors, LedCurrentColor, LedBackgroundColor,
  ButtonCaption, ButtonWidth, ButtonColor, ButtonTextColor, ButtonStatus, ButtonCB
}) => {
  return (
    <div className='grid-x'>
      <div className='cell small-4'>
        <MultiColorLed On={LedOn} Colors={LedColors} BackgroundColor={LedBackgroundColor}
          CurrentColor={LedCurrentColor}
        />
      </div>
      <div className='cell small-8'>
        <Button Caption={ButtonCaption} Width={ButtonWidth}
          Color={ButtonColor} TextColor={ButtonTextColor}
          SetPressed={ButtonStatus}
          cb={ButtonCB} />
      </div>
    </div>
  )
}

ButtonWithLed.propTypes = {
  LedOn: PropTypes.bool.isRequired,
  LedColors: PropTypes.array.isRequired,
  LedCurrentColor: PropTypes.number.isRequired,
  LedBackgroundColor: PropTypes.string.isRequired,
  ButtonCaption: PropTypes.string,
  ButtonWidth: PropTypes.number.isRequired,
  ButtonColor: PropTypes.string.isRequired,
  ButtonTextColor: PropTypes.string.isRequired,
  ButtonStatus: PropTypes.bool.isRequired,
  ButtonCB: PropTypes.func

}

export default ButtonWithLed