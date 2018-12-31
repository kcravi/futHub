import React from 'react';
import { Route, IndexRoute, Router, browserHistory } from 'react-router';

import HomeIndexContainer from './HomeIndexContainer'
import TeamIndexContainer from './TeamIndexContainer'
import TeamShowContainer from './TeamShowContainer'
import TeamFormContainer from './TeamFormContainer'
import TeamPhotosContainer from './TeamPhotosContainer'
import TeamEditContainer from './TeamEditContainer'
import MeetupSearchBarIndexContainer from './MeetupSearchBarIndexContainer'

import TournamentIndexContainer from './TournamentIndexContainer'
import TournamentShowContainer from './TournamentShowContainer'
import TournamentFormContainer from './TournamentFormContainer'

export const App = () => {
  return (
    <Router history={browserHistory} >
      <Route path='/' >
        <IndexRoute component={HomeIndexContainer} />
        <Route path='/meetups' component={MeetupSearchBarIndexContainer} />
        <Route path='/tournaments' component={TournamentIndexContainer} />
        <Route path='/tournaments/new' component={TournamentFormContainer} />
        <Route path='/tournaments/:id' component={TournamentShowContainer} />
        <Route path='/teams' component={TeamIndexContainer} />
        <Route path='/teams/new' component={TeamFormContainer} />
        <Route path='/teams/:id' component={TeamShowContainer} />
        <Route path='/teams/:id/team_photos' component={TeamPhotosContainer} />
        <Route path='/teams/:id/edit' component={TeamEditContainer} />
      </Route>
    </Router>
  )
}

export default App
