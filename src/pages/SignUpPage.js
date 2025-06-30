// Updated SignUpPage.js with integrated modal (no external TermsModal.js)
import React, { useState } from 'react';
import Swal from 'sweetalert2'; // ✅ This line must be present
import { useNavigate, Link } from 'react-router-dom';
import bcrypt from 'bcryptjs';
import { getAuth } from 'firebase/auth';
import '../firebase';
import '../pages/sign.css';
import createAccountImage from '../assets/create_account.jpg';
import { countryCodes } from '../utils/countryCodes';

const SignUpPage = () => {
  const [step, setStep] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();
  getAuth();

  const validatePassword = (pwd) =>
    pwd.length >= 16 && /[A-Z]/.test(pwd) && /[!@#$%^&*(),.?":{}|<>]/.test(pwd);

  const sanitize = (str) => str.replace(/[<>"'/]/g, '').trim();

  const handleInitialSubmit = () => {
    const cleanEmail = sanitize(email.toLowerCase());
    if (!firstName || !lastName || !email || !confirmEmail || !phone) {
      return alert('All fields are required.');
    }
    if (cleanEmail !== confirmEmail.toLowerCase().trim()) {
      return alert('Emails do not match.');
    }
    setShowModal(true);
  };

  const handleDecline = () => {
    setShowModal(false);
    navigate('/');
  };

  const handleAccept = () => {
    setShowModal(false);
    setStep(2);
  };

 const handleFinalSubmit = () => {
  if (!password || !confirmPassword) {
    return alert('Password fields cannot be empty.');
  }
  if (password !== confirmPassword) {
    return alert('Passwords do not match.');
  }
  if (!validatePassword(password)) {
    return alert('Password must be 16+ chars with uppercase and special symbol.');
  }

  const newUser = {
    firstName: sanitize(firstName),
    lastName: sanitize(lastName),
    email: sanitize(email.toLowerCase()),
    phone: `${countryCode} ${sanitize(phone)}`,
    password: bcrypt.hashSync(password, 10)
  };

  const users = JSON.parse(localStorage.getItem('users')) || [];
  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));
  sessionStorage.setItem('loggedInUser', JSON.stringify(newUser));

  Swal.fire('Success', 'Account created!', 'success').then(() => {
    navigate('/personalaccount');
  });
};

  return (
    <div className="signup-wrapper">
      <div className="signup-image">
        <img src={createAccountImage} alt="Create Account" className="signup-image-bg" />
      </div>

      <div className="stylish-auth">
        {step === 1 ? (
          <div className="auth-form-box">
            <input className="auth-inputin" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            <input className="auth-inputin" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            <input className="auth-inputin" placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input className="auth-inputin" placeholder="Confirm Email" type="email" value={confirmEmail} onChange={(e) => setConfirmEmail(e.target.value)} />
            <div className="auth-phone-container">
              <select className="auth-phone-select" value={countryCode} onChange={(e) => setCountryCode(e.target.value)}>
                {countryCodes.map((c, i) => (
                  <option key={i} value={c.code}>{c.name} ({c.code})</option>
                ))}
              </select>
              <input className="auth-inputin" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <button className="auth-button" onClick={handleInitialSubmit}>Continue</button>
          </div>
        ) : (
          <div className="auth-form-box">
            <input className="auth-inputin" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <input className="auth-inputin" type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            <small className="password-hint">🔐 Min 16 characters, incl. UPPERCASE and special symbol (!@#$%).</small>
            <button className="auth-button" onClick={handleFinalSubmit}>Create Account</button>
          </div>
        )}
        <p className="auth-footer">Already have an account? <Link to="/login">Sign in</Link></p>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>🌟 Welcome to LuminoLearn Academy</h2>
            <p>
              Thank you for registering! By creating an account, you agree to the following Terms & Conditions:
            </p>
            <ol>
              <li>
                <strong>Protecting Course Content:</strong> You will not share, redistribute, or publish any course
                materials—including assessments, videos, and downloads—without prior written consent.
              </li>
              <li>
                <strong>Academic Integrity:</strong> Use of Large Language Models (e.g., ChatGPT, Bard, Claude) to complete
                assignments, quizzes, or exams is strictly prohibited unless explicitly authorized.
              </li>
              <li>
                <strong>Intellectual Property Use:</strong> You agree not to copy, republish, upload, or distribute course
                content on external platforms without permission.
              </li>
              <li>
                <strong>Respectful Conduct:</strong> You will engage with fellow users and instructors respectfully,
                professionally, and courteously.
              </li>
              <li>
                <strong>Enforcement:</strong> Any violation may result in account suspension or other disciplinary or legal
                action.
              </li>
            </ol>
            <p>
              By clicking <strong>Accept</strong>, you affirm that you have read, understood, and agree to abide by these
              Terms & Conditions.
            </p>
            <div className="modal-actions">
              <button className="btn-decline" onClick={handleDecline}>Decline</button>
              <button className="btn-accept" onClick={handleAccept}>Accept</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUpPage;
