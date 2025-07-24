import React, { useState } from 'react';
import Swal from 'sweetalert2';
import bcrypt from 'bcryptjs';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import '../pages/sign.css';
import backgroundImage from '../assets/1.svg';

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      Swal.fire('Error', 'Both fields are required.', 'error');
      return;
    }

    if (!isValidEmail(email)) {
      Swal.fire('Invalid Email', 'Please enter a valid email address.', 'warning');
      return;
    }

    let users = [];
    try {
      users = JSON.parse(localStorage.getItem('users')) || [];
    } catch (err) {
      Swal.fire('Error', 'User data is corrupted. Please clear local storage.', 'error');
      return;
    }

    const matchedUser = users.find((user) => user.email === email);
    if (!matchedUser) {
      Swal.fire('Error', 'No account found with this email.', 'error');
      return;
    }

    const passwordMatch = bcrypt.compareSync(password, matchedUser.password);
    if (!passwordMatch) {
      Swal.fire('Error', 'Incorrect password.', 'error');
      return;
    }

    sessionStorage.setItem('loggedInUser', JSON.stringify(matchedUser));
    sessionStorage.setItem('accountConfirmed', 'true');
    window.dispatchEvent(new Event('storageUpdate'));

    Swal.fire('Success', 'You are logged in.', 'success').then(() => {
      navigate('/account');
    });
  };

  return (
    <div className="signin-wrapper">
      <img src={backgroundImage} alt="Background" className="signin-bg" />

      <Link to="/signup" className="invisible-button" aria-label="Go to Sign Up" />

      <div className="signin-overlay">
        <div className="signin-form">
          <h2>Access Your Account</h2>
          <p>Sign in with your credentials</p>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              className="auth-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="password-input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                className="auth-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>
            <button type="submit" className="auth-button">Sign In</button>
          </form>
          <p className="auth-footer">
            <Link to="/forgot-password">Forgot Password?</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
