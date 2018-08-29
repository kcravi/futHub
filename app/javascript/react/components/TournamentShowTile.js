import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

const TournamentShowTile = props => {
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
      <div className="tournament-show">
        <div> <strong>Description</strong>:  {props.description} </div>
        <div> <strong>Types:</strong>  {props.types} </div>
        <div> <strong>Fee:</strong>  {props.fee} </div>
        <div> <strong>Awards:</strong>  {props.awards} </div>
        <div> <strong>Organized By:</strong>  {props.organizer} </div>
        <br/>
        <div> <strong>Venue:</strong>  {props.st}, {props.city}, {props.state}, {props.zipcode} </div>
        <div> <strong>Status:</strong>  {props.status} </div>
      </div>
    </div>
  )
}

export default TournamentShowTile;
