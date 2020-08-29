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

const localStorage = window.localStorage

// thunk creator
export const searchUsers = (keyword, APIPage) => dispatch => {

  // if urls can be found in localStorage, load it from localStorage then dispatch to store
  const urlsLS = localStorage.getItem(`API${APIPage}`)
  if(urlsLS) {
    const urls = JSON.parse(urlsLS)
    const fakePromise = () => dispatch(gotUrls(urls))
    return Promise.all([fakePromise])
  }
  
  return axios.get(`https://api.github.com/search/users?q=${keyword}&page=${APIPage}&per_page=100`, config)
    .then(({data}) => {
      const totalCount = data['total_count']
      // console.log('TOTALCOUNT:', totalCount)
      dispatch(gotTotalCount(totalCount))
      const userUrls = data.items.map(userObj => userObj.url) //array of user objects
      console.log('SEARCH URLS: ', userUrls)
      dispatch(gotUrls(userUrls))
    })
    .catch(err => {
      console.error(err)
    })
}

export const fetchUsers = num => (dispatch, getState) => {
  console.log('IN FETCH USERS', num)

  const userPerPage = 10
  
  let startPage
  if(num%userPerPage === 0) {
    startPage = num - userPerPage + 1
  } else {
    startPage = Math.floor(num/userPerPage)*10 + 1
  }
  const { totalCount } = getState()
  const maxPage = Math.min(Math.ceil(totalCount/10),100)
  const endPage = Math.min(startPage+userPerPage-1, maxPage)
  dispatch(gotPagination([startPage, endPage]))
  console.log(`PAGINATION: [${startPage}, ${endPage}]`)

  // if page can be found in localStorage, load it from localStorage then dispatch to store
  const usersLS = localStorage.getItem(num+'')
  if(usersLS) {
    const users = JSON.parse(usersLS)
    return dispatch(gotUsers(users))
  }

  const { urls } = getState()
  const startIdx = (num-1)*userPerPage
  console.log('URL SLICE:', startIdx%100, startIdx%100===90? 100 : (startIdx+userPerPage)%100)
  const paginatedUrls = urls.slice(startIdx%100, startIdx%100===90? 100 : (startIdx+userPerPage)%100)
  console.log('SLICEDURLS:', paginatedUrls)

  return Promise.all(paginatedUrls.map(url => axios.get(url, config)))
    .then(data => (
      data.map(({data}) => {
        const {name, avatar_url, email, login, location, public_repos, followers, bio, html_url} = data
        return {
          name,
          avatarUrl : avatar_url,
          email,
          login,
          location,
          repos: public_repos,
          followers,
          bio,
          url: html_url
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