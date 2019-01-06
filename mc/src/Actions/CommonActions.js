import { Cnst } from '../Constants'

export const StatusUpdate = (ActionType, StatusText) => ({
  type: ActionType,
  StatusText,
  ErrorStatus: false,
})

const ShowErrorMsg = (ActionType, ErrorText) => ({
  type: ActionType,
  StatusText: ErrorText,
  ErrorStatus: true,
})


// show error in status of set time, then set idle status
export const ShowErrorStatus = (ActionType, ErrorText, Timeout) => (
  (dispatch) => {
    dispatch(ShowErrorMsg(ActionType, ErrorText))

    setTimeout(() => {
      dispatch(StatusUpdate(ActionType, Cnst.Status.Idle))
    }, Timeout)
  })
