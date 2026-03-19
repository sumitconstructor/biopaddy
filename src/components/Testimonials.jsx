import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    name: 'Gurpreet Singh',
    role: 'Farmer · Ludhiana, Punjab',
    avatar: '👨‍🌾',
    text: 'Pehle stubble jalate the, ab band ho gaya. FarmEasy ne 8 din mein ₹18,000 diye. Ab mera beta bhi register ho gaya hai.',
    earnings: '₹18,000',
    acres: 30,
    stars: 5,
    color: '#4DC97A',
  },
  {
    name: 'Savita Devi',
    role: 'Farmer · Karnal, Haryana',
    avatar: '👩‍🌾',
    text: 'Pati ne pehle trust nahi kiya. Par jab paise aaye — seedhe account mein — tab unhone bhi apni zameen register ki. Best decision.',
    earnings: '₹9,600',
    acres: 16,
    stars: 5,
    color: '#60A5FA',
  },
  {
    name: 'Rajiv Anand',
    role: 'CSO · GreenCorp India',
    avatar: '🧑‍💼',
    text: 'Replaced 2 lakh plastic plates with FarmEasy biodegradable ones. The certificate helped us in our ESG report. Clients loved it. Will order double next year.',
    earnings: '2L pieces',
    acres: null,
    stars: 5,
    color: '#FFD166',
  },
  {
    name: 'Priya Mehta',
    role: 'Procurement Head · Infosys',
    avatar: '👩‍💼',
    text: 'Quality is excellent. Packaging is premium. The impact calculator demo impressed our sustainability board.',
    earnings: '5L pieces',
    acres: null,
    stars: 5,
    color: '#A78BFA',
  },
  {
    name: 'Harjinder Singh Bains',
    role: 'Farmer · Amritsar, Punjab',
    avatar: '👴',
    text: '45 sal se khet jala raha tha. FarmEasy wale aaye, tola, le gaye, 5 din mein paisa. Sach mein koi cheez hai aisi.',
    earnings: '₹27,000',
    acres: 45,
    stars: 5,
    color: '#F472B6',
  },
  {
    name: 'Animesh Kumar',
    role: 'CEO · EcoWave Foods',
    avatar: '🧑‍💼',
    text: 'We switched our entire packaging to FarmEasy products. The custom branding option is fantastic. Our customers notice and appreciate it.',
    earnings: '8L pieces',
    acres: null,
    stars: 5,
    color: '#34D399',
  },
];

export default function Testimonials() {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section id="testimonials" className="relative py-28 overflow-hidden" style={{ background: 'linear-gradient(180deg, #050D0A, #081510)' }}>
      <div className="absolute inset-0 bg-dots opacity-40" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="badge badge-green mb-4">Testimonials</span>
          <h2 className="section-title text-white mb-5">
            Real People. <span className="text-gradient">Real Results.</span>
          </h2>
          <p className="section-subtitle mx-auto text-center">
            From farmers who stopped burning to corporates who stopped polluting — real stories from real people.
          </p>
        </motion.div>

        {/* Featured Testimonial */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="glass-green rounded-3xl p-8 sm:p-12 mb-10 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 text-[10rem] leading-none opacity-05 select-none pointer-events-none">
              "
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div>
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-1"
                  style={{ background: `${testimonials[activeIdx].color}18`, border: `1px solid ${testimonials[activeIdx].color}25` }}>
                  {testimonials[activeIdx].avatar}
                </div>
              </div>
              <div className="flex-1">
                <p className="text-white text-xl sm:text-2xl font-medium leading-relaxed mb-6" style={{ fontStyle: 'italic' }}>
                  "{testimonials[activeIdx].text}"
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <div>
                    <div className="text-white font-heading font-bold">{testimonials[activeIdx].name}</div>
                    <div className="text-white/45 text-sm">{testimonials[activeIdx].role}</div>
                  </div>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-amber-400">★</span>
                    ))}
                  </div>
                  <div className="ml-auto">
                    <span className="px-4 py-2 rounded-xl text-sm font-bold"
                      style={{ background: `${testimonials[activeIdx].color}18`, border: `1px solid ${testimonials[activeIdx].color}30`, color: testimonials[activeIdx].color }}>
                      {testimonials[activeIdx].acres ? `${testimonials[activeIdx].acres} acres · ` : ''}
                      {testimonials[activeIdx].earnings} earned
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation avatars */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {testimonials.map((t, i) => (
            <button
              key={i}
              onClick={() => setActiveIdx(i)}
              className="w-12 h-12 rounded-xl flex items-center justify-center text-xl transition-all duration-200"
              style={{
                background: activeIdx === i ? `${t.color}20` : 'rgba(255,255,255,0.05)',
                border: `1px solid ${activeIdx === i ? `${t.color}40` : 'rgba(255,255,255,0.08)'}`,
                transform: activeIdx === i ? 'scale(1.1)' : 'scale(1)',
              }}
            >
              {t.avatar}
            </button>
          ))}
        </div>

        {/* All testimonial cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.button
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              onClick={() => setActiveIdx(i)}
              className="text-left rounded-2xl p-5 transition-all duration-200 group"
              style={{
                background: activeIdx === i ? `${t.color}10` : 'rgba(255,255,255,0.04)',
                border: `1px solid ${activeIdx === i ? `${t.color}30` : 'rgba(255,255,255,0.08)'}`,
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                  style={{ background: `${t.color}15` }}>
                  {t.avatar}
                </div>
                <div>
                  <div className="text-white text-sm font-semibold">{t.name}</div>
                  <div className="text-white/35 text-xs">{t.role}</div>
                </div>
                <div className="ml-auto flex gap-0.5 shrink-0">
                  {[...Array(t.stars)].map((_, j) => <span key={j} className="text-amber-400 text-xs">★</span>)}
                </div>
              </div>
              <p className="text-white/55 text-sm leading-relaxed line-clamp-3">"{t.text}"</p>
              <div className="mt-3 text-xs font-semibold" style={{ color: t.color }}>
                {t.acres ? `${t.acres} acres · ` : ''}{t.earnings}
              </div>
            </motion.button>
          ))}
        </div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-3 gap-6 glass rounded-3xl p-8 text-center"
        >
          {[
            { icon: '⭐', val: '4.9/5', label: 'Avg. Farmer Rating' },
            { icon: '🔁', val: '94%', label: 'Farmer Return Rate' },
            { icon: '💬', val: '5,000+', label: 'Verified Reviews' },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-3xl mb-2">{s.icon}</div>
              <div className="text-white font-heading font-bold text-2xl mb-0.5">{s.val}</div>
              <div className="text-white/40 text-xs">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
