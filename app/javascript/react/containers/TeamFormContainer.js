import React from 'react';
import { browserHistory } from 'react-router'
import Dropzone from 'react-dropzone';

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
      website: '',
      errors: {},
      file: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addNewTeam = this.addNewTeam.bind(this);
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
        if (key != "errors" && key != "phone_number" && key != "website") {
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
        payload.append("website", this.state.websit);
        payload.append("photo", this.state.file[0]);
        this.addNewTeam(payload)
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

    // The payload needs not to be stringified and headers is not required when FORMDATA object is used during post/patch method.
    // body: JSON.stringify(payload),
    // headers: { 'Content-Type': 'application/json' }
    addNewTeam(payload){
      fetch('/api/v1/teams.json', {
       credentials: 'same-origin',
       method: 'POST',
       body: payload
     })
     .then(response => {
         if(response.ok){
           return response
         } else {
           let errorMessage = `${response.status} (${response.statusText})`,
             error = new Error(errorMessage)
             if(response.status == 401){
               alert("You must be signed in to add a team!!!")
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
        <h1 className="form-header"> Add New Team </h1>
        {errorDiv}

       <div className="small-12 column">
         <TeamFormTile
            name="name"
            label="Team Name *"
            content={this.state.name}
            handlerFunction={this.handleChange}
          />
        </div>

        <div className="small-6 column">
         <TeamFormTile
            name="city"
            label="City *"
            content={this.state.city}
            handlerFunction={this.handleChange}
          />
        </div>

        <div className="small-3 column">
         <TeamFormTile
            name="state"
            label="State *"
            content={this.state.state}
            handlerFunction={this.handleChange}
          />
        </div>

        <div className="small-3 column">
         <TeamFormTile
            name="zipcode"
            label="Zipcode *"
            content={this.state.zipcode}
            handlerFunction={this.handleChange}
          />
        </div>

        <div className="small-12 column">
         <TeamFormTile
            name="description"
            label="Description *"
            content={this.state.description}
            handlerFunction={this.handleChange}
          />
        </div>

        <div className="small-12 column">
         <TeamFormTile
            name="website"
            label="Website"
            content={this.state.website}
            handlerFunction={this.handleChange}
          />
        </div>

        <div className="small-12 column">
         <TeamFormTile
            name="phone_number"
            label="Phone  Number"
            content={this.state.phone_number}
            handlerFunction={this.handleChange}
          />
        </div>

       <section>
        <div className="dropzone">
          <Dropzone onDrop={this.onDrop}>
            <p className="dropzone-content">Try dropping some files here, or click to select files to upload.</p>
          </Dropzone>
        </div>
        <aside>
          <ul>
            {this.state.file.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)}
          </ul>
        </aside>
       </section>

       <button className="button" type="submit">Submit</button>
      </form>
    )
  }
}

export default TeamFormContainer;
