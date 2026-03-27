import { useState } from 'react';
import { mockBookings } from '../../data/mockData';

export default function MyBookings() {
  const [filter, setFilter] = useState('all');
  const [expanded, setExpanded] = useState(null);

  const myBookings = mockBookings.filter(b => b.farmer_id === 'f1' || b.farmer_id === 'f2' || b.farmer_id === 'f3');
  const filtered = filter === 'all' ? myBookings : myBookings.filter(b => b.status === filter);

  const filters = [
    { key: 'all', label: 'All', count: myBookings.length },
    { key: 'pending', label: 'Pending', count: myBookings.filter(b => b.status === 'pending').length },
    { key: 'confirmed', label: 'Confirmed', count: myBookings.filter(b => b.status === 'confirmed').length },
    { key: 'collected', label: 'Collected', count: myBookings.filter(b => b.status === 'collected').length },
    { key: 'paid', label: 'Paid', count: myBookings.filter(b => b.status === 'paid').length },
  ];

  const statusColor = (s) => {
    const map = { pending: 'badge-neutral', confirmed: 'badge-warning', collected: 'badge-info', paid: 'badge-success' };
    return map[s] || 'badge-neutral';
  };

  return (
    <div className="page-enter space-y-6">
      <div>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-surface-900">My Bookings</h1>
        <p className="text-surface-500 mt-1">Track and manage all your collection bookings</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {filters.map(f => (
          <button key={f.key} onClick={() => setFilter(f.key)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              filter === f.key ? 'bg-brand-500 text-white shadow-md shadow-brand-500/25' : 'bg-white text-surface-600 border border-surface-200 hover:border-brand-200'
            }`}>
            {f.label} <span className="ml-1 opacity-70">({f.count})</span>
          </button>
        ))}
      </div>

      {/* Bookings List */}
      <div className="space-y-3">
        {filtered.map(b => (
          <div key={b.booking_id} className="card cursor-pointer" onClick={() => setExpanded(expanded === b.booking_id ? null : b.booking_id)}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center">
                  <span className="text-xl">{b.status === 'paid' ? '✅' : b.status === 'collected' ? '🚚' : b.status === 'confirmed' ? '📋' : '⏳'}</span>
                </div>
                <div>
                  <p className="font-semibold text-surface-900">Booking #{b.booking_id.toUpperCase()}</p>
                  <p className="text-sm text-surface-500">Collection on {b.collection_date} • {b.collection_time_slot}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={statusColor(b.status)}>{b.status}</span>
                <span className="font-display font-bold text-surface-900">₹{b.payment_amount?.toLocaleString()}</span>
                <span className={`text-surface-400 transition-transform ${expanded === b.booking_id ? 'rotate-180' : ''}`}>▼</span>
              </div>
            </div>

            {expanded === b.booking_id && (
              <div className="mt-4 pt-4 border-t border-surface-100 grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm"><span className="text-surface-500">Location</span><span className="text-surface-700">{b.pickup_location}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-surface-500">Est. Quantity</span><span className="text-surface-700">{b.estimated_quantity_quintals} qtl</span></div>
                  <div className="flex justify-between text-sm"><span className="text-surface-500">Actual Quantity</span><span className="text-surface-700">{b.current_quantity_quintals ? `${b.current_quantity_quintals} qtl` : '—'}</span></div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm"><span className="text-surface-500">Quality Grade</span><span className={`badge ${b.quality_grade === 'A' ? 'badge-success' : 'badge-warning'}`}>Grade {b.quality_grade}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-surface-500">Payment Status</span><span className={`badge ${b.payment_status === 'completed' ? 'badge-success' : 'badge-warning'}`}>{b.payment_status}</span></div>
                  {b.payment_date && <div className="flex justify-between text-sm"><span className="text-surface-500">Payment Date</span><span className="text-surface-700">{b.payment_date}</span></div>}
                </div>
                {b.status === 'pending' && (
                  <div className="sm:col-span-2 flex gap-2 mt-2">
                    <button className="btn-danger text-sm py-2 px-4">Cancel Booking</button>
                    <button className="btn-secondary text-sm py-2 px-4">Edit Details</button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <div className="text-5xl mb-4">📭</div>
          <p className="text-surface-500">No bookings found with this filter</p>
        </div>
      )}
    </div>
  );
}
