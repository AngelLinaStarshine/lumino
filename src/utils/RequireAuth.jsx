// src/utils/RequireAuth.js
import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";

const RequireAuth = ({ children }) => {
  const { user, authLoading } = useContext(AuthContext);
  const location = useLocation();

  // ✅ while checking cookie session, DON'T redirect yet
  if (authLoading) {
    return <p style={{ padding: "2rem" }}>Loading…</p>;
  }

  // ✅ not logged in -> go to login, and remember where they came from
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // ✅ logged in -> allow
  return children;
};

export default RequireAuth;
