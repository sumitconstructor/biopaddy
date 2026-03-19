import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '']);
  const [otpSent, setOtpSent] = useState(false);
  const [phone, setPhone] = useState('');
  const [step, setStep] = useState(0); // 0=calc, 1=phone, 2=otp, 3=success
  const otpRefs = [useRef(), useRef(), useRef(), useRef()];

  const tons = acres * TONS_PER_ACRE * months;
  const earnings = tons * PRICE_PER_TON;
  const co2Saved = tons * 2.7;
  const bonusEarnings = acres >= 10 ? earnings * 0.1 : 0;
  const totalEarnings = earnings + bonusEarnings;

  const handleOTPChange = (i, v) => {
    if (!/^\d*$/.test(v)) return;
    const newOtp = [...otp];
    newOtp[i] = v.slice(-1);
    setOtp(newOtp);
    if (v && i < 3) otpRefs[i + 1].current?.focus();
  };

  const handleOTPKeyDown = (i, e) => {
    if (e.key === 'Backspace' && !otp[i] && i > 0) otpRefs[i - 1].current?.focus();
  };

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

            {/* CTA */}
            <div className="mt-6">
              <button
                onClick={() => setStep(1)}
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

          {/* Earnings Display + OTP Flow */}
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

            {/* OTP Signup Flow */}
            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="glass rounded-2xl p-6 border border-white/08">
                  <p className="text-white/50 text-sm text-center">
                    👆 Click <span className="text-white font-medium">"Register & Book Pickup"</span> above to get started
                  </p>
                </motion.div>
              )}

              {step === 1 && (
                <motion.div key="phone"
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                  className="glass rounded-2xl p-6"
                >
                  <h4 className="text-white font-heading font-bold mb-1">Enter your number</h4>
                  <p className="text-white/40 text-sm mb-5">We'll send an OTP to verify</p>
                  <div className="flex gap-2">
                    <div className="px-4 py-3 rounded-xl text-white text-sm font-medium flex-shrink-0"
                      style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}>🇮🇳 +91</div>
                    <input
                      type="tel" value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      placeholder="Mobile number" className="input-dark flex-1"
                    />
                  </div>
                  <button
                    onClick={() => { if (phone.length === 10) setStep(2); }}
                    disabled={phone.length !== 10}
                    className={`btn-primary w-full mt-4 py-3.5 ${phone.length !== 10 ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    Send OTP
                    <FiArrowRight />
                  </button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="otp"
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                  className="glass rounded-2xl p-6"
                >
                  <h4 className="text-white font-heading font-bold mb-1">Enter OTP</h4>
                  <p className="text-white/40 text-sm mb-5">Sent to +91 {phone}</p>
                  <div className="flex gap-3 justify-center mb-5">
                    {otp.map((d, i) => (
                      <input
                        key={i} ref={otpRefs[i]} type="text" maxLength={1} value={d}
                        onChange={(e) => handleOTPChange(i, e.target.value)}
                        onKeyDown={(e) => handleOTPKeyDown(i, e)}
                        className="w-14 h-14 text-center rounded-xl text-white text-xl font-bold outline-none transition-all"
                        style={{ background: d ? 'rgba(31,175,90,0.2)' : 'rgba(255,255,255,0.08)', border: `1px solid ${d ? 'rgba(31,175,90,0.5)' : 'rgba(255,255,255,0.12)'}` }}
                      />
                    ))}
                  </div>
                  <button
                    onClick={() => { if (otp.join('').length === 4) setStep(3); }}
                    disabled={otp.join('').length !== 4}
                    className={`btn-primary w-full py-3.5 ${otp.join('').length !== 4 ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    Verify & Register
                  </button>
                  <p className="text-center text-white/30 text-xs mt-3">For demo: enter any 4 digits</p>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div key="success"
                  initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                  className="rounded-2xl p-6 text-center"
                  style={{ background: 'rgba(31,175,90,0.12)', border: '1px solid rgba(31,175,90,0.25)' }}
                >
                  <motion.div
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.2 }}
                    className="text-5xl mb-4"
                  >🎉</motion.div>
                  <h4 className="text-white font-heading font-bold text-xl mb-2">You're Registered!</h4>
                  <p className="text-white/55 text-sm mb-5">Our agent will contact you within 24 hours to schedule your first pickup.</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 justify-center text-sm text-white/70">
                      <span className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs">✓</span>
                      Profile created
                    </div>
                    <div className="flex items-center gap-3 justify-center text-sm text-white/70">
                      <span className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs">✓</span>
                      Bank KYC pending
                    </div>
                    <div className="flex items-center gap-3 justify-center text-sm text-white/70">
                      <span className="w-5 h-5 rounded-full bg-amber-400/20 flex items-center justify-center text-amber-400 text-xs">⏳</span>
                      Pickup scheduling
                    </div>
                  </div>
                  <button
                    onClick={() => setStep(0)}
                    className="btn-glass w-full mt-5 text-sm"
                  >
                    Calculate Again
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
