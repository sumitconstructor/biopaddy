import { useState } from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, BarChart, Bar, LineChart, Line } from 'recharts';
import { FiHome, FiUsers, FiTruck, FiPackage, FiSettings, FiBell, FiArrowRight, FiArrowUp, FiArrowDown } from 'react-icons/fi';
import { GiWheat } from 'react-icons/gi';
import { MdEco } from 'react-icons/md';
import { Link } from 'react-router-dom';

const growthData = [
  { month: 'Oct', farmers: 3200, orders: 12, tons: 2100, revenue: 156000 },
  { month: 'Nov', farmers: 5400, orders: 28, tons: 4800, revenue: 342000 },
  { month: 'Dec', farmers: 7800, orders: 41, tons: 8200, revenue: 590000 },
  { month: 'Jan', farmers: 9600, orders: 58, tons: 12400, revenue: 820000 },
  { month: 'Feb', farmers: 11800, orders: 74, tons: 15800, revenue: 1050000 },
  { month: 'Mar', farmers: 12847, orders: 89, tons: 21200, revenue: 1380000 },
];

const recentActivity = [
  { type: 'Pickup', msg: 'Pickup #PK-3041 completed · Ludhiana', time: '3m ago', color: '#4DC97A', icon: '🚛' },
  { type: 'Payment', msg: 'Payment ₹5,400 sent to Farmer #F-2891', time: '12m ago', color: '#FFD166', icon: '💰' },
  { type: 'Order', msg: 'New corporate order · 35,000 plates', time: '28m ago', color: '#60A5FA', icon: '📦' },
  { type: 'Farmer', msg: 'New farmer registered · Hisar, HR', time: '45m ago', color: '#A78BFA', icon: '👨‍🌾' },
  { type: 'Alert', msg: 'Vehicle VH-114 delay · Amritsar route', time: '1h ago', color: '#F87171', icon: '⚠️' },
  { type: 'Order', msg: 'Shipped order #ORD-4983 · Delhi', time: '2h ago', color: '#60A5FA', icon: '📦' },
];

const navItems = [
  { icon: FiHome, label: 'Analytics', id: 'analytics' },
  { icon: FiUsers, label: 'Farmers', id: 'farmers' },
  { icon: FiTruck, label: 'Pickups', id: 'pickups' },
  { icon: FiPackage, label: 'Orders', id: 'orders' },
  { icon: MdEco, label: 'Impact', id: 'impact' },
  { icon: FiSettings, label: 'System', id: 'system' },
];

const stateStats = [
  { state: 'Punjab', farmers: 5398, tons: 8900, pct: 42, color: '#4DC97A' },
  { state: 'Haryana', farmers: 4240, tons: 6990, pct: 33, color: '#60A5FA' },
  { state: 'Uttar Pradesh', farmers: 3209, tons: 5310, pct: 25, color: '#FFD166' },
];

