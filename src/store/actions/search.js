import axios from 'axios'

export const GOT_USERS = 'GOT_USERS'

// action creator
const gotUsers = users => ({type: GOT_USERS, users})

// thunk creator
export const searchUsers = keyword => dispatch => (
  axios.get(`https://api.github.com/search/users?q=${keyword}&page=1&per_page=20`)
    .then(({data}) => {
      const totalCount = data['total_count']
      const users = data.items
      console.log(totalCount, users)
      // dispatch(gotUsers(data))
    })
)