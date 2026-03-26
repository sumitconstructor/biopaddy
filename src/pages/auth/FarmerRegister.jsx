/**
 * FILE: src/pages/auth/FarmerRegister.jsx
 *
 * Changes from original:
 *   - Step 1: Email + Email OTP (not phone OTP) + password with strength hints.
 *   - Step 2: Farm details (unchanged).
 *   - Step 3: Bank account + IFSC with strict regex validation.
 *   - On final submit, calls registerFarmer() — no loginAs() / mock fallback.
 *   - Inline field-level error messages throughout.
 */

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { authService } from '../../services/index';

// ── Regex (mirrors server-side) ───────────────────────────────────────────────
const REGEX = {
  email: /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/,
  password: /^(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~])[A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]{8,}$/,
  bankAccount: /^[0-9]{9,18}$/,
  ifsc: /^[A-Z]{4}0[A-Z0-9]{6}$/,
};

export default function FarmerRegister() {
  const [step, setStep] = useState(1);
  const { registerFarmer } = useAuth();
  const navigate = useNavigate();

  // ── Form state ────────────────────────────────────────────────────────────
  const [form, setForm] = useState({
    profile_name: '', email: '', password: '', confirmPassword: '',
    otp: '', language_preference: 'hindi',
    aadhaar_number: '', land_area_acres: '', primary_crop: 'rice', farm_location: '',
    bank_account_number: '', bank_ifsc: '',
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  const set = (field) => (e) => {
    setForm(p => ({ ...p, [field]: e.target.value }));
    setErrors(p => ({ ...p, [field]: '' }));
  };

  // ── Step 1 validation ─────────────────────────────────────────────────────
  function validateStep1() {
    const e = {};
    if (!form.profile_name.trim()) e.profile_name = 'Full name is required.';
    if (!form.email) e.email = 'Email is required.';
    else if (!REGEX.email.test(form.email)) e.email = 'Enter a valid email address.';
    if (!form.password) e.password = 'Password is required.';
    else if (!REGEX.password.test(form.password))
      e.password = 'Min 8 chars, at least one number and one special character.';
    if (form.password !== form.confirmPassword)
      e.confirmPassword = 'Passwords do not match.';
    if (!form.otp) e.otp = 'Enter the OTP sent to your email.';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  // ── Step 3 validation ─────────────────────────────────────────────────────
  function validateStep3() {
    const e = {};
    if (form.bank_account_number && !REGEX.bankAccount.test(form.bank_account_number))
      e.bank_account_number = 'Account number must be 9–18 digits.';
    if (form.bank_ifsc && !REGEX.ifsc.test(form.bank_ifsc.toUpperCase()))
      e.bank_ifsc = 'IFSC format: ABCD0123456 (4 letters, 0, 6 alphanumeric).';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  // ── Send OTP ──────────────────────────────────────────────────────────────
  const handleSendOtp = async () => {
    if (!REGEX.email.test(form.email)) {
      setErrors(p => ({ ...p, email: 'Enter a valid email before sending OTP.' }));
      return;
    }
    setOtpLoading(true);
    setApiError('');
    try {
      await authService.sendOtp(form.email, 'verification');
      setOtpSent(true);
    } catch (err) {
      setApiError(err.response?.data?.message || 'Failed to send OTP. Try again.');
    } finally {
      setOtpLoading(false);
    }
  };

  // ── Next / Submit ─────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');

    if (step === 1) {
      if (!validateStep1()) return;
      setStep(2);
      return;
    }
    if (step === 2) {
      setStep(3);
      return;
    }

    // Step 3 — final submit
    if (!validateStep3()) return;
    setSubmitLoading(true);
    try {
      await registerFarmer({
        email: form.email.toLowerCase(),
        profile_name: form.profile_name.trim(),
        password: form.password,
        otp: form.otp,
        language_preference: form.language_preference,
        aadhaar_number: form.aadhaar_number,
        land_area_acres: form.land_area_acres ? parseFloat(form.land_area_acres) : undefined,
        primary_crop: form.primary_crop,
        bank_account_number: form.bank_account_number || undefined,
        bank_ifsc: form.bank_ifsc?.toUpperCase() || undefined,
      });
      navigate('/farmer');
    } catch (err) {
      const msg = err.response?.data?.message
        || (err.response?.data?.errors?.join(' '))
        || 'Registration failed. Please try again.';
      setApiError(msg);
      // If validation errors, scroll back to step 1
      if (err.response?.status === 400 || err.response?.status === 422) setStep(1);
    } finally {
      setSubmitLoading(false);
    }
  };

  const steps = ['Verify Email', 'Farm Details', 'Bank & Docs'];

  return (
    <div className="min-h-screen bg-surface-50 mesh-bg flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2.5 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-brand flex items-center justify-center text-white text-lg">🌾</div>
            <span className="font-display font-bold text-2xl text-surface-900">BioPaddy</span>
          </Link>
          <h1 className="font-display text-2xl font-bold text-surface-900 mt-2">Farmer Registration</h1>
          <p className="text-surface-500 mt-1">Join thousands of farmers earning from crop waste</p>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {[1, 2, 3].map(s => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                s <= step ? 'bg-brand-500 text-white' : 'bg-surface-200 text-surface-500'
              }`}>{s}</div>
              {s < 3 && <div className={`w-12 h-0.5 transition-colors ${s < step ? 'bg-brand-500' : 'bg-surface-200'}`} />}
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-6 mb-6 text-xs text-surface-500">
          {steps.map((label, i) => (
            <span key={i} className={step >= i + 1 ? 'text-brand-600 font-medium' : ''}>{label}</span>
          ))}
        </div>

        <div className="card p-8">
          {apiError && (
            <div className="mb-4 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              {/* ── STEP 1: Email + OTP + Password ─────────────────────── */}
              {step === 1 && (
                <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                  <div>
                    <label className="input-label">Full Name</label>
                    <input type="text" value={form.profile_name} onChange={set('profile_name')}
                      placeholder="Enter your full name" className={`input-field ${errors.profile_name ? 'border-red-400' : ''}`} />
                    {errors.profile_name && <p className="mt-1 text-xs text-red-500">{errors.profile_name}</p>}
                  </div>

                  <div>
                    <label className="input-label">Email Address</label>
                    <input type="email" value={form.email} onChange={set('email')}
                      placeholder="you@example.com" className={`input-field ${errors.email ? 'border-red-400' : ''}`} />
                    {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="input-label">Email OTP Verification</label>
                    <div className="flex gap-2">
                      <input type="text" value={form.otp} onChange={set('otp')}
                        placeholder="Enter 6-digit OTP" className={`input-field flex-1 ${errors.otp ? 'border-red-400' : ''}`}
                        maxLength={6} inputMode="numeric" />
                      <button type="button" onClick={handleSendOtp} disabled={otpLoading}
                        className="px-4 py-3 bg-brand-50 text-brand-700 font-medium rounded-xl hover:bg-brand-100 transition-colors text-sm whitespace-nowrap disabled:opacity-60">
                        {otpLoading ? 'Sending…' : otpSent ? 'Resend OTP' : 'Send OTP'}
                      </button>
                    </div>
                    {otpSent && <p className="mt-1 text-xs text-emerald-600">✅ OTP sent to {form.email}</p>}
                    {errors.otp && <p className="mt-1 text-xs text-red-500">{errors.otp}</p>}
                  </div>

                  <div>
                    <label className="input-label">Password</label>
                    <div className="relative">
                      <input type={showPwd ? 'text' : 'password'} value={form.password} onChange={set('password')}
                        placeholder="Min 8 chars, number & special char"
                        className={`input-field pr-12 ${errors.password ? 'border-red-400' : ''}`} />
                      <button type="button" onClick={() => setShowPwd(v => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-400 hover:text-surface-600 text-sm">
                        {showPwd ? '🙈' : '👁️'}
                      </button>
                    </div>
                    {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
                  </div>

                  <div>
                    <label className="input-label">Confirm Password</label>
                    <input type="password" value={form.confirmPassword} onChange={set('confirmPassword')}
                      placeholder="Repeat password" className={`input-field ${errors.confirmPassword ? 'border-red-400' : ''}`} />
                    {errors.confirmPassword && <p className="mt-1 text-xs text-red-500">{errors.confirmPassword}</p>}
                  </div>

                  <div>
                    <label className="input-label">Language Preference</label>
                    <select value={form.language_preference} onChange={set('language_preference')} className="input-field">
                      <option value="hindi">Hindi</option>
                      <option value="english">English</option>
                      <option value="punjabi">Punjabi</option>
                    </select>
                  </div>
                </motion.div>
              )}

              {/* ── STEP 2: Farm Details ────────────────────────────────── */}
              {step === 2 && (
                <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                  <div>
                    <label className="input-label">Aadhaar Number</label>
                    <input type="text" value={form.aadhaar_number} onChange={set('aadhaar_number')}
                      placeholder="XXXX XXXX XXXX" className="input-field" maxLength={14} />
                  </div>
                  <div>
                    <label className="input-label">Land Area (in acres)</label>
                    <input type="number" value={form.land_area_acres} onChange={set('land_area_acres')}
                      placeholder="e.g. 12" className="input-field" min="0" step="0.1" />
                  </div>
                  <div>
                    <label className="input-label">Primary Crop</label>
                    <select value={form.primary_crop} onChange={set('primary_crop')} className="input-field">
                      <option value="rice">Rice</option>
                      <option value="wheat">Wheat</option>
                      <option value="both">Both</option>
                    </select>
                  </div>
                  <div>
                    <label className="input-label">Farm Location</label>
                    <input type="text" value={form.farm_location} onChange={set('farm_location')}
                      placeholder="Village / District / State" className="input-field" />
                    <p className="text-xs text-surface-400 mt-1">📍 GPS coordinates will be captured on the mobile app</p>
                  </div>
                </motion.div>
              )}

              {/* ── STEP 3: Bank & Docs ────────────────────────────────── */}
              {step === 3 && (
                <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                  <div>
                    <label className="input-label">Bank Account Number</label>
                    <input type="text" value={form.bank_account_number} onChange={set('bank_account_number')}
                      placeholder="9–18 digits" className={`input-field ${errors.bank_account_number ? 'border-red-400' : ''}`}
                      inputMode="numeric" />
                    {errors.bank_account_number && <p className="mt-1 text-xs text-red-500">{errors.bank_account_number}</p>}
                  </div>
                  <div>
                    <label className="input-label">IFSC Code</label>
                    <input type="text" value={form.bank_ifsc} onChange={e => { set('bank_ifsc')(e); }}
                      placeholder="e.g. SBIN0001234" className={`input-field uppercase ${errors.bank_ifsc ? 'border-red-400' : ''}`}
                      maxLength={11} />
                    {errors.bank_ifsc && <p className="mt-1 text-xs text-red-500">{errors.bank_ifsc}</p>}
                    <p className="text-xs text-surface-400 mt-1">Format: 4 letters + 0 + 6 alphanumeric (e.g. SBIN0001234)</p>
                  </div>
                  <div>
                    <label className="input-label">Upload Aadhaar Card</label>
                    <div className="border-2 border-dashed border-surface-200 rounded-xl p-6 text-center hover:border-brand-300 transition-colors cursor-pointer">
                      <div className="text-3xl mb-2">📄</div>
                      <p className="text-sm text-surface-500">Click to upload or drag & drop</p>
                      <p className="text-xs text-surface-400">JPG, PNG or PDF (max 5MB)</p>
                    </div>
                  </div>
                  <div>
                    <label className="input-label">Upload Land Ownership Document</label>
                    <div className="border-2 border-dashed border-surface-200 rounded-xl p-6 text-center hover:border-brand-300 transition-colors cursor-pointer">
                      <div className="text-3xl mb-2">📋</div>
                      <p className="text-sm text-surface-500">Click to upload or drag & drop</p>
                      <p className="text-xs text-surface-400">JPG, PNG or PDF (max 5MB)</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex gap-3 mt-6">
              {step > 1 && (
                <button type="button" onClick={() => setStep(step - 1)} className="btn-ghost flex-1 border border-surface-200">
                  ← Back
                </button>
              )}
              <button type="submit" disabled={submitLoading}
                className="btn-primary flex-1 disabled:opacity-60 disabled:cursor-not-allowed">
                {submitLoading ? 'Submitting…' : step < 3 ? 'Continue →' : 'Submit Registration'}
              </button>
            </div>
          </form>
        </div>

        <p className="text-center text-sm text-surface-500 mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-brand-600 font-semibold">Login</Link>
        </p>
      </motion.div>
    </div>
  );
}
