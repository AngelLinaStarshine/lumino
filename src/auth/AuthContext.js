// src/auth/AuthContext.js
// Remove this if not using
// import { createContext, useState, useEffect, useContext } from 'react';

import React, { createContext, useState } from 'react';


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
