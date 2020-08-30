import { actionTypes } from '../actions'

const initialState = false

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.GOT_SERVER_ERROR:
      return true
    case actionTypes.CLEAR_SERVER_ERROR:
      return false
    default:
      return state
  }
}

export default reducer