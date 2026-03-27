import { useState } from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { FiHome, FiTruck, FiMap, FiDollarSign, FiSettings, FiArrowRight, FiBell } from 'react-icons/fi';
import { GiWheat } from 'react-icons/gi';
import { Link } from 'react-router-dom';

const earningsData = [
  { month: 'Oct', earned: 24000 },
  { month: 'Nov', earned: 38000 },
  { month: 'Dec', earned: 29000 },
  { month: 'Jan', earned: 51000 },
  { month: 'Feb', earned: 44000 },
  { month: 'Mar', earned: 67000 },
];

const routes = [
  { id: '#RT-882', village: 'Moga → Ludhiana', pickups: 4, tons: 18.4, status: 'In Progress', statusColor: '#60A5FA' },
  { id: '#RT-876', village: 'Barnala → Sangrur', pickups: 6, tons: 27.2, status: 'Completed', statusColor: '#4DC97A' },
  { id: '#RT-891', village: 'Fatehgarh → Patiala', pickups: 3, tons: 13.8, status: 'Scheduled', statusColor: '#A78BFA' },
];

const navItems = [
  { icon: FiHome, label: 'Dashboard', id: 'home' },
  { icon: FiMap, label: 'My Routes', id: 'routes' },
  { icon: FiTruck, label: 'Pickups', id: 'pickups' },
  { icon: FiDollarSign, label: 'Earnings', id: 'earnings' },
  { icon: FiSettings, label: 'Settings', id: 'settings' },
];

