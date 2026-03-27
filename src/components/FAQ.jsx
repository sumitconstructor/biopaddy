import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiMinus } from 'react-icons/fi';

const faqs = [
  {
    q: 'How much will I earn per acre?',
    a: 'You earn ₹600 per ton of crop residue. On average, 1 acre generates 2–3 tons of stubble per harvest. So for 1 acre = ₹1,200–₹1,800 per season. No deductions, no middlemen.',
    cat: 'Farmers',
  },
  {
    q: 'Is the pickup completely free?',
    a: 'Yes! FarmEasy picks up residue from your field at absolutely no cost to you. We bring our own vehicles, weighing equipment, and trained agents.',
    cat: 'Farmers',
  },
  {
    q: 'How soon do I get paid?',
    a: 'Payment is transferred directly to your Aadhaar-linked bank account within 7 working days of residue collection. You\'ll get an SMS confirmation.',
    cat: 'Farmers',
  },
  {
    q: 'What documents are needed?',
    a: 'Just your Aadhaar card and a mobile number. No complex paperwork, no land records needed to start. We do a simple OTP verification.',
    cat: 'Farmers',
  },
  {
    q: 'Which states do you operate in?',
    a: 'Currently active in Punjab (42%), Haryana (33%), and Western Uttar Pradesh (25%). Expanding to Rajasthan, Madhya Pradesh and Bihar in late 2026.',
    cat: 'Farmers',
  },
  {
    q: 'What is the minimum order quantity for businesses?',
    a: 'Minimum order quantity (MOQ) is 5,000 pieces for standard products. For custom branded orders, MOQ is 10,000 pieces. Enterprise orders get dedicated account managers.',
    cat: 'Business',
  },
  {
    q: 'Are the products FSSAI certified?',
    a: 'Yes. All our products are FSSAI certified, BIS approved, and comply with ASTM D6400 compostability standards. Certificates available on request.',
    cat: 'Business',
  },
  {
    q: 'How does the sustainability certificate work?',
    a: 'After every order, we issue a blockchain-verified ESG certificate showing your exact CO₂ savings, trees equivalent, and plastic displaced. It\'s accepted in most global ESG frameworks.',
    cat: 'Business',
  },
  {
    q: 'Can we get custom branding on the products?',
    a: 'Absolutely. Logo embossing and custom packaging available for orders above 10,000 pieces. Lead time is 15–21 days for custom orders.',
    cat: 'Business',
  },
  {
    q: 'What is the shelf life of the products?',
    a: 'Our utensils are stable for 18 months in normal storage. They decompose within 90 days of disposal in composting conditions.',
    cat: 'Business',
  },
];

const cats = ['All', 'Farmers', 'Business'];

export default function FAQ() {
  const [open, setOpen] = useState(null);
  const [cat, setCat] = useState('All');

  const filtered = faqs.filter((f) => cat === 'All' || f.cat === cat);

  return (
    <section id="faq" className="relative py-28" style={{ background: 'linear-gradient(180deg, #050D0A, #071210)' }}>
      <div className="absolute inset-0 bg-dots opacity-40" />

      <div className="relative max-w-4xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="badge badge-green mb-4">FAQ</span>
          <h2 className="section-title text-white mb-5">
            Questions? <span className="text-gradient">We've Got Answers.</span>
          </h2>
          <p className="section-subtitle mx-auto text-center">
            Everything you need to know about FarmEasy — whether you're a farmer or a business.
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex gap-2 justify-center mb-10">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => { setCat(c); setOpen(null); }}
              className="px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-200"
              style={{
                background: cat === c ? 'rgba(31,175,90,0.2)' : 'rgba(255,255,255,0.06)',
                border: `1px solid ${cat === c ? 'rgba(31,175,90,0.4)' : 'rgba(255,255,255,0.1)'}`,
                color: cat === c ? '#4DC97A' : 'rgba(255,255,255,0.55)',
              }}
            >
              {c}
            </button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="space-y-3">
          {filtered.map((faq, i) => (
            <motion.div
              key={faq.q}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              className="rounded-2xl overflow-hidden transition-all duration-300"
              style={{ background: open === i ? 'rgba(31,175,90,0.08)' : 'rgba(255,255,255,0.04)', border: `1px solid ${open === i ? 'rgba(31,175,90,0.25)' : 'rgba(255,255,255,0.08)'}` }}
            >
              <button
                className="w-full px-6 py-5 flex items-center justify-between text-left gap-4"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <div className="flex items-start gap-3 flex-1">
                  <span className="px-2 py-0.5 rounded-md text-xs font-semibold flex-shrink-0 mt-0.5"
                    style={{
                      background: faq.cat === 'Farmers' ? 'rgba(31,175,90,0.15)' : 'rgba(255,209,70,0.12)',
                      color: faq.cat === 'Farmers' ? '#4DC97A' : '#FFD166',
                    }}>
                    {faq.cat}
                  </span>
                  <span className="text-white font-medium text-sm sm:text-base">{faq.q}</span>
                </div>
                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300"
                  style={{ background: open === i ? 'rgba(31,175,90,0.2)' : 'rgba(255,255,255,0.08)' }}>
                  {open === i
                    ? <FiMinus className="text-primary text-sm" />
                    : <FiPlus className="text-white/50 text-sm" />
                  }
                </div>
              </button>

              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 pl-16 text-white/55 text-sm leading-relaxed">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 text-center glass rounded-2xl p-8"
        >
          <p className="text-white font-heading font-bold text-xl mb-2">Still have questions?</p>
          <p className="text-white/45 text-sm mb-6">Our support team responds within 2 hours, 7 days a week.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="btn-primary px-8 py-3.5">Chat with Support</button>
            <button className="btn-outline px-8 py-3.5">Call: 1800-FARMEASY</button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
