import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  // FIX: Session was never persisted — user was logged out on every page refresh
  useEffect(() => {
    const stored = localStorage.getItem('supabase_session');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setSession(parsed);
        setUser(parsed?.user || null);
      } catch {
        localStorage.removeItem('supabase_session');
      }
    }
    setLoading(false);
  }, []);

  const register = async (email, password, full_name) => {
    const response = await authAPI.register({ email, password, full_name });
    return response.data;
  };

  const login = async (email, password) => {
    const response = await authAPI.login({ email, password });
    const { user: userData, session: sessionData } = response.data;
    setUser(userData);
    setSession(sessionData);
    localStorage.setItem('supabase_session', JSON.stringify(sessionData));
    return response.data;
  };

  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (e) {
      console.error('Logout error:', e);
    } finally {
      setUser(null);
      setSession(null);
      localStorage.removeItem('supabase_session');
    }
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, isAuthenticated: !!user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export default AuthContext;
