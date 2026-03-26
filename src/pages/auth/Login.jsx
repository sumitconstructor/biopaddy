/**
 * FILE: src/pages/auth/Login.jsx
 *
 * Changes from original:
 *   - All roles now log in with Email + Password (no phone/OTP field).
 *   - Frontend email + password regex validation with inline error messages.
 *   - Quick demo buttons removed (mock data gone).
 *   - login() from AuthContext now takes (email, password) — no userType arg.
 *   - After login, navigate based on user.user_type returned from server.
 */

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

// ── Regex (mirrors server-side) ───────────────────────────────────────────────
const EMAIL_RE = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
const PWD_RE = /^(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~])[A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]{8,}$/;

const ROUTE_MAP = {
  farmer: '/farmer',
  customer: '/customer',
  admin: '/admin',
};

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  // ── Client-side validation ───────────────────────────────────────────────
  function validate() {
    const e = {};
    if (!email) e.email = 'Email is required.';
    else if (!EMAIL_RE.test(email)) e.email = 'Enter a valid email address.';

    if (!password) e.password = 'Password is required.';
    else if (!PWD_RE.test(password))
      e.password = 'Password must be 8+ chars with a number and special character.';

    setErrors(e);
    return Object.keys(e).length === 0;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    if (!validate()) return;

    setLoading(true);
    try {
      const user = await login(email.trim().toLowerCase(), password);
      navigate(ROUTE_MAP[user.user_type] || '/');
    } catch (err) {
      const msg = err.response?.data?.message || 'Login failed. Please check your credentials.';
      setApiError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface-50 mesh-bg flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2.5 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-brand flex items-center justify-center text-white text-lg">
              🌾
            </div>
            <span className="font-display font-bold text-2xl text-surface-900">BioPaddy</span>
          </Link>
          <h1 className="font-display text-2xl font-bold text-surface-900 mt-2">Welcome Back</h1>
          <p className="text-surface-500 mt-1">Sign in with your registered email</p>
        </div>

        <div className="card p-8">
          {/* API error banner */}
          {apiError && (
            <div className="mb-4 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* Email */}
            <div>
              <label className="input-label">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={e => { setEmail(e.target.value); setErrors(p => ({ ...p, email: '' })); }}
                placeholder="you@example.com"
                className={`input-field ${errors.email ? 'border-red-400 focus:ring-red-400' : ''}`}
                autoComplete="email"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="input-label">Password</label>
              <div className="relative">
                <input
                  type={showPwd ? 'text' : 'password'}
                  value={password}
                  onChange={e => { setPassword(e.target.value); setErrors(p => ({ ...p, password: '' })); }}
                  placeholder="••••••••"
                  className={`input-field pr-12 ${errors.password ? 'border-red-400 focus:ring-red-400' : ''}`}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-400 hover:text-surface-600 text-sm"
                  aria-label={showPwd ? 'Hide password' : 'Show password'}
                >
                  {showPwd ? '🙈' : '👁️'}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-red-500">{errors.password}</p>
              )}
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-surface-600 cursor-pointer">
                <input type="checkbox" className="rounded border-surface-300" />
                Remember me
              </label>
              <a href="#" className="text-brand-600 hover:text-brand-700 font-medium">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3.5 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-surface-500">
              Don't have an account?{' '}
              <Link to="/register/farmer" className="text-brand-600 font-semibold hover:text-brand-700">
                Register as Farmer
              </Link>
              {' '}or{' '}
              <Link to="/register/customer" className="text-brand-600 font-semibold hover:text-brand-700">
                Business
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
