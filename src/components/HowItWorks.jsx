import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiCheckCircle } from 'react-icons/fi';

const farmerSteps = [
  {
    num: '01',
    icon: '📱',
    title: 'Register in 2 Minutes',
    desc: 'Enter your phone number, verify via OTP, and tell us about your farm. Zero paperwork.',
    color: '#4DC97A',
  },
  {
    num: '02',
    icon: '📅',
    title: 'Book Free Pickup',
    desc: 'Choose a convenient date. Our GPS-tracked vehicles come right to your field.',
    color: '#60A5FA',
  },
  {
    num: '03',
    icon: '⚖️',
    title: 'We Weigh & Collect',
    desc: 'Our trained agents weigh your residue on-site. You get a digital receipt instantly.',
    color: '#A78BFA',
  },
  {
    num: '04',
    icon: '💰',
    title: 'Get Paid in 7 Days',
    desc: '₹600/ton transferred directly to your bank account. No middlemen, no delays.',
    color: '#FFD166',
  },
];

const corporateSteps = [
  {
    num: '01',
    icon: '🛒',
    title: 'Browse & Select Products',
    desc: 'Choose from our range of biodegradable utensils — plates, bowls, spoons, custom sets.',
    color: '#4DC97A',
  },
  {
    num: '02',
    icon: '📊',
    title: 'See Your Impact',
    desc: 'Our calculator shows your exact CO₂ savings, plastic replaced, and trees equivalent.',
    color: '#60A5FA',
  },
  {
    num: '03',
    icon: '🏭',
    title: 'We Manufacture & Ship',
    desc: 'Orders are manufactured at our certified facilities and delivered to your doorstep.',
    color: '#A78BFA',
  },
  {
    num: '04',
    icon: '🏆',
    title: 'Get ESG Certificate',
    desc: 'Receive a blockchain-verified sustainability certificate for your reports and marketing.',
    color: '#FFD166',
  },
];

function StepCard({ step, index, reverse }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: reverse ? 30 : -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="flex items-start gap-5 group"
    >
      <div className="flex-shrink-0 relative">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl transition-transform duration-300 group-hover:scale-110"
          style={{ background: `${step.color}18`, border: `1px solid ${step.color}30` }}>
          {step.icon}
        </div>
        <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold"
          style={{ background: step.color, color: '#050D0A' }}>
          {step.num.slice(-1)}
        </div>
        {index < 3 && (
          <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-px h-8"
            style={{ background: `linear-gradient(180deg, ${step.color}50, transparent)` }} />
        )}
      </div>
      <div className="pt-1">
        <div className="text-xs font-semibold mb-1" style={{ color: step.color }}>{step.num}</div>
        <h4 className="text-white font-heading font-bold text-lg mb-1.5">{step.title}</h4>
        <p className="text-white/45 text-sm leading-relaxed">{step.desc}</p>
      </div>
    </motion.div>
  );
}

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-28" style={{ background: '#050D0A' }}>
      <div className="absolute inset-0 bg-dots opacity-40" />
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="badge badge-green mb-4">Process</span>
          <h2 className="section-title text-white mb-5">
            How <span className="text-gradient">FarmEasy</span> Works
          </h2>
          <p className="section-subtitle mx-auto text-center">
            A simple, transparent process for farmers and businesses — built to be trusted.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Farmer Flow */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-10">
              <div className="px-4 py-2 rounded-xl text-sm font-semibold"
                style={{ background: 'rgba(31,175,90,0.15)', border: '1px solid rgba(31,175,90,0.3)', color: '#4DC97A' }}>
                🧑‍🌾 Farmer Flow
              </div>
            </div>
            <div className="space-y-10">
              {farmerSteps.map((step, i) => (
                <StepCard key={step.num} step={step} index={i} reverse={false} />
              ))}
            </div>
          </motion.div>

          {/* Corporate Flow */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-10">
              <div className="px-4 py-2 rounded-xl text-sm font-semibold"
                style={{ background: 'rgba(255,209,70,0.12)', border: '1px solid rgba(255,209,70,0.25)', color: '#FFD166' }}>
                🏢 Corporate Flow
              </div>
            </div>
            <div className="space-y-10">
              {corporateSteps.map((step, i) => (
                <StepCard key={step.num} step={step} index={i} reverse={true} />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Circular Flow Diagram */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-24 glass rounded-3xl p-10 text-center"
        >
          <p className="text-white/40 text-xs font-medium uppercase tracking-widest mb-6">The FarmEasy Circular Economy</p>
          <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
            {[
              { label: 'Crop Stubble', icon: '🌾', color: '#4DC97A' },
              { label: '→', color: '#ffffff30' },
              { label: 'Collection', icon: '🚛', color: '#60A5FA' },
              { label: '→', color: '#ffffff30' },
              { label: 'Manufacturing', icon: '🏭', color: '#A78BFA' },
              { label: '→', color: '#ffffff30' },
              { label: 'Eco Utensils', icon: '🍽️', color: '#FFD166' },
              { label: '→', color: '#ffffff30' },
              { label: 'Happy Customers', icon: '😊', color: '#4DC97A' },
              { label: '→', color: '#ffffff30' },
              { label: 'Clean Air', icon: '💨', color: '#38BDF8' },
            ].map((item, i) => (
              item.icon ? (
                <span key={i} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-medium"
                  style={{ background: `${item.color}12`, border: `1px solid ${item.color}25`, color: item.color }}>
                  {item.icon} {item.label}
                </span>
              ) : (
                <span key={i} className="text-white/20 font-bold text-lg">{item.label}</span>
              )
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
