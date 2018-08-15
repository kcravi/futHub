import React, { Component } from 'react';
import { Link } from 'react-router'

import TeamIndexTile from '../components/TeamIndexTile'
import SearchBarContainer from './SearchBarContainer'

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
        this.setState({ teams: body.team })
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
    }

  render(){
    let teams = this.state.teams.map(team => {
      return (
        <TeamIndexTile
          key={team.id}
          id={team.id}
          name={team.name}
          city={team.city}
          state={team.state}
          image={team.photo.url}
        />
      )
    })
    return(
      <div>
          <h2>Team List:</h2>

            <SearchBarContainer />

          <div className="wrapper">
            {teams}
          </div>
          <Link to='/teams/new'>
            <button className="button">Make a New Team </button>
        </Link>
      </div>
    )
  }
}

export default TeamIndexContainer
