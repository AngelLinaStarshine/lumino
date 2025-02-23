// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Main from './utils/Main';
import Stem from './pages/Stem';
import ArtAndCraft from './pages/ArtAndCraft';
import LanguageAndLiterature from './pages/LanguageAndLiterature';
import Science from './pages/Science';
import PersonalAccount from './pages/PersonalAccount';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [loggedInUser, setLoggedInUser] = useState(() => {
    return JSON.parse(sessionStorage.getItem('loggedInUser')) || null;
  });

  useEffect(() => {
    if (loggedInUser) {
      sessionStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
    } else {
      sessionStorage.removeItem('loggedInUser');
    }
  }, [loggedInUser]);

  return (
    <Router>
      <div className="App">
        {/* ✅ Navbar appears only ONCE here */}
        <Navbar setLoggedInUser={setLoggedInUser} />

        <div className="main-content">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/stem" element={<Stem />} />
            <Route path="/art-and-craft" element={<ArtAndCraft />} />
            <Route path="/language-and-literature" element={<LanguageAndLiterature />} />
            <Route path="/science" element={<Science />} />
            <Route path="/account" element={<PersonalAccount />} /> {/* ✅ Redirects after login */}
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
