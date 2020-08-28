import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'

const PageNav = () => {
  
  const dispatch = useDispatch()
  const page = useSelector(state => state.page)
  const pagination = useSelector(state => state.pagination)

  const { keyword } = useParams()
  const history = useHistory()

  const pages = []

  for(let i = pagination[0]; i <= pagination[1]; i++) {
    pages.push(i)
  }

  const handlePreviousGroup = () => {

  }

  const handleNextGroup = () => {

  }

  const handleBack = () => {

  }

  const handleNext = () => {

  }

  const handleGoToPage = page => {
    history.push(`/search/${keyword}/${page}`)
  }

  return(
    <div className='page-nav'>
      <div onClick={handlePreviousGroup}>{'<<'}</div>
      <div onClick={handleBack}>{'<'}</div>
      {pages.map(num => {
        const fontWeight = 'none'
        if(num === page) fontWeight = 'bold'
        return(
          <div key={num} className={fontWeight} onClick={()=>handleGoToPage(num)}>{num}</div>
        )
      })}
      <div onClick={handleNext}>></div>
      <div onClick={handleNextGroup}>>></div>
    </div>
  )
}

export default PageNav