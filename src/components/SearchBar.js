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
  let {keyword, fullname, repos, followers, language, warning} = state

  const [advance, setAdvance] = useState(-1)
  const [keywordWarning, setKeywordWarning] = useState(false)
  let show = ''
  switch(advance) {
    case -1:
      show = 'advance-methods'
      break
    case 0:
      show = 'advance-methods close'
      break
    case 1:
      show = 'advance-methods show'   
      break
    default:
      break
  }

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

    keyword = keyword.replace(/#/g, '%23')
  
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
    // when a keyword is not provided
    if(!keyword) {
      setKeywordWarning(true)
      setAdvance(-1)
    } else {
      setKeywordWarning(false)

      // if drop-down is already opened
      if(advance === 1) {
        setAdvance(0)
      } else {
        //if drop-down is closed
        setAdvance(1)
      }
    }
  }

  const handleClearFilters = () => {
    setState({...state, fullname: '', repos: 0, followers: 0, language: ''})
    let selectBar = document.querySelector('#drop-down')
    selectBar.selectedIndex = 0
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
      keywordFromQuery = keywordFromQuery.replace(/%23/g, '#')

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

  // language array
  const ghLans = [ 'ABAP', 'C', 'C#', 'C++', 'Clojure', 'CoffeeScript', 'Common Lisp', 'Coq', 'Crystal', 'Dart', 'DM', 'Elixir', 'Elm', 'Emacs Lisp', 'Erlang', 'F#', 'Fortran', 'Go', 'Groovy', 'Hashell', 'Java', 'Javascript', 'Jsonnet', 'Julia', 'Kotlin', 'Lua', 'MATLAB', 'Nix', 'Objective-C', 'Objective-C++', 'OCaml', 'Perl', 'PHP', 'PowerShell', 'Puppet', 'PureScript', 'Python', 'R', 'Ruby', 'Rust', 'Scala', 'Shell', 'Smalltalk', 'Swift', 'TSQL', 'TypeScript', 'Vala', 'Vim script', 'Visual Basic .NET', 'WebAssembly']

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
        {keywordWarning? <div className='warning filter-warning'>**Please enter keyword first**</div> : null}
        {/*ADVANCE METHODS BELOW*/}
        <div className={show}>
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
              <option value=''>--</option>
              {ghLans.map(lan => {
                let lanVal = lan
                lanVal = lanVal.replace('#', '%23')

                return (
                  <option key={lanVal} value={lanVal}>{lan}</option>
                )
              })}
            </select>
          </div>
          <div className='clear-filters' onClick={handleClearFilters}>Clear filters</div>
        </div>

      </form>
    </div>
  )
}

export default SearchBar