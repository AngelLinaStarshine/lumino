import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../components/Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loggedInUser, setLoggedInUser] = useState(null);

  // Load session data on component mount
  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem('loggedInUser'));
    setLoggedInUser(user);
  }, []);

  // Logout function
  const handleLogout = () => {
    sessionStorage.removeItem('loggedInUser');
    setLoggedInUser(null);
    Swal.fire('Logged out', 'You have successfully logged out.', 'success');
    navigate('/');
  };

  // Function to navigate and scroll to a section
  const navigateAndScroll = (id) => {
    if (location.pathname === '/') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  };

  // Handle Registration
  const handleRegister = () => {
    Swal.fire({
      title: 'Register',
      html: `
        <input type="text" id="name" class="swal2-input" placeholder="Full Name">
        <input type="email" id="email" class="swal2-input" placeholder="Email">
        <input type="password" id="password" class="swal2-input" placeholder="Password">
      `,
      confirmButtonText: 'Register',
      showCancelButton: true,
      preConfirm: () => {
        const name = Swal.getPopup().querySelector('#name').value;
        const email = Swal.getPopup().querySelector('#email').value;
        const password = Swal.getPopup().querySelector('#password').value;

        if (!name || !email || !password) {
          Swal.showValidationMessage('Please fill in all fields');
        }
        return { name, email, password, subscription: "Free Plan", enrolledCourses: [], paymentHistory: [] };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        sessionStorage.setItem('registeredUser', JSON.stringify(result.value));
        Swal.fire('Registration Successful!', 'Please log in now.', 'success');
        handleLogin();
      }
    });
  };

  // Handle Login
  const handleLogin = () => {
    Swal.fire({
      title: 'Login',
      html: `
        <input type="email" id="email" class="swal2-input" placeholder="Email">
        <input type="password" id="password" class="swal2-input" placeholder="Password">
      `,
      confirmButtonText: 'Login',
      showCancelButton: true,
      preConfirm: () => {
        const email = Swal.getPopup().querySelector('#email').value;
        const password = Swal.getPopup().querySelector('#password').value;
        const registeredUser = JSON.parse(sessionStorage.getItem('registeredUser'));

        if (!email || !password) {
          Swal.showValidationMessage('Please enter email and password');
        }

        if (registeredUser && registeredUser.email === email && registeredUser.password === password) {
          sessionStorage.setItem('loggedInUser', JSON.stringify(registeredUser));
          setLoggedInUser(registeredUser);
          Swal.fire('Login Successful!', 'Redirecting to your account...', 'success');
          navigate('/account');
        } else {
          Swal.fire('Login Failed', 'Invalid email or password', 'error');
        }
      }
    });
  };

  // Handle My Account click (login/register prompt)
  const handleMyAccountClick = () => {
    Swal.fire({
      title: 'Welcome!',
      text: 'Do you want to log in or register?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Log In',
      denyButtonText: 'Register'
    }).then((result) => {
      if (result.isConfirmed) {
        handleLogin();
      } else if (result.isDenied) {
        handleRegister();
      }
    });
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">LuminoLearn</Link>
      <div className="nav-links">
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
