import { connect } from 'react-redux'
import Armory from '../Components/Panels/Armory'

import {
  Load, SetSelected,
} from '../Actions/ArmoryActions'

const mapDispatchToProps = dispatch => ({
  SetSelected: (SelectedMsgSlot) => {
    dispatch(SetSelected(SelectedMsgSlot))
  },
  Load: () => {
    dispatch(Load())
  },
})

const mapStateToProps = state => ({
  Selected: state.Armory.Selected,
  Amount: state.Armory.Amount,
  Loading: state.Armory.Loading,
})


const ArmoryContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Armory)

export default ArmoryContainer
