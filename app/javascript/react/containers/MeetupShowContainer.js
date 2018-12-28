import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

const MeetupShowContainer = props => {
  if (Object.keys(props.team).length === 0 && props.team.constructor === Object){
    return false;
  }

  let image = ''
  if (props.team.url){
    image = <img src={props.team.url} />
  }

  return(
    <div>
      <br/><hr/>
      <div className="row">
        <div className="small-12 medium-5 columns text-center">
          <h5><a href={props.team.website} target={"_blank"}>{props.team.name} </a></h5>
          {props.team.city}, {props.team.state}
        </div>
        <div className="small-12 medium-7 columns callout meetup-callout">
          <div> {image} </div>
          <Tabs>
            <TabList className="tablist">
              <div className="snip1211">
                <Tab>About</Tab>
                <Tab>Since</Tab>
                <Tab>Contact</Tab>
              </div>
            </TabList>
            <div className="tabpanel">
              <TabPanel>
                <p>{props.team.description}</p>
              </TabPanel>
              <TabPanel>
                <p>Sep 2006 </p>
              </TabPanel>
              <TabPanel>
                <ul className="contact-info">
                  <li>Email:</li>
                  <li>Contact Number: </li>
                </ul>
              </TabPanel>
            </div>
          </Tabs>
        </div>
      </div><hr/>
    </div>

  )
}


export default MeetupShowContainer
