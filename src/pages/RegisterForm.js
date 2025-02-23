import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../pages/RegisterForm.css';
import btn from '../assets/btn.jpg';

function RegistrationForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    username: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone || !formData.username || !formData.password) {
      setError('All fields are required.');
      return;
    }

    // ✅ Check if username already exists
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    if (existingUsers.some(user => user.username === formData.username)) {
      setError('Username already taken. Choose another.');
      return;
    }

    // ✅ Save new user credentials
    const newUser = {
      ...formData,
      registered: true
    };
    localStorage.setItem('users', JSON.stringify([...existingUsers, newUser]));

    alert('Registration successful! Please log in.');
    navigate('/account'); // ✅ Redirect to My Account (Login Page)
  };

  return (
    <form onSubmit={handleSubmit} className="registration-form">
      <div className="registration-fields">
        <div className="form-group">
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Phone:</label>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Username:</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        {error && <p className="error">{error}</p>}
      </div>
      <button type="submit" className="custom-button">
        <img src={btn} alt="Register" className="button-icon" />
      </button>
    </form>
  );
}

export default RegistrationForm;
