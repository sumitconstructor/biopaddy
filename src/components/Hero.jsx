import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiArrowRight, FiZap, FiTrendingUp } from 'react-icons/fi';
import { GiWheat } from 'react-icons/gi';
import { MdEco, MdAttachMoney } from 'react-icons/md';

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

const liveStats = [
  { label: 'Farmers Earning', value: 12847, suffix: '+', icon: GiWheat, color: '#4DC97A', bg: 'rgba(31,175,90,0.15)' },
  { label: 'Tons Collected', value: 84621, suffix: '+', icon: FiTrendingUp, color: '#60A5FA', bg: 'rgba(96,165,250,0.12)' },
  { label: 'CO₂ Saved (MT)', value: 1240, suffix: 'K', icon: MdEco, color: '#A78BFA', bg: 'rgba(167,139,250,0.12)' },
  { label: 'Crore Paid Out', value: 31, suffix: 'Cr+', icon: MdAttachMoney, color: '#FFD166', bg: 'rgba(255,209,70,0.12)' },
];

export default function Hero() {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, -120]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0.2]);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const c0 = useCountUp(liveStats[0].value, 2400, inView);
  const c1 = useCountUp(liveStats[1].value, 2200, inView);
  const c2 = useCountUp(liveStats[2].value, 2000, inView);
  const c3 = useCountUp(liveStats[3].value, 1800, inView);
  const counts = [c0, c1, c2, c3];

  return (
    <section id="home" ref={ref} className="relative min-h-screen flex items-center overflow-hidden bg-mesh">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid opacity-100" />
      
      {/* Ambient Orbs */}
      <div className="absolute top-1/4 -left-32 w-[600px] h-[600px] rounded-full opacity-20" 
        style={{ background: 'radial-gradient(circle, #1FAF5A 0%, transparent 70%)' }} />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full opacity-15"
        style={{ background: 'radial-gradient(circle, #0E7A3F 0%, transparent 70%)' }} />
      <div className="absolute top-0 right-1/3 w-[300px] h-[300px] rounded-full opacity-10"
        style={{ background: 'radial-gradient(circle, #FFD166 0%, transparent 70%)' }} />

      <motion.div style={{ y, opacity }} className="relative w-full max-w-7xl mx-auto px-5 sm:px-8 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* LEFT COLUMN */}
          <div>
            {/* Eyebrow Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2.5 mb-8"
            >
              <span className="badge badge-green">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                Live · North India Operations
              </span>
              <span className="badge badge-gold">
                <FiZap size={10} />
                ₹600/Ton Guaranteed
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="hero-title text-white mb-6"
            >
              Stop Burning.
              <br />
              <span className="text-gradient-hero">Start Earning.</span>
              <br />
              <span className="text-white/70">Save the Planet.</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-white/55 text-xl leading-relaxed mb-10 max-w-lg"
            >
              FarmEasy turns your crop stubble into{' '}
              <span className="text-white/80 font-medium">guaranteed income</span>. 
              We collect, convert, and create{' '}
              <span className="text-white/80 font-medium">biodegradable utensils</span>{' '}
              — ending stubble burning forever.
            </motion.p>

            {/* Feature Pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-3 mb-10"
            >
              {['Zero Burn Policy', 'Doorstep Pickup', 'Weekly Payouts', 'Govt. Certified'].map((f) => (
                <span key={f} className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium text-white/70"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <svg className="w-3 h-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {f}
                </span>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-4 mb-12"
            >
              <a href="#farmers" className="btn-gold text-base px-8 py-4 text-sm font-bold shadow-glow-gold">
                <GiWheat />
                I'm a Farmer — Earn Now
                <FiArrowRight />
              </a>
              <a href="#businesses" className="btn-outline text-base px-8 py-4">
                Buy Eco Products
              </a>
            </motion.div>

            {/* Social Proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex items-center gap-4"
            >
              <div className="flex -space-x-2.5">
                {['🧑‍🌾', '👨‍🌾', '🧑‍🌾', '👩‍🌾', '🧑‍🌾'].map((e, i) => (
                  <div key={i} className="w-9 h-9 rounded-full border-2 border-dark bg-gradient-to-br flex items-center justify-center text-sm"
                    style={{ background: `hsl(${130 + i * 15}, 60%, ${25 + i * 5}%)` }}>
                    {e}
                  </div>
                ))}
              </div>
              <div className="text-sm">
                <span className="text-white font-semibold">12,847+</span>
                <span className="text-white/50"> farmers already earning</span>
                <div className="flex gap-0.5 mt-0.5">
                  {[...Array(5)].map((_, i) => <span key={i} className="text-amber-400 text-xs">★</span>)}
                  <span className="text-white/40 text-xs ml-1">4.9/5</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN — Live Dashboard Card */}
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.97 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-4"
          >
            {/* Main Impact Card */}
            <div className="glass rounded-3xl p-6 animate-pulse-glow">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <p className="text-white/50 text-xs font-medium uppercase tracking-widest mb-1">Live Impact</p>
                  <h3 className="text-white font-heading font-bold text-xl">Real-Time Dashboard</h3>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
                  style={{ background: 'rgba(31,175,90,0.15)', border: '1px solid rgba(31,175,90,0.25)' }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  <span className="text-primary">LIVE</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {liveStats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="rounded-2xl p-4 hover:scale-[1.02] transition-transform duration-200 cursor-default"
                    style={{ background: stat.bg, border: `1px solid ${stat.color}22` }}
                  >
                    <stat.icon style={{ color: stat.color }} className="text-2xl mb-2.5" />
                    <div className="font-heading font-bold text-2xl text-white">
                      {counts[i].toLocaleString()}<span style={{ color: stat.color }} className="text-lg">{stat.suffix}</span>
                    </div>
                    <div className="text-white/45 text-xs mt-0.5">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Progress Bars */}
              <div className="mt-5 space-y-3">
                <div>
                  <div className="flex justify-between text-xs text-white/50 mb-1.5">
                    <span>Monthly Target</span>
                    <span className="text-primary font-medium">78%</span>
                  </div>
                  <div className="progress-bar">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '78%' }}
                      transition={{ delay: 1, duration: 1.5, ease: 'easeOut' }}
                      className="progress-fill"
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs text-white/50 mb-1.5">
                    <span>CO₂ Reduction Goal</span>
                    <span className="text-blue-400 font-medium">62%</span>
                  </div>
                  <div className="progress-bar">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '62%' }}
                      transition={{ delay: 1.2, duration: 1.5, ease: 'easeOut' }}
                      className="h-full rounded-full transition-all duration-1000"
                      style={{ background: 'linear-gradient(90deg, #3B82F6, #60A5FA)' }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Pickup Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.7 }}
              className="glass rounded-2xl p-5"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(255,209,70,0.15)' }}>
                    <GiWheat className="text-accent text-xl" />
                  </div>
                  <div>
                    <div className="text-white text-sm font-semibold">Book Pickup</div>
                    <div className="text-white/40 text-xs">Next slot: Tomorrow 7 AM</div>
                  </div>
                </div>
                <span className="badge badge-green text-xs">Free</span>
              </div>
              <div className="grid grid-cols-3 gap-2 mb-4">
                {['Mon', 'Tue', 'Wed'].map((d, i) => (
                  <button key={d} className={`py-2.5 rounded-xl text-xs font-semibold text-center transition-all duration-200 ${i === 0 ? 'bg-primary text-white shadow-glow' : 'text-white/60 hover:text-white'}`}
                    style={i !== 0 ? { background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' } : {}}>
                    {d}
                  </button>
                ))}
              </div>
              <a href="#farmers" className="btn-primary w-full text-sm py-3">
                Book Free Pickup
                <FiArrowRight />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Ticker Bar */}
      <div className="absolute bottom-0 left-0 right-0 py-3 overflow-hidden border-t border-white/06"
        style={{ background: 'rgba(5,13,10,0.85)', backdropFilter: 'blur(20px)' }}>
        <div className="animate-ticker flex whitespace-nowrap">
          {[...Array(2)].map((_, rep) => (
            <span key={rep} className="flex items-center gap-8 text-white/40 text-xs font-medium pr-8">
              {['🌾 Haryana · 4,200 tons collected this week', '🏭 12 new corporate partners joined', '🌱 1.4 lakh acres covered across Punjab', '💰 ₹8.2 Cr disbursed this month', '🇮🇳 Govt. approved pilot in 3 new states', '♻️ 5 Crore biodegradable utensils made'].map((t, i) => (
                <span key={i} className="flex items-center gap-2">{t}<span className="w-1 h-1 rounded-full bg-primary/40" /></span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
