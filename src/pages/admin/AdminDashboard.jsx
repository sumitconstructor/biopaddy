import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { mockFarmers, mockOrders, mockBookings, monthlyData } from '../../data/mockData';

export default function AdminDashboard() {
  const pendingFarmers = mockFarmers.filter(f => !f.verified_by_admin).length;
  const pendingOrders = mockOrders.filter(o => o.status === 'pending').length;
  const totalRevenue = mockOrders.reduce((s, o) => s + o.final_amount, 0);

  const stats = [
    { label: 'Total Farmers', value: mockFarmers.length, change: '+3 this week', icon: '🧑‍🌾', color: 'bg-emerald-50' },
    { label: 'Paddy Collected', value: '1,870 qtl', change: 'This season', icon: '🌾', color: 'bg-amber-50' },
    { label: 'B2B Customers', value: '5', change: '+1 this month', icon: '🏢', color: 'bg-blue-50' },
    { label: 'Revenue', value: `₹${(totalRevenue / 100000).toFixed(1)}L`, change: 'This month', icon: '💰', color: 'bg-purple-50' },
    { label: 'Pending Orders', value: pendingOrders, change: 'Needs attention', icon: '📦', color: 'bg-orange-50' },
    { label: 'CO₂ Saved', value: '2,804 kg', change: 'Total impact', icon: '🌿', color: 'bg-green-50' },
  ];

  const alerts = [
    { type: 'warning', msg: `${pendingFarmers} farmers pending verification`, icon: '⚠️' },
    { type: 'danger', msg: 'Low stock: Eco Cup 200ml below reorder level', icon: '🔴' },
    { type: 'info', msg: '2 farmer payouts pending processing', icon: '💳' },
    { type: 'success', msg: 'Order ORD2 shipped successfully', icon: '✅' },
  ];

  return (
    <div className="page-enter space-y-6">
      <div>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-surface-900">Operations Dashboard</h1>
        <p className="text-surface-500 mt-1">Overview of BioPaddy operations</p>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {stats.map((s, i) => (
          <div key={i} className="stat-card">
            <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center text-lg mb-2`}>{s.icon}</div>
            <p className="font-display text-2xl font-bold text-surface-900">{s.value}</p>
            <p className="text-xs text-surface-500">{s.label}</p>
            <p className="text-xs text-surface-400 mt-0.5">{s.change}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="font-display font-bold text-surface-900 mb-4">Collection & Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={monthlyData}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} tickFormatter={v => `₹${(v/1000).toFixed(0)}k`} />
              <Tooltip formatter={(v) => [`₹${v.toLocaleString()}`, 'Revenue']} />
              <Area type="monotone" dataKey="revenue" stroke="#10b981" fill="url(#revGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h3 className="font-display font-bold text-surface-900 mb-4">Orders by Month</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} />
              <Tooltip />
              <Bar dataKey="orders" fill="#f59e0b" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Alerts */}
      <div className="card">
        <h3 className="font-display font-bold text-surface-900 mb-4">Alerts & Notifications</h3>
        <div className="space-y-2">
          {alerts.map((a, i) => (
            <div key={i} className={`flex items-center gap-3 p-3 rounded-xl ${
              a.type === 'danger' ? 'bg-red-50' : a.type === 'warning' ? 'bg-amber-50' : a.type === 'success' ? 'bg-emerald-50' : 'bg-blue-50'
            }`}>
              <span className="text-lg">{a.icon}</span>
              <span className="text-sm text-surface-700">{a.msg}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
