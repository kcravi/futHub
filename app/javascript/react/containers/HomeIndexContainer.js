import React, { Component } from 'react';
import { Link } from 'react-router'
import { browserHistory } from 'react-router';

import TournamentIndexContainer from './TournamentIndexContainer'
import TeamContainer from './TeamContainer'
import AlertComponent from '../components/AlertComponent'
import FuthubInfoTile from '../components/FuthubInfoTile'

class HomeIndexContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      successMsg: '',
      futhubInfoTile: ''
    }
    this.closeSuccessMsg = this.closeSuccessMsg.bind(this)
    this.unRegisteredUser = this.unRegisteredUser.bind(this)
  }

  componentDidMount(){
    if(this.props.location.state){
      this.setState({successMsg: this.props.location.state})
    }

    browserHistory.replace({
      pathname: '/',
      state: ''
    })
  }

  closeSuccessMsg(){
    this.setState({successMsg: ''})
  }

  unRegisteredUser(){
    this.setState({futhubInfoTile: <FuthubInfoTile />})
  }

  render(){
    let successMsgDiv = <AlertComponent
                          successMsg={ this.state.successMsg }
                          closeSuccessMsg={this.closeSuccessMsg}
                        />

    let futhubInfoTile;
    this.state.futhubInfoTile ? futhubInfoTile = <div><br/> {this.state.futhubInfoTile} </div> : '' ;

    return (
      <div>
        {successMsgDiv}
        {futhubInfoTile}
        <TeamContainer
          unRegisteredUser={this.unRegisteredUser}
        />
        <TournamentIndexContainer />
      </div>
    )
  }
}

export default HomeIndexContainer
