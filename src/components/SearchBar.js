import React from 'react'

const SearchBar = () => {

  const handleSubmit = e => {
    e.preventDefault()
    console.log('SERACH!')
  }

  return(
    <div>
      <form className='search-bar' onSubmit={handleSubmit}>
        <input className='keyword' type='text' name='keyword' required/>
        <input className='submit button' type='submit' value='Search'/>
      </form>
    </div>
  )
}

export default SearchBar