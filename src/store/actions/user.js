import axios from 'axios'

export const GOT_ALL_USERS = 'GOT_ALL_USERS'

export const gotAllUsers = users => ({type: GOT_ALL_USERS, users})

export const getAllUsers = () => dispatch => (
  axios.get('/user')
    .then(users=> {
      dispatch(gotAllUsers(users))
    })
)