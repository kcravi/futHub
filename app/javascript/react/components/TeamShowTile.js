import React, { Component } from 'react';

import { Link } from 'react-router';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

class TeamShowTile extends Component {
  constructor(props){
    super(props);
    this.state = {
      about: '',
      members: []
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(event){
    if (event.target.className == "about") {
      this.state.about == '' ? this.setState({ about: this.props.description }) : this.setState({ about: '' })
    } else if (event.target.className == "members"){
      this.state.members == '' ? this.setState({ members: this.props.members }) : this.setState({ members: '' })
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
    let membersCount = this.props.members.length

    let joinTeam=''
    if(currentUser.id != this.props.team.manager_id){
      joinTeam = "Join this team"
    }

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
              <div><a href={`/teams/${this.props.team.id}/team_photos`}>ALBUMS</a></div><hr/>
              <div className="members" onClick={this.handleClick}>MEMBERS {`(${membersCount})`}</div><hr/>
              <div>TPOPHIES</div><hr/>
              <div>EVENTS</div><hr/>
            </div>
          </div>

          <div className="small-12 medium-8 large-6 columns">
             <hr/>{image}<br/>

             <div className="x"> {this.state.about} </div>
             <div><ul className="striped-list"> {members} </ul></div>

             <form className="team-photo-comments-form">
              <h3> NewsFeed </h3>
              <span>
                <input type="text" placeholder="Comments" className="team-photo-comments-form-span" />
              </span>
              <button className="button buttonx" type="submit">Post</button>
             </form><hr/>
          </div>

          <div className="small-12 medium-12 large-3 columns"><hr/>
            TABLES
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
