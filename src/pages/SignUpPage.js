import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate, Link } from 'react-router-dom';
import bcrypt from 'bcryptjs';
import '../firebase';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import emailjs from '@emailjs/browser';

const countryCodes = [
  { code: '+1', name: '🇨🇦 CAN' },
  { code: '+1', name: '🇺🇸 USA' },
  { code: '+44', name: '🇬🇧 UK' },
  { code: '+61', name: '🇦🇺 AUS' },
  { code: '+91', name: '🇮🇳 IND' },
  { code: '+49', name: '🇩🇪 GER' },
  { code: '+81', name: '🇯🇵 JPN' },
  { code: '+86', name: '🇨🇳 CHN' },
  { code: '+33', name: '🇫🇷 FRA' },
  { code: '+39', name: '🇮🇹 ITA' },
  { code: '+7', name: '🇷🇺 RUS' },
  { code: '+52', name: '🇲🇽 MEX' },
  { code: '+55', name: '🇧🇷 BRA' },
  { code: '+34', name: '🇪🇸 ESP' },
  { code: '+27', name: '🇿🇦 RSA' },
  { code: '+82', name: '🇰🇷 KOR' },
  { code: '+62', name: '🇮🇩 IDN' },
  { code: '+234', name: '🇳🇬 NGA' },
  { code: '+31', name: '🇳🇱 NLD' },
  { code: '+46', name: '🇸🇪 SWE' },
  { code: '+63', name: '🇵🇭 PHI' }
];

const SignUpPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
  const [phone, setPhone] = useState('');

  const navigate = useNavigate();
  const auth = getAuth();

  const validatePassword = (pwd) =>
    pwd.length >= 16 && /[A-Z]/.test(pwd) && /[!@#$%^&*(),.?":{}|<>]/.test(pwd);

  const validateEmailFormat = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePhoneNumber = (num) => /^\d{6,15}$/.test(num);

  const sanitize = (str) => str.replace(/[<>"'/]/g, '').trim();

  const handleCreateAccount = () => {
    const sanitizedFirstName = sanitize(firstName);
    const sanitizedLastName = sanitize(lastName);
    const sanitizedEmail = email.toLowerCase().trim();
    const sanitizedPhone = phone.replace(/\D/g, '').trim();

    if (!sanitizedFirstName || !sanitizedLastName || !sanitizedEmail || !confirmEmail || !password || !confirmPassword || !sanitizedPhone) {
      Swal.fire('Error', 'All fields are required', 'error');
      return;
    }

    if (!validateEmailFormat(sanitizedEmail)) {
      Swal.fire('Error', 'Invalid email format', 'error');
      return;
    }

    if (sanitizedEmail !== confirmEmail.toLowerCase().trim()) {
      Swal.fire('Error', 'Emails do not match', 'error');
      return;
    }

    if (password !== confirmPassword) {
      Swal.fire('Error', 'Passwords do not match', 'error');
      return;
    }

    if (!validatePassword(password)) {
      Swal.fire('Error', 'Password must be at least 16 characters long, include one uppercase letter and one special character.', 'error');
      return;
    }

    if (!validatePhoneNumber(sanitizedPhone)) {
      Swal.fire('Error', 'Phone number must contain 6 to 15 digits', 'error');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const fullPhone = `${countryCode} ${sanitizedPhone}`;
    const existing = users.find((u) => u.email === sanitizedEmail || u.phone === fullPhone);

    if (existing) {
      Swal.fire('Error', 'A user with this email or phone number already exists.', 'error');
      return;
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = {
      firstName: sanitizedFirstName,
      lastName: sanitizedLastName,
      email: sanitizedEmail,
      phone: fullPhone,
      password: hashedPassword
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    Swal.fire('Success', 'Account created successfully!', 'success').then(() => {
      // ✅ Send welcome email after success
      emailjs
        .send(
          process.env.REACT_APP_EMAILJS_SERVICE_ID,
          process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
          {
            to_email: sanitizedEmail,
            user_name: `${sanitizedFirstName} ${sanitizedLastName}`,
            subject: 'Welcome to LuminoLearn Academy!',
          },
          process.env.REACT_APP_EMAILJS_PUBLIC_KEY
        )
        .then(() => {
          console.log('🎉 Welcome email sent!');
        })
        .catch((error) => {
          console.warn('⚠️ Welcome email failed:', error);
        });

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

        <div className="auth-phone-container">
          <select className="auth-phone-select" value={countryCode} onChange={(e) => setCountryCode(e.target.value)}>
            {countryCodes.map((c, i) => (
              <option key={i} value={c.code}>{c.name} ({c.code})</option>
            ))}
          </select>
          <input
            type="tel"
            placeholder="Phone Number"
            className="auth-input"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <input type="password" placeholder="Password" className="auth-input" value={password} onChange={(e) => setPassword(e.target.value)} />
        <input type="password" placeholder="Confirm Password" className="auth-input" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

        <small className="password-hint">
          🔐 Minimum 16 characters, including UPPERCASE and special symbol ((!@#$%)).
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
