import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

const TournamentShowTile = props => {
  debugger
  let image = ''
  if(props.url){
    image = <img src={props.url} />
  } else if(props.photo) {
    image = <img src={props.photo.url} />
  }


  return(
    <div>
      <h2> {props.name} </h2>
      <br/>
      <div className="show-page-image"> {image} </div>
      <br/>
      <div> Description: {props.description} </div>
      <div> Types: {props.types} </div>
      <div> Fee: {props.fee} </div>
      <div> Awards: {props.awards} </div>
      <div> Organized By: {props.organizer} </div>
      <br/><br/>
      <div> Venue: {props.st}, {props.city}, {props.city}, {props.state}, {props.zipcode} </div>
      <div> Status: {props.status} </div>
    </div>
  )
}

export default TournamentShowTile;
