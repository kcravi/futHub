import React, { Component } from 'react';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';

import TeamShowTile from '../components/TeamShowTile';
import DeleteTeamButton from '../components/DeleteTeamButton';

class TeamShowContainer extends Component {
  constructor(props){
    super(props);
    this.state={
      team: {},
      // adminStatus: false,
      currentUser: null,
      members: [],
      posts: []
    }
    this.deleteTeam = this.deleteTeam.bind(this)
    this.addMember = this.addMember.bind(this)
    this.addPost = this.addPost.bind(this)
    this.deleteTeamPost = this.deleteTeamPost.bind(this)
  }

  componentDidMount(){
    fetch(`/api/v1/teams/${this.props.params.id}.json`, {
      credentials: 'same-origin'
    })
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
        team: body.team,
        // adminStatus: body.admin_status,
        currentUser: body.current_user,
        members: body.team.users,
        posts: body.team.posts
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  deleteTeam() {
    fetch(`/api/v1/teams/${this.props.params.id}.json`, {
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json',
      'X-Requested-With': 'XHMLttpRequest' },
      method: 'DELETE',
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
      .then(body => browserHistory.push('/teams'))
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  addMember(payload) {
    fetch(`/api/v1/registrations.json`, {
      body: JSON.stringify(payload),
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json'},
      method: 'POST',
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
    .then(body => {
      this.setState({members: body.members})
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  addPost(post){
    this.setState({posts: this.state.posts.concat(post)})
  }

  deleteTeamPost(postId){
    fetch(`/api/v1/teams/${this.props.params.id}/posts/${postId}.json`, {
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json',
      'X-Requested-With': 'XHMLttpRequest' },
      method: 'DELETE',
      body: JSON.stringify(postId)
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
    .then(body => {
      let remainingPosts = this.state.posts.filter(post=>{
        return post.id != postId
      })
      this.setState({posts: remainingPosts})
    })

    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render(){
    let onClickAction = () => {
      if (window.confirm('Are you sure you want to delete this Team?')) {
        this.deleteTeam()
      }
    }

    let editTeam = ''
    let deleteTeam = ''
    // if(this.state.adminStatus && this.state.currentUserId === this.state.team.manager_id) {
    if(this.state.currentUser && this.state.currentUser.id === this.state.team.manager_id) {
      editTeam = <button className="snip1287"> Edit </button>
      deleteTeam = <button className="snip1287" onClick={onClickAction}> Delete </button>
    }

    return(
      <div>
        <TeamShowTile
          key={this.state.team.id}
          id={this.state.team.id}
          name={this.state.team.name}
          city={this.state.team.city}
          state={this.state.team.state}
          zipcode={this.state.team.zipcode}
          description={this.state.team.description}
          website={this.state.team.website}
          phone_number={this.state.team.phone_number}
          url={this.state.team.url}
          teamProfilePhoto={this.state.team.profile_photo}
          currentUser={this.state.currentUser}
          members={this.state.members}
          addMember={this.addMember}
          posts={this.state.posts}
          addPost={this.addPost}
          deleteTeamPost={this.deleteTeamPost}
          team={this.state.team}
        />

        <Link to={`/teams/${this.state.team.id}/edit`}>
          {editTeam}
        </Link>

        {deleteTeam}
      </div>
    )
  }
}

export default TeamShowContainer;
