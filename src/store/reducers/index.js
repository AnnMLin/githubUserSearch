import { combineReducers } from 'redux'
import users from './users'
import urls from './urls'
import totalCount from './totalCount'
import keyword from './keyword'
import page from './page'

const reducer = combineReducers({
  users,
  urls,
  totalCount,
  keyword,
  page
})

export default reducer