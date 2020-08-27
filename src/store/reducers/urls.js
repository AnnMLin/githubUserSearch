import { actionTypes } from '../actions'

const initialState = []

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.GOT_URLS:
      return action.urls
    default:
      return state
  }
}

export default reducer