import { useState } from 'react';
import { mockFarmers } from '../../data/mockData';

export default function FarmerManagement() {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);

  const filtered = mockFarmers
    .filter(f => filter === 'all' || (filter === 'verified' && f.verified_by_admin) || (filter === 'pending' && !f.verified_by_admin) || (filter === 'active' && f.is_active && f.verified_by_admin))
    .filter(f => f.profile_name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="page-enter space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-surface-900">Farmer Management</h1>
          <p className="text-surface-500 mt-1">{mockFarmers.length} farmers registered</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-secondary text-sm">📤 Export</button>
          <button className="btn-primary text-sm">📨 Send Bulk SMS</button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍 Search farmers..." className="input-field flex-1" />
        <div className="flex gap-2">
          {['all', 'verified', 'pending', 'active'].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-2 rounded-xl text-sm font-medium capitalize ${filter === f ? 'bg-brand-500 text-white' : 'bg-white border border-surface-200 text-surface-600'}`}>{f}</button>
          ))}
        </div>
      </div>

      <div className="card overflow-x-auto p-0">
        <table className="w-full">
          <thead><tr className="border-b border-surface-100 bg-surface-50">
            <th className="table-header">Farmer</th>
            <th className="table-header">Phone</th>
            <th className="table-header">Land</th>
            <th className="table-header">Crop</th>
            <th className="table-header">Earnings</th>
            <th className="table-header">Rating</th>
            <th className="table-header">Status</th>
            <th className="table-header">Actions</th>
          </tr></thead>
          <tbody>
            {filtered.map(f => (
              <tr key={f.user_id} className="table-row cursor-pointer" onClick={() => setSelected(selected === f.user_id ? null : f.user_id)}>
                <td className="table-cell font-medium">{f.profile_name}</td>
                <td className="table-cell text-xs">{f.phone_number}</td>
                <td className="table-cell">{f.land_area_acres} acres</td>
                <td className="table-cell capitalize">{f.primary_crop}</td>
                <td className="table-cell font-semibold">₹{f.total_earnings.toLocaleString()}</td>
                <td className="table-cell">{f.rating > 0 ? `★ ${f.rating}` : '—'}</td>
                <td className="table-cell">
                  <span className={`badge ${f.verified_by_admin ? 'badge-success' : 'badge-warning'}`}>{f.verified_by_admin ? 'Verified' : 'Pending'}</span>
                </td>
                <td className="table-cell">
                  {!f.verified_by_admin ? (
                    <div className="flex gap-1">
                      <button className="text-xs px-2 py-1 bg-brand-500 text-white rounded-lg">Approve</button>
                      <button className="text-xs px-2 py-1 bg-red-100 text-red-600 rounded-lg">Reject</button>
                    </div>
                  ) : (
                    <button className="text-xs px-2 py-1 bg-surface-100 text-surface-600 rounded-lg">View</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Detail panel */}
      {selected && (() => {
        const farmer = mockFarmers.find(f => f.user_id === selected);
        if (!farmer) return null;
        return (
          <div className="card">
            <h3 className="font-display font-bold text-surface-900 mb-4">Farmer Details: {farmer.profile_name}</h3>
            <div className="grid sm:grid-cols-3 gap-4 text-sm">
              <div><span className="text-surface-500">Email:</span> <span className="font-medium">{farmer.email}</span></div>
              <div><span className="text-surface-500">Phone:</span> <span className="font-medium">{farmer.phone_number}</span></div>
              <div><span className="text-surface-500">Aadhaar:</span> <span className="font-medium">{farmer.aadhaar_number}</span></div>
              <div><span className="text-surface-500">Land:</span> <span className="font-medium">{farmer.land_area_acres} acres</span></div>
              <div><span className="text-surface-500">Crop:</span> <span className="font-medium capitalize">{farmer.primary_crop}</span></div>
              <div><span className="text-surface-500">Language:</span> <span className="font-medium capitalize">{farmer.language_preference}</span></div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
