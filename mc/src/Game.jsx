/* eslint-disable no-console */
import React from 'react'
import PropTypes from 'prop-types'

import ControlPanel from './Components/Panels/ControlPanel'
import RadioContainer from './Containers/RadioContainer'
import FCContainer from './Containers/FCContainer'
import ArmoryContainer from './Containers/ArmoryContainer'
import LSContainer from './Containers/LSContainer'


import {
  CstRadio, CstFireComputers, CstArmory, CstLaunchStations, CstGame,
} from './Constants'

export default class Game extends React.Component {
  componentDidMount() {
    const { SetupGame } = this.props
    SetupGame()
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
              <div className="cell medium" style={{ padding: '5px 0px' }}>{CstGame.Name}</div>
            </div>
            <div className="card-section grid-y">
              <div className="grid-x medium-1">
                <div className="cell medium-3">
                  <p>{CstGame.Titles.ReceivedMissions}</p>
                </div>
                <div className="cell medium-1">
                  <p>{ReceivedMissions}</p>
                </div>
                <div className="cell medium-3">
                  <p>{CstGame.Titles.ExecutedMissions}</p>
                </div>
                <div className="cell medium-1">
                  <p>{ExecutedMissions}</p>
                </div>
                <div className="cell medium-3">
                  <p>{CstGame.Titles.Rank}</p>
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
                        Name={CstRadio.Title}
                        StatusStatus={RadioStatus}
                        ErrorMsg={RadioError}
                      >
                        <RadioContainer />
                      </ControlPanel>
                    </div>

                    <div className="cell medium-6  ShowCell">
                      <ControlPanel
                        Name={CstFireComputers.Title}
                        StatusStatus={FireComputersStatus}
                        ErrorMsg={FCError}
                      >
                        <FCContainer />
                      </ControlPanel>
                    </div>

                  </div>
                </div>


                <div className="cell medium-6 ShowCellY">
                  <div className="grid-x grid-margin-x ShowGrid">

                    <div className="cell medium-6 ShowCell">
                      <ControlPanel
                        Name={CstArmory.Title}
                        StatusStatus={ArmoryStatus}
                        ErrorMsg={ArmoryError}
                      >
                        <ArmoryContainer />
                      </ControlPanel>
                    </div>

                    <div className="cell medium-6 ShowCell">
                      <ControlPanel
                        Name={CstLaunchStations.Title}
                        StatusStatus={LaunchStationsStatus}
                        ErrorMsg={LSError}
                      >
                        <LSContainer />
                      </ControlPanel>
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
  // GameStatus: PropTypes.string.isRequired,
  ReceivedMissions: PropTypes.number.isRequired,
  ExecutedMissions: PropTypes.number.isRequired,
  Rank: PropTypes.number.isRequired,

  RadioError: PropTypes.bool,
  FCError: PropTypes.bool,
  ArmoryError: PropTypes.bool,
  LSError: PropTypes.bool,
  // GameErrorMsg: PropTypes.bool,

  SetupGame: PropTypes.func.isRequired,
}

Game.defaultProps = {
  RadioError: false,
  FCError: false,
  ArmoryError: false,
  LSError: false,
  // GameErrorMsg: false,
}
