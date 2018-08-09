import React from 'react'
import { Route, IndexRoute, Router, browserHistory } from 'react-router';

import TeamIndexContainer from './TeamIndexContainer'
import TeamShowContainer from './TeamShowContainer'
import TeamFormContainer from './TeamFormContainer'

export const App = () => {
  return (
    <Router history={browserHistory} >
      <Route path='/' >
        <IndexRoute component={TeamIndexContainer} />
        <Route path='/teams' component={TeamIndexContainer} />
        <Route path='/teams/new' component={TeamFormContainer} />
        <Route path='/teams/:id' component={TeamShowContainer} />
      </Route>
    </Router>
  )
}

export default App
