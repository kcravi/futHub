import React from 'react'
import { Route, IndexRoute, Router, browserHistory } from 'react-router';

import TeamIndexContainer from './TeamIndexContainer'

export const App = () => {
  return (
    <Router history={browserHistory} >
      <Route path='/' >
        <IndexRoute component={TeamIndexContainer} />
          <Route path='/teams' component={TeamIndexContainer} />
      </Route>
    </Router>
  )
}

export default App
