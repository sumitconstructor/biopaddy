import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, BarChart, Bar } from 'recharts';
import { FiHome, FiTruck, FiDollarSign, FiSettings, FiMenu, FiX, FiBell, FiUser, FiArrowRight, FiCalendar } from 'react-icons/fi';
import { GiWheat } from 'react-icons/gi';
import { MdEco } from 'react-icons/md';
import { Link } from 'react-router-dom';

const earningsData = [
  { month: 'Oct', earned: 9000 },
  { month: 'Nov', earned: 12000 },
  { month: 'Dec', earned: 7500 },
  { month: 'Jan', earned: 18000 },
  { month: 'Feb', earned: 0 },
  { month: 'Mar', earned: 27600 },
];

const pickups = [
  { id: '#PK-2831', date: 'Mar 18, 2026', tons: 8.4, amount: '₹5,040', status: 'Completed', statusColor: '#4DC97A' },
  { id: '#PK-2756', date: 'Jan 02, 2026', tons: 19.4, amount: '₹11,640', status: 'Completed', statusColor: '#4DC97A' },
  { id: '#PK-2691', date: 'Nov 12, 2025', tons: 18.7, amount: '₹11,220', status: 'Completed', statusColor: '#4DC97A' },
  { id: '#PK-3001', date: 'Apr 05, 2026', tons: 8.0, amount: '₹4,800', status: 'Scheduled', statusColor: '#60A5FA' },
];

const trackingSteps = [
  { label: 'Registered', done: true, icon: '✅' },
  { label: 'Pickup Scheduled', done: true, icon: '📅' },
  { label: 'Agent En Route', done: true, icon: '🚛' },
  { label: 'Residue Collected', done: false, icon: '⚖️', active: true },
  { label: 'Processing', done: false, icon: '🏭' },
  { label: 'Payment Sent', done: false, icon: '💰' },
];

