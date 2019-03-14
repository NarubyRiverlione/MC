import { ActionCnst, CstFireComputers, Cnst } from '../Constants'

const { FireComputers: FCActie } = ActionCnst

const InitState = {
  Status: Cnst.Status.Idle,
  ErrorStatus: false,
  SelectedFC: '',
  SelectedMsgSlot: 3,
  Sending: false,
  Reading: false,
  FCS: [
    {
      name: CstFireComputers.Name.A,
      status: CstFireComputers.Results.empty,
      display: CstFireComputers.Results.empty,
      missionID: -1,
    },
    {
      name: CstFireComputers.Name.B,
      status: CstFireComputers.Results.empty,
      display: CstFireComputers.Results.empty,
      missionID: -1,
    },
  ],
}

const FireComputerReducer = (state = InitState, action) => {
  switch (action.type) {
    case FCActie.StatusUpdate:
      // FC Status update
      return {
        ...state,
        Status: action.StatusText,
        ErrorStatus: action.ErrorStatus,
      }
    // select a msg slot
    case FCActie.SelectSlot:
      return {
        ...state,
        SelectedMsgSlot: action.SelectedMsgSlot,
      }
    // select a FC
    case FCActie.SelectFireComputer:
      return {
        ...state,
        SelectedFC: action.SelectedFC,
      }
    // start reading msg into FC
    case FCActie.ReadMsg:
      return {
        ...state,
        Reading: true,
      }
    // start sending mission to Launch station
    case FCActie.SendMission:
      return {
        ...state,
        Sending: true,
      }
    // done reading msg
    case FCActie.ReadMsgDone:
      return {
        ...state,
        Reading: false,
      }
    //  done sending mission to Launch station
    case FCActie.SendMissionDone:
      return {
        ...state,
        Sending: false,
      }
    // update FCS
    case FCActie.UpdateFCs:
      return {
        ...state,
        FCS: action.UpdatedFCS,
      }

    default:
      return state
  }
}

export default FireComputerReducer
