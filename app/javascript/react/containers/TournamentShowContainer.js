import React, { Component } from 'react';
import { Link } from 'react-router';
import TournamentShowTile from '../components/TournamentShowTile';

class TournamentShowContainer extends Component {
  constructor(props){
    super(props);
    this.state={
      tournament: {}
    }
  }

  componentDidMount(){
    fetch(`/api/v1/tournaments/${this.props.params.id}.json`, {
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
        tournament: body.tournament
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render(){
    return(
      <div>
        <TournamentShowTile
          key={this.state.tournament.id}
          id={this.state.tournament.id}
          name={this.state.tournament.name}
          organizer={this.state.tournament.organizer}
          street={this.state.tournament.street}
          city={this.state.tournament.city}
          state={this.state.tournament.state}
          zipcode={this.state.tournament.zipcode}
          description={this.state.tournament.description}
          website={this.state.tournament.website}
          url={this.state.tournament.url}
          photo={this.state.tournament.photo}
          fee={this.state.tournament.fee}
          awards={this.state.tournament.awards}
          status={this.state.tournament.status}
          types={this.state.tournament.types}
        />
        <button className="snip1287">
            Join
        </button>
        <button className="snip1287">
          Edit
        </button>
     </div>
    )
  }
}

export default TournamentShowContainer;
