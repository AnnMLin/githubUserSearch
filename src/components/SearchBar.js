import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import actions from '../store/actions'

const SearchBar = () => {

  const [keyword, setKeyword] = useState('')

  const dispatch = useDispatch()
  const history = useHistory()

  const handleChange = e => {
    setKeyword(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()
    
    dispatch(actions.gotKeyword(keyword))
    history.push(`/search/${keyword}/1`)
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