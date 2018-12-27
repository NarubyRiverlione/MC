import { connect } from 'react-redux'
import Radio from '../Components/Panels/Radio'

import {
  SelectSlot,
  ExecuteCmd,
  UpdateButton,
} from '../Actions/RadioActions'

const mapDispatchToProps = dispatch => ({
  SelectSlot: (Selected) => {
    dispatch(SelectSlot(Selected))
  },
  ExecuteCmd: (cmd) => {
    dispatch(ExecuteCmd(cmd))
  },
  UpdateButton: (ButtonName, Status) => {
    dispatch(UpdateButton(ButtonName, Status))
  },
})

const mapStateToProps = state => ({
  MessageIncoming: state.Radio.MessageIncoming,
  StatusSlots: state.Radio.Slots.map(sl => sl.status),
  Buttons: state.Radio.Buttons,
  SelectedSlot: state.Radio.SelectedSlot,
})


const RadioContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Radio)

export default RadioContainer
