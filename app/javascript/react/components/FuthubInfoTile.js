import React from 'react';

const FuthubInfoTile = () => {

  return(
    <div className="homePageInfoWrapper callout">
      <div className="row">
        <div className="small-12 medium-6 large-4 columns small-order-2 medium-order-1">
          <i className="fas fa-futbol fa-3x homePageIcons" >
            <span className="homePageInfo">&nbsp; Create your Own-Team</span>
          </i>
          <br/><br/>
          <i className="fas fa-users fa-3x">
            <span className="homePageInfo">&nbsp; Join a Team</span>
          </i>
          <br/><br/>
          <i className="fas fa-search fa-3x homePageIcons">
            <span className="homePageInfo">&nbsp; Search Teams from futhub/3rd party</span>
          </i>
          <br/><br/>
        </div>
        <div className="small-12 medium-6 large-4 columns small-order-3 medium-order-2">
          <i className="fas fa-trophy fa-3x">
            <span className="homePageInfo">&nbsp; Create a Tournament</span>
          </i>
          <br/><br/>
          <i className="fas fa-camera fa-3x homePageIcons">
            <span className="homePageInfo">&nbsp; View/upload Photos</span>
          </i>
          <br/><br/>
          <i className="fas fa-bullhorn fa-3x">
            <span className="homePageInfo">&nbsp; Share/Update Status</span>
          </i>
          <br/><br/>
        </div>
        <div className="small-12 large-4 columns small-order-1 medium-order-3">
          <p>a social-hub that helps find local <strong>AMATEUR SOCCER-TEAMS</strong> at your fingertips, connect with soccer-enthusiastic, stay healthy and fit. </p>
          <br/>
          <p><strong>Create Free Account !!!</strong></p>
          <div className="text-center">
            <a href={"/users/sign_in"}><button className="button x" > Login </button></a>
            <a href={"/users/sign_up"}><button className="button x" > Register </button></a>
          </div><hr className="hide-for-medium"/>
        </div>
      </div>
    </div>
  )
}

export default FuthubInfoTile;
