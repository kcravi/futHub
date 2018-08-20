import React, { Component } from 'react';
import { Link } from 'react-router'

import TournamentIndexTile from '../components/TournamentIndexTile'

class TournamentIndexContainer extends Component {
  constructor(props){
    super(props);
    this.state={
      tournaments: []
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
        this.setState({ tournaments: body.tournaments })
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

    return(
      <div>
        <div className="container">
          <h2>Tournament List</h2>
        </div>
        <div className="wrapper">
          {tournaments}
        </div>
      </div>
    )
  }
}

export default TournamentIndexContainer
