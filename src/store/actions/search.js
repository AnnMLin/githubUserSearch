import axios from 'axios'

export const GOT_USERS = 'GOT_USERS'
export const GOT_URLS = 'GOT_URLS'
export const GOT_TOTAL_COUNT = 'GOT_TOTAL_COUNT'
export const GOT_KEYWORD = 'GOT_KEYWORD'
export const CLEAR_USERS = 'CLEAR_USERS'
export const GOT_PAGE = 'GOT_PAGE'
export const CLEAR_TOTAL_COUNT = 'CLEAR_TOTAL_COUNT'
export const GOT_PAGINATION = 'GOT_PAGINATION'

// action creator
const gotUsers = users => ({type: GOT_USERS, users})
const gotUrls = urls => ({type: GOT_URLS, urls})
const gotTotalCount = totalCount => ({type: GOT_TOTAL_COUNT, totalCount})
export const gotKeyword = keyword => ({type: GOT_KEYWORD, keyword})
export const clearUsers = () => ({type: CLEAR_USERS})
export const gotPage = page => ({type: GOT_PAGE, page})
export const clearTotalCount = () => ({type: CLEAR_TOTAL_COUNT})
const gotPagination = pagination => ({type: GOT_PAGINATION, pagination})

const config = {
  headers: {
    'Authorization' : 'token '+ process.env.REACT_APP_PUBLIC_ACCESS_ONLY_PAT
  }
}

// thunk creator
export const searchUsers = (keyword, APIPage) => dispatch => (
  axios.get(`https://api.github.com/search/users?q=${keyword}&page=${APIPage}&per_page=100`, config)
    .then(({data}) => {
      const totalCount = data['total_count']
      dispatch(gotTotalCount(totalCount))
      const userUrls = data.items.map(userObj => userObj.url) //array of user objects
      console.log(userUrls)
      dispatch(gotUrls(userUrls))
    })
    .catch(err => {
      console.error(err)
    })
)

export const fetchUsers = num => (dispatch, getState) => {
  console.log('IN FETCH USERS', num)
  const { urls } = getState()
  const userPerPage = 10
  const startIdx = (num-1)*userPerPage //110 ~ 120
  const paginatedUrls = urls.slice(startIdx%100, startIdx%100===90? 100 : (startIdx+userPerPage)%100)

  let startPage
  if(num%userPerPage === 0) {
    startPage = num - userPerPage + 1
  } else {
    startPage = Math.floor(num/userPerPage)*10 + 1
  }
  dispatch(gotPagination([startPage, startPage+userPerPage-1]))
  console.log(`PAGINATION: [${startPage}, ${startPage+userPerPage-1}]`)

  return Promise.all(paginatedUrls.map(url => axios.get(url, config)))
    .then(data => {
      console.log(data)
      return data
    })
    .then(data => (
      data.map(({data}) => {
        const {name, avatar_url, email, login, location, public_repos, followers, bio} = data
        return {
          name,
          avatarUrl : avatar_url,
          email,
          login,
          location,
          repos: public_repos,
          followers,
          bio
        }
      })
    ))
    .then(users => {
      dispatch(gotUsers(users))
    })
    .catch(err => {
      console.error(err)
    })
}