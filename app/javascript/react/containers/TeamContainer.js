import React, { Component } from 'react';
import { Link } from 'react-router'

import TeamIndexTile from '../components/TeamIndexTile'

class TeamContainer extends Component {
  constructor(props){
    super(props);
    this.state={
      teams: [],
      current_user_id: null
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
        this.setState({
          teams: body.teams,
          currentUserId: body.current_user_id
        })
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

    let newTeamButton = ''
    if (this.state.currentUserId) {
      newTeamButton = <button className="button team-button"> Make a New Team </button>
    }

    return(
      <div>
        <div className="row team-title-main-div">
          <div className="small-6 columns team-title-div">
            <a href="/teams">Local Teams </a>
          </div>
          <div className="small-6 columns">
            <Link to='/teams/new'> {newTeamButton}<br/> </Link>
          </div>
        </div>
        <div className="wrapper callout team-tile">
          {teams}
        </div>
      </div>
    )
  }
}

export default TeamContainer
