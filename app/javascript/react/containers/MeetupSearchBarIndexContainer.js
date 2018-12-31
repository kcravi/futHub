import React, { Component } from 'react';
import { Link } from 'react-router'
// import { browserHistory } from 'react-router'

import MeetupSearchBarIndexTile from '../components/MeetupSearchBarIndexTile';
import MeetupShowTile from '../components/MeetupShowTile'

let city, state, zipcode = ''

class MeetupSearchBarIndexContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teams: [],
      zipcode: '',
      city: '',
      state: '',
      team: {}
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick  = this.handleClick.bind(this);
    // this.handleClear  = this.handleClear.bind(this);
  }

  handleChange(event) {
    // const newZipcode = event.target.value
    this.setState({ [event.target.name]: event.target.value })

    event.target.name == "city" ? city = event.target.value :
    event.target.name == "state" ? state = event.target.value :
    zipcode = event.target.value
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
    const body = JSON.stringify({
      zipcode: this.state.zipcode,
      city: this.state.city,
      state: this.state.state
    })

    fetch('/api/v1/meetups/search.json', {
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
    // this.handleClear()
  }

  handleClick(team){
    this.setState ({ team: team})
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

    let meetupTeams = ''
    if (teams.length > 0){
      meetupTeams =   <div>
                        <div className="wrapper meetup-header">
                          <h5><em>Total Teams: <strong>"{this.state.teams.length}"</strong>  </em></h5> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          {citySpan}&nbsp;&nbsp;&nbsp;&nbsp;
                          {stateSpan}&nbsp;&nbsp;&nbsp;&nbsp;
                          {zipcodeSpan}&nbsp;&nbsp;&nbsp;&nbsp;
                        </div>
                        <div className="wrapper">
                          {teams}
                        </div>
                      </div>
    }

    // <button className="button" onClick={browserHistory.goBack}>Back</button>
  return(
    <div><br/>
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
