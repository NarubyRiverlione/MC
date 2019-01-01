import React from 'react'
import PropTypes from 'prop-types'

const Led = ({
  On, Color, BackgroundColor, Caption,
}) => (
  <div>
    <svg height="40" width="300">
      <circle cx="20" cy="20" r="12" stroke="black" strokeWidth="1" fill="none" />
      <circle
        cx="20"
        cy="20"
        r="10"
        stroke="grey"
        strokeWidth="1"
        // on = Color, off = Background color
        fill={On ? Color : BackgroundColor}
      />

      {Caption !== ''
          && <text x="43" y="26" className="LedText">{Caption}</text>
      }
    </svg>
  </div>
)

Led.propTypes = {
  On: PropTypes.bool.isRequired,
  Color: PropTypes.string.isRequired,
  BackgroundColor: PropTypes.string.isRequired,
  Caption: PropTypes.string,
}
Led.defaultProps = {
  Caption: '',
}

export default Led
