// src/auth/AuthContext.js
import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({
  user: null,
  isLoggedIn: false,
  authLoading: true,
  refreshAuth: async () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const refreshAuth = async () => {
    setAuthLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/me", {
        credentials: "include",
      });

      if (!res.ok) {
        setUser(null);
        return;
      }

      const data = await res.json();
      setUser(data?.user || null);
    } catch (e) {
      setUser(null);
    } finally {
      setAuthLoading(false);
    }
  };

  const logout = async () => {
    try {
      await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (e) {
      // ignore
    } finally {
      setUser(null);
    }
  };

  useEffect(() => {
    refreshAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        authLoading,
        refreshAuth,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
