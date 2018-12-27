import React from 'react'
import PropTypes from 'prop-types'

import Display from '../ControlElements/Display'
import { Cnst } from '../../Constants'
import RadioContainer from '../../Containers/RadioContainer'
// import FireComputer from './FireComputer'
// import Armory from './Armory'
// import LaunchStations from './LaunchStations'


const RenderStation = (Name) => {
  switch (Name) {
    case Cnst.Stations.Radio:
      return <RadioContainer />
    // case Cnst.Stations.FireComputers:
    //   return <FireComputer />
    // case Cnst.Stations.Armory:
    //   return <Armory />
    // case Cnst.Stations.LaunchStations:
    //   return <LaunchStations />
    default:
      return <div />
  }
}

const ControlPanel = ({ Name, StatusStatus }) => (
  <div className="card CardStyle">
    <div className="card-divider grid-x">
      <div className="cell medium-5">{Name}</div>
      <div className="cell medium-7">
        <Display Width={300} Text={StatusStatus} />
      </div>
    </div>
    <div className="card-section">
      {RenderStation(Name)}
    </div>
  </div>
)


ControlPanel.propTypes = {
  Name: PropTypes.string.isRequired,
  StatusStatus: PropTypes.string.isRequired,
}

export default ControlPanel
