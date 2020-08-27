import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import actions from '../store/actions'

const SearchBar = () => {

  const [keyword, setKeyword] = useState('')

  const dispatch = useDispatch()

  const handleChange = e => {
    setKeyword(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()
    console.log('SERACH!', keyword)
    
    //dispatch keyword to thunk
    dispatch(actions.searchUsers(keyword))
    //make api calls
    //dispatch results to reducer
    //redirect
    //show loading
    //show results when state change
  }

  return(
    <div>
      <form className='search-bar' onSubmit={handleSubmit}>
        <input className='keyword' type='text' name='keyword' onChange={handleChange} required/>
        <input className='submit button' type='submit' value='Search'/>
      </form>
    </div>
  )
}

export default SearchBar