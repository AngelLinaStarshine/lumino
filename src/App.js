// src/App.js
import React, { useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Main from "./utils/Main";
import Stem from "./pages/Stem";
import ArtAndCraft from "./pages/ArtAndCraft";
import LanguageAndLiterature from "./pages/LanguageAndLiterature";
import Science from "./pages/Science";
import PersonalAccount from "./pages/PersonalAccount";
import Footer from "./components/Footer";
import RequireAuth from "./utils/RequireAuth";
import "./App.css";

import SignInPage from "./pages/SignInPage";
import ForgotPassword from "./pages/ForgotPassword";
import FlameChatBot from "./components/LuminoFlameBot";



/* New navbar pages */
import About from "./pages/About"; // /our-story
import Programs from "./pages/Programs"; // /programs
import Tuition from "./pages/Tuition"; // /tuition

function App() {
  const [loggedInUser, setLoggedInUser] = useState(() => {
    return JSON.parse(sessionStorage.getItem("loggedInUser")) || null;
  });

  useEffect(() => {
    if (loggedInUser) {
      sessionStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
    } else {
      sessionStorage.removeItem("loggedInUser");
    }
  }, [loggedInUser]);

  return (
    <Router>
      <div className="App">
        <Navbar setLoggedInUser={setLoggedInUser} />

        <div className="main-content">
          <Routes>
            {/* Home */}
            <Route path="/" element={<Main />} />

            {/* Navbar pages */}
            <Route path="/our-story" element={<About />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/tuition" element={<Tuition />} />

            {/* Legacy pages (optional) */}
            <Route path="/stem" element={<Stem />} />
            <Route path="/art-and-craft" element={<ArtAndCraft />} />
            <Route
              path="/language-and-literature"
              element={<LanguageAndLiterature />}
            />
            <Route path="/science" element={<Science />} />

         

            {/* Auth */}
            <Route path="/login" element={<SignInPage />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* Unprotected personal account during sign-up/onboarding */}
            <Route path="/personalaccount" element={<PersonalAccount />} />

            {/* Protected account (after login) */}
            <Route
              path="/account"
              element={
                <RequireAuth>
                  <PersonalAccount />
                </RequireAuth>
              }
            />
          </Routes>
        </div>

        <FlameChatBot />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
