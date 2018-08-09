import React from 'react';

const TeamShowTile = props => {

  return(
    <div>
      <h3> {props.name} </h3>
      {props.city}, {props.state}, {props.zipcode}
      <div>
        About: {props.description}
      </div>
      <br/>
      <div>
        Website: {props.website}
      </div>
      <div>
        Contact number: {props.phone_number}
      </div>
    </div>
  )
}

export default TeamShowTile;
