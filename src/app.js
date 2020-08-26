import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import actions from './store/actions'

const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(actions.getAllUsers())
  }, [])

  return(
    <div>Boilermaker</div>
  )
}

export default App