import React from 'react';
import { Link } from 'react-router'

const TournamentIndexTile = props => {
  let image = ''
  if (props.url){
    image = <img src={props.url} />
  }

  return(
    <figure className="snip1526">
      <div className="image">{image}</div>
      <figcaption>
        <h4>
          <Link to={`/tournaments/${props.id}`}> {props.name} </Link>
        </h4>
        <p> {props.city}, {props.state} </p>
      </figcaption>
    </figure>
  )
}

export default TournamentIndexTile;
