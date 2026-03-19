import { useState } from 'react';
import { mockOrders } from '../../data/mockData';

export default function OrderManagement() {
  const [filter, setFilter] = useState('all');
  const filtered = filter === 'all' ? mockOrders : mockOrders.filter(o => o.status === filter);

  const nextStatus = { pending: 'confirmed', confirmed: 'manufacturing', manufacturing: 'shipped', shipped: 'delivered' };

  return (
    <div className="page-enter space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-surface-900">Order Management</h1>
        <button className="btn-secondary text-sm">📄 Bulk Invoice</button>
      </div>

      <div className="flex flex-wrap gap-2">
        {['all', 'pending', 'confirmed', 'manufacturing', 'shipped', 'delivered'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-3 py-2 rounded-xl text-sm font-medium capitalize ${filter === f ? 'bg-brand-500 text-white' : 'bg-white border border-surface-200 text-surface-600'}`}>{f}</button>
        ))}
      </div>

      <div className="card overflow-x-auto p-0">
        <table className="w-full">
          <thead><tr className="border-b border-surface-100 bg-surface-50">
            <th className="table-header">Order ID</th>
            <th className="table-header">Customer</th>
            <th className="table-header">Date</th>
            <th className="table-header">Items</th>
            <th className="table-header">Amount</th>
            <th className="table-header">Payment</th>
            <th className="table-header">Status</th>
            <th className="table-header">Actions</th>
          </tr></thead>
          <tbody>
            {filtered.map(o => (
              <tr key={o.order_id} className="table-row">
                <td className="table-cell font-mono text-xs">{o.order_id.toUpperCase()}</td>
                <td className="table-cell font-medium">{o.customer_name}</td>
                <td className="table-cell">{o.order_date}</td>
                <td className="table-cell">{o.items.length}</td>
                <td className="table-cell font-semibold">₹{o.final_amount.toLocaleString()}</td>
                <td className="table-cell"><span className={`badge ${o.payment_status === 'completed' ? 'badge-success' : 'badge-warning'}`}>{o.payment_status}</span></td>
                <td className="table-cell"><span className={`badge ${o.status === 'delivered' ? 'badge-success' : o.status === 'shipped' ? 'badge-info' : 'badge-warning'}`}>{o.status}</span></td>
                <td className="table-cell">
                  {nextStatus[o.status] && (
                    <button className="text-xs px-2 py-1 bg-brand-500 text-white rounded-lg capitalize">→ {nextStatus[o.status]}</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
