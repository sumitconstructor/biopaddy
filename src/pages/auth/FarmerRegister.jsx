import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

export default function FarmerRegister() {
  const [step, setStep] = useState(1);
  const { loginAs } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step < 3) { setStep(step + 1); return; }
    loginAs('farmer');
    navigate('/farmer');
  };

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
          <span className={step >= 1 ? 'text-brand-600 font-medium' : ''}>Verify Phone</span>
          <span className={step >= 2 ? 'text-brand-600 font-medium' : ''}>Farm Details</span>
          <span className={step >= 3 ? 'text-brand-600 font-medium' : ''}>Bank & Docs</span>
        </div>

        <div className="card p-8">
          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                <div>
                  <label className="input-label">Full Name</label>
                  <input type="text" placeholder="Enter your full name" className="input-field" />
                </div>
                <div>
                  <label className="input-label">Phone Number</label>
                  <input type="tel" placeholder="+91 98765 43210" className="input-field" />
                </div>
                <div>
                  <label className="input-label">OTP Verification</label>
                  <div className="flex gap-2">
                    <input type="text" placeholder="Enter 6-digit OTP" className="input-field flex-1" maxLength={6} />
                    <button type="button" className="px-4 py-3 bg-brand-50 text-brand-700 font-medium rounded-xl hover:bg-brand-100 transition-colors text-sm whitespace-nowrap">
                      Send OTP
                    </button>
                  </div>
                </div>
                <div>
                  <label className="input-label">Language Preference</label>
                  <select className="input-field">
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
                  <label className="input-label">Aadhaar Number</label>
                  <input type="text" placeholder="XXXX XXXX XXXX" className="input-field" maxLength={14} />
                </div>
                <div>
                  <label className="input-label">Land Area (in acres)</label>
                  <input type="number" placeholder="e.g. 12" className="input-field" />
                </div>
                <div>
                  <label className="input-label">Primary Crop</label>
                  <select className="input-field">
                    <option value="rice">Rice</option>
                    <option value="wheat">Wheat</option>
                    <option value="both">Both</option>
                  </select>
                </div>
                <div>
                  <label className="input-label">Farm Location</label>
                  <input type="text" placeholder="Village / District / State" className="input-field" />
                  <p className="text-xs text-surface-400 mt-1">📍 We'll use GPS to pinpoint your farm location</p>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                <div>
                  <label className="input-label">Bank Account Number</label>
                  <input type="text" placeholder="Enter account number" className="input-field" />
                </div>
                <div>
                  <label className="input-label">IFSC Code</label>
                  <input type="text" placeholder="e.g. SBIN0001234" className="input-field" />
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
              <button type="submit" className="btn-primary flex-1">
                {step < 3 ? 'Continue →' : 'Submit Registration'}
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
