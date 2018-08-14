import React from 'react';
import { Link } from 'react-router'

const TeamIndexTile = props => {
  let image = ''
  if(props.image){
    image = <img src={props.image} />
  } else {
    image = <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/pr-sample23.jpg" />
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
