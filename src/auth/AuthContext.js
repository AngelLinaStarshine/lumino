import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

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
  const abortRef = useRef(null);

  const API_BASE = useMemo(() => {
    const base =
      process.env.REACT_APP_API_BASE ||
      "https://lumino-backend.onrender.com";

    return base.replace(/\/+$/, "");
  }, []);

  const clearSession = useCallback(() => {
    sessionStorage.removeItem("ll_token");
    setUser(null);
  }, []);

  const setUserFromLogin = useCallback((userData) => {
    setUser(userData || null);
    setAuthLoading(false);
  }, []);

  const refreshAuth = useCallback(async () => {
    if (!API_BASE) {
      console.error("API base URL is missing.");
      clearSession();
      setAuthLoading(false);
      return;
    }

    if (abortRef.current) {
      abortRef.current.abort();
    }

    const controller = new AbortController();
    abortRef.current = controller;

    setAuthLoading(true);

    try {
      const token = sessionStorage.getItem("ll_token");

      const headers = {
        Accept: "application/json",
      };

      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const res = await fetch(`${API_BASE}/api/auth/me`, {
        method: "GET",
        credentials: "include",
        headers,
        signal: controller.signal,
      });

      const contentType = res.headers.get("content-type") || "";
      const isJson = contentType.includes("application/json");
      const data = isJson ? await res.json() : null;

      if (res.status === 401 || res.status === 403) {
        clearSession();
        return;
      }

      if (!res.ok) {
        console.error("refreshAuth failed:", res.status, data);
        setUser(null);
        return;
      }

      setUser(data?.user || null);
    } catch (err) {
      if (err.name === "AbortError") return;

      console.error("refreshAuth error:", err);
      setUser(null);
    } finally {
      setAuthLoading(false);
    }
  }, [API_BASE, clearSession]);

  const logout = useCallback(async () => {
    try {
      const token = sessionStorage.getItem("ll_token");

      const headers = {
        Accept: "application/json",
      };

      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      await fetch(`${API_BASE}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
        headers,
      });
    } catch (err) {
      console.error("logout error:", err);
    } finally {
      clearSession();
    }
  }, [API_BASE, clearSession]);

  useEffect(() => {
    refreshAuth();

    return () => {
      if (abortRef.current) {
        abortRef.current.abort();
      }
    };
  }, [refreshAuth]);

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