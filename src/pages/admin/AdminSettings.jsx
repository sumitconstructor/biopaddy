import { useState } from 'react';

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState('pricing');

  return (
    <div className="page-enter space-y-6">
      <h1 className="font-display text-2xl sm:text-3xl font-bold text-surface-900">Settings & Configuration</h1>

      <div className="flex flex-wrap gap-2">
        {['pricing', 'system', 'notifications', 'environment'].map(t => (
          <button key={t} onClick={() => setActiveTab(t)}
            className={`px-4 py-2 rounded-xl text-sm font-medium capitalize ${activeTab === t ? 'bg-brand-500 text-white' : 'bg-white border border-surface-200 text-surface-600'}`}>{t}</button>
        ))}
      </div>

      {activeTab === 'pricing' && (
        <div className="space-y-6">
          <div className="card">
            <h3 className="font-display font-bold text-surface-900 mb-4">Farmer Payout Rates (₹/quintal)</h3>
            <div className="grid sm:grid-cols-3 gap-4">
              {[{ grade: 'Grade A', rate: 2000, desc: 'Premium quality' }, { grade: 'Grade B', rate: 1600, desc: 'Good quality' }, { grade: 'Grade C', rate: 1200, desc: 'Standard' }].map((g, i) => (
                <div key={i} className="p-4 rounded-xl border border-surface-200">
                  <p className="font-semibold text-surface-900">{g.grade}</p>
                  <p className="text-xs text-surface-500 mb-2">{g.desc}</p>
                  <input type="number" defaultValue={g.rate} className="input-field" />
                </div>
              ))}
            </div>
            <button className="btn-primary mt-4">Save Rates</button>
          </div>

          <div className="card">
            <h3 className="font-display font-bold text-surface-900 mb-4">Bulk Discount Tiers</h3>
            <div className="grid sm:grid-cols-3 gap-4">
              {[{ units: '100+', discount: 12 }, { units: '500+', discount: 15 }, { units: '1000+', discount: 20 }].map((t, i) => (
                <div key={i} className="p-4 rounded-xl border border-surface-200">
                  <p className="font-semibold text-surface-900">{t.units} units</p>
                  <div className="flex items-center gap-2 mt-2">
                    <input type="number" defaultValue={t.discount} className="input-field w-20" />
                    <span className="text-surface-500">% off</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="btn-primary mt-4">Save Discounts</button>
          </div>
        </div>
      )}

      {activeTab === 'system' && (
        <div className="card">
          <h3 className="font-display font-bold text-surface-900 mb-4">System Configuration</h3>
          <div className="space-y-4">
            <div><label className="input-label">Platform Name</label><input defaultValue="BioPaddy" className="input-field" /></div>
            <div><label className="input-label">Support Email</label><input defaultValue="support@biopaddy.com" className="input-field" /></div>
            <div><label className="input-label">Support Phone</label><input defaultValue="+91 98765 43210" className="input-field" /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="input-label">Default Language</label>
                <select className="input-field"><option>English</option><option>Hindi</option><option>Punjabi</option></select>
              </div>
              <div><label className="input-label">Currency</label><input defaultValue="INR (₹)" disabled className="input-field bg-surface-50" /></div>
            </div>
            <button className="btn-primary">Save Settings</button>
          </div>
        </div>
      )}

      {activeTab === 'notifications' && (
        <div className="card">
          <h3 className="font-display font-bold text-surface-900 mb-4">Notification Templates</h3>
          <div className="space-y-3">
            {['Booking Confirmation SMS', 'Payment Received SMS', 'Order Shipped Email', 'Certificate Issued Email'].map((n, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-surface-50 rounded-xl">
                <span className="font-medium text-sm">{n}</span>
                <button className="text-sm text-brand-600 font-medium">Edit Template</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'environment' && (
        <div className="card">
          <h3 className="font-display font-bold text-surface-900 mb-4">Environmental Impact Formulas</h3>
          <div className="space-y-4">
            <div><label className="input-label">CO₂ Saved Per Ton of Paddy (kg)</label><input type="number" defaultValue="1500" className="input-field" /></div>
            <div><label className="input-label">AQI Impact Factor</label><input type="number" defaultValue="0.08" step="0.01" className="input-field" /></div>
            <div><label className="input-label">Trees Equivalent Factor</label><input type="number" defaultValue="22" className="input-field" /></div>
            <button className="btn-primary">Save Formulas</button>
          </div>
        </div>
      )}
    </div>
  );
}
