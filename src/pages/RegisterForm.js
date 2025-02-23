// src/components/RegistrationForm.js
import React, { useState } from 'react';
import '../pages/RegisterForm.css'; // Adjust the path if needed
import btn from '../assets/btn.jpg';

function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
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
    // Basic validation: ensure all fields are filled
    if (!formData.name || !formData.email || !formData.phone) {
      setError('Please fill in all fields.');
      return;
    }
    // Registration logic goes here
    alert('Registration successful!');
  };

  return (
    <form onSubmit={handleSubmit} className="registration-form">
      <div className="registration-fields">
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label></label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
      </div>
      <button type="submit" className="custom-button">
  
  <img src={btn} alt="Icon" className="button-icon" />
</button>
    </form>
  );
}

export default RegistrationForm;
