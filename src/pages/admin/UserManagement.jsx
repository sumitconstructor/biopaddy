import { mockAdmins } from '../../data/mockData';

export default function UserManagement() {
  const roles = ['Super Admin', 'Operations Manager', 'Finance Manager', 'Support Manager', 'Quality Manager'];

  return (
    <div className="page-enter space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-surface-900">User & Access Management</h1>
        <button className="btn-primary text-sm">+ Add Admin</button>
      </div>

      <div className="card overflow-x-auto p-0">
        <table className="w-full">
          <thead><tr className="border-b border-surface-100 bg-surface-50">
            <th className="table-header">Name</th>
            <th className="table-header">Email</th>
            <th className="table-header">Role</th>
            <th className="table-header">Status</th>
            <th className="table-header">Actions</th>
          </tr></thead>
          <tbody>
            {mockAdmins.map(a => (
              <tr key={a.user_id} className="table-row">
                <td className="table-cell font-medium">{a.profile_name}</td>
                <td className="table-cell text-xs">{a.email}</td>
                <td className="table-cell"><span className="badge-info">{a.role}</span></td>
                <td className="table-cell"><span className="badge-success">Active</span></td>
                <td className="table-cell">
                  <div className="flex gap-1">
                    <button className="text-xs px-2 py-1 bg-surface-100 text-surface-600 rounded-lg">Edit</button>
                    <button className="text-xs px-2 py-1 bg-red-100 text-red-600 rounded-lg">Suspend</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Roles */}
      <div className="card">
        <h3 className="font-display font-bold text-surface-900 mb-4">Roles & Permissions</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {roles.map((role, i) => (
            <div key={i} className="p-4 rounded-xl border border-surface-200">
              <p className="font-semibold text-surface-900">{role}</p>
              <p className="text-xs text-surface-500 mt-1">
                {role === 'Super Admin' ? 'Full access to all features' :
                 role === 'Operations Manager' ? 'Collections, inventory, vehicles' :
                 role === 'Finance Manager' ? 'Payments, invoices, reports' :
                 role === 'Support Manager' ? 'Tickets, communications' :
                 'Quality assessment, certificates'}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
