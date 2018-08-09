import React, { Component } from 'react';
import TeamShowTile from '../components/TeamShowTile'

class TeamShowContainer extends Component {
  constructor(props){
    super(props);
    this.state={
      team: {}
    }
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
        team: body.team
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render(){
    return(
      <div>
        <h2> Team Info </h2>
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
        />
        <br/>
        <button>
            Edit Team Info
        </button>
     </div>
    )
  }
}

export default TeamShowContainer
