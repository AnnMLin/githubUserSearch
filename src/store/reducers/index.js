import { combineReducers } from 'redux'
import users from './users'
import urls from './urls'
import totalCount from './totalCount'
import keyword from './keyword'

const reducer = combineReducers({
  users,
  urls,
  totalCount,
  keyword
})

export default reducer