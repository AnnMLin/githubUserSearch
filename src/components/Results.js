import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import actions from '../store/actions'


const Results = () => {

  const { page, keyword } = useParams()
  console.log('PAGE:', page)
  console.log('KEYWORD:', keyword)

  const keywordOnFile = useSelector(state => state.keyword)
  console.log('KEYWORD_STORE:', keywordOnFile)
  const users = useSelector(state => state.users)
  console.log('USERS', users)
  const totalCount = useSelector(state => state.totalCount)

  const dispatch = useDispatch()

  // when params keyword change, make search api call to gh get 100 urls
  // get first 10 urls, make user api call to gh
  useEffect(() => {
    // update keywordOnFile in case user pressed back/forward button
    if(keyword !== keywordOnFile) {
      dispatch(actions.clearUsers())
      dispatch(actions.clearTotalCount())
      dispatch(actions.gotKeyword(keyword))
    }

    dispatch(actions.searchUsers(keyword))
      .then(() => {
        dispatch(actions.fetchUsers(page))
      })
  }, [keyword])



  return(
    <div id='results'>
      {totalCount > 0?
      <div>{totalCount} users</div> : null
      }
      {users.length ? 
      users.map(({avatarUrl, name, login, email, location, repos, followers, bio}) => (
        <div key={login} className='user-container'>
          <div className='inner-container'>
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
              {bio?<div className='user-bio'>{bio}</div> : null}
            </div>
            <div className='fade-out'></div>
          </div>
        </div>
      ))
        : 'LOADING...' }
    </div>
  )
}

export default Results