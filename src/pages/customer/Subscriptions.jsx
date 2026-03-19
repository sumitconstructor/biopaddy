import { useState } from 'react';

export default function Subscriptions() {
  const [subs] = useState([
    { id: 's1', product: 'Eco Cup 200ml', quantity: 500, frequency: 'monthly', nextDelivery: '2026-04-01', price: 1912, status: 'active' },
    { id: 's2', product: 'Round Plate 8"', quantity: 1000, frequency: 'quarterly', nextDelivery: '2026-06-01', price: 4400, status: 'active' },
    { id: 's3', product: 'Eco Spoon', quantity: 2000, frequency: 'monthly', nextDelivery: '2026-04-01', price: 3200, status: 'paused' },
  ]);

  return (
    <div className="page-enter space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-surface-900">Subscriptions</h1>
          <p className="text-surface-500 mt-1">Manage recurring product deliveries</p>
        </div>
        <button className="btn-primary">+ New Subscription</button>
      </div>

      <div className="space-y-4">
        {subs.map(sub => (
          <div key={sub.id} className="card">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center text-xl">🔄</div>
                <div>
                  <p className="font-semibold text-surface-900">{sub.product}</p>
                  <p className="text-sm text-surface-500">{sub.quantity.toLocaleString()} units • {sub.frequency}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`badge ${sub.status === 'active' ? 'badge-success' : 'badge-warning'}`}>{sub.status}</span>
                <span className="font-bold text-surface-900">₹{sub.price.toLocaleString()}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-surface-100 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-surface-500">Next delivery: <span className="font-semibold text-surface-800">{sub.nextDelivery}</span></p>
              <div className="flex gap-2">
                {sub.status === 'active' ? (
                  <>
                    <button className="text-sm font-medium px-3 py-1.5 rounded-lg border border-surface-200 hover:bg-surface-50">Edit</button>
                    <button className="text-sm font-medium px-3 py-1.5 rounded-lg border border-surface-200 hover:bg-surface-50">Skip Next</button>
                    <button className="text-sm font-medium px-3 py-1.5 rounded-lg border border-amber-200 text-amber-600 hover:bg-amber-50">Pause</button>
                  </>
                ) : (
                  <button className="text-sm font-medium px-3 py-1.5 rounded-lg bg-brand-500 text-white hover:bg-brand-600">Resume</button>
                )}
                <button className="text-sm font-medium px-3 py-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50">Cancel</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
