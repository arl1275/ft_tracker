import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const PrivateRoute = ({ element: Component, isLoggedIn}) => {
  return (
    <Route
      element={
        isLoggedIn ? (
          <Component />
        ) : (
          <Navigate to="/" />
        )
      }
    />
  );
};

export default PrivateRoute;
