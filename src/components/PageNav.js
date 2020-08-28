import React from 'react'
import { useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'

const PageNav = () => {
  
  const page = useSelector(state => state.page)
  const pagination = useSelector(state => state.pagination)

  const { keyword } = useParams()
  const history = useHistory()

  const pages = []

  for(let i = pagination[0]; i <= pagination[1]; i++) {
    pages.push(i)
  }

  const handlePreviousGroup = () => {
    history.push(`/search/${keyword}/${pagination[1]-10}`)
  }

  const handleNextGroup = () => {
    history.push(`/search/${keyword}/${pagination[0]+10}`)
  }

  const handleBack = () => {
    if(page%10 === 1) handlePreviousGroup()
    else handleGoToPage(Number(page)-1)
  }

  const handleNext = () => {
    if(page%10 === 0) handleNextGroup()
    else handleGoToPage(Number(page)+1)
  }

  const handleGoToPage = page => {
    history.push(`/search/${keyword}/${page}`)
  }

  return(
    <div className='page-nav'>
      {pagination[0] === 1 ? null : <div onClick={handlePreviousGroup}>{'<<'}</div>}
      {page === '1' ? null : <div onClick={handleBack}>{'<'}</div>}
      {pages.map(num => {
        let fontWeight = 'none'
        if(num == page) fontWeight = 'bold'
        return(
          <div key={num} className={fontWeight} onClick={()=>handleGoToPage(num)}>{num}</div>
        )
      })}
      {page === '100' ? null : <div onClick={handleNext}>></div>}
      {pagination[1] === 100 ? null : <div onClick={handleNextGroup}>>></div>}
    </div>
  )
}

export default PageNav