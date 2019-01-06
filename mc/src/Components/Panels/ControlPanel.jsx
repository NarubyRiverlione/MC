import React from 'react'
import PropTypes from 'prop-types'

import Display from '../ControlElements/Display'


const ControlPanel = ({
  Name, StatusStatus, ErrorMsg, children,
}) => (
  <div className="card CardStyle">

    <div className="card-divider grid-y">
      <div className="cell medium" style={{ padding: '5px 0px' }}>{Name}</div>
    </div>

    <div className="card-section">
      <div className="cell medium">
        <Display Width={480} Text={StatusStatus} ErrorMsg={ErrorMsg} />
      </div>
      {children}
    </div>
  </div>
)


ControlPanel.propTypes = {
  Name: PropTypes.string.isRequired,
  StatusStatus: PropTypes.string.isRequired,
  ErrorMsg: PropTypes.bool,
  children: PropTypes.node.isRequired,
}

ControlPanel.defaultProps = {
  ErrorMsg: false,
}

export default ControlPanel
