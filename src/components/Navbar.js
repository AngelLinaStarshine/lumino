// src/components/Navbar.js
import React from 'react';
import '../App.css'; // Make sure this file includes your Navbar styles

const Navbar = () => {
  return (
    <nav>
      {/* Logo linking to the top of the page */}
      <a href="#" className="logo">LuminoLearn</a>
      
      {/* Navigation links that scroll to sections on the Main page */}
      <div className="nav-links">
        <a href="#about">About</a>
        <a href="#courses">Courses</a>
        <a href="#contact">Contact</a>
      </div>

      {/* Burger icon for mobile navigation */}
      <div className="burger">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </nav>
  );
};

export default Navbar;
