import { combineReducers } from 'redux'
import users from './users'
import urls from './urls'

const reducer = combineReducers({
  users,
  urls
})

export default reducer