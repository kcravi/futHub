import React, { Component } from 'react';
import { Link } from 'react-router'
import { browserHistory } from 'react-router';

import TeamIndexTile from '../components/TeamIndexTile'
import TournamentIndexContainer from './TournamentIndexContainer'
import TeamContainer from './TeamContainer'
import AlertComponent from '../components/AlertComponent'

class HomeIndexContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      success_msg: ''
    }
    this.closeSuccessMsg = this.closeSuccessMsg.bind(this)
  }

  componentDidMount(){
    if(this.props.location){
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

  render(){
    let successMsgDiv = <AlertComponent
                          successMsg={ this.state.successMsg }
                          closeSuccessMsg={this.closeSuccessMsg}
                        />
    return (
      <div>
        {successMsgDiv}
        <br/>
        <TeamContainer />
        <TournamentIndexContainer />
      </div>
    )
  }
}

export default HomeIndexContainer
