import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const [tab, setTab] = useState('farmer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const { loginAs } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    loginAs(tab);
    navigate(tab === 'farmer' ? '/farmer' : tab === 'customer' ? '/customer' : '/admin');
  };

  const tabs = [
    { key: 'farmer', label: 'Farmer', icon: '🧑‍🌾' },
    { key: 'customer', label: 'Business', icon: '🏢' },
    { key: 'admin', label: 'Admin', icon: '⚙️' },
  ];

  return (
    <div className="min-h-screen bg-surface-50 mesh-bg flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2.5 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-brand flex items-center justify-center text-white text-lg">🌾</div>
            <span className="font-display font-bold text-2xl text-surface-900">BioPaddy</span>
          </Link>
          <h1 className="font-display text-2xl font-bold text-surface-900 mt-2">Welcome Back</h1>
          <p className="text-surface-500 mt-1">Sign in to your account</p>
        </div>

        <div className="card p-8">
          {/* Tabs */}
          <div className="flex rounded-xl bg-surface-100 p-1 mb-6">
            {tabs.map(t => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  tab === t.key ? 'bg-white text-surface-900 shadow-sm' : 'text-surface-500 hover:text-surface-700'
                }`}
              >
                <span className="text-base">{t.icon}</span>
                <span>{t.label}</span>
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="input-label">{tab === 'farmer' ? 'Phone Number' : 'Email Address'}</label>
              <input
                type={tab === 'farmer' ? 'tel' : 'email'}
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder={tab === 'farmer' ? '+91 98765 43210' : 'you@company.com'}
                className="input-field"
              />
            </div>

            {tab === 'farmer' ? (
              <div>
                <label className="input-label">OTP</label>
                <div className="flex gap-2">
                  <input type="text" placeholder="Enter OTP" className="input-field flex-1" maxLength={6} />
                  <button type="button" className="px-4 py-3 bg-brand-50 text-brand-700 font-medium rounded-xl hover:bg-brand-100 transition-colors text-sm whitespace-nowrap">
                    Send OTP
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <label className="input-label">Password</label>
                <div className="relative">
                  <input
                    type={showPwd ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="input-field pr-12"
                  />
                  <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-400 hover:text-surface-600 text-sm">
                    {showPwd ? '🙈' : '👁️'}
                  </button>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-surface-600 cursor-pointer">
                <input type="checkbox" className="rounded border-surface-300" />
                Remember me
              </label>
              <a href="#" className="text-brand-600 hover:text-brand-700 font-medium">Forgot password?</a>
            </div>

            <button type="submit" className="btn-primary w-full py-3.5">
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-surface-500">
              Don't have an account?{' '}
              <Link to={tab === 'farmer' ? '/register/farmer' : '/register/customer'} className="text-brand-600 font-semibold hover:text-brand-700">
                Register now
              </Link>
            </p>
          </div>

          {/* Quick demo login */}
          <div className="mt-4 pt-4 border-t border-surface-100">
            <p className="text-xs text-surface-400 text-center mb-2">Quick Demo Access</p>
            <div className="flex gap-2">
              {tabs.map(t => (
                <button
                  key={t.key}
                  onClick={() => { loginAs(t.key); navigate(t.key === 'farmer' ? '/farmer' : t.key === 'customer' ? '/customer' : '/admin'); }}
                  className="flex-1 py-2 text-xs font-medium bg-surface-50 hover:bg-surface-100 text-surface-600 rounded-lg transition-colors"
                >
                  {t.icon} {t.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
