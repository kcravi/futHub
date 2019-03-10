import React, { Component } from 'react';
import { Link } from 'react-router'

import TeamIndexTile from '../components/TeamIndexTile'

class TeamContainer extends Component {
  constructor(props){
    super(props);
    this.state={
      teams: [],
      currentUserId: null
    }
  }

  componentDidMount(){
    let props;
    if (this.props.unRegisteredUser){ props = this.props}
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
        if(props && !body.current_user_id){
          props.unRegisteredUser();
        }
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
          teamProfilePhoto={team.profile_photo}
        />
      )
    })

    let newTeamButton;
    if (this.state.currentUserId) {
      newTeamButton = <button className="button team-button"> Make a New Team </button>
    }

    return(
      <div>
        <br/>
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
