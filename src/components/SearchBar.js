import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

const SearchBar = () => {

  const [keyword, setKeyword] = useState('')
  const keywordOnFile = useSelector(state => state.keyword)

  const history = useHistory()

  const handleChange = e => {
    setKeyword(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()
    history.push(`/search/${keyword}/1`)
  }

  useEffect(() => {
    setKeyword(keywordOnFile)
  }, [keywordOnFile])

  return(
    <div>
      <form className='search-bar' onSubmit={handleSubmit}>
        <img id='icon' src={process.env.PUBLIC_URL + '/icons/G.ico'} alt='icon'/>
        <div>
          <input className='keyword' type='text' placeholder='Search Github users ...' name='keyword' value={keyword} onChange={handleChange} required/>
        </div>        
        <input className='submit' type='submit' value='Search'/>
      </form>
    </div>
  )
}

export default SearchBar