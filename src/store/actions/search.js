import axios from 'axios'

export const GOT_USERS = 'GOT_USERS'
export const GOT_URLS = 'GOT_URLS'
export const GOT_TOTAL_COUNT = 'GOT_TOTAL_COUNT'
export const GOT_KEYWORD = 'GOT_KEYWORD'
export const CLEAR_USERS = 'CLEAR_USERS'

// action creator
const gotUsers = users => ({type: GOT_USERS, users})
const gotUrls = urls => ({type: GOT_URLS, urls})
const gotTotalCount = totalCount => ({type: GOT_TOTAL_COUNT, totalCount})
export const gotKeyword = keyword => ({type: GOT_KEYWORD, keyword})
export const clearUsers = () => ({type: CLEAR_USERS})

const config = {
  headers: {
    'Authorization' : 'token '+ process.env.REACT_APP_PUBLIC_ACCESS_ONLY_PAT
  }
}

// thunk creator
export const searchUsers = keyword => dispatch => (
  axios.get(`https://api.github.com/search/users?q=${keyword}&per_page=100`, config)
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
  console.log('IN FETCH USERS')
  const { urls } = getState()
  const userPerPage = 9
  const startIdx = (num-1)*userPerPage
  const paginatedUrls = urls.slice(startIdx, startIdx+userPerPage)

  return Promise.all(paginatedUrls.map(url => axios.get(url, config)))
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