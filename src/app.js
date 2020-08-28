import React from 'react'
import { Home, Main } from './components'
import { Switch, Route } from 'react-router-dom'


const App = () => {

  return(
    <div>
      <Switch>
        <Route path='/search/:keyword/:page' component={Main} />
        <Route path='/' component={Home} />
      </Switch>
    </div>
  )
}

export default App