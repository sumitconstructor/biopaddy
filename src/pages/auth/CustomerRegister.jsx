import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { authService } from '../../services';
import { validateField } from '../../utils/validation';

export default function CustomerRegister() {
  const { loginAs } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  const [form, setForm] = useState({
    company_name: '',
    business_type: '',
    gst_number: '',
    contact_person: '',
    phone_number: '',
    email: '',
    shipping_address: '',
    password: '',
    confirmPassword: '',
  });

  const set = (field) => (e) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }));
    setFieldErrors(prev => ({ ...prev, [field]: null }));
  };

  const validateForm = () => {
    const errors = {};

    if (!form.company_name.trim()) errors.company_name = 'Company name is required';

    if (!form.business_type) errors.business_type = 'Select a business type';

    if (!form.contact_person.trim()) errors.contact_person = 'Contact person is required';
    else { const e = validateField('name', form.contact_person); if (e) errors.contact_person = e; }

    if (form.phone_number.trim()) {
      const e = validateField('phone', form.phone_number);
      if (e) errors.phone_number = e;
    }

    if (!form.email.trim()) errors.email = 'Email is required';
    else { const e = validateField('email', form.email); if (e) errors.email = e; }

    if (form.gst_number.trim()) {
      const e = validateField('gst', form.gst_number.toUpperCase());
      if (e) errors.gst_number = e;
    }

    if (!form.password) errors.password = 'Password is required';
    else { const e = validateField('password', form.password); if (e) errors.password = e; }

    if (form.password !== form.confirmPassword) errors.confirmPassword = 'Passwords do not match';

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError('');
    try {
      await authService.registerCustomer({
        email: form.email,
        profile_name: form.contact_person,
        password: form.password,
        company_name: form.company_name,
        business_type: form.business_type,
        gst_number: form.gst_number.toUpperCase() || undefined,
        contact_person: form.contact_person,
        phone_number: form.phone_number || undefined,
        shipping_address: form.shipping_address || undefined,
      });
      loginAs('customer');
      navigate('/customer');
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
          <h1 className="font-display text-2xl font-bold text-surface-900 mt-2">Business Registration</h1>
          <p className="text-surface-500 mt-1">Join as a business partner and go eco-friendly</p>
        </div>

        <div className="card p-8">
          {/* Error Banner */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="input-label">Company Name *</label>
                <input type="text" value={form.company_name} onChange={set('company_name')}
                  placeholder="Your company name" className={`input-field ${fieldErrors.company_name ? 'border-red-400' : ''}`} required />
                <FieldError name="company_name" />
              </div>
              <div>
                <label className="input-label">Business Type *</label>
                <select className={`input-field ${fieldErrors.business_type ? 'border-red-400' : ''}`}
                  value={form.business_type} onChange={set('business_type')} required>
                  <option value="">Select type</option>
                  <option value="qsr">Quick Service Restaurant</option>
                  <option value="hotel">Hotel & Resorts</option>
                  <option value="caterer">Caterer & Events</option>
                  <option value="corporate">Corporate</option>
                  <option value="other">Other</option>
                </select>
                <FieldError name="business_type" />
              </div>
              <div>
                <label className="input-label">GST Number (optional)</label>
                <input type="text" value={form.gst_number} onChange={set('gst_number')}
                  placeholder="e.g. 07AABCG1234L1ZG" className={`input-field ${fieldErrors.gst_number ? 'border-red-400' : ''}`}
                  maxLength={15} style={{ textTransform: 'uppercase' }} />
                <FieldError name="gst_number" />
              </div>
              <div>
                <label className="input-label">Contact Person *</label>
                <input type="text" value={form.contact_person} onChange={set('contact_person')}
                  placeholder="Full name" className={`input-field ${fieldErrors.contact_person ? 'border-red-400' : ''}`}
                  pattern="[A-Za-z\s]{2,50}" required />
                <FieldError name="contact_person" />
              </div>
              <div>
                <label className="input-label">Phone Number</label>
                <input type="tel" value={form.phone_number} onChange={set('phone_number')}
                  placeholder="9800000001" className={`input-field ${fieldErrors.phone_number ? 'border-red-400' : ''}`}
                  pattern="[6-9]\d{9}" maxLength={10} />
                <FieldError name="phone_number" />
              </div>
              <div className="col-span-2">
                <label className="input-label">Email Address *</label>
                <input type="email" value={form.email} onChange={set('email')}
                  placeholder="you@company.com" className={`input-field ${fieldErrors.email ? 'border-red-400' : ''}`} required />
                <FieldError name="email" />
              </div>
              <div className="col-span-2">
                <label className="input-label">Office Address</label>
                <textarea rows={2} value={form.shipping_address} onChange={set('shipping_address')}
                  placeholder="Complete office address" className="input-field" />
              </div>
              <div>
                <label className="input-label">Password *</label>
                <input type="password" value={form.password} onChange={set('password')}
                  placeholder="Min 8 characters" className={`input-field ${fieldErrors.password ? 'border-red-400' : ''}`}
                  minLength={8} required />
                <FieldError name="password" />
              </div>
              <div>
                <label className="input-label">Confirm Password *</label>
                <input type="password" value={form.confirmPassword} onChange={set('confirmPassword')}
                  placeholder="Repeat password" className={`input-field ${fieldErrors.confirmPassword ? 'border-red-400' : ''}`} required />
                <FieldError name="confirmPassword" />
              </div>
              <div className="col-span-2">
                <label className="input-label">Company Logo (optional)</label>
                <div className="border-2 border-dashed border-surface-200 rounded-xl p-4 text-center hover:border-brand-300 transition-colors cursor-pointer">
                  <p className="text-sm text-surface-500">📷 Click to upload (PNG/JPG, max 2MB)</p>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-2 pt-2">
              <input type="checkbox" className="mt-1 rounded border-surface-300" required />
              <p className="text-sm text-surface-500">
                I agree to BioPaddy's <a href="#" className="text-brand-600 underline">Terms of Service</a> and <a href="#" className="text-brand-600 underline">Privacy Policy</a>
              </p>
            </div>

            <button type="submit" className="btn-primary w-full py-3.5 mt-2" disabled={loading}>
              {loading ? 'Creating Account...' : 'Create Business Account'}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-surface-500 mt-4">
          Already have an account? <Link to="/login" className="text-brand-600 font-semibold">Login</Link>
        </p>
      </motion.div>
    </div>
  );
}
