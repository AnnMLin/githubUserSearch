import { actionTypes } from '../actions'

const initialState = 0

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.GOT_PAGE:
      return action.page
    default:
      return state
  }
}

export default reducer