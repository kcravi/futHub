import React, { Component } from 'react';

import { Link } from 'react-router';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Dropzone from 'react-dropzone';

class TeamShowTile extends Component {
  constructor(props){
    super(props);
    this.state = {
      about: '',
      members: [],
      post: '',
      files: []
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.onDrop = this.onDrop.bind(this)
  }

  handleClick(event){
    if (event.target.className == "about") {
      this.state.about == '' ? this.setState({ about: this.props.description }) : this.setState({ about: '' })
    } else if (event.target.className == "members"){
      this.state.members == '' ? this.setState({ members: this.props.members }) : this.setState({ members: '' })
    }
  }

  handleChange(event){
    this.setState({post: event.target.value})
  }

  handleSubmit(event){
    event.preventDefault()
    let payload = new FormData();

    payload.append("body", this.state.post)
    for (let file of this.state.files){
      payload.append("photos[]", file)
    }
    // let payload = {
    //   body: this.state.post
    // }
    fetch(`/api/v1/teams/${this.props.team.id}/posts.json`, {
      credentials: 'same-origin',
      method: 'POST',
      body: payload

      // body: JSON.stringify(payload),
      // credentials: 'same-origin',
      // headers: { 'Content-Type': 'application/json'},
      // method: 'POST'
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
      this.props.addPost(body.post)
      this.setState({
        post: '',
        files: []
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  onDrop(files) {
   if(files.length > 0) {
     this.setState({ files: files })
   }
  }

  render() {
    let currentUser = ''
    if (this.props.currentUser) {
      currentUser = this.props.currentUser
    }

    let image = ''
    if(this.props.url){
      image = <img src={this.props.url} />
    } else if(this.props.teamProfilePhoto) {
      image = <img src={this.props.teamProfilePhoto.medium.url} />
    }

    let onClick = () =>{
      let payload = {
        currentUser: this.props.currentUser,
        teamId: this.props.id
      }
      this.props.addMember(payload)
    }

    let members, profile_photo;
    if (this.state.members != ''){
      members = this.state.members.map(member => {
        if (member.profile_photo.url != '' && member.profile_photo.url != null){
          profile_photo = <img src={member.profile_photo.thumb.url} />
        } else {
          profile_photo = <i className="fa fa-user fa-lg" ></i>
        }
        return (
          <li key={member.id}>
            <a href={`/users/${member.id}`}>{profile_photo}&nbsp;&nbsp;{member.username}</a>
          </li>
        )
      })
    }
    let membersDiv = <div>
                       <ul className="striped-list team-showpage-members"> {members} </ul>
                     </div>


    let joinTeam=''
    if(currentUser.id != this.props.team.manager_id){
      joinTeam = "Join this team"
    }

    let posts = this.props.posts.map(post=>{
      let photos;
      if(post.photos.length > 0){
        photos = post.photos.map(photo=>{
          return (
            <img src={photo.medium.url} key={photo.url} />
          )
        })
      }
      return (
        <li key={post.id}>
          {photos}
          {post.body}
          <div className="row feed-icons">
            <div className="small-2 columns"><i className="far fa-comments fa-lg" style={{color: "purple" }}></i></div>
            <div className="small-2 columns"><i className="far fa-thumbs-up fa-lg" style={{color: "Dodgerblue"}}></i></div>
            <div className="small-2 columns"><i className="far fa-grin-hearts fa-lg" style={{color: "red", backgroundColor:"light-yellow"}}></i></div>
            <div className="small-5 columns feed-date">{ new Date(post.created_at).toDateString() }</div>
            <div className="small-1 columns"
                 onClick={()=>{
                   {this.props.deleteTeamPost(post.id)}
                 }}
                ><i className="far fa-trash-alt" style={{color:"red"}}></i></div>
          </div><hr/>
        </li>
      )
    })

    let aboutDiv;
    if (this.state.about) {
      aboutDiv = <div className="team-showpage-about">
                {this.state.about}
              </div>
    }

    let dropzoneStyle = {
      width: 200,
      textAlign: "center",
      height: 35,
      borderWidth: 2,
      borderColor: '#666',
      borderStyle: 'dashed',
      borderRadius: 5
    };

    return(
      <div>
        <div className="row">
          <div className="small-12 medium-4 large-3 columns text-center">
            <hr/>
            <h5 className="team-show-title"><strong>{this.props.name}</strong></h5>
            {this.props.city}, {this.props.state}
            <div style={{color: "red"}}>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
             </div>
            <div className="team-profile-pic-div"> <i className="fa fa-users fa-9x team-profile-pic-icon"></i> </div>
            <div><strong><em>Sep 2006</em></strong> </div>
            <hr/>
            <div className="team-side-bar">
              <div className="about" onClick={this.handleClick}>ABOUT</div><hr/>
              <div><Link to={`/teams/${this.props.team.id}/team_photos`}>ALBUMS</Link></div><hr/>
              <div className="members" onClick={this.handleClick}>MEMBERS {`(${this.props.members.length})`}</div><hr/>
              <div>TPOPHIES</div><hr/>
              <div>EVENTS</div><hr/>
            </div>
          </div>

          <div className="small-12 medium-8 large-6 columns">
             <form className="team-photo-comments-form" onSubmit={this.handleSubmit}>
                <hr/>
                <h5> <strong>NewsFeed</strong> </h5>
                <span>
                  <label htmlFor="post"/>
                    <input
                      type="text"
                      placeholder="Add Post"
                      className="team-photo-comments-form-span"
                      onChange={this.handleChange}
                      name="post"
                      value={this.state.post}
                    />
                </span>
                <div className="row">
                  <section className="small-10 columns">
                    <div className="dropzone">
                      <Dropzone onDrop={this.onDrop} multiple={true} style={dropzoneStyle} >
                        <p className="teamshowpage-dropzone-content">Click to upload photos</p>
                      </Dropzone>
                    </div>
                    <aside>
                      <ul className="uploaded-file-ul">
                        {this.state.files.map(f => <li key={f.name}> * {f.name} - {f.size} bytes</li>)}
                      </ul>
                    </aside>
                  </section>
                  <section className="small-2 columns">
                    <button className="button" type="submit">Post</button>
                  </section>
                </div>
             </form><hr style={{marginTop:0}}/>
             {aboutDiv}
             {membersDiv}
             {image}<br/>
             <ul className="posts-ul">
              {posts}
             </ul>
          </div>

          <div className="small-12 medium-12 large-3 columns"><hr/>
            <strong>TABLES</strong>
          </div>
        </div><hr/>

        <Link to={`/teams/${this.props.id}`}>
          <button className="snip1287" onClick={onClick}> {joinTeam} </button>
        </Link>
      </div>
    )
  }
}

export default TeamShowTile;
