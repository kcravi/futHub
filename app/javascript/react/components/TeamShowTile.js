import React from 'react';
import { Link } from 'react-router';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

const TeamShowTile = props => {
  let currentUser = ''
  if (props.currentUser) {
    currentUser = props.currentUser
  }

  let image = ''
  if(props.url){
    image = <img src={props.url} />
  } else if(props.photo) {
    image = <img src={props.photo.large.url} />
  }

  let onClick = () =>{
    let payload = {
      currentUser: props.currentUser,
      teamId: props.id
    }
    props.addMember(payload)
  }

  let members = props.members.map(member=><li key={member.id}><a href={`teams/users/${currentUser.id}`}>{member.username}</a></li>)

  let joinTeam=''
  if(currentUser.id != props.team.manager_id){
    joinTeam = "Join this team"
  }


  return(
    <div>
      <br/>
      <div className="callout club-info">
        <h2> {props.name} </h2>
        {props.city}, {props.state}, {props.zipcode}
        <div> {props.website} </div>
        <div> {props.phone_number} </div>
        <div> {image} </div>
        <Tabs>
          <TabList className="tablist">
            <div className="snip1211">
              <Tab>About</Tab>
              <Tab>Members</Tab>
              <Tab>Since</Tab>
              <Tab>Contact</Tab>
            </div>
          </TabList>
          <div className="tabpanel">
            <TabPanel>
              <p>{props.description}</p>
            </TabPanel>
            <TabPanel>
            <ul className="striped-list">
              {members}
            </ul>
            </TabPanel>
            <TabPanel>
              <p>Sep 2006 </p>
            </TabPanel>
            <TabPanel>
              <ul className="contact-info">
                <li>{currentUser.username}</li>
                <li><strong>Email: &nbsp;</strong>{currentUser.email}</li>
                <li><strong>Contact Number: &nbsp;</strong> 617717171 </li>
              </ul>
            </TabPanel>
          </div>
        </Tabs>
      </div><br/>

      <Link to={`/teams/${props.id}`}>
        <button className="snip1287" onClick={onClick}> {joinTeam} </button>
      </Link>
    </div>
  )
}

export default TeamShowTile;
