import React from 'react'
import PropTypes from 'prop-types'

import Display from '../ControlElements/Display'
import { Cnst } from '../../Constants'
import Radio from './Radio'
import FireComputer from './FireComputer'
import Armory from './Armory'
import LaunchStations from './LaunchStations'

export default class ControlPanel extends React.Component {
  RenderStation() {
    switch (this.props.Name) {
      case Cnst.Stations.Radio:
        return <Radio />
      case Cnst.Stations.FireComputers:
        return <FireComputer />
      case Cnst.Stations.Armory:
        return <Armory />
      case Cnst.Stations.LaunchStations:
        return <LaunchStations />
      default:
        return null
    }
  }

  render() {
    const { Name, StatusStatus } = this.props
    return (
      <div className="card CardStyle">
        <div className="card-divider grid-x">
          <div className="cell medium-5">{Name}</div>
          <div className="cell medium-7">
            <Display Width={300} Text={StatusStatus} />
          </div>
        </div>
        <div className="card-section">
          {this.RenderStation()}
        </div>
      </div>
    )
  }
}


ControlPanel.propTypes = {
  Name: PropTypes.string.isRequired,
  StatusStatus: PropTypes.string.isRequired,
}
