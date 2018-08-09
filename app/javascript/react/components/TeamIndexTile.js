import React from 'react';
import { Link } from 'react-router'

const TeamIndexTile = props => {
  return(
    <div className='team-list'>
      <h3>
      <Link to={`/teams/${props.id}`}> {props.name} </Link>
      </h3>
      {props.city}, {props.state}
    </div>
  )
}

export default TeamIndexTile;
