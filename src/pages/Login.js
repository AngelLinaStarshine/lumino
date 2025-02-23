import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../pages/Login.css';

function Login() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setCredentials({ 
      ...credentials, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Fetch users from storage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const validUser = users.find(user => user.username === credentials.username && user.password === credentials.password);

    if (!validUser) {
      setError('Invalid username or password.');
      return;
    }

    // ✅ Store session data
    sessionStorage.setItem('loggedInUser', JSON.stringify(validUser));

    alert('Login successful! Redirecting to My Account...');
    navigate('/account'); // ✅ Redirect to My Account
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <input type="text" name="username" value={credentials.username} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" name="password" value={credentials.password} onChange={handleChange} required />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