const navItems = [
  { icon: FiHome, label: 'Dashboard', id: 'home' },
  { icon: FiTruck, label: 'My Pickups', id: 'pickups' },
  { icon: FiDollarSign, label: 'Earnings', id: 'earnings' },
  { icon: MdEco, label: 'My Impact', id: 'impact' },
  { icon: FiSettings, label: 'Settings', id: 'settings' },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="px-4 py-3 rounded-xl" style={{ background: 'rgba(10,22,16,0.95)', border: '1px solid rgba(31,175,90,0.25)', backdropFilter: 'blur(20px)' }}>
        <p className="text-white/70 text-xs mb-1">{label}</p>
        <p className="text-primary font-bold text-sm">₹{payload[0].value?.toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

export default function FarmerDashboard() {
  const [activeNav, setActiveNav] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex" style={{ background: '#050D0A' }}>
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-40 w-64 transition-transform duration-300 lg:translate-x-0 lg:static lg:flex flex-col ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
        style={{ background: 'rgba(8,20,14,0.97)', borderRight: '1px solid rgba(255,255,255,0.06)', backdropFilter: 'blur(30px)' }}>
        {/* Logo */}
        <div className="flex items-center gap-2.5 p-6 border-b border-white/06">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
            <GiWheat className="text-white text-base" />
          </div>
          <span className="font-heading font-bold text-lg text-white">Farm<span style={{ background: 'linear-gradient(135deg, #4DC97A, #1FAF5A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Easy</span></span>
        </div>

        {/* User */}
        <div className="p-4 mx-4 mt-4 rounded-2xl mb-2" style={{ background: 'rgba(31,175,90,0.1)', border: '1px solid rgba(31,175,90,0.2)' }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-xl">👨‍🌾</div>
            <div>
              <div className="text-white text-sm font-semibold">Gurpreet Singh</div>
              <div className="text-white/40 text-xs">Ludhiana · 45 acres</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <button key={item.id} onClick={() => { setActiveNav(item.id); setSidebarOpen(false); }}
              className={`w-full ${activeNav === item.id ? 'sidebar-link-active' : 'sidebar-link'}`}>
              <item.icon size={16} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Back to site */}
        <div className="p-4 border-t border-white/06">
          <Link to="/" className="sidebar-link w-full">
            <FiArrowRight size={14} className="rotate-180" />
            <span className="text-sm">Back to Website</span>
          </Link>
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && <div className="fixed inset-0 z-30 bg-black/60 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/06" style={{ background: 'rgba(8,20,14,0.8)', backdropFilter: 'blur(20px)' }}>
          <div className="flex items-center gap-3">
            <button className="lg:hidden text-white/60 hover:text-white" onClick={() => setSidebarOpen(true)}>
              <FiMenu size={20} />
            </button>
            <div>
              <h1 className="text-white font-heading font-bold text-lg">Farmer Dashboard</h1>
              <p className="text-white/40 text-xs">Welcome back, Gurpreet 👋</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="w-9 h-9 rounded-xl flex items-center justify-center relative" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <FiBell size={16} className="text-white/60" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-primary" />
            </button>
            <div className="w-9 h-9 rounded-xl bg-primary/20 flex items-center justify-center text-base">👨‍🌾</div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          {/* KPI Strip */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[
              { label: 'Total Earned', value: '₹74,100', sub: 'Since Oct 2025', color: '#4DC97A', icon: '💰' },
              { label: 'Tons Collected', value: '123.5 T', sub: 'Lifetime', color: '#60A5FA', icon: '⚖️' },
              { label: 'Pickups Done', value: '3', sub: 'This season', color: '#A78BFA', icon: '🚛' },
              { label: 'CO₂ Prevented', value: '333 MT', sub: 'vs stubble burn', color: '#FFD166', icon: '🌿' },
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
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="text-white font-heading font-bold">Earnings History</h3>
                  <p className="text-white/40 text-xs">Monthly earnings (₹)</p>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={180}>
                <AreaChart data={earningsData}>
                  <defs>
                    <linearGradient id="earn" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1FAF5A" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#1FAF5A" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />
                  <XAxis dataKey="month" tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="earned" stroke="#1FAF5A" strokeWidth={2.5} fill="url(#earn)" dot={{ fill: '#1FAF5A', strokeWidth: 0, r: 4 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Live Tracking */}
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-white font-heading font-bold text-base">Live Pickup Status</h3>
                <span className="flex items-center gap-1.5 text-xs text-primary">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />Live
                </span>
              </div>
              <div className="text-white/40 text-xs mb-4">Pickup #PK-3001 · Apr 5</div>
              <div className="space-y-0">
                {trackingSteps.map((step, i) => (
                  <div key={step.label} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm flex-shrink-0 ${step.done ? 'bg-primary/20' : step.active ? 'bg-amber-400/20 animate-pulse-glow' : 'bg-white/05'}`}
                        style={{ border: `1px solid ${step.done ? 'rgba(31,175,90,0.4)' : step.active ? 'rgba(255,209,70,0.4)' : 'rgba(255,255,255,0.08)'}` }}>
                        {step.icon}
                      </div>
                      {i < trackingSteps.length - 1 && (
                        <div className="w-px flex-1 my-1" style={{ background: step.done ? 'rgba(31,175,90,0.4)' : 'rgba(255,255,255,0.08)', minHeight: '16px' }} />
                      )}
                    </div>
                    <div className="pb-4 pt-1.5">
                      <div className={`text-xs font-semibold ${step.done ? 'text-primary' : step.active ? 'text-amber-400' : 'text-white/30'}`}>
                        {step.label}
                      </div>
                      {step.active && <div className="text-white/40 text-xs mt-0.5">In progress...</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pickups Table */}
          <div className="glass rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between p-6 pb-4">
              <h3 className="text-white font-heading font-bold">Pickup History</h3>
              <button className="btn-glass text-xs px-3 py-2">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-y border-white/06">
                    {['Pickup ID', 'Date', 'Tons', 'Amount', 'Status'].map((h) => (
                      <th key={h} className="text-left px-6 py-3 text-white/40 text-xs font-medium uppercase tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {pickups.map((p, i) => (
                    <motion.tr key={p.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className="border-b border-white/04 hover:bg-white/03 transition-colors">
                      <td className="px-6 py-4 text-primary text-sm font-mono">{p.id}</td>
                      <td className="px-6 py-4 text-white/60 text-sm">{p.date}</td>
                      <td className="px-6 py-4 text-white text-sm font-medium">{p.tons}T</td>
                      <td className="px-6 py-4 text-white font-semibold text-sm">{p.amount}</td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-lg text-xs font-semibold"
                          style={{ background: `${p.statusColor}18`, color: p.statusColor, border: `1px solid ${p.statusColor}30` }}>
                          {p.status}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Book */}
          <div className="mt-6 glass rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            style={{ background: 'rgba(31,175,90,0.08)', border: '1px solid rgba(31,175,90,0.2)' }}>
            <div>
              <h3 className="text-white font-heading font-bold mb-1">Book Your Next Pickup</h3>
              <p className="text-white/45 text-sm">Rabi season is approaching. Schedule your pickup 2 weeks in advance.</p>
            </div>
            <button className="btn-primary flex-shrink-0 px-7 py-3.5">
              <FiCalendar />
              Book Pickup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
