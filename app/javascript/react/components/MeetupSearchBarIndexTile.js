import React from 'react';
import { Link } from 'react-router'

const MeetupSearchBarIndexTile = props => {
  let image = ''
  if (props.image){
    image = <img src={props.image} />
  }

  let onClick = () => {
    props.handleClick(props.team)
  }

  return(
        <figure className="snip1527">
          <div className="image">{image}</div>
          <figcaption>
            <h4 onClick={onClick}> {props.name} </h4>
            <p> {props.city}, {props.state} </p>
          </figcaption>
        </figure>
  )
}

export default MeetupSearchBarIndexTile;
