/**
 * FILE: src/context/AuthContext.jsx
 *
 * Changes from original:
 *   - All mock data imports and loginMock / loginAs removed.
 *   - Session restore uses GET /api/auth/me (validates token server-side).
 *   - login() calls POST /api/auth/login (email + password for all roles).
 *   - registerFarmer / registerCustomer throw on API failure — no silent fallback.
 *   - Farmer login navigates based on user_type returned from server.
 */

import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // ── Restore session on mount via /api/auth/me ────────────────────────────
  useEffect(() => {
    const token = localStorage.getItem('bp_token');
    if (!token) {
      setLoading(false);
      return;
    }

    api.get('/auth/me')
      .then(({ data }) => {
        if (data.success) {
          const fullUser = { ...data.data.user, ...data.data.profile };
          setUser(fullUser);
          setIsAuthenticated(true);
        } else {
          clearSession();
        }
      })
      .catch(() => clearSession())
      .finally(() => setLoading(false));
  }, []);

  // ── Helpers ──────────────────────────────────────────────────────────────
  function clearSession() {
    localStorage.removeItem('bp_token');
    localStorage.removeItem('bp_refresh_token');
    setUser(null);
    setIsAuthenticated(false);
  }

  function persistSession(userData, profileData, token, refreshToken) {
    localStorage.setItem('bp_token', token);
    localStorage.setItem('bp_refresh_token', refreshToken);
    const fullUser = { ...userData, ...profileData };
    setUser(fullUser);
    setIsAuthenticated(true);
    return fullUser;
  }

  // ── Login (email + password — works for farmer, customer, admin) ─────────
  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    const { user: userData, profile, token, refreshToken } = res.data.data;
    return persistSession(userData, profile, token, refreshToken);
  };

  // ── Register Farmer ───────────────────────────────────────────────────────
  const registerFarmer = async (data) => {
    const res = await api.post('/auth/register/farmer', data);
    const { user: userData, token, refreshToken } = res.data.data;
    return persistSession(userData, {}, token, refreshToken);
  };

  // ── Register Customer ─────────────────────────────────────────────────────
  const registerCustomer = async (data) => {
    const res = await api.post('/auth/register/customer', data);
    const { user: userData, token, refreshToken } = res.data.data;
    return persistSession(userData, {}, token, refreshToken);
  };

  // ── Logout ────────────────────────────────────────────────────────────────
  const logout = () => {
    clearSession();
  };

  if (loading) {
    // Minimal full-screen loader while session is being verified
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-brand flex items-center justify-center text-white text-lg animate-pulse">
            🌾
          </div>
          <p className="text-surface-500 text-sm">Loading BioPaddy…</p>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      login,
      logout,
      registerFarmer,
      registerCustomer,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
