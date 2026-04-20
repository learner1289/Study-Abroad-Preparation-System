import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="bg-blue-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold tracking-tight">
            StudyGlobe 🌍
          </Link>
          <div className="flex items-center gap-4 text-sm font-medium">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="hover:text-blue-200 transition-colors">Dashboard</Link>
                <Link to="/countries" className="hover:text-blue-200 transition-colors">Countries</Link>
                <Link to="/universities" className="hover:text-blue-200 transition-colors">Universities</Link>
                <Link to="/programs" className="hover:text-blue-200 transition-colors">Programs</Link>
                <Link to="/profile" className="hover:text-blue-200 transition-colors">Profile</Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 px-3 py-1.5 rounded-md transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-blue-200 transition-colors">Login</Link>
                <Link
                  to="/register"
                  className="bg-white text-blue-700 px-3 py-1.5 rounded-md hover:bg-blue-50 transition-colors"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
