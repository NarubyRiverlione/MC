import { connect } from 'react-redux'
import FireComputer from '../Components/Panels/FireComputer'

import {
  SelectFC, SelectSlot, LoadMsgIntoFC, SendMissionToLS,
} from '../Actions/FireComputersActions'

const mapDispatchToProps = dispatch => ({
  SelectSlot: (SelectedMsgSlot) => {
    dispatch(SelectSlot(SelectedMsgSlot))
  },
  SelectFC: (SelectedFC) => {
    dispatch(SelectFC(SelectedFC))
  },
  ReadMsg: () => {
    dispatch(LoadMsgIntoFC())
  },
  SendMission: () => {
    dispatch(SendMissionToLS())
  },
})

const mapStateToProps = state => ({
  SelectedFC: state.FireComputer.SelectedFC,
  SelectedMsgSlot: state.FireComputer.SelectedMsgSlot,
  FCStates: state.FireComputer.FCS.map(fc => fc.display),
  Sending: state.FireComputer.Sending,
  Reading: state.FireComputer.Reading,
})


const FCContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(FireComputer)

export default FCContainer
