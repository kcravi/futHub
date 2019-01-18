import React from 'react';

const AlertComponent = props => {
  let successMsg;
  if(props.successMsg != '' && props.successMsg != null){
    successMsg = <div className="flash-alert callout react-alert">
                    {props.successMsg}
                    <span onClick={props.closeSuccessMsg}>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <i className="far fa-times-circle"></i>
                    </span>
                  </div>
  }
  return(
    <div>
      {successMsg}
    </div>
  )
}

export default AlertComponent;
