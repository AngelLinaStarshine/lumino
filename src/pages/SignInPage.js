import React, { useState, useContext } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import "../pages/sign.css";
import { AuthContext } from "../auth/AuthContext";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { refreshAuth } = useContext(AuthContext);

  const isValidEmail = (value) => /\S+@\S+\.\S+/.test(value);

  const handleLogin = async (e) => {
    e.preventDefault();

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !password) {
      Swal.fire("Error", "Both fields are required.", "error");
      return;
    }

    if (!isValidEmail(cleanEmail)) {
      Swal.fire("Invalid Email", "Please enter a valid email address.", "warning");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: cleanEmail, password }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        Swal.fire("Login Failed", data?.error || "Invalid email or password.", "error");
        return;
      }

      // ✅ update AuthContext from /me
      await refreshAuth();

      await Swal.fire("Success", "You are logged in.", "success");

      // ✅ strongest navigation with HashRouter
      window.location.assign(`${window.location.origin}/#/account`);
    } catch (error) {
      Swal.fire("Server Error", "Unable to reach the server. Please try again later.", "error");
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
