// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './authContext'; // Import AuthProvider and useAuth
import LandingPage from './components/Landing/LandingPage';
import AdminDashboard from './components/Admin/AdminDashboard';
import Media from './components/Admin/Media';
import Upload from './components/Admin/Upload';
import Process from './components/Admin/Process';
import Dashboard from './components/User/Dashboard';
import CallBack from './components/utils/CallBack';
import { getUserSession } from './components/utils/authUtils';

const ProtectedRoute = ({ element: Element, ...rest }) => {
  const userSession = getUserSession();
  return userSession ? <Element {...rest} /> : <Navigate to="/" replace />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/admin" element={<ProtectedRoute element={AdminDashboard} />} />
            <Route path="/upload" element={<ProtectedRoute element={Upload} />} />
            <Route path="/process" element={<ProtectedRoute element={Process} />} />
            <Route path="/media" element={<ProtectedRoute element={Media} />} />
            <Route path="/user" element={<ProtectedRoute element={Dashboard} />} />
            <Route path="/register" element={<CallBack />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
