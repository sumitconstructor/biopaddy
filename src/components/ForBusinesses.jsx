import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiPackage, FiAward } from 'react-icons/fi';
import { MdEco, MdCo2, MdWater } from 'react-icons/md';
import { GiForestCamp } from 'react-icons/gi';

const CO2_PER_UNIT = 0.00015; // tons CO2 per utensil
const TREES_PER_UNIT = 0.001;
const WATER_PER_UNIT = 0.5; // liters

const products = [
  { name: 'Eco Dinner Plate', uses: 3000, icon: '🍽️', price: '₹8/piece', moq: '5,000 pcs', color: '#4DC97A' },
  { name: 'Eco Bowl Set', uses: 2000, icon: '🥣', price: '₹12/piece', moq: '3,000 pcs', color: '#60A5FA' },
  { name: 'Eco Spoon Pack', uses: 5000, icon: '🥄', price: '₹3/piece', moq: '10,000 pcs', color: '#A78BFA' },
  { name: 'Custom Set', uses: 10000, icon: '📦', price: 'Custom', moq: 'Negotiable', color: '#FFD166' },
];

export default function ForBusinesses() {
  const [units, setUnits] = useState(5000);
  const [selectedProduct, setSelectedProduct] = useState(0);
  const [showCert, setShowCert] = useState(false);

  const co2Saved = (units * CO2_PER_UNIT).toFixed(2);
  const treesEquiv = Math.floor(units * TREES_PER_UNIT);
  const waterLiters = (units * WATER_PER_UNIT).toFixed(0);

  return (
    <section id="businesses" className="relative py-28" style={{ background: 'linear-gradient(180deg, #050D0A, #071410, #050D0A)' }}>
      <div className="absolute inset-0 bg-grid" />
      <div className="absolute top-1/2 right-0 w-[600px] h-[600px] rounded-full opacity-08"
        style={{ background: 'radial-gradient(circle, #1FAF5A 0%, transparent 70%)' }} />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="badge badge-gold mb-4">For Businesses</span>
          <h2 className="section-title text-white mb-5">
            Your Sustainability <span className="text-gradient">Impact Calculator</span>
          </h2>
          <p className="section-subtitle mx-auto text-center">
            Replace plastic with FarmEasy utensils. See your real CO₂ impact — and get a verified certificate for your ESG reports.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Product Selector + Slider */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-5"
          >
            {/* Product Grid */}
            <div className="glass rounded-3xl p-6">
              <h3 className="text-white font-heading font-bold text-lg mb-5">Select Product</h3>
              <div className="grid grid-cols-2 gap-3">
                {products.map((p, i) => (
                  <button
                    key={p.name}
                    onClick={() => setSelectedProduct(i)}
                    className={`rounded-2xl p-4 text-left transition-all duration-200 ${selectedProduct === i ? 'ring-2' : ''}`}
                    style={{
                      background: selectedProduct === i ? `${p.color}18` : 'rgba(255,255,255,0.04)',
                      border: `1px solid ${selectedProduct === i ? `${p.color}40` : 'rgba(255,255,255,0.08)'}`,
                      '--tw-ring-color': p.color,
                    }}
                  >
                    <div className="text-2xl mb-2">{p.icon}</div>
                    <div className="text-white text-sm font-semibold">{p.name}</div>
                    <div className="text-white/40 text-xs mt-1">{p.price} · MOQ {p.moq}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Unit Slider */}
            <div className="glass rounded-2xl p-6">
              <h3 className="text-white font-semibold mb-5 text-sm">Order Volume</h3>
              <div className="flex justify-between items-center mb-3">
                <span className="text-white/55 text-sm">Units per order</span>
                <span className="text-white font-heading font-bold text-2xl">{units.toLocaleString()}</span>
              </div>
              <div className="relative h-2 rounded-full mb-1" style={{ background: 'rgba(255,255,255,0.1)' }}>
                <div className="absolute left-0 top-0 h-full rounded-full"
                  style={{ width: `${((units - 1000) / (200000 - 1000)) * 100}%`, background: 'linear-gradient(90deg, #0E7A3F, #4DC97A)' }} />
                <input type="range" min={1000} max={200000} step={1000} value={units}
                  onChange={(e) => setUnits(Number(e.target.value))}
                  className="absolute inset-0 w-full opacity-0 cursor-pointer h-full" style={{ zIndex: 10 }} />
                <div className="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full border-2 border-white shadow-lg pointer-events-none"
                  style={{ left: `calc(${((units - 1000) / (200000 - 1000)) * 100}% - 10px)`, background: '#1FAF5A' }} />
              </div>
              <div className="flex justify-between text-white/30 text-xs mt-1">
                <span>1,000</span><span>2,00,000</span>
              </div>

              {/* Tier Badges */}
              <div className="flex gap-2 mt-5 flex-wrap">
                {[
                  { label: 'Starter', min: 1000, max: 10000, color: '#4DC97A' },
                  { label: 'Business', min: 10000, max: 50000, color: '#60A5FA' },
                  { label: 'Enterprise', min: 50000, max: 200000, color: '#FFD166' },
                ].map((t) => {
                  const active = units >= t.min && units < t.max;
                  return (
                    <span key={t.label} className="px-3 py-1 rounded-full text-xs font-semibold transition-all"
                      style={{
                        background: active ? `${t.color}20` : 'rgba(255,255,255,0.04)',
                        border: `1px solid ${active ? `${t.color}40` : 'rgba(255,255,255,0.08)'}`,
                        color: active ? t.color : 'rgba(255,255,255,0.3)',
                      }}>
                      {t.label}
                    </span>
                  );
                })}
                {units >= 50000 && (
                  <span className="px-3 py-1 rounded-full text-xs font-semibold"
                    style={{ background: 'rgba(255,209,70,0.2)', border: '1px solid rgba(255,209,70,0.4)', color: '#FFD166' }}>
                    Enterprise
                  </span>
                )}
              </div>
            </div>
          </motion.div>

          {/* Impact Result */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-5"
          >
            {/* Impact Numbers */}
            <div className="glass-green rounded-3xl p-8">
              <p className="text-white/50 text-xs font-medium uppercase tracking-widest mb-2">Your Environmental Impact</p>
              <div className="grid grid-cols-1 gap-4 mt-4">
                {[
                  { label: 'CO₂ Prevented', value: `${co2Saved} MT`, icon: MdCo2, color: '#60A5FA', desc: 'Metric tons of carbon not released' },
                  { label: 'Trees Equivalent', value: `${treesEquiv.toLocaleString()}`, icon: GiForestCamp, color: '#4DC97A', desc: 'Trees you effectively planted' },
                  { label: 'Water Saved', value: `${Number(waterLiters).toLocaleString()} L`, icon: MdWater, color: '#38BDF8', desc: 'vs plastic manufacturing' },
                  { label: 'Plastic Replaced', value: `${(units * 0.012).toFixed(0)} kg`, icon: MdEco, color: '#A78BFA', desc: 'Single-use plastic avoided' },
                ].map((stat) => (
                  <motion.div
                    key={stat.label}
                    layout
                    className="flex items-center gap-4 rounded-xl p-4"
                    style={{ background: `${stat.color}10`, border: `1px solid ${stat.color}20` }}
                  >
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: `${stat.color}18` }}>
                      <stat.icon style={{ color: stat.color }} className="text-2xl" />
                    </div>
                    <div className="flex-1">
                      <div className="text-white/50 text-xs mb-0.5">{stat.label}</div>
                      <div className="font-heading font-bold text-xl text-white">{stat.value}</div>
                      <div className="text-white/30 text-xs">{stat.desc}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Certificate Button */}
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(255,209,70,0.15)' }}>
                  <FiAward className="text-amber-400 text-xl" />
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">ESG Sustainability Certificate</div>
                  <div className="text-white/40 text-xs">Blockchain-verified · PDF + Digital</div>
                </div>
              </div>
              <p className="text-white/45 text-sm mb-5">
                Get a verified sustainability certificate for your annual ESG reports, investor decks, and marketing materials.
              </p>
              <button
                onClick={() => setShowCert(true)}
                className="btn-gold w-full py-3.5 text-sm"
              >
                <FiAward />
                Generate My Certificate
                <FiArrowRight />
              </button>
            </div>

            {/* Place Order */}
            <div className="flex gap-3">
              <button className="btn-primary flex-1 py-4">
                <FiPackage />
                Place Bulk Order
              </button>
              <button className="btn-outline px-5 py-4">Talk to Sales</button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Certificate Modal */}
      <AnimatePresence>
        {showCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)' }}
            onClick={() => setShowCert(false)}
          >
            <motion.div
              initial={{ scale: 0.7, rotateY: 20, opacity: 0 }}
              animate={{ scale: 1, rotateY: 0, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 25 }}
              className="max-w-lg w-full rounded-3xl relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
              style={{ background: 'linear-gradient(135deg, #071610 0%, #0A2218 50%, #071610 100%)', border: '1px solid rgba(31,175,90,0.3)' }}
            >
              {/* Certificate top border */}
              <div className="h-2 w-full" style={{ background: 'linear-gradient(90deg, #0E7A3F, #1FAF5A, #4DC97A, #FFD166, #4DC97A, #1FAF5A, #0E7A3F)' }} />

              <div className="p-10 text-center">
                {/* Logo */}
                <motion.div
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.3, type: 'spring', stiffness: 300 }}
                  className="w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #0E7A3F, #1FAF5A)' }}
                >
                  <span className="text-4xl">🌿</span>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                  <p className="text-primary/70 text-xs font-medium uppercase tracking-[0.3em] mb-2">Certificate of Sustainability</p>
                  <h3 className="font-heading font-bold text-white text-3xl mb-1">FarmEasy Impact</h3>
                  <p className="text-white/40 text-sm mb-8">Blockchain Verified · March 2026</p>

                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {[
                      { label: 'CO₂ Prevented', value: `${co2Saved} MT` },
                      { label: 'Trees Equivalent', value: `${treesEquiv.toLocaleString()}` },
                      { label: 'Units Ordered', value: units.toLocaleString() },
                      { label: 'Water Saved', value: `${Number(waterLiters).toLocaleString()} L` },
                    ].map((s) => (
                      <div key={s.label} className="rounded-xl p-4"
                        style={{ background: 'rgba(31,175,90,0.1)', border: '1px solid rgba(31,175,90,0.2)' }}>
                        <div className="text-primary font-heading font-bold text-lg">{s.value}</div>
                        <div className="text-white/40 text-xs mt-0.5">{s.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Animated check */}
                  <div className="flex items-center justify-center gap-2 mb-6" style={{ color: '#4DC97A' }}>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <motion.path
                        strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                        transition={{ delay: 0.7, duration: 0.8 }}
                      />
                    </svg>
                    <span className="text-sm font-medium">Verified on Ethereum · ID #FE-2026-{Math.floor(Math.random() * 90000) + 10000}</span>
                  </div>

                  <button
                    onClick={() => setShowCert(false)}
                    className="btn-primary w-full py-3.5 text-sm"
                  >
                    Download PDF Certificate
                    <FiArrowRight />
                  </button>
                  <button onClick={() => setShowCert(false)} className="btn-glass w-full mt-3 text-sm">Close</button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
