import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

const SearchBar = () => {

  const keywordOnFile = useSelector(state => state.keyword)

  const initialState = {
    keyword: '',
    fullname: '',
    repos: 0,
    followers: 0,
    language: '',
    warning: ''
  }
  const [state, setState] = useState(initialState)
  const {keyword, fullname, repos, followers, language, warning} = state

  const [advance, setAdvance] = useState(false)

  const history = useHistory()

  const handleChange = e => {
    if(e.target.name === 'keyword') {
      setState({...initialState, keyword: e.target.value})
    } else {
      setState({...state, [e.target.name]: e.target.value})
    }
  }

  const handleSubmit = e => {
    e.preventDefault()

    // build query string
    // check if fullname contains character other than \w
    let fullnameString = ''
    if(fullname) {
      const checkNameRe = /^(\w|\s)+$/g
      const namecheckArr = checkNameRe.exec(fullname)
      
      if(namecheckArr) {
        fullnameString = `+fullname:${fullname}`
      } else {
        // show warning
        setState({...state, warning: '**Name can only contain alphabets and space'})
        return
      }
    }
    setState({...state, warning: ''})
    
    const reposString = repos ? `+repos:>${repos}` : ''
    const followersString = followers ? `+followers:>${followers}` : ''
    const languageString = language ? `+language:${language}` : ''
    const query= keyword + fullnameString + reposString + followersString + languageString

    //redirect
    history.push(`/search/${query}/1`)
  }

  const handleSetAdvance = () => {
    setAdvance(!advance)
  }

  useEffect(() => {
    //extract keyword & filter info from url query string
    if(keywordOnFile) { 
      const idxOfPlus = keywordOnFile.indexOf('+')
      let keywordFromQuery
      if(idxOfPlus > 0) {
        keywordFromQuery = keywordOnFile.slice(0, idxOfPlus)
      } else {
        keywordFromQuery = keywordOnFile
      }

      const nameRe = /fullname:((\w|\s)+)(\+|$)/g
      const nameArr = nameRe.exec(keywordOnFile)
      let nameFromQuery = ''
      if(nameArr) {
        nameFromQuery = nameArr[1]
      }

      const reposRe = /repos:>(\d+)(\+|$)/g
      const reposArr = reposRe.exec(keywordOnFile)
      let reposFromQuery = 0
      if(reposArr) {
        reposFromQuery = reposArr[1]
      }
      
      const followersRe = /followers:>(\d+)(\+|$)/g
      const followersArr = followersRe.exec(keywordOnFile)
      let followersFromQuery = 0
      if(followersArr) {
        followersFromQuery = followersArr[1]
      }

      const languageRe = /language:((\w+))(\+|$)/g
      const languageArr = languageRe.exec(keywordOnFile)
      let languageFromQuery = ''
      if(languageArr) {
        languageFromQuery = languageArr[1]
      }

      setState({...state, 
        keyword: keywordFromQuery, 
        fullname: nameFromQuery, 
        repos: reposFromQuery,
        followers: followersFromQuery,
        language: languageFromQuery
      })
    }
  }, [keywordOnFile])

  return(
    <div>
      <form id='search' className='search-bar' onSubmit={handleSubmit}>
        <div className='main-methods'>
          <img id='icon' src={process.env.PUBLIC_URL + '/icons/G.ico'} alt='icon'/>
          <div className='green'>
            <input className='keyword' type='text' placeholder='Search Github users ...' name='keyword' value={keyword} onChange={handleChange} required/>
          </div>        
          <input className='submit' type='submit' value='Search'/>
        </div>
        <div className={'click-for-advance'} onClick={handleSetAdvance}>Add filters +</div>
        {advance? 
        <div className='advance-methods'>
          <div>
            <label>Name:</label>
            <input className='filter-fullname' type='text' name='fullname' value={fullname} placeholder='Enter name here...' onChange={handleChange}/>
            {warning ? <div className='warning'>{warning}</div> : null}
          </div>
          <div>
            <label>Minium amount of repos:</label>
            <input className='filter-repos' type='number' name='repos' value={repos} onChange={handleChange}/>
          </div>
          <div>
            <label>Minium amount of followers:</label>
            <input className='filter-followers' type='number' name='followers' value={followers} onChange={handleChange}/>
          </div>
          <div>
            <label>Language:</label>
            <select id='drop-down' name='language' form='search' onChange={handleChange}>
              <option value={language}>{language? language : '--'}</option>
              <option value='Python'>Python</option>
              <option value='Javascript'>Javascript</option>
            </select>
          </div>
        </div>
        : null}
      </form>
    </div>
  )
}

export default SearchBar