import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

function useCountUp(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

const chartData = [
  { month: 'Sep', tons: 2100, earnings: 1260, co2: 5670, farmers: 3200 },
  { month: 'Oct', tons: 4800, earnings: 2880, co2: 12960, farmers: 5400 },
  { month: 'Nov', tons: 8200, earnings: 4920, co2: 22140, farmers: 7800 },
  { month: 'Dec', tons: 12400, earnings: 7440, co2: 33480, farmers: 9600 },
  { month: 'Jan', tons: 15800, earnings: 9480, co2: 42660, farmers: 10900 },
  { month: 'Feb', tons: 18600, earnings: 11160, co2: 50220, farmers: 11800 },
  { month: 'Mar', tons: 21200, earnings: 12720, co2: 57240, farmers: 12847 },
];

const bigStats = [
  { label: 'Tons Collected', value: 84621, suffix: '+', prefix: '', color: '#4DC97A', secondLine: 'Kharif + Rabi season' },
  { label: 'Paid to Farmers', value: 31, suffix: 'Cr+', prefix: '₹', color: '#FFD166', secondLine: 'Direct bank transfer' },
  { label: 'CO₂ Prevented', value: 228, suffix: 'K MT', prefix: '', color: '#60A5FA', secondLine: 'Metric tons of CO₂' },
  { label: 'Zero-Burn Acres', value: 33800, suffix: '+', prefix: '', color: '#A78BFA', secondLine: 'Across 3 states' },
];

const stateData = [
  { name: 'Punjab', pct: 42, acres: '14.2K+', color: '#4DC97A' },
  { name: 'Haryana', pct: 33, acres: '11.2K+', color: '#60A5FA' },
  { name: 'Uttar Pradesh', pct: 25, acres: '8.4K+', color: '#FFD166' },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="px-4 py-3 rounded-xl" style={{ background: 'rgba(10,22,16,0.95)', border: '1px solid rgba(31,175,90,0.25)', backdropFilter: 'blur(20px)' }}>
        <p className="text-white/70 text-xs mb-2">{label}</p>
        {payload.map((p) => (
          <p key={p.name} className="text-xs font-semibold" style={{ color: p.color }}>
            {p.name}: {Number(p.value).toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function Impact() {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const c0 = useCountUp(bigStats[0].value, 2200, inView);
  const c1 = useCountUp(bigStats[1].value, 2000, inView);
  const c2 = useCountUp(bigStats[2].value, 2400, inView);
  const c3 = useCountUp(bigStats[3].value, 2600, inView);
  const counts = [c0, c1, c2, c3];

  return (
    <section id="impact" ref={ref} className="relative py-28" style={{ background: '#050D0A' }}>
      <div className="absolute inset-0 bg-grid opacity-50" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full opacity-08"
        style={{ background: 'radial-gradient(ellipse, #1FAF5A 0%, transparent 70%)' }} />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="badge badge-green mb-4">Live Impact</span>
          <h2 className="section-title text-white mb-5">
            Numbers That <span className="text-gradient">Matter</span>
          </h2>
          <p className="section-subtitle mx-auto text-center">
            Real-time impact across North India. Updated every 24 hours from our operations data.
          </p>
        </motion.div>

        {/* Big Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {bigStats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="glass rounded-2xl p-6 text-center hover:scale-[1.03] transition-transform duration-300"
            >
              <div className="font-heading font-bold mb-1" style={{ fontSize: 'clamp(1.8rem,3vw,2.8rem)', color: s.color }}>
                {s.prefix}{counts[i].toLocaleString()}{s.suffix}
              </div>
              <div className="text-white font-semibold text-sm mb-1">{s.label}</div>
              <div className="text-white/35 text-xs">{s.secondLine}</div>
            </motion.div>
          ))}
        </div>

        {/* Main Chart + State Breakdown */}
        <div className="grid lg:grid-cols-3 gap-5">
          {/* Area Chart — 2/3 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2 glass rounded-3xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-white font-heading font-bold text-lg">Growth Dashboard</h3>
                <p className="text-white/40 text-xs">Sep 2025 – Mar 2026</p>
              </div>
              <div className="flex gap-4 text-xs text-white/50">
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-primary" />Tons</span>
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-400" />₹K Paid</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="gTons" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1FAF5A" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#1FAF5A" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gEarn" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FFD166" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#FFD166" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />
                <XAxis dataKey="month" tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="tons" name="Tons" stroke="#1FAF5A" strokeWidth={2.5} fill="url(#gTons)" dot={false} />
                <Area type="monotone" dataKey="earnings" name="₹K Paid" stroke="#FFD166" strokeWidth={2} fill="url(#gEarn)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* State Breakdown — 1/3 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex flex-col gap-5"
          >
            <div className="glass rounded-3xl p-6 flex-1">
              <h3 className="text-white font-heading font-bold text-lg mb-2">State Coverage</h3>
              <p className="text-white/40 text-xs mb-6">Acres under FarmEasy</p>
              <div className="space-y-5">
                {stateData.map((s, i) => (
                  <div key={s.name}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white text-sm font-medium">{s.name}</span>
                      <span className="text-xs font-semibold" style={{ color: s.color }}>{s.acres} · {s.pct}%</span>
                    </div>
                    <div className="progress-bar">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${s.pct}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + i * 0.15, duration: 1.2, ease: 'easeOut' }}
                        className="h-full rounded-full"
                        style={{ background: `linear-gradient(90deg, ${s.color}80, ${s.color})` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mini Live Feed */}
            <div className="glass rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-white/60 text-xs font-medium">Live Activity Feed</span>
              </div>
              <div className="space-y-2.5">
                {[
                  { txt: 'Pickup completed · Moga, PB', time: '2m ago', color: '#4DC97A' },
                  { txt: 'Payment sent · ₹4,200', time: '8m ago', color: '#FFD166' },
                  { txt: 'New farmer joined · Hisar', time: '15m ago', color: '#60A5FA' },
                  { txt: 'Order shipped · 20K plates', time: '31m ago', color: '#A78BFA' },
                ].map((a, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: a.color }} />
                    <div className="flex-1">
                      <p className="text-white/65 text-xs">{a.txt}</p>
                      <p className="text-white/30 text-xs">{a.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Environmental Equivalencies Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 glass-green rounded-3xl p-8"
        >
          <p className="text-white/50 text-xs font-medium uppercase tracking-widest text-center mb-8">Environmental Equivalencies — What Our Impact Means</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { icon: '🌳', value: '228,000+', label: 'Trees Worth of CO₂' },
              { icon: '✈️', value: '4,900+', label: 'Flights Offset' },
              { icon: '🚗', value: '51M+', label: 'Car Miles Reduced' },
              { icon: '🏠', value: '1,100+', label: 'Homes Powered (yr)' },
            ].map((e) => (
              <div key={e.label} className="text-center">
                <div className="text-4xl mb-3">{e.icon}</div>
                <div className="font-heading font-bold text-white text-xl mb-1">{e.value}</div>
                <div className="text-white/40 text-xs">{e.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
