import React, { Component } from 'react';
import { Link } from 'react-router'
// import { browserHistory } from 'react-router'

import MeetupSearchBarIndexTile from '../components/MeetupSearchBarIndexTile';
import MeetupShowTile from '../components/MeetupShowTile'
import AlertComponent from '../components/AlertComponent';

class MeetupSearchBarIndexContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teams: [],
      zipcode: '',
      city: '',
      state: '',
      team: {},
      teamsNotFoundMesssage: '',
      teamsFound: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick  = this.handleClick.bind(this);
    // this.handleClear  = this.handleClear.bind(this);
    this.closeSuccessMsg = this.closeSuccessMsg.bind(this);
    this.handleCloseButton = this.handleCloseButton.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  // handleClear(){
  //   this.setState({
  //     zipcode: '',
  //     city: '',
  //     state: ''
  //   })
  // }

  handleSubmit(event) {
    event.preventDefault()
    let { name, zipcode, city, state } = this.state
    if (!name && !zipcode && !city  && !state ){
      this.setState({teamsNotFoundMesssage: "Please enter at least one field"})
      return false;
    }

    const body = JSON.stringify({
      zipcode: zipcode,
      city: city,
      state: state
    })

    fetch('/api/v1/meetups/search.json', {
      method: 'POST',
      body: body,
      credentials: 'same-origin',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(body => {
      if (body.teams){
        this.setState({
          teams: body.teams,
          teamsFound: true
        })
      } else {
        this.setState({ teamsNotFoundMesssage: body.error})
      }
    })
    // this.handleClear()
  }

  handleClick(team){
    this.setState ({ team: team})
  }

  closeSuccessMsg(){
    this.setState({ teamsNotFoundMesssage: '' })
  }

  handleCloseButton(x){
    if(x === this.state.city ){
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
        <MeetupSearchBarIndexTile
          key={team.name}
          id={team.name}
          name={team.name}
          city={team.city}
          state={team.state}
          description={team.description}
          image={team.url}
          website={team.webite}
          created={team.created_at}
          team={team}
          handleClick={this.handleClick}

        />
      )
    })

    // let onclickZ = () => {
    //   $(".spanZipcode").text('')
    // }
    // $(".spanZipcode").text(zzz + ": X")
    // if (city != '' && city != null ){
    //   x = <span className="panel spanCity">{city} <span onClick={onclickX} >X</span> </span>
    // }

    let { name, zipcode, city, state } = this.state
    let searchedTeamName, searchedCity, searchedState, searchedZipcode;

    let abc = (x, y, z) => {
      if(z){
        x = <span className="panel searchedTeam"><strong>{ `${y}: ${z}` }</strong>
              <span className="closeButton" onClick={()=>this.handleCloseButton(z)}>x</span>
            </span>;
      }
      return x;
    }

    let meetupTeams = ''
    if (this.state.teamsFound){
      meetupTeams =   <div>
                        <div className="wrapper meetup-header">
                          <h5><em>Total Teams: <strong>"{this.state.teams.length}"</strong>  </em></h5> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          {abc(searchedCity, "city", city)}&nbsp;&nbsp;&nbsp;&nbsp;
                          {abc(searchedState, "state", state)}&nbsp;&nbsp;&nbsp;&nbsp;
                          {abc(searchedZipcode, "zipcode", zipcode)}&nbsp;&nbsp;&nbsp;&nbsp;
                        </div>
                        <div className="wrapper">
                          {teams}
                        </div>
                      </div>
    }

    // <button className="button" onClick={browserHistory.goBack}>Back</button>

    let successMsgDiv = <AlertComponent
                          successMsg={ this.state.teamsNotFoundMesssage }
                          closeSuccessMsg={ this.closeSuccessMsg }
                        />
  return(
    <div><br/>
      {successMsgDiv}
      <form className="search-bar" onSubmit={this.handleSubmit}>
        <div className="input-group">
          <span className="input-group-label"><label>Search</label></span>
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
      </form><br/><br/><br/>

      {meetupTeams}

      <div>
        <MeetupShowTile
          team={this.state.team}
        />
      </div>

     </div>
    )
  }
}

export default MeetupSearchBarIndexContainer;
