import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

export default function CustomerRegister() {
  const { loginAs } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    loginAs('customer');
    navigate('/customer');
  };

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
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="input-label">Company Name</label>
                <input type="text" placeholder="Your company name" className="input-field" />
              </div>
              <div>
                <label className="input-label">Business Type</label>
                <select className="input-field">
                  <option value="">Select type</option>
                  <option value="qsr">Quick Service Restaurant</option>
                  <option value="hotel">Hotel & Resorts</option>
                  <option value="caterer">Caterer & Events</option>
                  <option value="corporate">Corporate</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="input-label">GST Number (optional)</label>
                <input type="text" placeholder="e.g. 07AABCG1234L1ZG" className="input-field" />
              </div>
              <div>
                <label className="input-label">Contact Person</label>
                <input type="text" placeholder="Full name" className="input-field" />
              </div>
              <div>
                <label className="input-label">Phone Number</label>
                <input type="tel" placeholder="+91 98000 00001" className="input-field" />
              </div>
              <div className="col-span-2">
                <label className="input-label">Email Address</label>
                <input type="email" placeholder="you@company.com" className="input-field" />
              </div>
              <div className="col-span-2">
                <label className="input-label">Office Address</label>
                <textarea rows={2} placeholder="Complete office address" className="input-field" />
              </div>
              <div>
                <label className="input-label">Password</label>
                <input type="password" placeholder="Min 8 characters" className="input-field" />
              </div>
              <div>
                <label className="input-label">Confirm Password</label>
                <input type="password" placeholder="Repeat password" className="input-field" />
              </div>
              <div className="col-span-2">
                <label className="input-label">Company Logo (optional)</label>
                <div className="border-2 border-dashed border-surface-200 rounded-xl p-4 text-center hover:border-brand-300 transition-colors cursor-pointer">
                  <p className="text-sm text-surface-500">📷 Click to upload (PNG/JPG, max 2MB)</p>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-2 pt-2">
              <input type="checkbox" className="mt-1 rounded border-surface-300" />
              <p className="text-sm text-surface-500">
                I agree to BioPaddy's <a href="#" className="text-brand-600 underline">Terms of Service</a> and <a href="#" className="text-brand-600 underline">Privacy Policy</a>
              </p>
            </div>

            <button type="submit" className="btn-primary w-full py-3.5 mt-2">
              Create Business Account
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
