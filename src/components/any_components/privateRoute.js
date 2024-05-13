import React, { Children, useEffect } from 'react';
import { useState } from 'react';
import { Route, Navigate, useNavigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate()

  useEffect(() => {
    const account = localStorage.getItem('dataUser');

    if (account === null) {
      navigate("/", { replace: true })
    }
  }, [])

  return children;
};

export function AdminitrationPrivateRoute( children ){
  const navigate = useNavigate();

  useEffect(()=>{
    const account = localStorage.getItem('dataUser');
    const account_user = JSON.parse(account);
    const user = account_user.usurario;

    if( user.type_ === 1){
      navigate("/avanzado", { replace : true} );
    }else{
      return null
    }

  },[])

  return children;
}

export const getType = () =>{
  const account = localStorage.getItem('dataUser');
  const account_user = JSON.parse(account);
  const user = account_user.usurario;

  if( user.type_ === 1){
    return true;
  }else{
    return false;
  }
}

export default PrivateRoute;