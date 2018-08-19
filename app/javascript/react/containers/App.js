import React from 'react';
import { Route, IndexRoute, Router, browserHistory } from 'react-router';

import TeamIndexContainer from './TeamIndexContainer'
import TeamShowContainer from './TeamShowContainer'
import TeamFormContainer from './TeamFormContainer'
import TeamEditContainer from './TeamEditContainer'
import SearchBarIndexContainer from './SearchBarIndexContainer'

import TournamentIndexContainer from './TournamentIndexContainer'
import TournamentShowContainer from './TournamentShowContainer'

export const App = () => {
  return (
    <Router history={browserHistory} >
      <Route path='/' >
        <IndexRoute component={TeamIndexContainer} />
        <Route path='/meetups' component={SearchBarIndexContainer} />
        <Route path='/meetups/:id' component={TeamShowContainer} />
        <Route path='/tournaments' component={TournamentIndexContainer} />
        <Route path='/tournaments/:id' component={TournamentShowContainer} />
        <Route path='/teams' component={TeamIndexContainer} />
        <Route path='/teams/new' component={TeamFormContainer} />
        <Route path='/teams/:id' component={TeamShowContainer} />
        <Route path='/teams/:id/edit' component={TeamEditContainer} />
      </Route>
    </Router>
  )
}

export default App
