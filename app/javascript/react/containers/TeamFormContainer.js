import React from 'react';
import { browserHistory } from 'react-router'

import TeamFormTile from '../components/TeamFormTile'

class TeamFormContainer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      name: '',
      city: '',
      state: '',
      zipcode: '',
      description: '',
      phone_number: '',
      website: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addNewTeam = this.addNewTeam.bind(this);
  }

    handleChange(event){
      this.setState ({
        [event.target.name]: event.target.value
      });
    }

    handleClear(){
      this.setState({
        name: "",
        city: "",
        state: "",
        zipcode: "",
        description: "",
        phone_number: "",
        website: ""
      });
    }

    handleSubmit(event){
      event.preventDefault();
      let payload = {
        name: this.state.name,
        city: this.state.city,
        state: this.state.state,
        zipcode: this.state.zipcode,
        description: this.state.description,
        phone_number: this.state.phone_number,
        website: this.state.website
      }
      this.addNewTeam(payload)
      this.handleClear();
    }

    addNewTeam(payload){
      fetch('/api/v1/teams.json', {
       credentials: 'same-origin',
       method: 'POST',
       body: JSON.stringify(payload),
       headers: { 'Content-Type': 'application/json' }
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
       .then(body => browserHistory.push(`/teams/${body.team.id}`))
       .catch(error => console.error(`Error in fetch: ${error.message}`));
    }

  render (){
    console.log(this.state)
    return (
      <form id='team-form' onSubmit={this.handleSubmit}>
        <h1> Add New Team </h1>

       <TeamFormTile
          name="name"
          label="Team Name"
          content={this.state.name}
          handlerFunction={this.handleChange}
        />
       <TeamFormTile
          name="city"
          label="City"
          content={this.state.city}
          handlerFunction={this.handleChange}
        />
       <TeamFormTile
          name="state"
          label="State"
          content={this.state.state}
          handlerFunction={this.handleChange}
        />
       <TeamFormTile
          name="zipcode"
          label="Zipcode"
          content={this.state.zipcode}
          handlerFunction={this.handleChange}
        />
       <TeamFormTile
          name="description"
          label="Description"
          content={this.state.description}
          handlerFunction={this.handleChange}
        />
       <TeamFormTile
          name="website"
          label="Website"
          content={this.state.website}
          handlerFunction={this.handleChange}
        />
       <TeamFormTile
          name="phone_number"
          label="Phone  Number"
          content={this.state.phone_number}
          handlerFunction={this.handleChange}
        />
        <button type="submit" value="submit">Submit</button>
      </form>
    )
  }
}

export default TeamFormContainer;
