import React, {
  createContext,
  useEffect,
  useMemo,
  useState,
} from "react";

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
  const API_BASE = useMemo(() => {
    return (process.env.REACT_APP_API_BASE || "http://localhost:5000").replace(
      /\/$/,
      ""
    );
  }, []);

  const refreshAuth = async () => {
    setAuthLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/auth/me`, {
        method: "GET",
        credentials: "include",
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
    
    } finally {
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
