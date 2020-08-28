import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const PageNav = () => {
  
  const dispatch = useDispatch()
  const page = useSelector(state => state.page)

  return(
    <div className='page-nav'>
      <div>{'<<'}</div>
      <div>{'<'}</div>
      <div></div>
      <div>></div>
      <div>>></div>
    </div>
  )
}

export default PageNav