import React, { Component } from 'react';
import { Link } from 'react-router'

import TeamIndexTile from '../components/TeamIndexTile'
import TournamentIndexContainer from './TournamentIndexContainer'
import TeamContainer from './TeamContainer'

const HomeIndexContainer = props => {
  return (
    <div>
      <br/>
      <TeamContainer />
      <TournamentIndexContainer />
    </div>
  )
}
// class HomeIndexContainer extends Component {
//   constructor(props){
//     super(props);
//     this.state={
//       teams: [],
//       current_user_id: null
//     }
//   }
//
//   componentDidMount(){
//     fetch('/api/v1/teams.json')
//     .then(response => {
//         if (response.ok) {
//           return response;
//         } else {
//           let errorMessage = `${response.status} (${response.statusText})`,
//             error = new Error(errorMessage);
//           throw(error);
//         }
//       })
//       .then(response => response.json())
//       .then(body => {
//         this.setState({
//           teams: body.teams,
//           currentUserId: body.current_user_id
//         })
//       })
//       .catch(error => console.error(`Error in fetch: ${error.message}`));
//     }
//
//   render(){
//     let teams = this.state.teams.map(team => {
//       return(
//         <TeamIndexTile
//           key={team.id}
//           id={team.id}
//           name={team.name}
//           city={team.city}
//           state={team.state}
//           url={team.url}
//           photo={team.photo}
//         />
//       )
//     })
//
//     let newTeamButton, newTournamentButton = ''
//     if (this.state.currentUserId) {
//       newTeamButton = <button className="snip1287"> Add a New Team </button>
//       newTournamentButton = <button className="snip1287"> Create Tournament </button>
//     }
//
//     return(
//       <div>
//         <br/>
//         <TeamContainer />
//         <TournamentIndexContainer />
//       </div>
//     )
//   }
// }

export default HomeIndexContainer
