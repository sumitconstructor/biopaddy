import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

const links = [
  { to: '/admin', label: 'Dashboard', icon: '📊', end: true },
  { to: '/admin/farmers', label: 'Farmers', icon: '🧑‍🌾' },
  { to: '/admin/collections', label: 'Collections', icon: '🚚' },
  { to: '/admin/inventory', label: 'Inventory', icon: '📦' },
  { to: '/admin/orders', label: 'Orders', icon: '🛒' },
  { to: '/admin/certificates', label: 'Certificates', icon: '📜' },
  { to: '/admin/finance', label: 'Finance', icon: '💰' },
  { to: '/admin/reports', label: 'Reports', icon: '📈' },
  { to: '/admin/users', label: 'Users', icon: '👥' },
  { to: '/admin/support', label: 'Support', icon: '🎫' },
  { to: '/admin/settings', label: 'Settings', icon: '⚙️' },
];

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <div className="min-h-screen bg-surface-50 flex">
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-surface-900 flex flex-col transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-5 border-b border-surface-700">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-brand flex items-center justify-center text-white font-bold text-lg">🌾</div>
            <div>
              <h1 className="font-display font-bold text-lg text-white">BioPaddy</h1>
              <p className="text-xs text-surface-400">Admin Panel</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {links.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? 'flex items-center gap-3 px-4 py-2.5 rounded-xl bg-brand-600/20 text-brand-400 font-semibold'
                  : 'flex items-center gap-3 px-4 py-2.5 rounded-xl text-surface-400 font-medium hover:bg-surface-800 hover:text-surface-200 transition-all duration-200'
              }
            >
              <span className="text-lg">{link.icon}</span>
              <span className="text-sm">{link.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-surface-700">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-full bg-brand-600/20 flex items-center justify-center text-brand-400 font-bold text-sm">
              {user?.profile_name?.charAt(0) || 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{user?.profile_name || 'Admin'}</p>
              <p className="text-xs text-surface-400 truncate">{user?.role || 'Super Admin'}</p>
            </div>
          </div>
          <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
            ← Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 min-w-0">
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-lg border-b border-surface-100 px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 hover:bg-surface-100 rounded-lg">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
          <div className="hidden lg:flex items-center gap-4">
            <h2 className="text-sm text-surface-500">Welcome back, <span className="font-semibold text-surface-800">{user?.profile_name}</span></h2>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 hover:bg-surface-100 rounded-lg transition-colors">
              <svg className="w-5 h-5 text-surface-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>
        </header>
        <div className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
