import React from 'react';
import { Link } from 'react-router'

const SearchBarIndexTile = props => {
  let image = ''
  if (props.image){
    image = <img src={props.image} />
  } 

  return(
        <figure className="snip1527">
          <div className="image">{image}</div>
          <figcaption>
            <h4>
              <Link to={`/meetups/${props.id}`}> {props.name} </Link>
            </h4>
            <p> {props.city}, {props.state} </p>
          </figcaption>
        </figure>

  )
}

export default SearchBarIndexTile;
