import { GOT_USERS, GOT_URLS, GOT_TOTAL_COUNT, GOT_KEYWORD, CLEAR_USERS, GOT_PAGE, CLEAR_TOTAL_COUNT, GOT_PAGINATION, gotKeyword, searchUsers, fetchUsers, clearUsers, gotPage, clearTotalCount } from './search'

const actions = {
  searchUsers,
  fetchUsers,
  gotKeyword,
  clearUsers,
  gotPage,
  clearTotalCount
}

export const actionTypes = {
  GOT_USERS,
  GOT_URLS,
  GOT_TOTAL_COUNT,
  GOT_KEYWORD,
  CLEAR_USERS,
  GOT_PAGE,
  CLEAR_TOTAL_COUNT,
  GOT_PAGINATION
}

export default actions