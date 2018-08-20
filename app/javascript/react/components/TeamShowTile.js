import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

const TeamShowTile = props => {
  let image = ''
  if(props.url){
    image = <img src={props.url} />
  } else if(props.photo) {
    image = <img src={props.photo.url} />
  }

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
              <li>Ravi KC</li>
              <li>Raju Tamang</li>
              <li>Achut Thapa</li>
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
    </div>
  )
}

export default TeamShowTile;
