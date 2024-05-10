import React, { useEffect } from 'react';
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

export default PrivateRoute;