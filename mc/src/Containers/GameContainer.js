import { connect } from 'react-redux'
import Game from '../Game'

import { SetupGame } from '../Actions/GameActions'

const mapDispatchToProps = dispatch => ({
  SetupGame: () => {
    dispatch(SetupGame())
  },
})

const mapStateToProps = state => ({
  RadioStatus: state.Radio.Status,
  FireComputersStatus: state.FireComputer.Status,
  LaunchStationsStatus: state.LaunchStations.Status,
  ArmoryStatus: state.Armory.Status,
  ReceivedMissions: state.Game.ReceivedMissions,
  ExecutedMissions: state.Game.ExecutedMissions,
  Rank: state.Game.Rank,

  RadioError: state.Radio.ErrorStatus,
  FCError: state.FireComputer.ErrorStatus,
  ArmoryError: state.Armory.ErrorStatus,
  LSError: state.LaunchStations.ErrorStatus,
})


const GameContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Game)

export default GameContainer
