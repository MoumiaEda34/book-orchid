import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Component }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn'); // Check login state from localStorage
  return isLoggedIn ? Component : <Navigate to="/login" replace />;
};

export default PrivateRoute;