export default function AdminDashboard() {
  const [activeNav, setActiveNav] = useState('analytics');

  return (
    <div className="min-h-screen flex" style={{ background: '#050D0A' }}>
      {/* Sidebar */}
      <div className="hidden lg:flex flex-col w-64 border-r border-white/06 flex-shrink-0"
        style={{ background: 'rgba(6,15,10,0.98)', backdropFilter: 'blur(30px)' }}>
        <div className="flex items-center gap-2.5 p-6 border-b border-white/06">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
            <GiWheat className="text-white text-base" />
          </div>
          <span className="font-heading font-bold text-lg text-white">Farm<span style={{ background: 'linear-gradient(135deg, #4DC97A, #1FAF5A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Easy</span></span>
          <span className="ml-auto px-2 py-0.5 rounded-md text-xs font-bold" style={{ background: 'rgba(248,113,113,0.15)', color: '#F87171', border: '1px solid rgba(248,113,113,0.25)' }}>ADMIN</span>
        </div>
        <div className="p-4 mx-4 mt-4 rounded-2xl mb-2" style={{ background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.2)' }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-400/20 flex items-center justify-center text-xl">🔐</div>
            <div>
              <div className="text-white text-sm font-semibold">Ops Admin</div>
              <div className="text-white/40 text-xs">Super Admin Access</div>
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

        {/* System Status */}
        <div className="p-4 mx-4 mb-4 rounded-xl" style={{ background: 'rgba(31,175,90,0.08)', border: '1px solid rgba(31,175,90,0.15)' }}>
          <p className="text-white/40 text-xs font-medium uppercase tracking-wide mb-3">System Status</p>
          {[
            { label: 'Platform', ok: true },
            { label: 'Payment API', ok: true },
            { label: 'GPS Tracking', ok: true },
            { label: 'Notifications', ok: false },
          ].map((s) => (
            <div key={s.label} className="flex items-center justify-between text-xs mb-2">
              <span className="text-white/50">{s.label}</span>
              <span className={`flex items-center gap-1 font-medium ${s.ok ? 'text-primary' : 'text-red-400'}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${s.ok ? 'bg-primary animate-pulse' : 'bg-red-400'}`} />
                {s.ok ? 'OK' : 'Down'}
              </span>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-white/06">
          <Link to="/" className="sidebar-link w-full">
            <FiArrowRight size={14} className="rotate-180" />
            <span className="text-sm">Back to Website</span>
          </Link>
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/06" style={{ background: 'rgba(8,20,14,0.8)', backdropFilter: 'blur(20px)' }}>
          <div>
            <h1 className="text-white font-heading font-bold text-lg">Admin Analytics</h1>
            <p className="text-white/40 text-xs">Real-time operations · Mar 2026</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs" style={{ background: 'rgba(31,175,90,0.12)', border: '1px solid rgba(31,175,90,0.2)', color: '#4DC97A' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Live
            </div>
            <button className="w-9 h-9 rounded-xl flex items-center justify-center relative" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <FiBell size={16} className="text-white/60" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-red-400" />
            </button>
            <div className="w-9 h-9 rounded-xl bg-red-400/20 flex items-center justify-center text-base">🔐</div>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-6">
          {/* Big KPI Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[
              { label: 'Total Farmers', value: '12,847', change: '+4.2%', up: true, sub: 'vs last month', color: '#4DC97A', icon: '🧑‍🌾' },
              { label: 'Active Pickups', value: '34', change: '+12', up: true, sub: 'today', color: '#60A5FA', icon: '🚛' },
              { label: 'Monthly Revenue', value: '₹1.38Cr', change: '+31%', up: true, sub: 'vs Feb', color: '#FFD166', icon: '💰' },
              { label: 'Alerts', value: '3', change: '-5', up: true, sub: 'vs yesterday', color: '#F87171', icon: '⚠️' },
            ].map((k) => (
              <motion.div key={k.label}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass rounded-2xl p-5 hover:scale-[1.02] transition-transform duration-200"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="text-2xl">{k.icon}</div>
                  <span className={`flex items-center gap-0.5 text-xs font-semibold px-2 py-0.5 rounded-lg ${k.up ? 'text-primary' : 'text-red-400'}`}
                    style={{ background: k.up ? 'rgba(31,175,90,0.12)' : 'rgba(248,113,113,0.12)' }}>
                    {k.up ? <FiArrowUp size={10} /> : <FiArrowDown size={10} />}
                    {k.change}
                  </span>
                </div>
                <div className="font-heading font-bold text-2xl mb-0.5" style={{ color: k.color }}>{k.value}</div>
                <div className="text-white text-xs font-medium mb-0.5">{k.label}</div>
                <div className="text-white/35 text-xs">{k.sub}</div>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6 mb-6">
            {/* Growth Chart */}
            <div className="lg:col-span-2 glass rounded-2xl p-6">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="text-white font-heading font-bold">Platform Growth</h3>
                  <p className="text-white/40 text-xs">Farmers & tons collected</p>
                </div>
                <div className="flex gap-3 text-xs text-white/50">
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-primary" />Farmers</span>
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-400" />Revenue</span>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={growthData}>
                  <CartesianGrid stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />
                  <XAxis dataKey="month" tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: 'rgba(10,22,16,0.95)', border: '1px solid rgba(31,175,90,0.25)', borderRadius: 12 }} labelStyle={{ color: '#ffffff80' }} itemStyle={{ color: '#4DC97A' }} />
                  <Line type="monotone" dataKey="farmers" name="Farmers" stroke="#1FAF5A" strokeWidth={2.5} dot={false} />
                  <Line type="monotone" dataKey="revenue" name="Revenue (₹)" stroke="#FFD166" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Activity Feed */}
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-5">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <h3 className="text-white font-heading font-bold text-base">Live Activity</h3>
              </div>
              <div className="space-y-3">
                {recentActivity.map((a, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-start gap-3 p-3 rounded-xl transition-colors hover:bg-white/03"
                    style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}
                  >
                    <span className="text-base flex-shrink-0 mt-0.5">{a.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-white/70 text-xs leading-snug">{a.msg}</p>
                      <p className="text-white/30 text-xs mt-0.5">{a.time}</p>
                    </div>
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2" style={{ background: a.color }} />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* State Coverage + Tons Bar Chart */}
          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            <div className="glass rounded-2xl p-6">
              <h3 className="text-white font-heading font-bold mb-1">State Analytics</h3>
              <p className="text-white/40 text-xs mb-5">Farmer distribution & tons</p>
              <div className="space-y-4">
                {stateStats.map((s) => (
                  <div key={s.state}>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-white text-sm font-medium">{s.state}</span>
                      <div className="flex gap-4 text-xs">
                        <span className="text-white/50">{s.farmers.toLocaleString()} farmers</span>
                        <span className="font-semibold" style={{ color: s.color }}>{s.pct}%</span>
                      </div>
                    </div>
                    <div className="progress-bar">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${s.pct}%` }}
                        transition={{ delay: 0.5, duration: 1.2, ease: 'easeOut' }}
                        className="h-full rounded-full"
                        style={{ background: `linear-gradient(90deg, ${s.color}80, ${s.color})` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Monthly Tons */}
            <div className="glass rounded-2xl p-6">
              <h3 className="text-white font-heading font-bold mb-1">Tons Collected</h3>
              <p className="text-white/40 text-xs mb-4">Monthly residue volume</p>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={growthData} barSize={24}>
                  <CartesianGrid stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" vertical={false} />
                  <XAxis dataKey="month" tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: 'rgba(10,22,16,0.95)', border: '1px solid rgba(31,175,90,0.25)', borderRadius: 12 }} labelStyle={{ color: '#ffffff80' }} itemStyle={{ color: '#4DC97A' }} />
                  <defs>
                    <linearGradient id="tonsGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#4DC97A" />
                      <stop offset="100%" stopColor="#0E7A3F" />
                    </linearGradient>
                  </defs>
                  <Bar dataKey="tons" name="Tons" fill="url(#tonsGrad)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Quick Controls */}
          <div className="glass rounded-2xl p-6">
            <h3 className="text-white font-heading font-bold mb-5">System Controls</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: 'Broadcast Alert', icon: '📢', color: '#F87171' },
                { label: 'Export All Data', icon: '📊', color: '#60A5FA' },
                { label: 'Add New State', icon: '🗺️', color: '#4DC97A' },
                { label: 'Adjust Prices', icon: '💰', color: '#FFD166' },
              ].map((c) => (
                <button key={c.label}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-[1.03]"
                  style={{ background: `${c.color}10`, border: `1px solid ${c.color}20`, color: c.color }}>
                  <span className="text-2xl">{c.icon}</span>
                  {c.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
