import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import actions from '../store/actions'


const Results = () => {

  const { page, keyword } = useParams()
  console.log('PAGE:', page)
  console.log('KEYWORD:', keyword)

  const keywordInStore = useSelector(state => state.keyword)
  console.log('KEYWORD_STORE:', keywordInStore)
  const users = useSelector(state => state.users)
  console.log('USERS', users)

  const dispatch = useDispatch()

  // when component first mounted (from home page to result page), make search api call to gh get 100 urls
  // get first 10 urls, make user api call to gh
  useEffect(() => {
    dispatch(actions.searchUsers(keyword))
      .then(() => {
        dispatch(actions.fetchUsers(page))
      })
  }, [])

  return(
    <div id='results'>
      {users.length ? 
      users.map(({avatarUrl, name, login, email, location, repos, followers, bio}) => (
        <div key={login} className='user-container'>
          <div className='user-info'>
            <div className='info-left'>
              <img className='user-avatar' src={avatarUrl} alt='user-avatar' />
            </div>
            <div className='info-right'>
              {name? <div className='user-name'>{name}</div> : null}
              <div className='login'>{login}</div>
              {email? <div className='email'>{email}</div> : null}
              {location? <div className='loc'>{location}</div> : null}
              <div className='repo'>{repos} repos</div>
              <div className='followers'>{followers} followers</div>
            </div>
          </div>
          {bio?<div className='user-bio'>{bio}</div> : null}
        </div>
      ))
        : 'LOADING' }
    </div>
  )
}

export default Results