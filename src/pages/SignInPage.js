// src/pages/SignInPage.js
import React, { useState } from "react";
import Swal from "sweetalert2";
import bcrypt from "bcryptjs";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import "../pages/sign.css";


const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const isValidEmail = (value) => /\S+@\S+\.\S+/.test(value);

  const handleLogin = (e) => {
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

    let users = [];
    try {
      users = JSON.parse(localStorage.getItem("users")) || [];
      if (!Array.isArray(users)) users = [];
    } catch (err) {
      Swal.fire("Error", "User data is corrupted. Please clear local storage.", "error");
      return;
    }

    const matchedUser = users.find((u) => (u.email || "").toLowerCase() === cleanEmail);

    if (!matchedUser) {
      Swal.fire("Error", "No account found with this email.", "error");
      return;
    }

    const storedHash = matchedUser.password;
    if (!storedHash) {
      Swal.fire("Error", "This account is missing a password. Please contact support.", "error");
      return;
    }

    const passwordMatch = bcrypt.compareSync(password, storedHash);
    if (!passwordMatch) {
      Swal.fire("Error", "Incorrect password.", "error");
      return;
    }

    // ✅ login state
    sessionStorage.setItem("loggedInUser", JSON.stringify(matchedUser));
    sessionStorage.setItem("accountConfirmed", "true");
    window.dispatchEvent(new Event("storageUpdate"));

    Swal.fire("Success", "You are logged in.", "success").then(() => {
      navigate("/account");
    });
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
