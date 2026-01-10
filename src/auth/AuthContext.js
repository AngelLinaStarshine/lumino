import React, { createContext, useEffect, useMemo, useState } from "react";

export const AuthContext = createContext({
  user: null,
  isLoggedIn: false,
  authLoading: true,
  refreshAuth: async () => {},
  logout: async () => {},
  API_BASE: "",
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // ✅ Production: "" so calls go to "/api/..." (Netlify redirects)
  // ✅ Local: set REACT_APP_API_BASE=http://localhost:5000
  const API_BASE = useMemo(() => {
    return (process.env.REACT_APP_API_BASE || "").replace(/\/$/, "");
  }, []);

  const refreshAuth = async () => {
    setAuthLoading(true);

    try {
      const token = sessionStorage.getItem("ll_token");

      const res = await fetch(`${API_BASE}/api/auth/me`, {
        method: "GET",
        credentials: "include", // cookie optional
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      if (!res.ok) {
        setUser(null);
        return;
      }

      const data = await res.json();
      setUser(data?.user || null);
    } catch (err) {
      setUser(null);
    } finally {
      setAuthLoading(false);
    }
  };

  const logout = async () => {
    try {
      await fetch(`${API_BASE}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      // ignore
    } finally {
      // ✅ clear token too
      sessionStorage.removeItem("ll_token");
      setUser(null);
    }
  };

  useEffect(() => {
    refreshAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        authLoading,
        refreshAuth,
        logout,
        API_BASE,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
