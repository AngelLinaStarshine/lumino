import React, { useState } from 'react';
import Swal from 'sweetalert2';
import bcrypt from 'bcryptjs';
import { useNavigate, Link } from 'react-router-dom';
import '../pages/sign.css';

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
    <div className="auth-page">
      <h2>Sign In</h2>
      <form onSubmit={handleLogin}>
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
        <button type="submit" className="auth-button">Login</button>
      </form>

      <p className="auth-footer">
        Don't have an account? <Link to="/signup">Sign up here</Link><br />
        <Link to="/forgot-password">Forgot Password?</Link>
      </p>
    </div>
  );
};

export default SignInPage;
