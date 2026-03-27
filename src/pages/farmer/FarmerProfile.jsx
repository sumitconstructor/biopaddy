import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function FarmerProfile() {
  const { user } = useAuth();
  const [editing, setEditing] = useState(false);

  return (
    <div className="page-enter space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-surface-900">My Profile</h1>
          <p className="text-surface-500 mt-1">Manage your personal and farm details</p>
        </div>
        <button onClick={() => setEditing(!editing)} className={editing ? 'btn-primary' : 'btn-secondary'}>
          {editing ? '💾 Save Changes' : '✏️ Edit Profile'}
        </button>
      </div>

      {/* Profile header */}
      <div className="card flex flex-col sm:flex-row items-center gap-6">
        <div className="w-20 h-20 rounded-2xl bg-gradient-brand flex items-center justify-center text-4xl text-white shadow-lg shadow-brand-500/25">
          🧑‍🌾
        </div>
        <div className="text-center sm:text-left">
          <h2 className="font-display text-xl font-bold text-surface-900">{user?.profile_name}</h2>
          <p className="text-surface-500">{user?.phone_number} • {user?.email}</p>
          <div className="flex items-center gap-2 mt-2 justify-center sm:justify-start">
            <span className="badge-success">✓ Verified Farmer</span>
            <span className="badge-info">Rating: ★ {user?.rating || 4.5}</span>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Personal Details */}
        <div className="card">
          <h3 className="font-display font-bold text-surface-900 mb-4">Personal Details</h3>
          <div className="space-y-4">
            <div><label className="input-label">Full Name</label><input type="text" defaultValue={user?.profile_name} disabled={!editing} className="input-field disabled:bg-surface-50" /></div>
            <div><label className="input-label">Phone Number</label><input type="tel" defaultValue={user?.phone_number} disabled={!editing} className="input-field disabled:bg-surface-50" /></div>
            <div><label className="input-label">Language Preference</label>
              <select disabled={!editing} className="input-field disabled:bg-surface-50" defaultValue={user?.language_preference}>
                <option value="hindi">Hindi</option><option value="english">English</option><option value="punjabi">Punjabi</option>
              </select>
            </div>
          </div>
        </div>

        {/* Farm Details */}
        <div className="card">
          <h3 className="font-display font-bold text-surface-900 mb-4">Farm Details</h3>
          <div className="space-y-4">
            <div><label className="input-label">Land Area (acres)</label><input type="number" defaultValue={user?.land_area_acres || 12} disabled={!editing} className="input-field disabled:bg-surface-50" /></div>
            <div><label className="input-label">Primary Crop</label>
              <select disabled={!editing} className="input-field disabled:bg-surface-50" defaultValue={user?.primary_crop}>
                <option value="rice">Rice</option><option value="wheat">Wheat</option><option value="both">Both</option>
              </select>
            </div>
            <div><label className="input-label">Farm Location</label><input type="text" defaultValue="Village Kheri, Punjab" disabled={!editing} className="input-field disabled:bg-surface-50" /></div>
          </div>
        </div>

        {/* Bank Details */}
        <div className="card">
          <h3 className="font-display font-bold text-surface-900 mb-4">Bank Account</h3>
          <div className="space-y-4">
            <div><label className="input-label">Account Number</label><input type="text" defaultValue="XXXX XXXX 5678" disabled className="input-field bg-surface-50" /></div>
            <div><label className="input-label">IFSC Code</label><input type="text" defaultValue="SBIN0001234" disabled className="input-field bg-surface-50" /></div>
            <p className="text-xs text-surface-400">🔒 Bank details are encrypted. Contact support to update.</p>
          </div>
        </div>

        {/* Documents */}
        <div className="card">
          <h3 className="font-display font-bold text-surface-900 mb-4">Documents</h3>
          <div className="space-y-3">
            {[
              { name: 'Aadhaar Card', status: 'Verified', icon: '📄' },
              { name: 'Land Ownership', status: 'Verified', icon: '📋' },
            ].map((doc, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-surface-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{doc.icon}</span>
                  <div>
                    <p className="font-medium text-surface-800 text-sm">{doc.name}</p>
                    <p className="text-xs text-surface-400">Aadhaar: ****{user?.aadhaar_number?.slice(-4) || '5678'}</p>
                  </div>
                </div>
                <span className="badge-success text-xs">{doc.status}</span>
              </div>
            ))}
            <button className="w-full py-2 text-sm text-brand-600 font-medium hover:bg-brand-50 rounded-lg transition-colors">
              + Upload New Document
            </button>
          </div>
        </div>
      </div>

      {/* Account Actions */}
      <div className="card bg-red-50/50 border-red-100">
        <h3 className="font-display font-bold text-red-700 mb-2">Danger Zone</h3>
        <p className="text-sm text-red-600/70 mb-4">Irreversible actions. Please proceed with caution.</p>
        <button className="text-sm text-red-600 font-medium px-4 py-2 border border-red-200 rounded-lg hover:bg-red-100 transition-colors">
          Delete My Account
        </button>
      </div>
    </div>
  );
}
