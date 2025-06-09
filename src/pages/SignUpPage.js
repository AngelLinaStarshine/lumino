// src/pages/SignUpPage.js
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate, Link } from 'react-router-dom';
import bcrypt from 'bcryptjs';
import '../firebase';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const SignUpPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();
  const auth = getAuth();

  const validatePassword = (pwd) => {
    return (
      pwd.length >= 16 &&
      /[A-Z]/.test(pwd) &&
      /[!@#$%^&*(),.?":{}|<>]/.test(pwd)
    );
  };

  const validateEmailFormat = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleCreateAccount = () => {
    if (!firstName || !lastName || !email || !confirmEmail || !password || !confirmPassword) {
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

    if (password !== confirmPassword) {
      Swal.fire('Error', 'Passwords do not match', 'error');
      return;
    }

    if (!validatePassword(password)) {
      Swal.fire(
        'Error',
        'Password must be at least 16 characters long, include one uppercase letter and one special character.',
        'error'
      );
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const existing = users.find((u) => u.email === email);

    if (existing) {
      Swal.fire('Error', 'User already exists', 'error');
      return;
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = {
      firstName,
      lastName,
      email,
      password: hashedPassword
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    Swal.fire('Success', 'Account created successfully!', 'success').then(() => {
      navigate('/login');
    });
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userData = {
        firstName: user.displayName?.split(' ')[0] || '',
        lastName: user.displayName?.split(' ')[1] || '',
        email: user.email || '',
        phone: user.phoneNumber || '',
        subscription: 'Free',
        enrolledCourses: [],
        paymentHistory: []
      };

      sessionStorage.setItem('loggedInUser', JSON.stringify(userData));
      window.dispatchEvent(new Event('storageUpdate'));

      Swal.fire('Success', `Welcome ${user.displayName || user.email}`, 'success');
      navigate('/account');
    } catch (error) {
      Swal.fire('Error', error.message || 'Google sign-in failed', 'error');
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
        <input type="password" placeholder="Password" className="auth-input" value={password} onChange={(e) => setPassword(e.target.value)} />
        <input type="password" placeholder="Confirm Password" className="auth-input" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

        <small className="password-hint">
          🔐 Password must be at least 16 characters, with an uppercase letter and a special character.
        </small>

        <button onClick={handleCreateAccount} className="auth-button gradient-button">📨 Create Account</button>
        <button onClick={handleGoogleSignIn} className="auth-button google-button">🔐 Sign up with Google</button>
      </div>

      <p className="auth-footer">
        Already have an account? <Link to="/login">Sign in here</Link>
      </p>
    </div>
  );
};

export default SignUpPage;
