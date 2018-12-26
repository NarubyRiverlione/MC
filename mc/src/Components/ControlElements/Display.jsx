import React from 'react'
import PropTypes from 'prop-types'

const Xoffset = (Title) => (!Title ? 10 : Title.length * 15 + 20)


const Display = ({ Title, Text, Width }) => (
  <div>
    <svg width='100%' height='50'>
      {/* show title if provided*/}
      {Title && <text x='10' y='32' className='text'>{Title}</text>}

      {/* display text in rect */}
      <rect x={Xoffset(Title)} y='5' width={Width} height='40' style={{ fill: 'black', stroke: 'gray', strokeWidth: 2 }} />
      <text x={Xoffset(Title) + 10} y='32' className='display'>{Text}</text>
    </svg>
  </div>
)

Display.propTypes = {
  Title: PropTypes.string,
  Text: PropTypes.string.isRequired,
  Width: PropTypes.number.isRequired
}

Display.defaultProps = {
  Title: ''
}
export default Display