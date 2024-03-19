import React from "react";

export const LoadingMessage = ({ message }) => (
    <div  style={{ display: 'flex', 
    flexDirection : 'column',
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '70vh', 
    width : '40%',
    marginLeft : '30%'}}>
      <h1 style={{ color: 'grey' }}>KELLER CHECK</h1>
      <div className="progress">
        <div className="progress-bar progress-bar-indeterminate bg-purple"></div>
      </div>
      <p color="grey" style={{marginTop : 30}}>{message}</p>
    </div>
  );
  
  export const LoadingWait = ({ message }) => (
    <LoadingMessage message={message} />
  );