import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import emailjs from 'emailjs-com';
import '../components/Navbar.css';
import CreateAccountImage from '../assets/create_account.jpg';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    emailjs.init('P7BJMiXc8d3y4XOha');
    const user = JSON.parse(sessionStorage.getItem('loggedInUser'));
    setLoggedInUser(user);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('loggedInUser');
    setLoggedInUser(null);
    Swal.fire('Logged out', 'You have successfully logged out.', 'success');
    navigate('/');
  };

  const navigateAndScroll = (id) => {
    setIsMenuOpen(false);
    if (location.pathname === '/') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  };

  const handleMyAccountClick = () => {
    Swal.fire({
      title: 'Welcome!',
      text: 'Do you want to log in or register?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Log In',
      denyButtonText: 'Register'
    }).then((result) => {
      if (result.isConfirmed) handleLogin();
      else if (result.isDenied) handleRegister();
    });
  };

  const handleForgotPassword = () => {
    Swal.fire({
      title: 'Forgot Password',
      input: 'email',
      inputLabel: 'Enter your registered email',
      inputPlaceholder: 'email@example.com',
      confirmButtonText: 'Send Reset Link',
      showCancelButton: true,
      preConfirm: (email) => {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.email === email);
        if (!user) return Swal.showValidationMessage('No account with this email');
        return email;
      }
    }).then(result => {
      if (!result.isConfirmed) return;

      const resetLink = `https://luminolearn.ca/reset-password?email=${encodeURIComponent(result.value)}`;

      const templateParams = {
        email: result.value,
        reset_link: resetLink,
      };

      emailjs.send('service_ly54gs7', 'template_reset_link', templateParams)
        .then(() => {
          Swal.fire('Link Sent', 'Check your email for a reset link.', 'success');
        })
        .catch(() => {
          Swal.fire('Error', 'Failed to send email. Try again later.', 'error');
        });
    });
  };

  const handleLogin = () => {
    Swal.fire({
      title: 'Login',
      html: `
        <input type="email" id="email" class="swal2-input" placeholder="Email">
        <input type="password" id="password" class="swal2-input" placeholder="Password">
        <p style="text-align:right; font-size: 0.9rem; margin-top: 5px;">
          <a href="#" id="forgotLink" style="color: #007bff;">Forgot Password?</a>
        </p>
      `,
      confirmButtonText: 'Login',
      showCancelButton: true,
      didOpen: () => {
        document.getElementById('forgotLink').addEventListener('click', (e) => {
          e.preventDefault();
          Swal.close();
          handleForgotPassword();
        });
      },
      preConfirm: () => {
        const email = Swal.getPopup().querySelector('#email').value;
        const password = Swal.getPopup().querySelector('#password').value;
        if (!email || !password) return Swal.showValidationMessage('Email and password required');

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const matched = users.find(u => u.email === email && atob(u.password) === password);
        if (!matched) return Swal.showValidationMessage('Invalid credentials');

        sessionStorage.setItem('loggedInUser', JSON.stringify(matched));
        return matched;
      }
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        setLoggedInUser(result.value);
        Swal.fire('Login Successful!', 'Redirecting...', 'success').then(() => {
          navigate('/account');
        });
      }
    });
  };

  const handleRegister = () => {
    Swal.fire({
   
      width: '750px',
      html: `
        <div style="
          display: flex;
          width: 100%;
          height: 500px;               /* Sets fixed vertical height */
          border-radius: 10px;
          overflow: hidden;
        ">
          <!-- Left: Image -->
          <div style="
            flex: 1;
            display: flex;
            align-items: stretch;
            justify-content: center;
            background: #f0f0f0;
          ">
            <img src="${CreateAccountImage}" alt="Register"
              style="width: 100%; height: 100%; object-fit: cover;" />
          </div>
    
          <!-- Right: Form -->
          <div style="
            flex: 1.3;
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: 1px 5px;
            gap: 0,3px;
            background-color: #fff;
          ">
                <h2 style="color: black; font-size: 38px; margin: 0 0 10px;">Create an Account</h2>
            <input type="text" id="firstName" class="swal2-input" placeholder="First Name"
              style="background-color:hsl(188, 76.8%, 86.5%); border-radius: 999px; width: 90%;">
            <input type="text" id="lastName" class="swal2-input" placeholder="Last Name"
              style="background-color:hsl(188, 76.8%, 86.5%); border-radius: 999px; width: 90%;">
            <input type="email" id="email" class="swal2-input" placeholder="Email"
              style="background-color:hsl(188, 76.8%, 86.5%); border-radius: 999px; width: 90%;">
            <input type="email" id="confirmEmail" class="swal2-input" placeholder="Confirm Email"
              style="background-color:hsl(188, 76.8%, 86.5%); border-radius: 999px; width: 90%;">
            <input type="tel" id="phone" class="swal2-input" placeholder="Phone Number"
              style="background-color:hsl(188, 76.8%, 86.5%); border-radius: 999px; width: 90%;">
            <input type="password" id="password" class="swal2-input" placeholder="Password"
              style="background-color:hsl(188, 76.8%, 86.5%); border-radius: 999px; width: 90%;">
            <input type="password" id="confirmPassword" class="swal2-input" placeholder="Confirm Password"
              style="background-color:hsl(188, 76.8%, 86.5%); border-radius: 999px; width: 90%;">
          </div>
        </div>
      `,
      confirmButtonText: 'Sign Up',
      showCancelButton: true,
      customClass: {
        confirmButton:  'register-oval-btn'
      },
      preConfirm: () => {
        const firstName = Swal.getPopup().querySelector('#firstName').value.trim();
        const lastName = Swal.getPopup().querySelector('#lastName').value.trim();
        const email = Swal.getPopup().querySelector('#email').value.trim();
        const confirmEmail = Swal.getPopup().querySelector('#confirmEmail').value.trim();
        const phone = Swal.getPopup().querySelector('#phone').value.trim();
        const password = Swal.getPopup().querySelector('#password').value;
        const confirmPassword = Swal.getPopup().querySelector('#confirmPassword').value;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[0-9]{10,}$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{16,}$/;

        if (!firstName || !lastName || !email || !confirmEmail || !phone || !password || !confirmPassword)
          return Swal.showValidationMessage('Please fill in all fields');
        if (!emailRegex.test(email)) return Swal.showValidationMessage('Invalid email format');
        if (email !== confirmEmail) return Swal.showValidationMessage('Emails do not match');
        if (!phoneRegex.test(phone)) return Swal.showValidationMessage('Phone must be at least 10 digits');
        if (password !== confirmPassword) return Swal.showValidationMessage('Passwords do not match');
        if (!passwordRegex.test(password))
          return Swal.showValidationMessage('Password must be 16+ chars w/ upper, lower, number, symbol');

        const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
        if (existingUsers.some(u => u.email === email)) return Swal.showValidationMessage('User already exists');

        return {
          firstName,
          lastName,
          email,
          phone,
          password: btoa(password),
          subscription: 'Free Plan',
          enrolledCourses: [],
          paymentHistory: []
        };
      }
    }).then((result) => {
      if (!result.isConfirmed || !result.value) return;

      const user = result.value;
      const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
      const formattedTime = new Date(Date.now() + 15 * 60 * 1000).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      });

      const templateParams = {
        passcode: otpCode,
        time: formattedTime,
        email: user.email
      };

      emailjs.send('service_ly54gs7', 'template_3339ea4', templateParams)
        .then(() => {
          console.log('OTP sent to:', user.email);
        })
        .catch((error) => {
          console.error('EmailJS Error:', error);
          Swal.fire('Error', 'Failed to send verification code. Please try again.', 'error');
        });

      sessionStorage.setItem('otpCode', otpCode);
      sessionStorage.setItem('otpTimestamp', Date.now());
      sessionStorage.setItem('pendingUser', JSON.stringify(user));

      Swal.fire({
  title: 'Verify Your Account',
  text: 'Enter the 6-digit code sent to your email.',
  input: 'text',
  inputPlaceholder: 'Enter code',
  inputAttributes: { maxlength: 6 },
  showCancelButton: true,
  confirmButtonText: 'Verify',
  preConfirm: (inputCode) => {
    const storedCode = sessionStorage.getItem('otpCode');
    const storedTime = Number(sessionStorage.getItem('otpTimestamp'));
    if (!inputCode) return Swal.showValidationMessage('Code is required');
    if (Date.now() - storedTime > 15 * 60 * 1000) return Swal.showValidationMessage('Code expired');
    if (inputCode !== storedCode) return Swal.showValidationMessage('Incorrect code');
    return true;
  }
}).then((verifyResult) => {
  if (verifyResult.isConfirmed) {
    const confirmedUser = JSON.parse(sessionStorage.getItem('pendingUser'));
    const users = JSON.parse(localStorage.getItem('users')) || [];
    localStorage.setItem('users', JSON.stringify([...users, confirmedUser]));

   
    sessionStorage.removeItem('otpCode');
    sessionStorage.removeItem('otpTimestamp');
    sessionStorage.removeItem('pendingUser');

    
    sessionStorage.setItem('loggedInUser', JSON.stringify(confirmedUser));
    setLoggedInUser(confirmedUser);
    navigate('/account');

 
    Swal.fire('Verified!', 'Your account has been confirmed and you are now logged in.', 'success');


        }
      });
    });
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">LuminoLearn</Link>

      {/* Hamburger icon for mobile */}
      <button className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        &#9776;
      </button>

      <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>

        <span onClick={() => navigateAndScroll('about')} className="nav-item">About</span>
        <span onClick={() => navigateAndScroll('courses')} className="nav-item">Courses</span>
        <span onClick={() => navigateAndScroll('contact')} className="nav-item">Contact</span>
        {loggedInUser ? (
          <>
            <Link to="/account" className="nav-item">My Account</Link>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        ) : (
          <span onClick={handleMyAccountClick} className="nav-item">My Account</span>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

