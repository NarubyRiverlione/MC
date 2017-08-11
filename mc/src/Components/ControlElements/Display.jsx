import React from 'react'
import PropTypes from 'prop-types'

export default class Display extends React.Component {
  constructor(props) {
    super(props)
    this.Xoffset = !this.props.Title ? 10 : this.props.Title.length * 35
  }
  render() {
    return (
      <div>
        <svg width='100%' height='50'>
          {/* show title if provided*/}
          {this.props.Title && <text x='10' y='32' className='text'>{this.props.Title}</text>}

          {/* display text in rect */}
          <rect x={this.Xoffset} y='5' width={this.props.Width} height='40' style={{ fill: 'black', stroke: 'gray', strokeWidth: 2 }} />
          <text x={this.Xoffset + 10} y='32' className='display'>{this.props.Text}</text>
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