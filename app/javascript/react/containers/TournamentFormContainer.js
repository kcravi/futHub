import React from 'react';
import { browserHistory } from 'react-router'
import Dropzone from 'react-dropzone';

import TournamentFormTile from '../components/TournamentFormTile'

class TournamentFormContainer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      name: '',
      organizer: '',
      description: '',
      street: '',
      city: '',
      state: '',
      zipcode: '',
      fee: '',
      awards: '',
      status: '',
      types: '',
      website: '',
      errors: {},
      file: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addNewTournament = this.addNewTournament.bind(this);
    this.validateEntry = this.validateEntry.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }

    handleChange(event){
      if (event.target.name != "website") {
        this.validateEntry(event.target.name, event.target.value);
      }
      this.setState ({
        [event.target.name]: event.target.value
      });
    }

    handleClear(){
      this.setState({
        name: '',
        organizer: '',
        description: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        fee: '',
        awards: '',
        status: '',
        types: '',
        website: '',
        errors: {},
        file: []
      });
    }

    handleSubmit(event){
      event.preventDefault();

      Object.keys(this.state).forEach(key => {
        if (key != "errors" && key != "website") {
          this.validateEntry(key, this.state[key])
        }
      })

      if (Object.keys(this.state.errors).length == 0){
        let payload = new FormData();
        payload.append("name", this.state.name);
        payload.append("organizer", this.state.organizer);
        payload.append("street", this.state.street);
        payload.append("city", this.state.city);
        payload.append("state", this.state.state);
        payload.append("zipcode", this.state.zipcode);
        payload.append("description", this.state.description);
        payload.append("fee", this.state.fee);
        payload.append("awards", this.state.awards);
        payload.append("status", this.state.status);
        payload.append("types", this.state.types);
        payload.append("website", this.state.website);
        payload.append("photo", this.state.file[0]);
        this.addNewTournament(payload)
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

    addNewTournament(payload){
      fetch('/api/v1/tournaments.json', {
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
               alert("You must be signed in to add a tournament!!!")
             }
           throw(error)
         }
       })
       .then(response => response.json())
       .then(body => browserHistory.push(`/tournaments/${body.tournament.id}`))
       .catch(error => console.error(`Error in fetch: ${error.message}`));
    }

    onDrop(file) {
     if(file.length == 1) {
       this.setState({ file: file })
     } else {
       let newError = { picture: `You can only upload one photo per tournament.`};
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

    let dropzoneStyle = {
      width: 125,
      height: 125,
      borderWidth: 2,
      borderColor: '#666',
      borderStyle: 'dashed',
      borderRadius: 5
    };

    return (
      <div>
        {errorDiv}
        <ul className="menu align-center">
          <li className="small-12 medium-8 large-6 columns">
            <form id='tournament-form' onSubmit={this.handleSubmit}>
              <h1 className="form-header"> Create New Tournament </h1>
              <div>
               <TournamentFormTile
                  name="name"
                  label="Tournament Name *"
                  content={this.state.name}
                  handlerFunction={this.handleChange}
                />
              </div>

              <div>
               <TournamentFormTile
                  name="organizer"
                  label="Organizer *"
                  content={this.state.organizer}
                  handlerFunction={this.handleChange}
                />
              </div>

              <div>
               <TournamentFormTile
                  name="description"
                  label="Description *"
                  content={this.state.description}
                  handlerFunction={this.handleChange}
                />
              </div>

              <div className="row">
                <div className="small-6 columns tour-street">
                 <TournamentFormTile
                    name="street"
                    label="Street *"
                    content={this.state.street}
                    handlerFunction={this.handleChange}
                  />
                </div>
                <div className="small-6 columns tour-city">
                 <TournamentFormTile
                    name="city"
                    label="City *"
                    content={this.state.city}
                    handlerFunction={this.handleChange}
                  />
                </div>
              </div>

              <div className="row">
                <div className="small-6 columns tour-state">
                 <TournamentFormTile
                    name="state"
                    label="State *"
                    content={this.state.state}
                    handlerFunction={this.handleChange}
                  />
                </div>
                <div className="small-6 columns tour-zipcode">
                 <TournamentFormTile
                    name="zipcode"
                    label="Zipcode *"
                    content={this.state.zipcode}
                    handlerFunction={this.handleChange}
                  />
                </div>
              </div>

              <div>
               <TournamentFormTile
                  name="website"
                  label="Website"
                  content={this.state.website}
                  handlerFunction={this.handleChange}
                />
              </div>

              <div>
               <TournamentFormTile
                  name="awards"
                  label="Awards *"
                  content={this.state.awards}
                  handlerFunction={this.handleChange}
                />
              </div>

              <div>
               <TournamentFormTile
                  name="types"
                  label="Types *"
                  content={this.state.types}
                  handlerFunction={this.handleChange}
                />
              </div>

              <div className="row">
                <div className="small-6 columns fee">
                 <TournamentFormTile
                    name="fee"
                    label="Fee *"
                    content={this.state.fee}
                    handlerFunction={this.handleChange}
                  />
                </div>
                <div className="small-6 columns status">
                 <TournamentFormTile
                    name="status"
                    label="Status *"
                    content={this.state.status}
                    handlerFunction={this.handleChange}
                  />
                </div>
              </div><br/>

              <div className="row">
                <section className="small-8">
                  <div className="dropzone">
                    <Dropzone onDrop={this.onDrop} style={dropzoneStyle}>
                      <p className="dropzone-content">Drop files here, or Click to upload.</p>
                    </Dropzone>
                  </div>
                  <aside>
                    <ul className="uploaded-file-ul">
                      {this.state.file.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)}
                    </ul>
                  </aside>
                 </section>
                 <div className="small-4">
                   <button className="button" type="submit">Submit</button>
                 </div>
              </div>
            </form>
          </li>
        </ul>
      </div>
    )
  }
}

export default TournamentFormContainer;
