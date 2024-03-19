// PrivateRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { getItem } from './local';

const PrivateRoute = ({ element: Element, ...rest }) => {
  const isAuthenticated = !!getItem();
  return isAuthenticated ? <Route {...rest} element={<Element />} /> : <Navigate to="/" replace />;
};

export default PrivateRoute;