import { actionTypes } from '../actions'

const initialState = ''

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.GOT_KEYWORD:
      return action.keyword
    default:
      return state
  }
}

export default reducer