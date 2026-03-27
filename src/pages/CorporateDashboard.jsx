import { useState } from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { FiHome, FiPackage, FiAward, FiSettings, FiArrowRight, FiBell, FiDownload } from 'react-icons/fi';
import { MdEco, MdCo2 } from 'react-icons/md';
import { GiForestCamp } from 'react-icons/gi';
import { GiWheat } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

const orderData = [
  { month: 'Oct', units: 20000 },
  { month: 'Nov', units: 35000 },
  { month: 'Dec', units: 28000 },
  { month: 'Jan', units: 50000 },
  { month: 'Feb', units: 42000 },
  { month: 'Mar', units: 65000 },
];

const impactData = [
  { month: 'Oct', co2: 3.2 },
  { month: 'Nov', co2: 5.6 },
  { month: 'Dec', co2: 4.4 },
  { month: 'Jan', co2: 8.1 },
  { month: 'Feb', co2: 6.7 },
  { month: 'Mar', co2: 10.4 },
];

const orders = [
  { id: '#ORD-4521', product: 'Eco Dinner Plate', units: '20,000', amount: '₹1,60,000', date: 'Mar 15', status: 'Delivered', statusColor: '#4DC97A' },
  { id: '#ORD-4388', product: 'Deep Bowl Set', units: '10,000', amount: '₹1,20,000', date: 'Feb 28', status: 'In Transit', statusColor: '#60A5FA' },
  { id: '#ORD-4210', product: 'Spoon + Fork Set', units: '50,000', amount: '₹1,50,000', date: 'Jan 12', status: 'Delivered', statusColor: '#4DC97A' },
  { id: '#ORD-5001', product: 'Custom Branded Plate', units: '35,000', amount: '₹2,80,000', date: 'Apr 10', status: 'Processing', statusColor: '#FFD166' },
];

const navItems = [
  { icon: FiHome, label: 'Dashboard', id: 'home' },
  { icon: FiPackage, label: 'My Orders', id: 'orders' },
  { icon: MdEco, label: 'Impact Report', id: 'impact' },
  { icon: FiAward, label: 'Certificates', id: 'certs' },
  { icon: FiSettings, label: 'Settings', id: 'settings' },
];

const pieData = [
  { name: 'Eco Plates', value: 45, color: '#4DC97A' },
  { name: 'Bowls', value: 25, color: '#60A5FA' },
  { name: 'Cutlery', value: 20, color: '#A78BFA' },
  { name: 'Custom', value: 10, color: '#FFD166' },
];

