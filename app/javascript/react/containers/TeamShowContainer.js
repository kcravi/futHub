import React, { Component } from 'react';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';

import TeamShowTile from '../components/TeamShowTile';
import DeleteTeamButton from '../components/DeleteTeamButton';

class TeamShowContainer extends Component {
  constructor(props){
    super(props);
    this.state={
      team: {},
      adminStatus: false,
      currentUserId: null
    }
    this.deleteTeam = this.deleteTeam.bind(this)
  }

  componentDidMount(){
    fetch(`/api/v1/teams/${this.props.params.id}.json`, {
      credentials: 'same-origin'
    })
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
        team: body.team,
        adminStatus: body.admin_status,
        currentUserId: body.current_user_id
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  deleteTeam() {
    fetch(`/api/v1/teams/${this.props.params.id}.json`, {
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json',
      'X-Requested-With': 'XHMLttpRequest' },
      method: 'DELETE',
    })
      .then(response => {
        if(response.ok){
          return response
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
              error = new Error(errorMessage)
          throw(error)
        }
      })
      .then(response => response.json())
      .then(body => browserHistory.push('/teams'))
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render(){
    let onClickAction = () => {
      if (window.confirm('Are you sure you want to delete this Team?')) {
        this.deleteTeam()
      }
    }

    let editTeam = ''
    let deleteTeam = ''
    if(this.state.adminStatus) {
      editTeam = <button className="snip1287"> Edit </button>
      deleteTeam = <button className="snip1287" onClick={onClickAction}> Delete </button>
    }

    return(
      <div>
        <TeamShowTile
          key={this.state.team.id}
          id={this.state.team.id}
          name={this.state.team.name}
          city={this.state.team.city}
          state={this.state.team.state}
          zipcode={this.state.team.zipcode}
          description={this.state.team.description}
          website={this.state.team.website}
          phone_number={this.state.team.phone_number}
          url={this.state.team.url}
          photo={this.state.team.photo}
        />
        <br/><br/>

        <button className="snip1287"> Join </button>

        <Link to={`/teams/${this.state.team.id}/edit`}>
          {editTeam}
        </Link>

        {deleteTeam}
      </div>
    )
  }
}

export default TeamShowContainer;
