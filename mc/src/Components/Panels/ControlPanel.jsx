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

const ControlPanel = ({ Name, StatusStatus, ErrorMsg }) => (
  <div className="card CardStyle">

    <div className="card-divider grid-y">
      <div className="cell medium" style={{ padding: '5px 0px' }}>{Name}</div>
    </div>

    <div className="card-section">
      <div className="cell medium">
        <Display Width={480} Text={StatusStatus} ErrorMsg={ErrorMsg} />
      </div>

      {RenderStation(Name)}

    </div>
  </div>
)


ControlPanel.propTypes = {
  Name: PropTypes.string.isRequired,
  StatusStatus: PropTypes.string.isRequired,
  ErrorMsg: PropTypes.bool,
}

ControlPanel.defaultProps = {
  ErrorMsg: false,
}

export default ControlPanel
