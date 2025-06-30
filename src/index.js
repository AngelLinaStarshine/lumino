import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { AuthProvider } from './auth/AuthContext';
import reportWebVitals from './reportWebVitals';

// Root render with AuthContext and App wrapped together
const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);

// Optional: for performance metrics (e.g., Lighthouse or analytics)
reportWebVitals();
