import { mockTransactions } from '../../data/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function FinancialManagement() {
  const payouts = mockTransactions.filter(t => t.transaction_type === 'farmer_payout');
  const incoming = mockTransactions.filter(t => t.transaction_type === 'customer_charge');

  const revenueData = [
    { month: 'Jan', revenue: 280000, payouts: 95000 },
    { month: 'Feb', revenue: 240000, payouts: 85000 },
    { month: 'Mar', revenue: 310000, payouts: 118000 },
  ];

  return (
    <div className="page-enter space-y-6">
      <h1 className="font-display text-2xl sm:text-3xl font-bold text-surface-900">Financial Management</h1>

      <div className="grid sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Revenue', value: '₹4,64,827', icon: '💰', color: 'bg-emerald-50' },
          { label: 'Farmer Payouts', value: '₹1,18,000', icon: '🧑‍🌾', color: 'bg-amber-50' },
          { label: 'Pending Payouts', value: '₹38,000', icon: '⏳', color: 'bg-red-50' },
          { label: 'Net Profit', value: '₹3,46,827', icon: '📈', color: 'bg-blue-50' },
        ].map((s, i) => (
          <div key={i} className="stat-card">
            <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center text-lg mb-2`}>{s.icon}</div>
            <p className="font-display text-xl font-bold text-surface-900">{s.value}</p>
            <p className="text-xs text-surface-500">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="card">
        <h3 className="font-display font-bold text-surface-900 mb-4">Revenue vs Payouts</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} />
            <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} tickFormatter={v => `₹${(v/1000).toFixed(0)}k`} />
            <Tooltip formatter={(v) => [`₹${v.toLocaleString()}`]} />
            <Bar dataKey="revenue" fill="#10b981" radius={[4, 4, 0, 0]} name="Revenue" />
            <Bar dataKey="payouts" fill="#f59e0b" radius={[4, 4, 0, 0]} name="Payouts" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pending Payouts */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-bold text-surface-900">Pending Farmer Payouts</h3>
          <button className="btn-primary text-sm">💳 Process All Payouts</button>
        </div>
        {payouts.filter(t => t.transaction_status === 'pending').map(t => (
          <div key={t.transaction_id} className="flex items-center justify-between py-3 border-b border-surface-100 last:border-0">
            <div>
              <p className="font-medium text-surface-900">Booking {t.booking_id?.toUpperCase()}</p>
              <p className="text-xs text-surface-500">{t.transaction_date}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-bold text-amber-600">₹{t.amount_rupees.toLocaleString()}</span>
              <button className="text-xs px-3 py-1.5 bg-brand-500 text-white rounded-lg">Pay Now</button>
            </div>
          </div>
        ))}
      </div>

      {/* All Transactions */}
      <div className="card">
        <h3 className="font-display font-bold text-surface-900 mb-4">Recent Transactions</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-surface-100 bg-surface-50">
              <th className="table-header">ID</th>
              <th className="table-header">Type</th>
              <th className="table-header">Date</th>
              <th className="table-header">Amount</th>
              <th className="table-header">Gateway</th>
              <th className="table-header">Status</th>
            </tr></thead>
            <tbody>
              {mockTransactions.map(t => (
                <tr key={t.transaction_id} className="table-row">
                  <td className="table-cell font-mono text-xs">{t.transaction_id.toUpperCase()}</td>
                  <td className="table-cell"><span className={`badge ${t.transaction_type === 'farmer_payout' ? 'badge-warning' : 'badge-info'}`}>{t.transaction_type.replace('_', ' ')}</span></td>
                  <td className="table-cell">{t.transaction_date}</td>
                  <td className={`table-cell font-semibold ${t.transaction_type === 'customer_charge' ? 'text-emerald-600' : 'text-red-500'}`}>
                    {t.transaction_type === 'customer_charge' ? '+' : '-'}₹{t.amount_rupees.toLocaleString()}
                  </td>
                  <td className="table-cell capitalize text-xs">{t.payment_gateway.replace('_', ' ')}</td>
                  <td className="table-cell"><span className={`badge ${t.transaction_status === 'completed' ? 'badge-success' : 'badge-warning'}`}>{t.transaction_status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
