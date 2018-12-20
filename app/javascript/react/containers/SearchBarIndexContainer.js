import React, { Component } from 'react';
import { Link } from 'react-router'
import SearchBarIndexTile from '../components/SearchBarIndexTile';

class SearchBarIndexContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teams: [],
      searchString: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const newSearchString = event.target.value
    this.setState({ searchString: newSearchString })
  }

  handleSubmit(event) {
    event.preventDefault()
    const body = JSON.stringify({
      search_string: this.state.searchString
    })

    fetch('/api/v1/meetups/search.json', {
      method: 'POST',
      body: body,
      credentials: 'same-origin',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(body => {
      this.setState({ teams: body.team })
    })
    console.log(`Form submitted: ${this.state.searchString}`);
  }

  render() {
    const teams = this.state.teams.map(team => {
      return(
        <SearchBarIndexTile
          key={team.id}
          id={team.id}
          name={team.name}
          city={team.city}
          state={team.state}
          description={team.description}
          image={team.url}
        />
      )
    })
  return(
    <div>
      <div>
        <form className="search-bar" onSubmit={this.handleSubmit}>
          <label>Search-By-Zipcode/City</label>
            <input type='text' name='searchString' value={this.state.searchString} onChange={this.handleChange} />
            <input type='submit' value='Submit' />
        </form>
      </div>
      <div className="wrapper">
        {teams}
      </div>
     </div>
    )
  }
}

export default SearchBarIndexContainer;
