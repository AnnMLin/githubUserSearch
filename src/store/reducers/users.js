import { actionTypes } from '../actions'

const initialState = []
/*
[{
  name: (text) or null,
  login: (text),
  email: (text) or null,
  location: (text) or null,
  repos: (number),
  followers : (number),
  desc: (text) or null
}]
*/

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.GOT_USERS:
      return action.users
    default:
      return state
  }
}

export default reducer