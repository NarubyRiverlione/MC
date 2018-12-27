import React from 'react'
import PropTypes from 'prop-types'

import Display from '../ControlElements/Display'
import { Cnst } from '../../Constants'
import RadioContainer from '../../Containers/RadioContainer'
import FCContainer from '../../Containers/FCContainer'
import ArmoryContainer from '../../Containers/ArmoryContainer'
import LSContainer from '../../Containers/LSContainer'


const RenderStation = (Name) => {
  switch (Name) {
    case Cnst.Stations.Radio:
      return <RadioContainer />
    case Cnst.Stations.FireComputers:
      return <FCContainer />
    case Cnst.Stations.Armory:
      return <ArmoryContainer />
    case Cnst.Stations.LaunchStations:
      return <LSContainer />
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
