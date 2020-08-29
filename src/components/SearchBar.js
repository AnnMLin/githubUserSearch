import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

const SearchBar = () => {

  const [keyword, setKeyword] = useState('')

  const history = useHistory()

  const handleChange = e => {
    setKeyword(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()
    history.push(`/search/${keyword}/1`)
  }

  return(
    <div>
      <form className='search-bar' onSubmit={handleSubmit}>
        <div>
          <input className='keyword' type='text' placeholder='Search Github users ...' name='keyword' onChange={handleChange} required/>
        </div>        
        <input className='submit' type='submit' value='Search'/>
      </form>
    </div>
  )
}

export default SearchBar