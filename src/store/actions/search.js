import axios from 'axios'

export const GOT_USERS = 'GOT_USERS'
export const GOT_URLS = 'GOT_URLS'

// action creator
const gotUsers = users => ({type: GOT_USERS, users})
const gotUrls = urls => ({type: GOT_URLS, urls})

const config = {
  headers: {
    'Authorization' : 'token '+ process.env.REACT_APP_PUBLIC_ACCESS_ONLY_PAT
  }
}

// thunk creator
export const searchUsers = keyword => dispatch => (
  axios.get(`https://api.github.com/search/users?q=${keyword}&per_page=99`, config)
    .then(({data}) => {
      const totalCount = data['total_count']
      const userUrls = data.items.map(userObj => userObj.url) //array of user objects
      console.log(userUrls)
      // dispatch(gotUsers(data))
    })
)