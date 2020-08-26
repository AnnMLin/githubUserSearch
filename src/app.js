import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import actions from './store/actions'
import { Home } from './components'


const App = () => {

  const dispatch = useDispatch()

  // useEffect(() => {
  //   dispatch(actions.getAllUsers())
  // }, [])

  return(
    <div>
      <Home />
    </div>
  )
}

export default App