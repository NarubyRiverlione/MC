import React from 'react'
import PropTypes from 'prop-types'

export default class Display extends React.Component {
  render() {
    return (
      <div className=''>
        <svg width='100%' height='50'>
          {/* show title if provided*/}
          {this.props.Title && <text x='10' y='32' className='text'>{this.props.Title}</text>}
          {/* display text in rect */}
          <rect x='30' y='5' width={this.props.Width} height='40' style={{ fill: 'black', stroke: 'gray', strokeWidth: 2 }} />
          <text x='40' y='32' className='display'>{this.props.Text}</text>
        </svg>
      </div>
    )
  }
}

Display.propTypes = {
  Title: PropTypes.string,
  Text: PropTypes.string.isRequired,
  Width: PropTypes.number.isRequired
}