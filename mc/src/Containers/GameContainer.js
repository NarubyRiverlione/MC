import { connect } from 'react-redux'
import Game from '../Game'

import StartNewMessageTimer from '../Actions/GameActions'

const mapDispatchToProps = dispatch => ({
  StartNewMessageTimer: () => {
    dispatch(StartNewMessageTimer(1))
  },
})

const mapStateToProps = state => ({
  RadioStatus: state.Radio.Status,
  FireComputersStatus: state.FireComputer.Status,
  LaunchStationsStatus: state.LaunchStations.Status,
  ArmoryStatus: state.Armory.Status,
})


const GameContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Game)

export default GameContainer
