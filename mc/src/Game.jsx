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
                  />
                </div>

                <div className="cell medium-6  ShowCell">
                  <ControlPanel
                    Name={Cnst.Stations.FireComputers}
                    StatusStatus={FireComputersStatus}
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
                  />
                </div>

                <div className="cell medium-6 ShowCell">
                  <ControlPanel
                    Name={Cnst.Stations.LaunchStations}
                    StatusStatus={LaunchStationsStatus}
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

  StartNewMessageTimer: PropTypes.func.isRequired,
}
