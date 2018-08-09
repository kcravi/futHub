import React from 'react'
import { Route, IndexRoute, Router, browserHistory } from 'react-router';

import TeamIndexContainer from './TeamIndexContainer'
import TeamShowContainer from './TeamShowContainer'

export const App = () => {
  return (
    <Router history={browserHistory} >
      <Route path='/' >
        <IndexRoute component={TeamIndexContainer} />
          <Route path='/teams' component={TeamIndexContainer} />
            <Route path='/teams/:id' component={TeamShowContainer} />
      </Route>
    </Router>
  )
}

export default App
