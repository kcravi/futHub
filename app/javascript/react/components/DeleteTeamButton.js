import React from 'react';
import { Link } from 'react-router';

const DeleteTeamButton = props => {
  let onClickAction = () => {
    if (window.confirm('Are you sure you want to delete this Team?')) {
      props.deleteTeam()
    }
  }
  return(
    <button className="snip1287" onClick={onClickAction}>
      Delete
    </button>
  )
}

export default DeleteTeamButton;
