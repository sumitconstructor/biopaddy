import { mockBookings, mockVehicles } from '../../data/mockData';

export default function CollectionManagement() {
  return (
    <div className="page-enter space-y-6">
      <h1 className="font-display text-2xl sm:text-3xl font-bold text-surface-900">Collection Management</h1>

      {/* Vehicle Status */}
      <div className="grid sm:grid-cols-3 gap-4">
        {mockVehicles.map(v => (
          <div key={v.vehicle_id} className="card">
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-sm font-bold text-surface-900">{v.vehicle_number_plate}</span>
              <span className={`badge ${v.status === 'on_route' ? 'badge-info' : v.status === 'loading' ? 'badge-warning' : 'badge-success'}`}>{v.status.replace('_', ' ')}</span>
            </div>
            <p className="text-sm text-surface-600">🚗 Driver: {v.driver_name}</p>
            <p className="text-sm text-surface-500">📞 {v.driver_phone}</p>
            <p className="text-sm text-surface-500">📦 Capacity: {v.current_capacity_quintals} qtl</p>
            <p className="text-sm text-surface-500">📋 Assigned: {v.assigned_bookings.length} bookings</p>
          </div>
        ))}
      </div>

      {/* Bookings Table */}
      <div className="card">
        <h3 className="font-display font-bold text-surface-900 mb-4">All Bookings</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-surface-100 bg-surface-50">
              <th className="table-header">ID</th>
              <th className="table-header">Farmer</th>
              <th className="table-header">Date</th>
              <th className="table-header">Slot</th>
              <th className="table-header">Qty (qtl)</th>
              <th className="table-header">Grade</th>
              <th className="table-header">Status</th>
              <th className="table-header">Actions</th>
            </tr></thead>
            <tbody>
              {mockBookings.map(b => (
                <tr key={b.booking_id} className="table-row">
                  <td className="table-cell font-mono text-xs">{b.booking_id.toUpperCase()}</td>
                  <td className="table-cell font-medium">{b.farmer_name}</td>
                  <td className="table-cell">{b.collection_date}</td>
                  <td className="table-cell capitalize">{b.collection_time_slot}</td>
                  <td className="table-cell">{b.estimated_quantity_quintals}</td>
                  <td className="table-cell"><span className={`badge ${b.quality_grade === 'A' ? 'badge-success' : 'badge-warning'}`}>Grade {b.quality_grade}</span></td>
                  <td className="table-cell"><span className={`badge ${b.status === 'paid' ? 'badge-success' : b.status === 'collected' ? 'badge-info' : b.status === 'confirmed' ? 'badge-warning' : 'badge-neutral'}`}>{b.status}</span></td>
                  <td className="table-cell">
                    <div className="flex gap-1">
                      {b.status === 'pending' && <button className="text-xs px-2 py-1 bg-brand-500 text-white rounded-lg">Confirm</button>}
                      {b.status === 'confirmed' && <button className="text-xs px-2 py-1 bg-blue-500 text-white rounded-lg">Assign</button>}
                      {b.status === 'collected' && <button className="text-xs px-2 py-1 bg-emerald-500 text-white rounded-lg">Pay</button>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
