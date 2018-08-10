import React from 'react';
import { browserHistory } from 'react-router';

import TeamFormTile from '../components/TeamFormTile';

class TeamEditContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      city: '',
      state: '',
      zipcode: '',
      description: '',
      phone_number: '',
      website: '',
      errors: {}
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.editTeam = this.editTeam.bind(this);
    this.validateEntry = this.validateEntry.bind(this);
  }

    handleChange(event){
      if (event.target.name != "phone_number" && event.target.name != "website") {
        this.validateEntry(event.target.name, event.target.value);
      }
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
        website: "",
        errors: ""
      });
    }

    handleSubmit(event){
      event.preventDefault();

      Object.keys(this.state).forEach(key => {
        if (key != "errors" && key != "phone_number" && key != "website") {
          this.validateEntry(key, this.state[key])
        }
      })

      if (Object.keys(this.state.errors).length == 0){
        let payload = {
          name: this.state.name,
          city: this.state.city,
          state: this.state.state,
          zipcode: this.state.zipcode,
          description: this.state.description,
          phone_number: this.state.phone_number,
          website: this.state.website
        }
        this.editTeam(payload)
        this.handleClear();
      }
    }

    validateEntry(name, fieldValue){
      if (fieldValue === '') {
        let newError = { [name]: `You must enter a ${name}`};
        this.setState({ errors: Object.assign(this.state.errors, newError) });
        return false;
      } else {
        let errorState = this.state.errors;
        delete errorState[name];
        this.setState({ errors: errorState });
        return true;
      }
    }

    componentDidMount(){
      fetch(`/api/v1/teams/${this.props.params.id}.json`, {
        credentials: 'same-origin'})
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
          name: body.team.name,
          city: body.team.city,
          state: body.team.state,
          zipcode: body.team.zipcode,
          description: body.team.description,
          phone_number: body.team.phone_number,
          website: body.team.website
        })
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
    }

    editTeam(payload){
      fetch(`/api/v1/teams/${this.props.params.id}.json`, {
       credentials: 'same-origin',
       method: 'PATCH',
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
    let errorDiv;
    let errorItems;
    if (Object.keys(this.state.errors).length > 0) {
      errorItems = Object.values(this.state.errors).map(error => {
        return(<li key={error}>{error}</li>)
      })
      errorDiv = <div className="callout alert">{errorItems}</div>
    }

    return (
      <form id='team-form' onSubmit={this.handleSubmit}>
        <h1> Edit Team Info </h1>
        {errorDiv}
         <TeamFormTile
            name="name"
            label="Team Name*"
            content={this.state.name}
            handlerFunction={this.handleChange}
          />
         <TeamFormTile
            name="city"
            label="City*"
            content={this.state.city}
            handlerFunction={this.handleChange}
          />
         <TeamFormTile
            name="state"
            label="State*"
            content={this.state.state}
            handlerFunction={this.handleChange}
          />
         <TeamFormTile
            name="zipcode"
            label="Zipcode*"
            content={this.state.zipcode}
            handlerFunction={this.handleChange}
          />
         <TeamFormTile
            name="description"
            label="Description*"
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
          <button type="submit" value="submit">Save and Submit</button>
      </form>
    )
  }
}

export default TeamEditContainer;
