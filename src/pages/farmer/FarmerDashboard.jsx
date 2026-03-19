import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useAuth } from '../../context/AuthContext';
import { mockBookings, farmerEarningsData } from '../../data/mockData';

const fadeUp = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } };
const stagger = { show: { transition: { staggerChildren: 0.08 } } };

export default function FarmerDashboard() {
  const { user } = useAuth();
  const myBookings = mockBookings.filter(b => b.farmer_id === 'f1');

  const stats = [
    { label: 'Total Earnings', value: '₹1,85,000', change: '+12%', icon: '💰', color: 'bg-emerald-50 text-emerald-600' },
    { label: 'Paddy Supplied', value: '42.5 qtl', change: '+8%', icon: '🌾', color: 'bg-amber-50 text-amber-600' },
    { label: 'Pending Collections', value: '2', change: '', icon: '📦', color: 'bg-blue-50 text-blue-600' },
    { label: 'Next Collection', value: 'Mar 28', change: '', icon: '📅', color: 'bg-purple-50 text-purple-600' },
  ];

  return (
    <div className="page-enter space-y-6">
      {/* Welcome */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-surface-900">
            Namaste, {user?.profile_name || 'Farmer'} 🙏
          </h1>
          <p className="text-surface-500 mt-1">Here's your farming dashboard overview</p>
        </div>
        <Link to="/farmer/book-slot" className="btn-primary">
          📅 Book New Slot
        </Link>
      </div>

      {/* Stats */}
      <motion.div initial="hidden" animate="show" variants={stagger} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <motion.div key={i} variants={fadeUp} className="stat-card">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center text-lg`}>{s.icon}</div>
              {s.change && <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">{s.change}</span>}
            </div>
            <p className="font-display text-2xl font-bold text-surface-900">{s.value}</p>
            <p className="text-sm text-surface-500">{s.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Charts & Recent */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Earnings Chart */}
        <div className="lg:col-span-2 card">
          <h3 className="font-display font-bold text-surface-900 mb-4">Earnings Trend (12 months)</h3>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={farmerEarningsData}>
              <defs>
                <linearGradient id="earnGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} />
              <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} tickFormatter={v => `₹${(v/1000).toFixed(0)}k`} />
              <Tooltip formatter={(v) => [`₹${v.toLocaleString()}`, 'Earnings']} />
              <Area type="monotone" dataKey="earnings" stroke="#10b981" fill="url(#earnGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Quick Actions */}
        <div className="card">
          <h3 className="font-display font-bold text-surface-900 mb-4">Quick Actions</h3>
          <div className="space-y-2">
            {[
              { to: '/farmer/book-slot', label: 'Book Collection Slot', icon: '📅', color: 'bg-brand-50 hover:bg-brand-100' },
              { to: '/farmer/payments', label: 'View Payment History', icon: '💳', color: 'bg-amber-50 hover:bg-amber-100' },
              { to: '/farmer/bookings', label: 'Track My Bookings', icon: '📦', color: 'bg-blue-50 hover:bg-blue-100' },
              { to: '/farmer/profile', label: 'Update Profile', icon: '👤', color: 'bg-purple-50 hover:bg-purple-100' },
              { to: '/farmer/support', label: 'Contact Support', icon: '🆘', color: 'bg-red-50 hover:bg-red-100' },
            ].map((a, i) => (
              <Link key={i} to={a.to} className={`flex items-center gap-3 px-4 py-3 rounded-xl ${a.color} transition-colors`}>
                <span className="text-lg">{a.icon}</span>
                <span className="text-sm font-medium text-surface-700">{a.label}</span>
                <span className="ml-auto text-surface-400">→</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-bold text-surface-900">Recent Bookings</h3>
          <Link to="/farmer/bookings" className="text-sm text-brand-600 font-medium hover:text-brand-700">View All →</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-surface-100">
                <th className="table-header">Booking ID</th>
                <th className="table-header">Date</th>
                <th className="table-header">Quantity</th>
                <th className="table-header">Grade</th>
                <th className="table-header">Status</th>
                <th className="table-header">Amount</th>
              </tr>
            </thead>
            <tbody>
              {myBookings.slice(0, 5).map(b => (
                <tr key={b.booking_id} className="table-row">
                  <td className="table-cell font-mono text-xs">{b.booking_id.toUpperCase()}</td>
                  <td className="table-cell">{b.collection_date}</td>
                  <td className="table-cell">{b.estimated_quantity_quintals} qtl</td>
                  <td className="table-cell"><span className={`badge ${b.quality_grade === 'A' ? 'badge-success' : b.quality_grade === 'B' ? 'badge-warning' : 'badge-neutral'}`}>Grade {b.quality_grade}</span></td>
                  <td className="table-cell"><span className={`badge ${b.status === 'paid' ? 'badge-success' : b.status === 'collected' ? 'badge-info' : b.status === 'confirmed' ? 'badge-warning' : 'badge-neutral'}`}>{b.status}</span></td>
                  <td className="table-cell font-semibold">₹{b.payment_amount?.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
