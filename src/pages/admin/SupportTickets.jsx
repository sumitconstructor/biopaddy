import { mockTickets } from '../../data/mockData';

export default function SupportTickets() {
  return (
    <div className="page-enter space-y-6">
      <h1 className="font-display text-2xl sm:text-3xl font-bold text-surface-900">Support Tickets</h1>

      <div className="grid sm:grid-cols-4 gap-4">
        {[
          { label: 'Open', value: mockTickets.filter(t => t.status === 'open').length, color: 'bg-red-50 text-red-600' },
          { label: 'In Progress', value: mockTickets.filter(t => t.status === 'in_progress').length, color: 'bg-amber-50 text-amber-600' },
          { label: 'Resolved', value: mockTickets.filter(t => t.status === 'resolved').length, color: 'bg-emerald-50 text-emerald-600' },
          { label: 'Total', value: mockTickets.length, color: 'bg-blue-50 text-blue-600' },
        ].map((s, i) => (
          <div key={i} className="stat-card text-center">
            <p className={`font-display text-3xl font-bold ${s.color.split(' ')[1]}`}>{s.value}</p>
            <p className="text-sm text-surface-500">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        {mockTickets.map(ticket => (
          <div key={ticket.ticket_id} className="card">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${
                  ticket.priority === 'high' ? 'bg-red-50' : ticket.priority === 'medium' ? 'bg-amber-50' : 'bg-blue-50'
                }`}>{ticket.priority === 'high' ? '🔴' : ticket.priority === 'medium' ? '🟡' : '🔵'}</div>
                <div>
                  <p className="font-semibold text-surface-900">{ticket.subject}</p>
                  <p className="text-sm text-surface-500">{ticket.user_name} ({ticket.user_type}) • {ticket.created_at} • {ticket.messages} messages</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`badge ${ticket.priority === 'high' ? 'badge-danger' : ticket.priority === 'medium' ? 'badge-warning' : 'badge-info'}`}>{ticket.priority}</span>
                <span className={`badge ${ticket.status === 'resolved' ? 'badge-success' : ticket.status === 'in_progress' ? 'badge-warning' : 'badge-danger'}`}>{ticket.status.replace('_', ' ')}</span>
                {ticket.status !== 'resolved' && <button className="text-xs px-3 py-1.5 bg-brand-500 text-white rounded-lg">Respond</button>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
