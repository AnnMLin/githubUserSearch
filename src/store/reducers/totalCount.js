import { actionTypes } from '../actions'

const initialState = 0

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.GOT_TOTAL_COUNT:
      return action.totalCount
    case actionTypes.CLEAR_TOTAL_COUNT:
      return 0
    default:
      return state
  }
}

export default reducer