import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { farmerEarningsData, mockTransactions } from '../../data/mockData';

const COLORS = ['#10b981', '#f59e0b', '#6366f1', '#ef4444'];

export default function PaymentsEarnings() {
  const transactions = mockTransactions.filter(t => t.transaction_type === 'farmer_payout');

  const qualityData = [
    { name: 'Grade A', value: 65 },
    { name: 'Grade B', value: 25 },
    { name: 'Grade C', value: 10 },
  ];

  return (
    <div className="page-enter space-y-6">
      <div>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-surface-900">Payments & Earnings</h1>
        <p className="text-surface-500 mt-1">Track your income and payment history</p>
      </div>

      {/* Summary Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Lifetime Earnings', value: '₹1,85,000', icon: '💰', color: 'bg-emerald-50' },
          { label: 'This Season', value: '₹1,12,000', icon: '📊', color: 'bg-blue-50' },
          { label: 'Last 30 Days', value: '₹23,000', icon: '📅', color: 'bg-amber-50' },
          { label: 'Avg Per Quintal', value: '₹1,850', icon: '🌾', color: 'bg-purple-50' },
        ].map((s, i) => (
          <div key={i} className="stat-card">
            <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center text-lg mb-3`}>{s.icon}</div>
            <p className="font-display text-2xl font-bold text-surface-900">{s.value}</p>
            <p className="text-sm text-surface-500">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 card">
          <h3 className="font-display font-bold text-surface-900 mb-4">Monthly Earnings</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={farmerEarningsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} />
              <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} tickFormatter={v => `₹${(v/1000).toFixed(0)}k`} />
              <Tooltip formatter={(v) => [`₹${v.toLocaleString()}`, 'Earnings']} />
              <Bar dataKey="earnings" fill="#10b981" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h3 className="font-display font-bold text-surface-900 mb-4">By Quality Grade</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={qualityData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={5} dataKey="value">
                {qualityData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-4">
            {qualityData.map((d, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ background: COLORS[i] }} />
                  <span className="text-surface-600">{d.name}</span>
                </div>
                <span className="font-semibold text-surface-800">{d.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Transaction History */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-bold text-surface-900">Payment History</h3>
          <button className="text-sm text-brand-600 font-medium hover:text-brand-700">📄 Download PDF</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-surface-100">
              <th className="table-header">Transaction ID</th>
              <th className="table-header">Date</th>
              <th className="table-header">Booking</th>
              <th className="table-header">Amount</th>
              <th className="table-header">Status</th>
            </tr></thead>
            <tbody>
              {transactions.map(t => (
                <tr key={t.transaction_id} className="table-row">
                  <td className="table-cell font-mono text-xs">{t.transaction_id.toUpperCase()}</td>
                  <td className="table-cell">{t.transaction_date}</td>
                  <td className="table-cell">{t.booking_id?.toUpperCase() || '—'}</td>
                  <td className="table-cell font-semibold text-emerald-600">+ ₹{t.amount_rupees.toLocaleString()}</td>
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
