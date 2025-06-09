import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import bcrypt from 'bcryptjs';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const validatePassword = (pwd) =>
    pwd.length >= 16 && /[A-Z]/.test(pwd) && /[!@#$%^&*(),.?":{}|<>]/.test(pwd);

  const validateEmailFormat = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleReset = async () => {
    const cleanEmail = email.trim().toLowerCase();

    if (!validateEmailFormat(cleanEmail)) {
      Swal.fire('Error', 'Please enter a valid email address', 'error');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find((u) => u.email.trim().toLowerCase() === cleanEmail);

    if (!user) {
      Swal.fire('Error', 'Email not found', 'error');
      return;
    }

    const { value: newPassword } = await Swal.fire({
      title: 'Enter a new password',
      input: 'password',
      inputLabel: 'Must be 16+ characters, include uppercase & special character.',
      inputPlaceholder: 'New password',
      inputAttributes: {
        minlength: 16,
      },
      showCancelButton: true,
      confirmButtonText: 'Reset Password',
    });

    if (!newPassword) return;

    if (!validatePassword(newPassword)) {
      Swal.fire(
        'Error',
        'Password must be at least 16 characters long, include an uppercase letter, and a special character.',
        'error'
      );
      return;
    }

    const hashedPassword = bcrypt.hashSync(newPassword, 10);
    const updatedUsers = users.map((u) =>
      u.email.trim().toLowerCase() === cleanEmail
        ? { ...u, password: hashedPassword }
        : u
    );
    localStorage.setItem('users', JSON.stringify(updatedUsers));

const recipientEmail = (user?.email || email || "").trim();
const recipientName = user?.firstName?.trim() || recipientEmail.split('@')[0] || 'User';

if (!recipientEmail) {
  Swal.fire('Error', 'Valid recipient email is missing. Cannot send reset confirmation.', 'error');
  return;
}

console.log("🚀 Sending reset email to:", recipientEmail);

emailjs
  .send(
    'service_r4tuq57',
    'template_3339ea4',
    {
      to_email: recipientEmail,
      user_name: recipientName,
      subject: 'Your LuminoLearn Password Was Reset',
      message: `Hello ${recipientName},\n\nThis is to confirm that your LuminoLearn password was successfully reset.\n\nIf you did not initiate this change, please contact our support team immediately at support@luminolearn.org.\n\nThank you,\n— The LuminoLearn Security Team`
    },
    'P7BJMiXc8d3y4XOha'
  )
  .then(() => {
    Swal.fire('Success', 'Password reset successfully. Redirecting to sign in...', 'success')
      .then(() => navigate('/login'));
  })
  .catch((error) => {
    console.error("❌ EmailJS Error:", error);
    Swal.fire('Warning', 'Password was reset, but email could not be sent.', 'warning')
      .then(() => navigate('/login'));
  });

  };

  return (
    <div className="auth-page">
      <h2>Reset Password</h2>
      <label htmlFor="email" className="visually-hidden">Email</label>
      <input
        type="email"
        id="email"
        placeholder="Enter your email"
        value={email}
        required
        onChange={(e) => setEmail(e.target.value)}
        className="auth-input"
      />
      <button onClick={handleReset} className="auth-button">
        Reset Password
      </button>
    </div>
  );
};

export default ForgotPassword;
