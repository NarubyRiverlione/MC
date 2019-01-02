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
      RadioError, FCError, ArmoryError, LSError, ReceivedMissions, ExecutedMissions, Rank,
    } = this.props

    return (
      <div className="Application">
        <div className="grid-container ShowContainer">

          <div className="card CardStyle">

            <div className="card-divider">
              <div className="cell medium" style={{ padding: '5px 0px' }}>{Cnst.Game.Name}</div>
            </div>
            <div className="card-section grid-y">
              <div className="grid-x medium-1">
                <div className="cell medium-3">
                  <p>Received missions</p>
                </div>
                <div className="cell medium-1">
                  <p>{ReceivedMissions}</p>
                </div>
                <div className="cell medium-3">
                  <p>Executed missions</p>
                </div>
                <div className="cell medium-1">
                  <p>{ExecutedMissions}</p>
                </div>
                <div className="cell medium-3">
                  <p>Rank</p>
                </div>
                <div className="cell medium-1">
                  <p>{Rank}</p>
                </div>
              </div>

              <div className="grid-y grid-padding-y grid-padding-x medium-11">

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
  GameStatus: PropTypes.string.isRequired,
  ReceivedMissions: PropTypes.number.isRequired,
  ExecutedMissions: PropTypes.number.isRequired,
  Rank: PropTypes.number.isRequired,

  RadioError: PropTypes.bool,
  FCError: PropTypes.bool,
  ArmoryError: PropTypes.bool,
  LSError: PropTypes.bool,
  GameErrorMsg: PropTypes.bool,

  StartNewMessageTimer: PropTypes.func.isRequired,
}

Game.defaultProps = {
  RadioError: false,
  FCError: false,
  ArmoryError: false,
  LSError: false,
  GameErrorMsg: false,
}
