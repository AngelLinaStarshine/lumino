import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate, Link } from 'react-router-dom';
import bcrypt from 'bcryptjs';
import '../firebase';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import emailjs from '@emailjs/browser';
import '../pages/sign.css';
import signupImage from '../assets/2.svg';

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
      if (error.code === 'auth/popup-closed-by-user') {
        console.log('User closed the sign-in popup.');
        return;
      }
      Swal.fire('Error', error.message || 'Google sign-in failed', 'error');
    }
  };

  return (
    <div className="signup-wrapper">
      <div style={{ flex: 1, position: 'relative', display: 'flex', flexWrap: 'wrap' }}>
        <img src={signupImage} alt="Sign up" style={{ width: '100%', height: '100vh', objectFit: 'cover' }} />

        <div style={{
          position: 'absolute',
          top: '2%',
          right: '12%',
          width: '42%',
          backgroundColor: 'transparent',
          zIndex: 2
        }}>
          <div className="auth-form-box">
            <input type="text" placeholder="First Name" className="auth-inputin" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            <input type="text" placeholder="Last Name" className="auth-inputin" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            <input type="email" placeholder="Email" className="auth-inputin" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="email" placeholder="Confirm Email" className="auth-inputin" value={confirmEmail} onChange={(e) => setConfirmEmail(e.target.value)} />

            <div className="auth-phone-container">
              <select className="auth-phone-select" value={countryCode} onChange={(e) => setCountryCode(e.target.value)}>
                {countryCodes.map((c, i) => (
                  <option key={i} value={c.code}>{c.name} ({c.code})</option>
                ))}
              </select>
              <input type="tel" placeholder="Phone Number" className="auth-inputin" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>

            <input type="password" placeholder="Password" className="auth-inputin" value={password} onChange={(e) => setPassword(e.target.value)} />
            <input type="password" placeholder="Confirm Password" className="auth-inputin" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

            <small className="password-hint">
              🔐 Min 16 characters, including UPPERCASE and special symbol ((!@#$%)).
            </small>
          </div>
        </div>

        <div style={{
          position: 'absolute',
          bottom: '4%',
          left: '4%',
          right: '10%',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center'
        }}>
          <p className="auth-footer" style={{ fontSize: '20px', color: '#333', margin: 0 }}>
            Already have an account? <Link to="/login">Sign in here</Link>
          </p>

          <div style={{ display: 'flex', gap: '90px' }}>
            <button
              onClick={handleCreateAccount}
              style={{ width: '220px', height: '45px', opacity: 0, cursor: 'pointer' }}
            >
              Create
            </button>

            <button
              onClick={handleGoogleSignIn}
              style={{ width: '290px', height: '45px', opacity: 0, cursor: 'pointer' }}
            >
              Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;