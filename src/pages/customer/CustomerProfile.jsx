import { useAuth } from '../../context/AuthContext';

export default function CustomerProfile() {
  const { user } = useAuth();

  return (
    <div className="page-enter space-y-6">
      <h1 className="font-display text-2xl sm:text-3xl font-bold text-surface-900">Company Profile</h1>

      <div className="card flex items-center gap-6">
        <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center text-3xl">{user?.logo || '🏢'}</div>
        <div>
          <h2 className="font-display text-xl font-bold text-surface-900">{user?.company_name || user?.profile_name}</h2>
          <p className="text-surface-500">{user?.business_type} • {user?.email}</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="font-display font-bold text-surface-900 mb-4">Company Details</h3>
          <div className="space-y-3">
            <div><label className="input-label">Company Name</label><input defaultValue={user?.company_name} className="input-field" /></div>
            <div><label className="input-label">Business Type</label><input defaultValue={user?.business_type} className="input-field" /></div>
            <div><label className="input-label">GST Number</label><input defaultValue={user?.gst_number || '07AABCG1234L1ZG'} className="input-field" /></div>
            <div><label className="input-label">Contact Person</label><input defaultValue={user?.contact_person || 'Vikram Mehta'} className="input-field" /></div>
          </div>
        </div>

        <div className="card">
          <h3 className="font-display font-bold text-surface-900 mb-4">Billing & Payment</h3>
          <div className="space-y-3">
            <div className="p-3 bg-surface-50 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-3"><span>💳</span><span className="text-sm">Razorpay — •••• 4242</span></div>
              <span className="badge-success">Default</span>
            </div>
            <div className="p-3 bg-surface-50 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-3"><span>🏦</span><span className="text-sm">Bank Transfer — HDFC</span></div>
              <button className="text-xs text-brand-600">Set Default</button>
            </div>
            <button className="w-full py-2 text-sm text-brand-600 font-medium border border-dashed border-brand-200 rounded-xl hover:bg-brand-50">+ Add Payment Method</button>
          </div>
        </div>

        <div className="card">
          <h3 className="font-display font-bold text-surface-900 mb-4">Notifications</h3>
          <div className="space-y-3">
            {['Order updates', 'Delivery alerts', 'New products', 'Certificate notifications'].map((n, i) => (
              <div key={i} className="flex items-center justify-between py-2">
                <span className="text-sm text-surface-700">{n}</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked={i < 3} className="sr-only peer" />
                  <div className="w-9 h-5 bg-surface-200 rounded-full peer peer-checked:bg-brand-500 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-4"></div>
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3 className="font-display font-bold text-surface-900 mb-4">Security</h3>
          <div className="space-y-3">
            <button className="w-full text-left p-3 bg-surface-50 rounded-xl hover:bg-surface-100 transition-colors flex items-center justify-between">
              <span className="text-sm font-medium">Change Password</span><span className="text-surface-400">→</span>
            </button>
            <button className="w-full text-left p-3 bg-surface-50 rounded-xl hover:bg-surface-100 transition-colors flex items-center justify-between">
              <span className="text-sm font-medium">Two-Factor Authentication</span><span className="badge-warning">Off</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