export default function ContractorDashboard() {
  const [activeNav, setActiveNav] = useState('home');

  return (
    <div className="min-h-screen flex" style={{ background: '#050D0A' }}>
      {/* Sidebar */}
      <div className="hidden lg:flex flex-col w-64 border-r border-white/06 flex-shrink-0"
        style={{ background: 'rgba(8,20,14,0.97)', backdropFilter: 'blur(30px)' }}>
        <div className="flex items-center gap-2.5 p-6 border-b border-white/06">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
            <GiWheat className="text-white text-base" />
          </div>
          <span className="font-heading font-bold text-lg text-white">Farm<span style={{ background: 'linear-gradient(135deg, #4DC97A, #1FAF5A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Easy</span></span>
        </div>
        <div className="p-4 mx-4 mt-4 rounded-2xl mb-2" style={{ background: 'rgba(96,165,250,0.08)', border: '1px solid rgba(96,165,250,0.2)' }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-400/20 flex items-center justify-center text-xl">🚛</div>
            <div>
              <div className="text-white text-sm font-semibold">Ramesh Logistics</div>
              <div className="text-white/40 text-xs">Punjab Region · 3 Vehicles</div>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <button key={item.id} onClick={() => setActiveNav(item.id)}
              className={`w-full ${activeNav === item.id ? 'sidebar-link-active' : 'sidebar-link'}`}>
              <item.icon size={16} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-white/06">
          <Link to="/" className="sidebar-link w-full">
            <FiArrowRight size={14} className="rotate-180" />
            <span className="text-sm">Back to Website</span>
          </Link>
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/06" style={{ background: 'rgba(8,20,14,0.8)', backdropFilter: 'blur(20px)' }}>
          <div>
            <h1 className="text-white font-heading font-bold text-lg">Contractor Dashboard</h1>
            <p className="text-white/40 text-xs">Ramesh Logistics · March 2026</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <FiBell size={16} className="text-white/60" />
            </button>
            <div className="w-9 h-9 rounded-xl bg-blue-400/20 flex items-center justify-center text-base">🚛</div>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-6">
          {/* KPIs */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[
              { label: 'Total Earned', value: '₹2.53L', sub: 'Oct–Mar', color: '#4DC97A', icon: '💰' },
              { label: 'Active Routes', value: '2', sub: 'Today', color: '#60A5FA', icon: '🗺️' },
              { label: 'Tons Collected', value: '421 T', sub: 'Lifetime', color: '#A78BFA', icon: '⚖️' },
              { label: 'Pickups Done', value: '118', sub: 'All time', color: '#FFD166', icon: '✅' },
            ].map((k) => (
              <motion.div key={k.label}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass rounded-2xl p-5 hover:scale-[1.02] transition-transform duration-200"
              >
                <div className="text-2xl mb-3">{k.icon}</div>
                <div className="font-heading font-bold text-2xl mb-0.5" style={{ color: k.color }}>{k.value}</div>
                <div className="text-white text-xs font-medium mb-0.5">{k.label}</div>
                <div className="text-white/35 text-xs">{k.sub}</div>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6 mb-6">
            {/* Earnings Chart */}
            <div className="lg:col-span-2 glass rounded-2xl p-6">
              <h3 className="text-white font-heading font-bold mb-1">Monthly Earnings</h3>
              <p className="text-white/40 text-xs mb-5">Commission earned (₹)</p>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={earningsData}>
                  <defs>
                    <linearGradient id="cEarn" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#60A5FA" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#60A5FA" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />
                  <XAxis dataKey="month" tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: 'rgba(10,22,16,0.95)', border: '1px solid rgba(96,165,250,0.25)', borderRadius: 12 }} labelStyle={{ color: '#ffffff80' }} itemStyle={{ color: '#60A5FA' }} />
                  <Area type="monotone" dataKey="earned" name="Earned" stroke="#60A5FA" strokeWidth={2.5} fill="url(#cEarn)" dot={{ fill: '#60A5FA', strokeWidth: 0, r: 4 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Vehicle Status */}
            <div className="glass rounded-2xl p-6">
              <h3 className="text-white font-heading font-bold text-base mb-5">Fleet Status</h3>
              <div className="space-y-4">
                {[
                  { id: 'VH-114', driver: 'Balvinder', status: 'En Route', tons: 6.2, color: '#60A5FA' },
                  { id: 'VH-092', driver: 'Suresh', status: 'Loading', tons: 0, color: '#FFD166' },
                  { id: 'VH-201', driver: 'Harjot', status: 'Available', tons: 0, color: '#4DC97A' },
                ].map((v) => (
                  <div key={v.id} className="rounded-xl p-4" style={{ background: `${v.color}10`, border: `1px solid ${v.color}20` }}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-white text-sm font-semibold">{v.id}</span>
                      <span className="text-xs font-medium px-2 py-0.5 rounded-lg" style={{ background: `${v.color}15`, color: v.color }}>{v.status}</span>
                    </div>
                    <div className="text-white/45 text-xs">Driver: {v.driver}</div>
                    {v.tons > 0 && <div className="text-white/40 text-xs mt-0.5">{v.tons}T loaded</div>}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Routes Table */}
          <div className="glass rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between p-6 pb-4">
              <h3 className="text-white font-heading font-bold">Today's Routes</h3>
              <button className="btn-primary text-xs px-4 py-2">+ New Route</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-y border-white/06">
                    {['Route ID', 'Coverage', 'Pickups', 'Est. Tons', 'Status'].map((h) => (
                      <th key={h} className="text-left px-6 py-3 text-white/40 text-xs font-medium uppercase tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {routes.map((r, i) => (
                    <tr key={r.id} className="border-b border-white/04 hover:bg-white/03 transition-colors">
                      <td className="px-6 py-4 text-blue-400 text-sm font-mono">{r.id}</td>
                      <td className="px-6 py-4 text-white text-sm">{r.village}</td>
                      <td className="px-6 py-4 text-white/60 text-sm">{r.pickups} pickups</td>
                      <td className="px-6 py-4 text-white font-semibold text-sm">{r.tons}T</td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-lg text-xs font-semibold"
                          style={{ background: `${r.statusColor}18`, color: r.statusColor, border: `1px solid ${r.statusColor}30` }}>
                          {r.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
