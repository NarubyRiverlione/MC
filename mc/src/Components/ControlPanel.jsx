import React from 'react'
import PropTypes from 'prop-types'

import Radio from './Radio'


function RenderStation(self) {
  switch (self.props.Name) {
    case 'Radio':
      return <Radio />
    default:
      return null
  }
}

export default class ControlPanel extends React.Component {
  render() {
    return (
      <div className="card CardStyle">
        <div className="card-divider"> {this.props.Name}</div>
        <div className="card-section"> {RenderStation(this)}
        </div>
      </div>
    )
  }


}


ControlPanel.propTypes = {
  Name: PropTypes.oneOf(['Radio', 'Fire Computer', 'Armory', 'Launch Stations']).isRequired
}