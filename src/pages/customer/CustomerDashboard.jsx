/**
 * FILE: src/pages/customer/CustomerDashboard.jsx
 *
 * Changes from original:
 *   - Removed mockOrders / mockCertificates / monthlyData imports.
 *   - Fetches /api/customers/dashboard on mount using customerService.
 *   - Stats cards and charts driven by real API response.
 *   - Loading and error states added.
 */

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { useAuth } from '../../context/AuthContext';
import { customerService } from '../../services/index';

function formatDate(dateStr) {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
}

function statusBadge(status) {
  const map = {
    delivered: 'badge-success', shipped: 'badge-info',
    manufacturing: 'badge-warning', pending: 'badge-neutral', confirmed: 'badge-warning',
  };
  return map[status] || 'badge-neutral';
}

export default function CustomerDashboard() {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    customerService.getDashboard()
      .then(res => setData(res.data.data))
      .catch(err => setError(err.response?.data?.message || 'Could not load dashboard data.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="page-enter flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="text-4xl mb-3 animate-pulse">🏢</div>
          <p className="text-surface-500">Loading your dashboard…</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-enter flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="text-4xl mb-3">⚠️</div>
          <p className="text-red-500">{error}</p>
          <button onClick={() => window.location.reload()} className="btn-primary mt-4">Retry</button>
        </div>
      </div>
    );
  }

  const stats = [
    { label: 'Active Orders', value: String(data.active_orders || 0), icon: '📦', color: 'bg-blue-50 text-blue-600' },
    { label: 'Total Spent', value: `₹${(data.total_spent || 0).toLocaleString('en-IN')}`, icon: '💰', color: 'bg-emerald-50 text-emerald-600' },
    { label: 'Next Delivery', value: formatDate(data.next_delivery_date), icon: '🚚', color: 'bg-amber-50 text-amber-600' },
    { label: 'CO₂ Saved', value: `${(data.co2_saved_kg || 0).toLocaleString()} kg`, icon: '🌿', color: 'bg-green-50 text-green-600' },
  ];

  const co2Chart = data.co2_chart?.length
    ? data.co2_chart
    : [{ month: 'No data', co2: 0 }];

  return (
    <div className="page-enter space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-surface-900">
            Welcome, {data.company_name || user?.profile_name} 👋
          </h1>
          <p className="text-surface-500 mt-1">Your business dashboard at a glance</p>
        </div>
        <Link to="/customer/products" className="btn-primary">🛒 Browse Products</Link>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div key={i} className="stat-card">
            <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center text-lg mb-3`}>{s.icon}</div>
            <p className="font-display text-2xl font-bold text-surface-900">{s.value}</p>
            <p className="text-sm text-surface-500">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* CO₂ Chart */}
        <div className="lg:col-span-2 card">
          <h3 className="font-display font-bold text-surface-900 mb-1">Environmental Impact</h3>
          <p className="text-sm text-surface-400 mb-4">CO₂ saved (kg) from your purchases</p>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={co2Chart}>
              <defs>
                <linearGradient id="co2Grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} />
              <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} />
              <Tooltip formatter={v => [`${v} kg`, 'CO₂ Saved']} />
              <Area type="monotone" dataKey="co2" stroke="#10b981" fill="url(#co2Grad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Impact Summary */}
        <div className="card bg-gradient-dark text-white">
          <h3 className="font-display font-bold mb-4">🌍 Your Impact</h3>
          <div className="space-y-4">
            {[
              { label: 'Paddy Diverted', value: `${(data.paddy_diverted_kg || 0).toLocaleString()} kg`, icon: '🌾' },
              { label: 'CO₂ Saved', value: `${(data.co2_saved_kg || 0).toLocaleString()} kg`, icon: '💨' },
              { label: 'Active Orders', value: String(data.active_orders || 0), icon: '📦' },
              { label: 'Total Orders', value: String(data.recent_orders?.length || 0), icon: '🛒' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span>{item.icon}</span>
                  <span className="text-sm text-white/70">{item.label}</span>
                </div>
                <span className="font-semibold text-white">{item.value}</span>
              </div>
            ))}
          </div>
          <Link to="/customer/certificates" className="block mt-4 text-center text-sm text-brand-300 hover:text-brand-200 font-medium">
            View Certificates →
          </Link>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-bold text-surface-900">Recent Orders</h3>
          <Link to="/customer/orders" className="text-sm text-brand-600 font-medium hover:text-brand-700">View All →</Link>
        </div>

        {!data.recent_orders?.length ? (
          <p className="text-surface-400 text-sm py-6 text-center">No orders yet. Browse our products!</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-surface-100">
                  <th className="table-header">Order ID</th>
                  <th className="table-header">Date</th>
                  <th className="table-header">Total</th>
                  <th className="table-header">Status</th>
                </tr>
              </thead>
              <tbody>
                {data.recent_orders.map(o => (
                  <tr key={o.order_id} className="table-row">
                    <td className="table-cell font-mono text-xs">{o.order_id.toUpperCase().slice(0, 8)}</td>
                    <td className="table-cell">{formatDate(o.created_at || o.order_date)}</td>
                    <td className="table-cell font-semibold">
                      {o.final_amount ? `₹${o.final_amount.toLocaleString('en-IN')}` : '—'}
                    </td>
                    <td className="table-cell">
                      <span className={`badge ${statusBadge(o.status)}`}>{o.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { to: '/customer/products', label: 'Browse Products', icon: '🛒', color: 'bg-brand-50 hover:bg-brand-100 border-brand-100' },
          { to: '/customer/orders', label: 'Track Orders', icon: '📦', color: 'bg-blue-50 hover:bg-blue-100 border-blue-100' },
          { to: '/customer/certificates', label: 'Download Certs', icon: '📜', color: 'bg-emerald-50 hover:bg-emerald-100 border-emerald-100' },
          { to: '/customer/subscriptions', label: 'Manage Subs', icon: '🔄', color: 'bg-amber-50 hover:bg-amber-100 border-amber-100' },
        ].map((a, i) => (
          <Link key={i} to={a.to} className={`flex items-center gap-3 p-4 rounded-xl border ${a.color} transition-all hover:shadow-sm`}>
            <span className="text-2xl">{a.icon}</span>
            <span className="font-medium text-surface-700">{a.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
