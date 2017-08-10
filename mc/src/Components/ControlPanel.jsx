import React from 'react'
import PropTypes from 'prop-types'

import Display from './Display'
import Radio from './Radio'


export default class ControlPanel extends React.Component {

  RenderStation() {
    switch (this.props.Name) {
      case 'Radio':
        return <Radio />
      default:
        return null
    }
  }

  render() {
    return (
      <div className="card CardStyle">
        <div className="card-divider">
          {this.props.Name}
          <Display Title='' Width={200} Text={this.props.StatusStatus} />
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