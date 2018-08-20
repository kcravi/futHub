import React, { Component } from 'react';
import { Link } from 'react-router'

import TeamIndexTile from '../components/TeamIndexTile'
import TournamentIndexContainer from './TournamentIndexContainer'

class TeamIndexContainer extends Component {
  constructor(props){
    super(props);
    this.state={
      teams: []
    }
  }

  componentDidMount(){
    fetch('/api/v1/teams.json')
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
        this.setState({ teams: body.teams })
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
    }

  render(){
    let teams = this.state.teams.map(team => {
      return(
        <TeamIndexTile
          key={team.id}
          id={team.id}
          name={team.name}
          city={team.city}
          state={team.state}
          url={team.url}
          photo={team.photo}
        />
      )
    })

    return(
      <div>
        <div className="container">
          <h2>Team List</h2>
        </div>
        <div className="wrapper">
          {teams}
        </div>
        <Link to='/teams/new'>
          <button className="button"> Make a New Team </button>
        </Link>
        <br/><br/><br/>
        <TournamentIndexContainer />
        <Link to='/tournaments/new'>
          <button className="button"> Create a New Tournament </button>
        </Link>
      </div>
    )
  }
}

export default TeamIndexContainer
