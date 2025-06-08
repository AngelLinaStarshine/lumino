// src/components/Navbar.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import emailjs from 'emailjs-com';
import '../components/Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Listen to login/logout changes
  useEffect(() => {
    emailjs.init('P7BJMiXc8d3y4XOha'); // Your EmailJS user ID

    const updateUser = () => {
      const user = JSON.parse(sessionStorage.getItem('loggedInUser'));
      setLoggedInUser(user);
    };

    updateUser(); // Initial load

    window.addEventListener('storageUpdate', updateUser);
    return () => window.removeEventListener('storageUpdate', updateUser);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('loggedInUser');
    setLoggedInUser(null);
    Swal.fire('Logged out', 'You have successfully logged out.', 'success');
    window.dispatchEvent(new Event('storageUpdate')); // Let Navbar know
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

  return (
    <nav className="navbar">
      <Link to="/" className="logo">LuminoLearn</Link>

      <button className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        &#9776;
      </button>

      <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
        <span onClick={() => navigateAndScroll('about')} className="nav-item">About</span>
        <span onClick={() => navigateAndScroll('courses')} className="nav-item">Courses</span>
        <span onClick={() => navigateAndScroll('contact')} className="nav-item">Contact</span>

        {loggedInUser ? (
          <>
            <span className="welcome-text">👋 Welcome, {loggedInUser.firstName}</span>
            <Link to="/account" className="nav-item">My Account</Link>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        ) : (
          <div className="auth-buttons">
            <span onClick={() => navigate('/login')} className="nav-item">Sign In</span>
            <span onClick={() => navigate('/signup')} className="nav-item">Sign Up</span>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
