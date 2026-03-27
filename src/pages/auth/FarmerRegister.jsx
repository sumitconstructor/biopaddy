import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { authService } from '../../services';
import { validateField } from '../../utils/validation';

export default function FarmerRegister() {
  const [step, setStep] = useState(1);
  const { loginAs } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  // Form state
  const [form, setForm] = useState({
    profile_name: '',
    phone_number: '',
    password: '',
    confirmPassword: '',
    language_preference: 'hindi',
    aadhaar_number: '',
    land_area_acres: '',
    primary_crop: 'rice',
    farm_location: '',
    bank_account_number: '',
    bank_ifsc: '',
  });

  const set = (field) => (e) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }));
    setFieldErrors(prev => ({ ...prev, [field]: null }));
  };

  const clearFieldError = (field) => setFieldErrors(prev => ({ ...prev, [field]: null }));

  const validateStep = (s) => {
    const errors = {};
    if (s === 1) {
      if (!form.profile_name.trim()) errors.profile_name = 'Name is required';
      else { const e = validateField('name', form.profile_name); if (e) errors.profile_name = e; }

      if (!form.phone_number.trim()) errors.phone_number = 'Phone is required';
      else { const e = validateField('phone', form.phone_number); if (e) errors.phone_number = e; }

      if (!form.password) errors.password = 'Password is required';
      else { const e = validateField('password', form.password); if (e) errors.password = e; }

      if (form.password !== form.confirmPassword) errors.confirmPassword = 'Passwords do not match';
    }
    if (s === 2) {
      if (!form.aadhaar_number.trim()) errors.aadhaar_number = 'Aadhaar is required';
      else { const e = validateField('aadhaar', form.aadhaar_number); if (e) errors.aadhaar_number = e; }

      if (!form.land_area_acres) errors.land_area_acres = 'Land area is required';
      else { const e = validateField('landArea', form.land_area_acres); if (e) errors.land_area_acres = e; }
    }
    if (s === 3) {
      if (!form.bank_account_number.trim()) errors.bank_account_number = 'Bank account is required';
      else { const e = validateField('bankAccount', form.bank_account_number); if (e) errors.bank_account_number = e; }

      if (!form.bank_ifsc.trim()) errors.bank_ifsc = 'IFSC is required';
      else { const e = validateField('ifsc', form.bank_ifsc.toUpperCase()); if (e) errors.bank_ifsc = e; }
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(step)) return;

    if (step < 3) { setStep(step + 1); return; }

    // Final submit
    setLoading(true);
    setError('');
    try {
      await authService.registerFarmer({
        phone_number: form.phone_number,
        profile_name: form.profile_name,
        password: form.password,
        aadhaar_number: form.aadhaar_number,
        land_area_acres: parseFloat(form.land_area_acres),
        primary_crop: form.primary_crop,
        language_preference: form.language_preference,
        bank_account_number: form.bank_account_number,
        bank_ifsc: form.bank_ifsc.toUpperCase(),
      });
      loginAs('farmer');
      navigate('/farmer');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const FieldError = ({ name }) => fieldErrors[name] ? <p className="text-red-500 text-xs mt-1">{fieldErrors[name]}</p> : null;

  return (
    <div className="min-h-screen bg-surface-50 mesh-bg flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-lg">
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
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                s <= step ? 'bg-brand-500 text-white' : 'bg-surface-200 text-surface-500'
              }`}>{s}</div>
              {s < 3 && <div className={`w-12 h-0.5 ${s < step ? 'bg-brand-500' : 'bg-surface-200'}`} />}
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-8 mb-6 text-xs text-surface-500">
          <span className={step >= 1 ? 'text-brand-600 font-medium' : ''}>Personal Info</span>
          <span className={step >= 2 ? 'text-brand-600 font-medium' : ''}>Farm Details</span>
          <span className={step >= 3 ? 'text-brand-600 font-medium' : ''}>Bank & Docs</span>
        </div>

        <div className="card p-8">
          {/* Error Banner */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                <div>
                  <label className="input-label">Full Name *</label>
                  <input type="text" value={form.profile_name} onChange={set('profile_name')}
                    placeholder="Enter your full name" className={`input-field ${fieldErrors.profile_name ? 'border-red-400' : ''}`}
                    pattern="[A-Za-z\s]{2,50}" required />
                  <FieldError name="profile_name" />
                </div>
                <div>
                  <label className="input-label">Phone Number *</label>
                  <input type="tel" value={form.phone_number} onChange={set('phone_number')}
                    placeholder="9876543210" className={`input-field ${fieldErrors.phone_number ? 'border-red-400' : ''}`}
                    pattern="[6-9]\d{9}" maxLength={10} required />
                  <FieldError name="phone_number" />
                </div>
                <div>
                  <label className="input-label">Password *</label>
                  <input type="password" value={form.password} onChange={set('password')}
                    placeholder="Min 8 chars, upper + lower + digit + special"
                    className={`input-field ${fieldErrors.password ? 'border-red-400' : ''}`}
                    minLength={8} required />
                  <FieldError name="password" />
                </div>
                <div>
                  <label className="input-label">Confirm Password *</label>
                  <input type="password" value={form.confirmPassword} onChange={set('confirmPassword')}
                    placeholder="Re-enter your password"
                    className={`input-field ${fieldErrors.confirmPassword ? 'border-red-400' : ''}`}
                    required />
                  <FieldError name="confirmPassword" />
                </div>
                <div>
                  <label className="input-label">Language Preference</label>
                  <select className="input-field" value={form.language_preference} onChange={set('language_preference')}>
                    <option value="hindi">Hindi</option>
                    <option value="english">English</option>
                    <option value="punjabi">Punjabi</option>
                  </select>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                <div>
                  <label className="input-label">Aadhaar Number *</label>
                  <input type="text" value={form.aadhaar_number} onChange={set('aadhaar_number')}
                    placeholder="123456789012" className={`input-field ${fieldErrors.aadhaar_number ? 'border-red-400' : ''}`}
                    pattern="\d{12}" maxLength={12} required />
                  <FieldError name="aadhaar_number" />
                </div>
                <div>
                  <label className="input-label">Land Area (in acres) *</label>
                  <input type="number" value={form.land_area_acres} onChange={set('land_area_acres')}
                    placeholder="e.g. 12" className={`input-field ${fieldErrors.land_area_acres ? 'border-red-400' : ''}`}
                    min="0.1" step="0.01" required />
                  <FieldError name="land_area_acres" />
                </div>
                <div>
                  <label className="input-label">Primary Crop</label>
                  <select className="input-field" value={form.primary_crop} onChange={set('primary_crop')}>
                    <option value="rice">Rice</option>
                    <option value="wheat">Wheat</option>
                    <option value="both">Both</option>
                  </select>
                </div>
                <div>
                  <label className="input-label">Farm Location</label>
                  <input type="text" value={form.farm_location} onChange={set('farm_location')}
                    placeholder="Village / District / State" className="input-field" />
                  <p className="text-xs text-surface-400 mt-1">📍 We'll use GPS to pinpoint your farm location</p>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                <div>
                  <label className="input-label">Bank Account Number *</label>
                  <input type="text" value={form.bank_account_number} onChange={set('bank_account_number')}
                    placeholder="Enter account number" className={`input-field ${fieldErrors.bank_account_number ? 'border-red-400' : ''}`}
                    pattern="\d{9,18}" maxLength={18} required />
                  <FieldError name="bank_account_number" />
                </div>
                <div>
                  <label className="input-label">IFSC Code *</label>
                  <input type="text" value={form.bank_ifsc} onChange={set('bank_ifsc')}
                    placeholder="e.g. SBIN0001234" className={`input-field ${fieldErrors.bank_ifsc ? 'border-red-400' : ''}`}
                    pattern="[A-Za-z]{4}0[A-Za-z0-9]{6}" maxLength={11} required
                    style={{ textTransform: 'uppercase' }} />
                  <FieldError name="bank_ifsc" />
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

            <div className="flex gap-3 mt-6">
              {step > 1 && (
                <button type="button" onClick={() => setStep(step - 1)} className="btn-ghost flex-1 border border-surface-200">
                  ← Back
                </button>
              )}
              <button type="submit" className="btn-primary flex-1" disabled={loading}>
                {step < 3 ? 'Continue →' : loading ? 'Registering...' : 'Submit Registration'}
              </button>
            </div>
          </form>
        </div>

        <p className="text-center text-sm text-surface-500 mt-4">
          Already have an account? <Link to="/login" className="text-brand-600 font-semibold">Login</Link>
        </p>
      </motion.div>
    </div>
  );
}
