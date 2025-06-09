// src/pages/SignInPages.js
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate, Link } from 'react-router-dom';
import '../pages/sign.css';

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!email || !password) {
      Swal.fire('Error', 'Email and password are required', 'error');
      return;
    }
  
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const matched = users.find(u => u.email === email && atob(u.password) === password);
  
    if (!matched) {
      Swal.fire('Error', 'Invalid credentials', 'error');
    } else {
      sessionStorage.setItem('loggedInUser', JSON.stringify(matched));
      sessionStorage.setItem('accountConfirmed', 'true');
      window.dispatchEvent(new Event('storageUpdate')); // ✅ FIXED HERE
  
      Swal.fire('Login Successful!', 'Redirecting...', 'success').then(() => {
        navigate('/account');
      });
    }
  };
  

  return (
    <div className="auth-page">
      <h2>Sign In</h2>
      <input
        type="email"
        placeholder="Email"
        className="auth-input"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="auth-input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin} className="auth-button">Login</button>

      <p className="auth-footer">
        Don't have an account? <Link to="/signup">Sign up here</Link><br />
        <Link to="/forgot-password">Forgot Password?</Link>
      </p>
    </div>
  );
};

export default SignInPage;