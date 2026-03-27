import { useState } from 'react';
import { mockOrders } from '../../data/mockData';

const statusSteps = ['pending', 'confirmed', 'manufacturing', 'shipped', 'delivered'];

export default function OrdersManagement() {
  const [filter, setFilter] = useState('all');
  const [expanded, setExpanded] = useState(null);
  const filtered = filter === 'all' ? mockOrders : mockOrders.filter(o => o.status === filter);

  return (
    <div className="page-enter space-y-6">
      <div>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-surface-900">My Orders</h1>
        <p className="text-surface-500 mt-1">Track and manage all your orders</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {['all', 'pending', 'confirmed', 'manufacturing', 'shipped', 'delivered'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all ${
              filter === f ? 'bg-brand-500 text-white shadow-md' : 'bg-white border border-surface-200 text-surface-600'
            }`}>{f}</button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.map(order => (
          <div key={order.order_id} className="card cursor-pointer" onClick={() => setExpanded(expanded === order.order_id ? null : order.order_id)}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <p className="font-semibold text-surface-900">Order #{order.order_id.toUpperCase()}</p>
                <p className="text-sm text-surface-500">{order.order_date} • {order.items.length} items</p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`badge ${order.status === 'delivered' ? 'badge-success' : order.status === 'shipped' ? 'badge-info' : 'badge-warning'}`}>{order.status}</span>
                <span className="font-bold">₹{order.final_amount.toLocaleString()}</span>
              </div>
            </div>

            {expanded === order.order_id && (
              <div className="mt-4 pt-4 border-t border-surface-100 space-y-4">
                {/* Timeline */}
                <div className="flex items-center justify-between py-2">
                  {statusSteps.map((s, i) => {
                    const ci = statusSteps.indexOf(order.status);
                    return (
                      <div key={s} className="flex items-center flex-1">
                        <div className="flex flex-col items-center gap-1 flex-shrink-0">
                          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                            i <= ci ? 'bg-brand-500 text-white' : 'bg-surface-200 text-surface-400'
                          }`}>{i <= ci ? '✓' : i + 1}</div>
                          <span className="text-[10px] capitalize">{s}</span>
                        </div>
                        {i < 4 && <div className={`flex-1 h-0.5 mx-1 ${i < ci ? 'bg-brand-500' : 'bg-surface-200'}`} />}
                      </div>
                    );
                  })}
                </div>
                {/* Items */}
                {order.items.map((item, i) => (
                  <div key={i} className="flex justify-between p-3 bg-surface-50 rounded-xl text-sm">
                    <span>{item.name} × {item.quantity.toLocaleString()}</span>
                    <span className="font-semibold">₹{item.total.toLocaleString()}</span>
                  </div>
                ))}
                <div className="flex gap-2">
                  <button className="btn-secondary text-sm py-2">📄 Invoice</button>
                  <button className="btn-secondary text-sm py-2">🔁 Reorder</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
