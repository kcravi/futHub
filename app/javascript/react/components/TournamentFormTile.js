import React from 'react'

const TournamentFormTile = props => {
  return (
    <div>
      <label htmlFor={props.name}>{props.label}</label>
      <input type="text" name={props.name} value={props.content} onChange={props.handlerFunction}/>
    </div>
  )
}

export default TournamentFormTile;
