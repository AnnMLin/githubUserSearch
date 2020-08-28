import { GOT_USERS, GOT_URLS, GOT_TOTAL_COUNT, GOT_KEYWORD, CLEAR_USERS, gotKeyword, searchUsers, fetchUsers, clearUsers } from './search'

const actions = {
  searchUsers,
  fetchUsers,
  gotKeyword,
  clearUsers
}

export const actionTypes = {
  GOT_USERS,
  GOT_URLS,
  GOT_TOTAL_COUNT,
  GOT_KEYWORD,
  CLEAR_USERS
}

export default actions