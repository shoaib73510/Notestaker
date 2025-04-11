import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './Components/Register';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token')); // State for auth status

  return (
    <Router >
      <div className='bgm'>
        <Routes>
          {/* Register page as landing */}
          <Route path="/" element={<Register onRegisterSuccess={() => window.location.href = '/login'} />} />
          {/* Login page */}
          <Route
            path="/login"
            element={<Login onLoginSuccess={() => {
              setIsAuthenticated(true);
              window.location.href = '/dashboard';
            }} />}
          />
          {/* Dashboard page */}
          <Route
            path="/dashboard"
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
