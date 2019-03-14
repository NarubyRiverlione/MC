import React from 'react'
import PropTypes from 'prop-types'
import Led from './Led'


const MultiColorLed = ({
  On, Colors, CurrentColor, BackgroundColor, Caption,
}) => (
  <Led
    On={On}
    Color={Colors[CurrentColor]}
    BackgroundColor={BackgroundColor}
    Caption={Caption}
  />
)

MultiColorLed.propTypes = {
  On: PropTypes.bool.isRequired,
  Colors: PropTypes.array.isRequired,
  CurrentColor: PropTypes.number.isRequired,
  BackgroundColor: PropTypes.string.isRequired,
  Caption: PropTypes.string,
}

export default MultiColorLed
