import React from 'react';
import { browserHistory } from 'react-router';
import Dropzone from 'react-dropzone';

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
      errors: {},
      file: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.editTeam = this.editTeam.bind(this);
    this.validateEntry = this.validateEntry.bind(this);
    this.onDrop = this.onDrop.bind(this);
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
        errors: {},
        file: []
      });
    }

    handleSubmit(event){
      event.preventDefault();
      Object.keys(this.state).forEach(key => {
        if (key != "errors" && key != "phone_number" && key != "website" && key != "file") {
          this.validateEntry(key, this.state[key])
        }
      })
      if (Object.keys(this.state.errors).length == 0){
        let payload = new FormData();
        payload.append("name", this.state.name);
        payload.append("city", this.state.city);
        payload.append("state", this.state.state);
        payload.append("zipcode", this.state.zipcode);
        payload.append("description", this.state.description);
        payload.append("phone_number", this.state.phone_number);
        payload.append("website", this.state.website);
        payload.append("photo", this.state.file[0]);
        this.editTeam(payload);
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

    // body: JSON.stringify(payload),
    // headers: { 'Content-Type': 'application/json' }
    editTeam(payload){
      fetch(`/api/v1/teams/${this.props.params.id}.json`, {
       credentials: 'same-origin',
       method: 'PATCH',
       body: payload
     })
     .then(response => {
         if(response.ok){
           return response
         } else {
           let errorMessage = `${response.status} (${response.statusText})`,
             error = new Error(errorMessage)
             if(response.status == 401){
               alert("You must be signed in to edit a team!!!")
             }
           throw(error)
         }
       })
       .then(response => response.json())
       .then(body => browserHistory.push(`/teams/${body.team.id}`))
       .catch(error => console.error(`Error in fetch: ${error.message}`));
    }

    onDrop(file) {
     if(file.length == 1) {
       this.setState({ file: file })
     } else {
       let newError = { picture: `You can only upload one photo per team.`};
       this.setState({ errors: Object.assign(this.state.errors, newError) });
     }
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
        <section>
          <div className="dropzone">
            <Dropzone onDrop={this.onDrop}>
              <p>Try dropping some files here, or click to select files to upload.</p>
            </Dropzone>
          </div>
          <aside>
            <h2>Dropped files</h2>
            <ul>
              {this.state.file.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)}
            </ul>
          </aside>
        </section>
        <button type="submit" value="submit">Save and Submit</button>
      </form>
    )
  }
}

export default TeamEditContainer;
