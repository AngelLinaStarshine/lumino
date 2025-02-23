// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './utils/Main';
import Stem from './pages/Stem';
import ArtAndCraft from './pages/ArtAndCraft';
import LanguageAndLiterature from './pages/LanguageAndLiterature';
import Science from './pages/Science';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        {/* This container will expand to fill available space */}
        <div className="main-content">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/stem" element={<Stem />} />
        <Route path="/art-and-craft" element={<ArtAndCraft />} />
        <Route path="/language-and-literature" element={<LanguageAndLiterature />} />
        <Route path="/science" element={<Science />} />
      </Routes>
    </div>

      <footer className="footer">
          <p>© 2025 LuminoLearn Academy. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
