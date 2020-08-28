import { GOT_USERS, GOT_URLS, GOT_TOTAL_COUNT, GOT_KEYWORD, gotKeyword, searchUsers, fetchUsers } from './search'

const actions = {
  searchUsers,
  fetchUsers,
  gotKeyword
}

export const actionTypes = {
  GOT_USERS,
  GOT_URLS,
  GOT_TOTAL_COUNT,
  GOT_KEYWORD
}

export default actions