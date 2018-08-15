import React, { Component } from 'react';

class SearchBar extends Component {
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
    fetch('/api/v1/teams/search.json', {
      method: 'POST',
      body: body,
      credentials: 'same-origin',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(body => {
      debugger
      this.setState({ teams: body })
    })
    console.log(`Form submitted: ${this.state.searchString}`);
  }

  render() {
    const teams = this.state.teams.map(team => {
      return(
        <li>{team.name}</li>
      )
  })
    return(
      <div>
        <form className="search-bar" onSubmit={this.handleSubmit}>
          <label>Search-Bar</label>
          <input type='text' name='searchString' value={this.state.searchString} onChange={this.handleChange} />

          <input type='submit' value='Submit' />
        </form>
      <ul>{teams}</ul>
    </div>
    )
  }
}

export default SearchBar;
