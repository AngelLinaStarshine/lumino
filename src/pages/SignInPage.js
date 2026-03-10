import React, { useState, useContext } from "react";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import "../pages/sign.css";
import { AuthContext } from "../auth/AuthContext";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const { setUserFromLogin, API_BASE } = useContext(AuthContext);

  const isValidEmail = (value) => /\S+@\S+\.\S+/.test(value);

  const handleLogin = async (e) => {
    e.preventDefault();

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !password.trim()) {
      Swal.fire("Error", "Both fields are required.", "error");
      return;
    }

    if (!isValidEmail(cleanEmail)) {
      Swal.fire(
        "Invalid Email",
        "Please enter a valid email address.",
        "warning"
      );
      return;
    }

    if (!API_BASE) {
      Swal.fire("Configuration Error", "API URL is missing.", "error");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: cleanEmail,
          password: password,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        Swal.fire(
          "Login Failed",
          data?.error || "Invalid email or password.",
          "error"
        );
        return;
      }

      if (data?.token) {
        sessionStorage.setItem("ll_token", data.token);
      } else {
        sessionStorage.removeItem("ll_token");
      }

      setUserFromLogin(data?.user || null);

      await Swal.fire("Success", "You are logged in.", "success");

      const role = (data?.user?.role || "").toLowerCase();
      const targetPath =
        role === "teacher" || role === "admin" ? "/lms" : "/account";

      navigate(targetPath, { replace: true });
    } catch (error) {
      console.error("LOGIN ERROR:", error);

      const msg =
        error?.message?.includes("Failed to fetch") ||
        error?.name === "TypeError"
          ? "Could not reach the server. Check your connection or try again later."
          : "An error occurred. Please try again.";

      Swal.fire("Connection Error", msg, "error");
    }
  };

  return (
    <div className="signin-wrapper">
      <div className="signin-overlay">
        <div className="signin-form">
          <h2>Sign In</h2>
          <p>Access your LuminoLearn account</p>

          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              className="auth-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />

            <div className="password-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="auth-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <button type="submit" className="auth-button">
              Sign In
            </button>
          </form>

          <div className="auth-links">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;