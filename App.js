import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Countries from './pages/Countries';
import Universities from './pages/Universities';
import UniversityDetails from './pages/UniversityDetails';
import Programs from './pages/Programs';
import Profile from './pages/Profile';

// FIX: AuthProvider must be INSIDE Router so child hooks (useNavigate) work correctly
function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/countries" element={<ProtectedRoute><Countries /></ProtectedRoute>} />
              <Route path="/universities" element={<ProtectedRoute><Universities /></ProtectedRoute>} />
              {/* FIX: /universities/:id route was missing */}
              <Route path="/universities/:id" element={<ProtectedRoute><UniversityDetails /></ProtectedRoute>} />
              <Route path="/programs" element={<ProtectedRoute><Programs /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </main>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
