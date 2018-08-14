import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

const TeamShowTile = props => {
  let image = ''
  if(props.image){
    image = <img src={props.image.url} />
  } else {
    image = <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/pr-sample23.jpg" />
  }
  return(
    <div>
      <h2> {props.name} </h2>
      <div className="club-info">
        {props.city}, {props.state}, {props.zipcode}
        <div> Website: {props.website} </div>
        <div> Contact number: {props.phone_number} </div>
      </div>
      <div className="show-page-image"> {image} </div>

      <section>
        <Tabs>
          <TabList>
            <ul className="snip1211">
              <Tab>About</Tab>
              <Tab>Members</Tab>
              <Tab>Since</Tab>
              <Tab>Contact</Tab>
            </ul>
          </TabList>

          <div className="tab">
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