export default function CorporateDashboard() {
  const [activeNav, setActiveNav] = useState('home');
  const [showCert, setShowCert] = useState(false);

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
        <div className="p-4 mx-4 mt-4 rounded-2xl mb-2" style={{ background: 'rgba(255,209,70,0.08)', border: '1px solid rgba(255,209,70,0.2)' }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400/20 flex items-center justify-center text-xl">🏢</div>
            <div>
              <div className="text-white text-sm font-semibold">GreenCorp India</div>
              <div className="text-white/40 text-xs">Enterprise · Verified ✓</div>
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
        {/* Topbar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/06" style={{ background: 'rgba(8,20,14,0.8)', backdropFilter: 'blur(20px)' }}>
          <div>
            <h1 className="text-white font-heading font-bold text-lg">Corporate Dashboard</h1>
            <p className="text-white/40 text-xs">GreenCorp India · ESG Period: FY 2025–26</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowCert(true)}
              className="btn-gold text-xs px-4 py-2.5">
              <FiAward />
              Get Certificate
            </button>
            <button className="w-9 h-9 rounded-xl flex items-center justify-center relative" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <FiBell size={16} className="text-white/60" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-amber-400" />
            </button>
            <div className="w-9 h-9 rounded-xl bg-amber-400/20 flex items-center justify-center text-base">🏢</div>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-6">
          {/* KPIs */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[
              { label: 'Total Spend', value: '₹7.1L+', sub: 'FY 2025-26', color: '#FFD166', icon: '💰' },
              { label: 'Units Ordered', value: '1.15L+', sub: 'Across 4 products', color: '#4DC97A', icon: '📦' },
              { label: 'CO₂ Prevented', value: '17.3 MT', sub: 'Metric tons', color: '#60A5FA', icon: '🌿' },
              { label: 'Certificates', value: '4 Issued', sub: 'ESG verified', color: '#A78BFA', icon: '🏆' },
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
            {/* Order Trend Chart */}
            <div className="lg:col-span-2 glass rounded-2xl p-6">
              <h3 className="text-white font-heading font-bold mb-1">Order Volume Trend</h3>
              <p className="text-white/40 text-xs mb-5">Units ordered per month</p>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={orderData} barSize={28}>
                  <CartesianGrid stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" vertical={false} />
                  <XAxis dataKey="month" tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: 'rgba(10,22,16,0.95)', border: '1px solid rgba(31,175,90,0.25)', borderRadius: 12 }} labelStyle={{ color: '#ffffff80' }} itemStyle={{ color: '#4DC97A' }} />
                  <Bar dataKey="units" fill="url(#barGrad)" radius={[6, 6, 0, 0]} />
                  <defs>
                    <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#1FAF5A" />
                      <stop offset="100%" stopColor="#0E7A3F" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Product Mix Pie */}
            <div className="glass rounded-2xl p-6">
              <h3 className="text-white font-heading font-bold mb-1">Product Mix</h3>
              <p className="text-white/40 text-xs mb-4">By order volume</p>
              <ResponsiveContainer width="100%" height={140}>
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={40} outerRadius={65} paddingAngle={3} dataKey="value">
                    {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 mt-3">
                {pieData.map((d) => (
                  <div key={d.name} className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full" style={{ background: d.color }} /><span className="text-white/60">{d.name}</span></span>
                    <span className="font-semibold" style={{ color: d.color }}>{d.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Impact Summary */}
          <div className="glass-green rounded-2xl p-6 mb-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-white font-heading font-bold">ESG Impact Summary</h3>
                <p className="text-white/40 text-xs">FY 2025–26 · GreenCorp India</p>
              </div>
              <button className="btn-glass text-xs px-4 py-2">
                <FiDownload size={12} />
                Export Report
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { icon: MdCo2, val: '17.3 MT', label: 'CO₂ Prevented', color: '#60A5FA' },
                { icon: GiForestCamp, val: '173 Trees', label: 'Trees Equivalent', color: '#4DC97A' },
                { icon: MdEco, val: '1,380 kg', label: 'Plastic Displaced', color: '#A78BFA' },
                { icon: GiForestCamp, val: '57,500 L', label: 'Water Saved', color: '#38BDF8' },
              ].map((s) => (
                <div key={s.label} className="rounded-xl p-4 text-center" style={{ background: `${s.color}10`, border: `1px solid ${s.color}20` }}>
                  <s.icon style={{ color: s.color }} className="text-2xl mx-auto mb-2" />
                  <div className="font-heading font-bold text-lg text-white">{s.val}</div>
                  <div className="text-white/40 text-xs mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Orders Table */}
          <div className="glass rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between p-6 pb-4">
              <h3 className="text-white font-heading font-bold">Order History</h3>
              <button className="btn-primary text-xs px-4 py-2">+ New Order</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-y border-white/06">
                    {['Order ID', 'Product', 'Units', 'Amount', 'Date', 'Status'].map((h) => (
                      <th key={h} className="text-left px-6 py-3 text-white/40 text-xs font-medium uppercase tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o, i) => (
                    <tr key={o.id} className="border-b border-white/04 hover:bg-white/03 transition-colors">
                      <td className="px-6 py-4 text-amber-400 text-sm font-mono">{o.id}</td>
                      <td className="px-6 py-4 text-white text-sm">{o.product}</td>
                      <td className="px-6 py-4 text-white/60 text-sm">{o.units}</td>
                      <td className="px-6 py-4 text-white font-semibold text-sm">{o.amount}</td>
                      <td className="px-6 py-4 text-white/45 text-sm">{o.date}</td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-lg text-xs font-semibold"
                          style={{ background: `${o.statusColor}18`, color: o.statusColor, border: `1px solid ${o.statusColor}30` }}>
                          {o.status}
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

      {/* Certificate Modal */}
      <AnimatePresence>
        {showCert && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)' }}
            onClick={() => setShowCert(false)}
          >
            <motion.div
              initial={{ scale: 0.7, rotateY: 20, opacity: 0 }}
              animate={{ scale: 1, rotateY: 0, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 25 }}
              className="max-w-md w-full rounded-3xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
              style={{ background: 'linear-gradient(135deg, #071610 0%, #0A2218 100%)', border: '1px solid rgba(31,175,90,0.3)' }}
            >
              <div className="h-2 w-full" style={{ background: 'linear-gradient(90deg, #0E7A3F, #1FAF5A, #4DC97A, #FFD166, #4DC97A, #0E7A3F)' }} />
              <div className="p-10 text-center">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3, type: 'spring', stiffness: 300 }}
                  className="w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center text-4xl"
                  style={{ background: 'linear-gradient(135deg, #0E7A3F, #1FAF5A)' }}>
                  🏆
                </motion.div>
                <p className="text-primary/70 text-xs font-medium uppercase tracking-[0.3em] mb-2">Certificate of Sustainability</p>
                <h3 className="font-heading font-bold text-white text-3xl mb-1">GreenCorp India</h3>
                <p className="text-white/40 text-sm mb-8">Blockchain Verified · FY 2025–26</p>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {[{ label: 'CO₂ Prevented', val: '17.3 MT' }, { label: 'Trees Equivalent', val: '173' }, { label: 'Units Ordered', val: '1.15L+' }, { label: 'Plastic Displaced', val: '1,380 kg' }].map((s) => (
                    <div key={s.label} className="rounded-xl p-4" style={{ background: 'rgba(31,175,90,0.1)', border: '1px solid rgba(31,175,90,0.2)' }}>
                      <div className="text-primary font-heading font-bold text-lg">{s.val}</div>
                      <div className="text-white/40 text-xs mt-0.5">{s.label}</div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-center gap-2 mb-6 text-primary text-sm">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <motion.path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.7, duration: 0.8 }} />
                  </svg>
                  Verified · ID #FE-CORP-2026-4521
                </div>
                <button className="btn-primary w-full py-3.5 text-sm mb-3">
                  <FiDownload />
                  Download PDF Certificate
                </button>
                <button onClick={() => setShowCert(false)} className="btn-glass w-full text-sm">Close</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
