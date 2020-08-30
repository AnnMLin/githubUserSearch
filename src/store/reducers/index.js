import { combineReducers } from 'redux'
import users from './users'
import urls from './urls'
import totalCount from './totalCount'
import keyword from './keyword'
import page from './page'
import pagination from './pagination'
import serverError from './serverError'

const reducer = combineReducers({
  users,
  urls,
  totalCount,
  keyword,
  page,
  pagination,
  serverError
})

export default reducer