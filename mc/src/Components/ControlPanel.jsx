import React from 'react'
import PropTypes from 'prop-types'

import Radio from './Radio'



export default class ControlPanel extends React.Component {
  render() {
    return (
      <div className="card CardStyle">
        <div className="card-divider">{this.props.Name}</div>
        <div className="card-section"> {this.RenderStation.bind(this)}  </div>
      </div>
    )
  }

  function RenderStation() {
  switch (this.props.Name) {
    case 'Radio':
      return <Radio />
    default:
      return null
  }
}

}


ControlPanel.propTypes = {
  Name: PropTypes.oneOf(['Radio', 'Fire Computer', 'Armory', 'Launch Stations']).isRequired
}