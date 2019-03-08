import React, { Component } from 'react';
import { Link } from 'react-router'

import TeamIndexTile from '../components/TeamIndexTile';
import AlertComponent from '../components/AlertComponent';

class SearchBarContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teams: [],
      name: '',
      zipcode: '',
      city: '',
      state: '',
      teamsNotFoundMesssage: '',
      teamsFound: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.closeSuccessMsg = this.closeSuccessMsg.bind(this);
    this.handleCloseButton = this.handleCloseButton.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value.trim() })
  }

  handleSubmit(event) {
    event.preventDefault()
    let { name, zipcode, city, state } = this.state
    if (!name && !zipcode && !city  && !state ){
      this.setState({teamsNotFoundMesssage: "Please enter at least one field"})
      return false;
    }

    const body = JSON.stringify({
      name: name,
      zipcode: zipcode,
      city: city,
      state: state
    })

    fetch('/api/v1/teams/search.json', {
      method: 'POST',
      body: body,
      credentials: 'same-origin',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(body => {
      if (body.teams.length >= 0){
        this.setState({
          teams: body.teams,
          teamsFound: true
        })
      }
    })
  }

  closeSuccessMsg(){
    this.setState({ teamsNotFoundMesssage: '' })
  }

  handleCloseButton(x){
    if (x === this.state.name){
      this.setState({ name: '' })
    } else if(x === this.state.city ){
      this.setState({ city: ''})
    } else if(x === this.state.state ){
      this.setState({ state: ''})
    } else {
      this.setState({ zipcode: ''})
    }
  }

  render() {
    const teams = this.state.teams.map(team => {
      return(
        <TeamIndexTile
          key={team.name}
          id={team.id}
          name={team.name}
          city={team.city}
          state={team.state}
          description={team.description}
          photo={team.photo}
          teamProfilePhoto={team.profile_photo}
        />
      )
    })

    let { name, zipcode, city, state } = this.state
    let searchedTeamName, searchedCity, searchedState, searchedZipcode;
    let abc = (x, y, z) => {
      if(z){
        x = <span className="panel searchedTeam">{ `${y}: ${z}` }
              <span className="closeButton" onClick={()=>this.handleCloseButton(z)}>x</span>
            </span>;
      }
      return x;
    }

    let searchedTeams = ''
    if (this.state.teamsFound){
      searchedTeams =   <div>
                          <br/><br/>
                          <div className="wrapper meetup-header">
                            <h6><em>Total Teams found: <strong>"{this.state.teams.length}"</strong>  </em></h6> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            {abc(searchedTeamName, "teamName", name)}&nbsp;&nbsp;&nbsp;&nbsp;
                            {abc(searchedCity, "city", city)}&nbsp;&nbsp;&nbsp;&nbsp;
                            {abc(searchedState, "state", state)}&nbsp;&nbsp;&nbsp;&nbsp;
                            {abc(searchedZipcode, "zipcode", zipcode)}&nbsp;&nbsp;&nbsp;&nbsp;
                          </div>
                          <div className="wrapper">
                            {teams}
                          </div>
                        </div>
    }

    let successMsgDiv = <AlertComponent
                          successMsg={ this.state.teamsNotFoundMesssage }
                          closeSuccessMsg={ this.closeSuccessMsg }
                        />

  return(
    <div>
      {successMsgDiv}
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
