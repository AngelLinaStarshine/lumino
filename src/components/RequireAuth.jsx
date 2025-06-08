// src/utils/RequireAuth.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const RequireAuth = ({ children }) => {
  const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));

  return loggedInUser ? children : <Navigate to="/" replace />;
};

export default RequireAuth;
