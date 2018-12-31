import { connect } from 'react-redux'
import LaunchStations from '../Components/Panels/LaunchStations'

import {
  Select, Prepare, HandelingLaunchStation, Repair, Fire,
} from '../Actions/LaunchStationsActions'


const mapDispatchToProps = dispatch => ({
  Select: (Selected) => {
    dispatch(Select(Selected))
  },
  Prepare: () => {
    dispatch(Prepare())
  },
  Remove: () => {
    dispatch(HandelingLaunchStation('', false))
  },
  Repair: () => {
    dispatch(Repair())
  },
  Fire: () => {
    dispatch(Fire())
  },
})

const mapStateToProps = state => ({
  Stations: state.LaunchStations.Stations,
  Selected: state.LaunchStations.Selected,
  SelectedStatus: state.LaunchStations.SelectedStatus,
  Prepairing: state.LaunchStations.Prepairing,
  Repairing: state.LaunchStations.Repairing,
  Firing: state.LaunchStations.Firing,
  Removing: state.LaunchStations.Removing,
})


const LSContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LaunchStations)

export default LSContainer
