/* eslint-disable no-console */
import React from 'react'
import PropTypes from 'prop-types'
import ControlPanel from './Components/Panels/ControlPanel'
import { Cnst } from './Constants'

export default class Game extends React.Component {
  componentDidMount() {
    const { StartNewMessageTimer } = this.props
    StartNewMessageTimer()
  }

  render() {
    const {
      RadioStatus, FireComputersStatus, LaunchStationsStatus, ArmoryStatus,
      RadioError, FCError, ArmoryError, LSError,
    } = this.props

    return (
      <div className="Application">
        <div className="grid-container ShowContainer">
          <div className="grid-y grid-padding-y grid-padding-x">

            <div className="cell medium-6 ShowCellY">
              <div className="grid-x grid-margin-x ShowGrid">

                <div className="cell medium-6 ShowCell">
                  <ControlPanel
                    Name={Cnst.Stations.Radio}
                    StatusStatus={RadioStatus}
                    ErrorMsg={RadioError}
                  />
                </div>

                <div className="cell medium-6  ShowCell">
                  <ControlPanel
                    Name={Cnst.Stations.FireComputers}
                    StatusStatus={FireComputersStatus}
                    ErrorMsg={FCError}
                  />
                </div>

              </div>
            </div>


            <div className="cell medium-6 ShowCellY">
              <div className="grid-x grid-margin-x ShowGrid">

                <div className="cell medium-6 ShowCell">
                  <ControlPanel
                    Name={Cnst.Stations.Armory}
                    StatusStatus={ArmoryStatus}
                    ErrorMsg={ArmoryError}
                  />
                </div>

                <div className="cell medium-6 ShowCell">
                  <ControlPanel
                    Name={Cnst.Stations.LaunchStations}
                    StatusStatus={LaunchStationsStatus}
                    ErrorMsg={LSError}
                  />
                </div>

              </div>
            </div>

          </div>

        </div>
      </div>
    )
  }
}

Game.propTypes = {
  RadioStatus: PropTypes.string.isRequired,
  FireComputersStatus: PropTypes.string.isRequired,
  LaunchStationsStatus: PropTypes.string.isRequired,
  ArmoryStatus: PropTypes.string.isRequired,

  RadioError: PropTypes.bool,
  FCError: PropTypes.bool,
  ArmoryError: PropTypes.bool,
  LSError: PropTypes.bool,

  StartNewMessageTimer: PropTypes.func.isRequired,
}

Game.defaultProps = {
  RadioError: false,
  FCError: false,
  ArmoryError: false,
  LSError: false,
}
