import React from 'react'
import PropTypes from 'prop-types'

import Display from '../ControlElements/Display'

import Radio from './Radio'
import FireComputer from './FireComputer'
import Armory from './Armory'
import LaunchStations from './LaunchStations'

export default class ControlPanel extends React.Component {

  RenderStation() {
    switch (this.props.Name) {
      case 'Radio':
        return <Radio />
      case 'Fire Computer':
        return <FireComputer />
      case 'Armory':
        return <Armory />
      case 'Launch Stations':
        return <LaunchStations />
      default:
        return null
    }
  }

  render() {
    return (
      <div className="card CardStyle">
        <div className="card-divider grid-x">
          <div className='cell medium-6'>{this.props.Name}</div>
          <div className='cell medium-6'>
            <Display Title='' Width={200} Text={this.props.StatusStatus} />
          </div>
        </div>
        <div className="card-section"> {this.RenderStation.bind(this)()} </div>
      </div>
    )
  }


}


ControlPanel.propTypes = {
  Name: PropTypes.oneOf(['Radio', 'Fire Computer', 'Armory', 'Launch Stations']).isRequired,
  StatusStatus: PropTypes.string
}

ControlPanel.defaultProps = {
  StatusStatus: ''
}