import React from 'react'
import PropTypes from 'prop-types'

import Display from '../ControlElements/Display'
import Cnst from '../../Constands'
import Radio from './Radio'
import FireComputer from './FireComputer'
import Armory from './Armory'
import LaunchStations from './LaunchStations'

export default class ControlPanel extends React.Component {

  RenderStation() {
    switch (this.props.Name) {
      case Cnst.Stations.Radio:
        return <Radio ChangeStatus={this.props.ChangeStatus}/>
      case Cnst.Stations.FireComputers:
        return <FireComputer ChangeStatus={this.props.ChangeStatus} />
      case Cnst.Stations.Armory:
        return <Armory ChangeStatus={this.props.ChangeStatus} />
      case Cnst.Stations.LaunchStations:
        return <LaunchStations ChangeStatus={this.props.ChangeStatus} />
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
            <Display Title='' Width={250} Text={this.props.StatusStatus} />
          </div>
        </div>
        <div className="card-section"> {this.RenderStation.bind(this)()} </div>
      </div>
    )
  }
}


ControlPanel.propTypes = {
  Name: PropTypes.string.isRequired,
  StatusStatus: PropTypes.string.isRequired,
  ChangeStatus: PropTypes.func.isRequired
}