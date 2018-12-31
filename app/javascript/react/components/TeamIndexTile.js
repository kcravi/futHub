import React from 'react';
import { Link } from 'react-router'

const TeamIndexTile = props => {
  let image = ''
  if (props.url){
    image = <img src={props.url} />
  } else if(props.teamProfilePhoto) {
    image = <img src={props.teamProfilePhoto.url} />
  }

  return(
    <figure className="snip1527">
      <div className="image">{image}</div>
      <figcaption>
        <h4>
          <Link to={`/teams/${props.id}`}> {props.name} </Link>
        </h4>
        <p> {props.city}, {props.state} </p>
      </figcaption>
    </figure>
  )
}

export default TeamIndexTile;
