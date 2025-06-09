// ForgotPassword.js
import React, { useState } from 'react';
import Swal from 'sweetalert2';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleReset = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email);

    if (!user) {
      Swal.fire('Error', 'Email not found', 'error');
      return;
    }

    const newPassword = prompt('Enter a new password:');
    if (newPassword) {
      user.password = btoa(newPassword);
      const updatedUsers = users.map(u => u.email === user.email ? user : u);
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      Swal.fire('Success', 'Password updated successfully', 'success');
    }
  };

  return (
    <div className="auth-page">
      <h2>Reset Password</h2>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="auth-input"
      />
      <button onClick={handleReset} className="auth-button">Reset Password</button>
    </div>
  );
};

export default ForgotPassword;
