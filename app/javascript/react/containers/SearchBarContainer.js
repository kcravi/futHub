import React, { Component } from 'react';
import { Link } from 'react-router'

import TeamIndexTile from '../components/TeamIndexTile';

let name, city, state, zipcode = ''

class SearchBarContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teams: [],
      name: '',
      zipcode: '',
      city: '',
      state: '',
      team: {}
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })

    event.target.name == "name" ? name = event.target.value :
    event.target.name == "city" ? city = event.target.value :
    event.target.name == "state" ? state = event.target.value :
    zipcode = event.target.value
  }

  handleSubmit(event) {
    event.preventDefault()
    const body = JSON.stringify({
      name: this.state.name,
      zipcode: this.state.zipcode,
      city: this.state.city,
      state: this.state.state
    })

    fetch('/api/v1/teams/search.json', {
      method: 'POST',
      body: body,
      credentials: 'same-origin',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(body => {
      this.setState({
        teams: body.teams
      })
    })
  }

  render() {
    const teams = this.state.teams.map(team => {
      return(
        <TeamIndexTile
          key={team.name}
          id={team.name}
          name={team.name}
          city={team.city}
          state={team.state}
          description={team.description}
          photo={team.photo}
          team={team}
        />
      )
    })

    let citySpan, stateSpan, zipcodeSpan = ''
    if (city != '' && city != null ){
      citySpan = <span className="panel"><strong>{ `city: "${city}"` }</strong> </span>
    }
    if (state != '' && state != null){
      stateSpan = <span className="panel"><strong>{`state: "${state}"`}</strong> </span>
    }
    if (zipcode != '' && zipcode != null){
      zipcodeSpan = <span className="panel"><strong> {`zipcode: "${zipcode}"`} </strong></span>
    }

    let searchedTeams = ''
    if (teams.length > 0){
      searchedTeams =   <div>
                          <br/><br/>
                          <div className="wrapper meetup-header">
                            <h6><em>Total Teams: <strong>"{this.state.teams.length}"</strong>  </em></h6> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            {citySpan}&nbsp;&nbsp;&nbsp;&nbsp;
                            {stateSpan}&nbsp;&nbsp;&nbsp;&nbsp;
                            {zipcodeSpan}&nbsp;&nbsp;&nbsp;&nbsp;
                          </div>
                          <div className="wrapper">
                            {teams}
                          </div>
                        </div>
    }

  return(
    <div>
      <form className="search-bar" onSubmit={this.handleSubmit}>
        <div className="input-group search-bar-team">
          <span className="input-group-label"><label>Search</label></span>
            <input
              className="input-group-field"
              type='text'
              name='name'
              placeholder="Team-name"
              value={this.state.name}
              onChange={this.handleChange}
            />
            <span className="city-zipcode-splitter">OR</span>
            <input
              className="input-group-field"
              type='text'
              name='city'
              placeholder="city"
              value={this.state.city}
              onChange={this.handleChange}
             />
            <input
              className="input-group-field"
              type='text'
              name='state'
              placeholder="state"
              value={this.state.state}
              onChange={this.handleChange}
             />
             <span className="city-zipcode-splitter">OR</span>
             <input
               className="input-group-field"
               type='text'
               name='zipcode'
               placeholder="zipcode"
               value={this.state.zipcode}
               onChange={this.handleChange}
              />
          <div className="input-group-button">
            <input type='submit' value='Submit' />
          </div>
        </div>
      </form><br/>

        {searchedTeams}<br/><br/>
     </div>
    )
  }
}

export default SearchBarContainer;
