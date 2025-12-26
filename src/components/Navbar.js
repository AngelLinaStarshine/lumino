import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import flameImg from "../assets/flame-unscreen.png";
import { AuthContext } from "../auth/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const { user, authLoading, logout } = useContext(AuthContext);

  const closeMenu = () => setMenuOpen(false);

  const handleMySpaceClick = (e) => {
    e.preventDefault();
    if (authLoading) return; // prevent bounce while auth is loading

    if (user) navigate("/account");
    else navigate("/login");

    closeMenu();
  };

  const handleLogoutClick = async () => {
    await logout();
    closeMenu();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="brand-wrap" onClick={() => navigate("/")}>
        <span className="brand-text brand-highlight brand-lg">LuminoLearn</span>

        <span className="brand-flame">
          <img src={flameImg} alt="Lumino Flame" />
        </span>
      </div>

      <button
        className="hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation"
        aria-expanded={menuOpen}
      >
        ☰
      </button>

      <div className={`nav-links ${menuOpen ? "open" : ""}`}>
        <NavLink
          to="/our-story"
          className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}
          onClick={closeMenu}
        >
          Our Story
        </NavLink>

        <NavLink
          to="/programs"
          className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}
          onClick={closeMenu}
        >
          Learning Paths
        </NavLink>

        <NavLink
          to="/tuition"
          className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}
          onClick={closeMenu}
        >
          Plans &amp; Tuition
        </NavLink>

        {/* My Space (cookie-based) */}
        <NavLink to="/account" className="nav-item" onClick={handleMySpaceClick}>
          My Space
        </NavLink>

        {/* Logout appears only if logged in */}
        {!!user && (
          <button type="button" className="nav-item" onClick={handleLogoutClick}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
