import React from 'react';
import { Link } from 'react-router';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

const TeamShowTile = props => {
  let image = ''
  if(props.url){
    image = <img src={props.url} />
  } else if(props.photo) {
    image = <img src={props.photo.url} />
  }

  let onClick = () =>{
    let payload = {
      currentUser: props.currentUser,
      teamId: props.id
    }
    props.addMember(payload)
  }

  let members = props.members.map(member=><li key={member.id}>{member.username}</li>)

  return(
    <div>
      <h2> {props.name} </h2>
      <div className="club-info">
        {props.city}, {props.state}, {props.zipcode}
        <div> {props.website} </div>
        <div> {props.phone_number} </div>
      </div>
      <br/>
      <div className="show-page-image"> {image} </div>
      <section className="tab">
        <Tabs>
          <TabList>
            <ul className="snip1211">
              <Tab>About</Tab>
              <Tab>Members</Tab>
              <Tab>Since</Tab>
              <Tab>Contact</Tab>
            </ul>
          </TabList>
          <div className="tabpanel">
            <TabPanel>
              <p>{props.description}</p>
            </TabPanel>
            <TabPanel>
              {members}
            </TabPanel>
            <TabPanel>
              <p>Sep 2006 </p>
            </TabPanel>
            <TabPanel>
              <p>Ravi KC</p>
              <li>ravikc18@gmail.com</li>
              <li>Phone Number: 617717171 </li>
            </TabPanel>
          </div>
        </Tabs>
      </section>

      <Link to={`/teams/${props.id}`}>
        <button className="snip1287" onClick={onClick}> Join this Team </button>
      </Link>

    </div>
  )
}

export default TeamShowTile;
