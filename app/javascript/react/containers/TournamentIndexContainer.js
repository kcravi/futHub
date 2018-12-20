import React, { Component } from 'react';
import { Link } from 'react-router'

import TournamentIndexTile from '../components/TournamentIndexTile'

class TournamentIndexContainer extends Component {
  constructor(props){
    super(props);
    this.state={
      tournaments: [],
      currentUserId: ''
    }
  }

  componentDidMount(){
    fetch('/api/v1/tournaments.json')
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
          throw(error);
        }
      })
      .then(response => response.json())
      .then(body => {
        this.setState({
          tournaments: body.tournaments,
          currentUserId: body.current_user_id})
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
    }

  render(){

    let tournaments = this.state.tournaments.map(tournament => {
      return (
        <TournamentIndexTile
          key={tournament.id}
          id={tournament.id}
          name={tournament.name}
          city={tournament.city}
          state={tournament.state}
          url={tournament.url}
          photo={tournament.photo}
        />
      )
    })
    let newTournamentButton = ''
    if (this.state.currentUserId) {
      newTournamentButton = <button className="button team-button"> Create Tournament </button>
    }

    return(
      <div>
        <div className="row team-title-main-div">
          <div className="small-6 columns team-title-div">
            <a href="/tournaments">Tournament Lists</a>
          </div>
          <div className="small-6 columns">
            <Link to='/tournaments/new'>
              {newTournamentButton}
            </Link>
          </div>
        </div>
        <div className="wrapper callout team-tile">
          {tournaments}
        </div>
      </div>
    )
  }
}

export default TournamentIndexContainer
