import React from 'react';
import { Link } from 'react-router'

const TeamIndexTile = props => {
  return(
    <div className='team-list'>
      <h3>
        {props.name}
      </h3>
      {props.city}, {props.state}
    </div>
  )
}

export default TeamIndexTile;
