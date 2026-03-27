import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiArrowRight, FiInfo } from 'react-icons/fi';
import { GiWheat } from 'react-icons/gi';
import { MdEco, MdLocalShipping } from 'react-icons/md';

const PRICE_PER_TON = 600;
const TONS_PER_ACRE = 2.5;
const PICKUPS_PER_YEAR = 2;

function Slider({ value, min, max, step, onChange, label, color }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-white/55 text-sm font-medium">{label}</span>
        <span className="text-white font-bold font-heading text-lg">{value}</span>
      </div>
      <div className="relative h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.1)' }}>
        <div className="absolute left-0 top-0 h-full rounded-full transition-all duration-200"
          style={{ width: `${pct}%`, background: color || 'linear-gradient(90deg, #0E7A3F, #4DC97A)' }} />
        <input
          type="range" min={min} max={max} step={step} value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full opacity-0 cursor-pointer h-full"
          style={{ zIndex: 10 }}
        />
        <div className="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full border-2 border-white shadow-lg transition-all duration-200 pointer-events-none"
          style={{ left: `calc(${pct}% - 10px)`, background: color?.includes('#') ? color.split(',')[0].replace('linear-gradient(90deg, ', '') : '#1FAF5A' }} />
      </div>
      <div className="flex justify-between text-white/30 text-xs mt-1">
        <span>{min}</span><span>{max}</span>
      </div>
    </div>
  );
}

export default function ForFarmers() {
  const [acres, setAcres] = useState(5);
  const [months, setMonths] = useState(1);
  const navigate = useNavigate();

  const tons = acres * TONS_PER_ACRE * months;
  const earnings = tons * PRICE_PER_TON;
  const co2Saved = tons * 2.7;
  const bonusEarnings = acres >= 10 ? earnings * 0.1 : 0;
  const totalEarnings = earnings + bonusEarnings;

  return (
    <section id="farmers" className="relative py-28 overflow-hidden" style={{ background: 'linear-gradient(180deg, #050D0A 0%, #071610 50%, #050D0A 100%)' }}>
      {/* Background */}
      <div className="absolute inset-0 bg-dots opacity-50" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full opacity-10"
        style={{ background: 'radial-gradient(ellipse, #1FAF5A 0%, transparent 70%)' }} />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="badge badge-green mb-4">For Farmers</span>
          <h2 className="section-title text-white mb-5">
            Calculate Your <span className="text-gradient">Earnings</span>
          </h2>
          <p className="section-subtitle mx-auto text-center">
            Slide to enter your farm size and see exactly how much FarmEasy will pay you — directly in your bank account.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Calculator */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="glass rounded-3xl p-8"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(31,175,90,0.2)' }}>
                <GiWheat className="text-primary text-xl" />
              </div>
              <div>
                <h3 className="text-white font-heading font-bold text-lg">Earnings Calculator</h3>
                <p className="text-white/40 text-xs">Adjust sliders to personalize</p>
              </div>
            </div>

            <div className="space-y-7">
              <Slider
                value={acres}
                min={1}
                max={100}
                step={1}
                onChange={setAcres}
                label="Farm Size (Acres)"
              />
              <Slider
                value={months}
                min={1}
                max={2}
                step={1}
                onChange={setMonths}
                label="Harvests per Year"
                color="linear-gradient(90deg, #F59E0B, #FFD166)"
              />
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-3 gap-3 mt-8">
              {[
                { label: 'Residue (Tons)', value: tons.toFixed(1), color: '#4DC97A', icon: GiWheat },
                { label: 'CO₂ Saved (T)', value: co2Saved.toFixed(0), color: '#60A5FA', icon: MdEco },
                { label: 'Free Pickups', value: months, color: '#A78BFA', icon: MdLocalShipping },
              ].map((r) => (
                <div key={r.label} className="rounded-2xl p-4 text-center"
                  style={{ background: `${r.color}12`, border: `1px solid ${r.color}25` }}>
                  <r.icon style={{ color: r.color }} className="mx-auto text-xl mb-2" />
                  <div className="font-heading font-bold text-lg text-white">{r.value}</div>
                  <div className="text-white/40 text-xs">{r.label}</div>
                </div>
              ))}
            </div>

            {/* CTA — now navigates to registration page */}
            <div className="mt-6">
              <button
                onClick={() => navigate('/register/farmer')}
                className="btn-primary w-full py-4 text-base"
              >
                Register & Book Pickup
                <FiArrowRight />
              </button>
              {acres >= 10 && (
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center text-xs text-amber-400 mt-3 flex items-center justify-center gap-1"
                >
                  <FiInfo size={12} />
                  10+ acre farms get 10% loyalty bonus!
                </motion.p>
              )}
            </div>
          </motion.div>

          {/* Earnings Display */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex flex-col gap-5"
          >
            {/* Big Earnings Number */}
            <motion.div
              key={totalEarnings}
              initial={{ scale: 0.95, opacity: 0.7 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="glass-green rounded-3xl p-8 text-center"
            >
              <p className="text-white/50 text-sm font-medium mb-3 uppercase tracking-widest">Your Estimated Earnings</p>
              <div className="font-heading font-bold mb-1" style={{ fontSize: 'clamp(2.5rem,6vw,4.5rem)', letterSpacing: '-0.03em' }}>
                <span className="text-gradient">₹{totalEarnings.toLocaleString()}</span>
              </div>
              <p className="text-white/40 text-sm">per year · {acres} acres · {months} harvest{months > 1 ? 's' : ''}</p>

              {bonusEarnings > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium"
                  style={{ background: 'rgba(255,209,70,0.15)', border: '1px solid rgba(255,209,70,0.3)', color: '#FFD166' }}
                >
                  🎉 Includes ₹{bonusEarnings.toLocaleString()} loyalty bonus!
                </motion.div>
              )}
            </motion.div>

            {/* Breakdown Table */}
            <div className="glass rounded-2xl p-6">
              <h4 className="text-white font-semibold mb-4 text-sm">Earnings Breakdown</h4>
              <div className="space-y-3">
                {[
                  { label: 'Base rate', val: `₹${PRICE_PER_TON}/ton` },
                  { label: 'Estimated residue', val: `${tons.toFixed(1)} tons` },
                  { label: 'Collection fee', val: 'FREE' },
                  { label: 'Payment mode', val: 'Direct Bank Transfer' },
                  { label: 'Payment cycle', val: 'Within 7 days' },
                ].map((r) => (
                  <div key={r.label} className="flex justify-between items-center py-2.5 border-b border-white/05">
                    <span className="text-white/50 text-sm">{r.label}</span>
                    <span className={`text-sm font-semibold ${r.val === 'FREE' ? 'text-primary' : 'text-white'}`}>{r.val}</span>
                  </div>
                ))}
                <div className="flex justify-between items-center pt-2">
                  <span className="text-white font-bold">Total Annual Earnings</span>
                  <span className="text-gradient font-heading font-bold text-xl">₹{totalEarnings.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Simple CTA instead of OTP flow */}
            <div className="glass rounded-2xl p-6 border border-white/08 text-center">
              <p className="text-white/60 text-sm mb-4">
                Ready to start earning? Register in under 2 minutes.
              </p>
              <button
                onClick={() => navigate('/register/farmer')}
                className="btn-primary w-full py-3.5"
              >
                Create Free Account
                <FiArrowRight />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
