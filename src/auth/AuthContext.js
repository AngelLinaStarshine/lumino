import React, { createContext, useEffect, useMemo, useState } from "react";

export const AuthContext = createContext({
  user: null,
  isLoggedIn: false,
  authLoading: true,
  refreshAuth: async () => {},
  setUserFromLogin: () => {},
  logout: async () => {},
  API_BASE: "",
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const API_BASE = useMemo(() => {
    return (process.env.REACT_APP_API_BASE || "").replace(/\/$/, "");
  }, []);

  const setUserFromLogin = (userData) => {
    setUser(userData || null);
    setAuthLoading(false);
  };

  const refreshAuth = async () => {
    setAuthLoading(true);

    try {
      const token = sessionStorage.getItem("ll_token");
      console.log("refreshAuth API_BASE:", API_BASE);
      console.log("refreshAuth token exists:", !!token);

      const res = await fetch(`${API_BASE}/api/auth/me`, {
        method: "GET",
        credentials: "include",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      console.log("refreshAuth status:", res.status);

      if (!res.ok) {
        setUser(null);
        return;
      }

      const data = await res.json();
      console.log("refreshAuth data:", data);

      setUser(data?.user || null);
    } catch (err) {
      console.error("refreshAuth error:", err);
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
      console.error("logout error:", err);
    } finally {
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
        setUserFromLogin,
        logout,
        API_BASE,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
