import { actionTypes } from '../actions'

const initialState = []

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.GOT_PAGINATION:
      return action.pagination
    default:
      return state
  }
}

export default reducer