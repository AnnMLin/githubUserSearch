import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import actions from '../store/actions'
import { PageNav } from '.'


const Results = () => {

  const { page, keyword } = useParams()

  const keywordOnFile = useSelector(state => state.keyword)
  console.log('KEYWORD_STORE:', keywordOnFile)
  const pageOnFile = useSelector(state => state.page)
  console.log('PAGE_STORE:', pageOnFile)
  const users = useSelector(state => state.users)
  console.log('USERS', users)
  const totalCount = useSelector(state => state.totalCount)
  const pagination = useSelector(state => state.pagination)

  const dispatch = useDispatch()

  const APIPage = Math.floor((page-1)/10) + 1

  const localStorage = window.localStorage

  useEffect(() => {
    if(keyword !== keywordOnFile) {

      localStorage.clear()
      dispatch(actions.clearTotalCount())
      dispatch(actions.clearUsers())

      dispatch(actions.gotKeyword(keyword))
      dispatch(actions.gotPage(page))
      dispatch(actions.searchUsers(keyword, APIPage))
        .then(() => dispatch(actions.fetchUsers(page)))
    }
    else if(page !== pageOnFile) {
      
      dispatch(actions.clearUsers())

      dispatch(actions.gotPage(page))
      if(page<=pagination[1] && page>=pagination[0]) {
        dispatch(actions.fetchUsers(page))
      }
      else {
        dispatch(actions.searchUsers(keyword, APIPage))
          .then(() => {
            console.log('WAS I HERE?')
            dispatch(actions.fetchUsers(page))
          })
      }
    }
  }, [keyword, page])


  return(
    <div id='results'>
      {totalCount > -1 ?
      // search results have returned
      <div>
        <div id='total-count'>{totalCount} users</div> 
        <div>
        {users.length ? 
        users.map(({avatarUrl, name, login, email, location, repos, followers, bio, url}) => (
          <a target='_blank' href={url} key={login}>
            <div className='user-container'>
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
          </a> 
        )) : null }
        </div>
      </div>
      // still searching
      : <div className='loading'>LOADING...</div> }
      {users.length ? <PageNav /> : null}
    </div>
  )
}

export default Results