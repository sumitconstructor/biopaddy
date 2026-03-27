import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { monthlyData } from '../../data/mockData';

export default function ReportsAnalytics() {
  return (
    <div className="page-enter space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-surface-900">Reports & Analytics</h1>
        <button className="btn-primary text-sm">📊 Generate Report</button>
      </div>

      {/* KPI Cards */}
      <div className="grid sm:grid-cols-4 gap-4">
        {[
          { label: 'Farmer Retention', value: '92%', target: '90%', icon: '📊' },
          { label: 'Order Fulfillment', value: '96%', target: '95%', icon: '✅' },
          { label: 'Avg Delivery Time', value: '4.2 days', target: '5 days', icon: '🚚' },
          { label: 'Customer Satisfaction', value: '4.7/5', target: '4.5/5', icon: '⭐' },
        ].map((kpi, i) => (
          <div key={i} className="stat-card">
            <span className="text-2xl">{kpi.icon}</span>
            <p className="font-display text-2xl font-bold text-surface-900 mt-2">{kpi.value}</p>
            <p className="text-xs text-surface-500">{kpi.label}</p>
            <p className="text-xs text-emerald-600 mt-1">Target: {kpi.target} ✓</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="font-display font-bold text-surface-900 mb-4">Monthly Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} tickFormatter={v => `₹${(v/1000).toFixed(0)}k`} />
              <Tooltip formatter={(v) => [`₹${v.toLocaleString()}`]} />
              <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h3 className="font-display font-bold text-surface-900 mb-4">CO₂ Saved by Month</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} />
              <Tooltip formatter={(v) => [`${v} kg`, 'CO₂ Saved']} />
              <Bar dataKey="co2Saved" fill="#059669" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Standard Reports */}
      <div className="card">
        <h3 className="font-display font-bold text-surface-900 mb-4">Standard Reports</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { name: 'Monthly Executive Report', icon: '📋', desc: 'Farmers, collections, sales, impact' },
            { name: 'Farmer Performance', icon: '🧑‍🌾', desc: 'Top farmers, earnings, ratings' },
            { name: 'Product Performance', icon: '📦', desc: 'Best sellers, inventory status' },
            { name: 'Environmental Impact', icon: '🌍', desc: 'CO₂ saved, AQI, waste diverted' },
            { name: 'Financial Report', icon: '💰', desc: 'Revenue, expenses, profitability' },
            { name: 'Customer Acquisition', icon: '📈', desc: 'New customers, churn analysis' },
          ].map((r, i) => (
            <button key={i} className="text-left p-4 rounded-xl border border-surface-200 hover:border-brand-200 hover:bg-brand-50/30 transition-all">
              <span className="text-2xl">{r.icon}</span>
              <p className="font-semibold text-surface-900 mt-2">{r.name}</p>
              <p className="text-xs text-surface-500 mt-1">{r.desc}</p>
              <p className="text-xs text-brand-600 font-medium mt-2">Download PDF →</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
