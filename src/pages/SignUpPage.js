// src/pages/SignUpPage.js
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const SignUpPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [otpStage, setOtpStage] = useState(false);

  const navigate = useNavigate();

  const validatePassword = (pwd) => {
    const minLength = pwd.length >= 16;
    const hasUppercase = /[A-Z]/.test(pwd);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(pwd);
    return minLength && hasUppercase && hasSymbol;
  };

  const validateEmailFormat = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleCreateAccount = async () => {
    if (!firstName || !lastName || !email || !confirmEmail || !phoneNumber || !password) {
      Swal.fire('Error', 'All fields are required', 'error');
      return;
    }

    if (!validateEmailFormat(email)) {
      Swal.fire('Error', 'Invalid email format', 'error');
      return;
    }

    if (email !== confirmEmail) {
      Swal.fire('Error', 'Emails do not match', 'error');
      return;
    }

    if (!validatePassword(password)) {
      Swal.fire(
        'Error',
        'Password must be at least 16 characters long, include at least one uppercase letter and one special character.',
        'error'
      );
      return;
    }

    const fullPhone = countryCode + phoneNumber;
    try {
      const response = await axios.post('/send-otp', {
        phoneNumber: fullPhone,
      });

      if (response.data.success) {
        setOtpStage(true);
        Swal.fire('Success', 'OTP sent to your phone. Please verify to activate your account.', 'success');
      } else {
        throw new Error(response.data.error);
      }
    } catch (err) {
      Swal.fire('Error', err.message || 'Failed to send OTP', 'error');
    }
  };

  const handleVerifyOTP = async () => {
    const fullPhone = countryCode + phoneNumber;
    if (!otp) {
      Swal.fire('Error', 'Please enter the OTP', 'error');
      return;
    }

    try {
      const response = await axios.post('/verify-otp', {
        phoneNumber: fullPhone,
        code: otp,
      });

      if (response.data.success && response.data.status.toLowerCase() === 'approved') {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const existing = users.find((u) => u.email === email);

        if (existing) {
          Swal.fire('Error', 'User already exists', 'error');
          return;
        }

        const newUser = {
          firstName,
          lastName,
          email,
          phone: fullPhone,
          password: btoa(password),
        };

        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        Swal.fire('Success', 'Account created and verified successfully!', 'success').then(() => {
          navigate('/login');
        });
      } else {
        Swal.fire('Error', 'Invalid OTP or verification failed', 'error');
      }
    } catch (err) {
      Swal.fire('Error', err.message || 'OTP verification failed', 'error');
    }
  };

  return (
    <div className="auth-page stylish-auth">
      <h2>Create Your LuminoLearn Account</h2>
      <div className="auth-form-box">
        <input type="text" placeholder="First Name" className="auth-input" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        <input type="text" placeholder="Last Name" className="auth-input" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        <input type="email" placeholder="Email" className="auth-input" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="email" placeholder="Confirm Email" className="auth-input" value={confirmEmail} onChange={(e) => setConfirmEmail(e.target.value)} />

        <div style={{ display: 'flex', gap: '10px' }}>
          <select className="auth-input" style={{ maxWidth: '100px' }} value={countryCode} onChange={(e) => setCountryCode(e.target.value)}>
            <option value="+1">🇨🇦 +1</option>
            <option value="+44">🇬🇧 +44</option>
            <option value="+61">🇦🇺 +61</option>
            <option value="+91">🇮🇳 +91</option>
            <option value="+49">🇩🇪 +49</option>
            <option value="+33">🇫🇷 +33</option>
          </select>
          <input type="tel" placeholder="Phone Number" className="auth-input" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
        </div>

        <input type="password" placeholder="Password" className="auth-input" value={password} onChange={(e) => setPassword(e.target.value)} />
        <small className="password-hint">
          🔐 Your password must be at least 16 characters long and include an uppercase letter and a special character.
        </small>

        {!otpStage ? (
          <button onClick={handleCreateAccount} className="auth-button gradient-button">📨 Create Account</button>
        ) : (
          <>
            <input type="text" placeholder="Enter OTP" className="auth-input" value={otp} onChange={(e) => setOtp(e.target.value)} />
            <button onClick={handleVerifyOTP} className="auth-button success-button">✅ Activate Account</button>
          </>
        )}
      </div>

      <p className="auth-footer">
        Already have an account? <Link to="/login">Sign in here</Link>
      </p>
    </div>
  );
};

export default SignUpPage;
