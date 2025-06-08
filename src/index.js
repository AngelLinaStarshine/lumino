import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { AuthProvider } from './auth/AuthContext';
import reportWebVitals from './reportWebVitals'; // ✅ Import this

const root = createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
);

// ✅ Optional performance logging
reportWebVitals();
