import { mockCertificates } from '../../data/mockData';

export default function CertificateManagement() {
  return (
    <div className="page-enter space-y-6">
      <h1 className="font-display text-2xl sm:text-3xl font-bold text-surface-900">Certificate Management</h1>

      <div className="grid sm:grid-cols-3 gap-4">
        <div className="stat-card"><div className="text-2xl mb-2">📜</div><p className="font-display text-2xl font-bold">3</p><p className="text-sm text-surface-500">Total Certificates</p></div>
        <div className="stat-card"><div className="text-2xl mb-2">✅</div><p className="font-display text-2xl font-bold">1</p><p className="text-sm text-surface-500">Verified & Issued</p></div>
        <div className="stat-card"><div className="text-2xl mb-2">⏳</div><p className="font-display text-2xl font-bold">2</p><p className="text-sm text-surface-500">Pending Verification</p></div>
      </div>

      <div className="card overflow-x-auto p-0">
        <table className="w-full">
          <thead><tr className="border-b border-surface-100 bg-surface-50">
            <th className="table-header">Cert ID</th>
            <th className="table-header">Company</th>
            <th className="table-header">Order</th>
            <th className="table-header">Paddy (kg)</th>
            <th className="table-header">CO₂ (kg)</th>
            <th className="table-header">Date</th>
            <th className="table-header">Status</th>
            <th className="table-header">Actions</th>
          </tr></thead>
          <tbody>
            {mockCertificates.map(c => (
              <tr key={c.certificate_id} className="table-row">
                <td className="table-cell font-mono text-xs">{c.certificate_id.toUpperCase()}</td>
                <td className="table-cell font-medium">{c.company_name}</td>
                <td className="table-cell">{c.order_id.toUpperCase()}</td>
                <td className="table-cell font-semibold">{c.paddy_diverted_kg}</td>
                <td className="table-cell font-semibold text-emerald-600">{c.co2_saved_kg}</td>
                <td className="table-cell">{c.certificate_date || '—'}</td>
                <td className="table-cell"><span className={`badge ${c.verification_status === 'issued' ? 'badge-success' : 'badge-warning'}`}>{c.verification_status}</span></td>
                <td className="table-cell">
                  {c.verification_status === 'pending' ? (
                    <button className="text-xs px-2 py-1 bg-brand-500 text-white rounded-lg">Verify & Issue</button>
                  ) : (
                    <button className="text-xs px-2 py-1 bg-surface-100 text-surface-600 rounded-lg">View</button>
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
