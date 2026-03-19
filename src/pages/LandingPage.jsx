import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
const stagger = { show: { transition: { staggerChildren: 0.1 } } };

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-xl shadow-sm border-b border-surface-100' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-gradient-brand flex items-center justify-center text-white text-lg">🌾</div>
          <span className="font-display font-bold text-xl text-surface-900">BioPaddy</span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <a href="#about" className="text-sm font-medium text-surface-600 hover:text-brand-600 transition-colors">About</a>
          <a href="#how-it-works" className="text-sm font-medium text-surface-600 hover:text-brand-600 transition-colors">How It Works</a>
          <a href="#products" className="text-sm font-medium text-surface-600 hover:text-brand-600 transition-colors">Products</a>
          <a href="#impact" className="text-sm font-medium text-surface-600 hover:text-brand-600 transition-colors">Impact</a>
          <a href="#faq" className="text-sm font-medium text-surface-600 hover:text-brand-600 transition-colors">FAQ</a>
        </div>
        <div className="hidden md:flex items-center gap-3">
          <Link to="/login" className="btn-ghost text-sm py-2">Login</Link>
          <Link to="/register/farmer" className="btn-primary text-sm py-2 px-5">Get Started</Link>
        </div>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 hover:bg-surface-100 rounded-lg">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} /></svg>
        </button>
      </div>
      {mobileOpen && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="md:hidden bg-white border-t border-surface-100 shadow-lg">
          <div className="p-4 space-y-2">
            <a href="#about" onClick={() => setMobileOpen(false)} className="block px-4 py-2 text-surface-600 hover:bg-surface-50 rounded-lg">About</a>
            <a href="#how-it-works" onClick={() => setMobileOpen(false)} className="block px-4 py-2 text-surface-600 hover:bg-surface-50 rounded-lg">How It Works</a>
            <a href="#products" onClick={() => setMobileOpen(false)} className="block px-4 py-2 text-surface-600 hover:bg-surface-50 rounded-lg">Products</a>
            <a href="#impact" onClick={() => setMobileOpen(false)} className="block px-4 py-2 text-surface-600 hover:bg-surface-50 rounded-lg">Impact</a>
            <div className="pt-2 flex gap-2">
              <Link to="/login" className="btn-ghost text-sm py-2 flex-1 text-center">Login</Link>
              <Link to="/register/farmer" className="btn-primary text-sm py-2 px-5 flex-1 text-center">Get Started</Link>
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
}

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center mesh-bg overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-72 h-72 bg-brand-300/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-amber-300/10 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-brand-400/5 rounded-full blur-3xl" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <motion.div initial="hidden" animate="show" variants={stagger} className="max-w-3xl">
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-100/60 border border-brand-200/50 mb-6">
            <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
            <span className="text-sm font-medium text-brand-700">Turning Agricultural Waste Into Value</span>
          </motion.div>
          <motion.h1 variants={fadeUp} className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-surface-900 leading-tight">
            From <span className="gradient-text">Paddy Fields</span> to{' '}
            <span className="gradient-text-amber">Eco Products</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-6 text-lg sm:text-xl text-surface-500 leading-relaxed max-w-2xl">
            BioPaddy converts rice and wheat straw waste from Northern Indian farms into premium biodegradable utensils — saving the planet, one plate at a time.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-4">
            <Link to="/register/farmer" className="btn-primary text-base px-8 py-3.5">
              I'm a Farmer →
            </Link>
            <Link to="/register/customer" className="btn-secondary text-base px-8 py-3.5">
              I'm a Business
            </Link>
          </motion.div>
          <motion.div variants={fadeUp} className="mt-12 flex items-center gap-8 flex-wrap">
            {[
              { value: '2,500+', label: 'Farmers Onboarded' },
              { value: '12,000', label: 'Tons CO₂ Saved' },
              { value: '₹8.5Cr', label: 'Farmer Earnings' },
            ].map((s, i) => (
              <div key={i}>
                <p className="font-display text-2xl sm:text-3xl font-bold text-surface-900">{s.value}</p>
                <p className="text-sm text-surface-500">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="text-center mb-16">
          <motion.h2 variants={fadeUp} className="section-heading text-surface-900">
            Why <span className="gradient-text">BioPaddy</span>?
          </motion.h2>
          <motion.p variants={fadeUp} className="section-subheading">
            Every year, millions of tons of crop residue are burned in Northern India, choking cities and destroying soil health. We turn this waste into value.
          </motion.p>
        </motion.div>
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="grid md:grid-cols-3 gap-8">
          {[
            { icon: '🔥', title: 'The Problem', desc: '20 million tons of paddy straw burned annually, causing severe air pollution across North India and contributing to climate change.', color: 'bg-red-50 text-red-500' },
            { icon: '♻️', title: 'Our Solution', desc: 'We collect farm waste and convert it into premium biodegradable utensils — cups, plates, bowls that decompose naturally in 60-120 days.', color: 'bg-brand-50 text-brand-600' },
            { icon: '🌍', title: 'The Impact', desc: 'Farmers earn extra income, businesses get eco-friendly products, and the environment gets cleaner air. Everyone wins.', color: 'bg-amber-50 text-amber-600' },
          ].map((item, i) => (
            <motion.div key={i} variants={fadeUp} className="card hover:shadow-glass-lg group">
              <div className={`w-14 h-14 rounded-2xl ${item.color} flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform`}>
                {item.icon}
              </div>
              <h3 className="font-display text-xl font-bold text-surface-900 mb-3">{item.title}</h3>
              <p className="text-surface-500 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const farmerSteps = [
    { step: '01', title: 'Register & Verify', desc: 'Sign up with your phone number, upload farm documents, and get verified within 48 hours.' },
    { step: '02', title: 'Book Collection', desc: 'Select a date and time slot. Our team comes to your farm to collect the paddy/wheat straw.' },
    { step: '03', title: 'Get Paid', desc: 'Payment is transferred directly to your bank account within 24 hours of collection.' },
  ];
  const businessSteps = [
    { step: '01', title: 'Browse & Order', desc: 'Explore our catalog of biodegradable utensils. Place orders or set up recurring subscriptions.' },
    { step: '02', title: 'Receive Products', desc: 'We manufacture and ship sustainable products right to your doorstep.' },
    { step: '03', title: 'Get Certified', desc: 'Receive Environmental Impact Certificates for your CSR reports and sustainability goals.' },
  ];

  return (
    <section id="how-it-works" className="section-padding bg-surface-50">
      <div className="max-w-7xl mx-auto">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="text-center mb-16">
          <motion.h2 variants={fadeUp} className="section-heading text-surface-900">How It Works</motion.h2>
          <motion.p variants={fadeUp} className="section-subheading">Simple processes for both farmers and businesses</motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Farmers */}
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-100 mb-6">
              <span className="text-lg">🧑‍🌾</span>
              <span className="text-sm font-semibold text-brand-700">For Farmers</span>
            </motion.div>
            <div className="space-y-6">
              {farmerSteps.map((s, i) => (
                <motion.div key={i} variants={fadeUp} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-brand text-white font-bold flex items-center justify-center font-display shadow-lg shadow-brand-500/25">
                    {s.step}
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-surface-900 text-lg">{s.title}</h4>
                    <p className="text-surface-500 mt-1">{s.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Businesses */}
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 mb-6">
              <span className="text-lg">🏢</span>
              <span className="text-sm font-semibold text-amber-700">For Businesses</span>
            </motion.div>
            <div className="space-y-6">
              {businessSteps.map((s, i) => (
                <motion.div key={i} variants={fadeUp} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-amber text-white font-bold flex items-center justify-center font-display shadow-lg shadow-amber-500/25">
                    {s.step}
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-surface-900 text-lg">{s.title}</h4>
                    <p className="text-surface-500 mt-1">{s.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Products() {
  const products = [
    { name: 'Eco Cups', sizes: '200ml, 350ml', img: '☕', desc: 'Perfect for hot and cold beverages' },
    { name: 'Round Plates', sizes: '8", 10"', img: '🍽️', desc: 'Sturdy plates for any occasion' },
    { name: 'Deep Bowls', sizes: '500ml', img: '🥣', desc: 'Ideal for soups and salads' },
    { name: 'Eco Spoons', sizes: 'Standard', img: '🥄', desc: 'Strong and durable cutlery' },
    { name: 'Square Plates', sizes: '9"', img: '🍱', desc: 'Modern design for premium dining' },
    { name: 'Food Containers', sizes: '750ml', img: '📦', desc: 'Sealable takeaway containers' },
  ];

  return (
    <section id="products" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="text-center mb-16">
          <motion.h2 variants={fadeUp} className="section-heading text-surface-900">Our <span className="gradient-text">Products</span></motion.h2>
          <motion.p variants={fadeUp} className="section-subheading">100% biodegradable, made from agricultural waste. Each product decomposes in 60-120 days.</motion.p>
        </motion.div>
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p, i) => (
            <motion.div key={i} variants={fadeUp} className="card group cursor-pointer hover:border-brand-200">
              <div className="w-full h-40 rounded-xl bg-gradient-to-br from-brand-50 to-brand-100/50 flex items-center justify-center text-5xl mb-4 group-hover:scale-105 transition-transform">
                {p.img}
              </div>
              <h3 className="font-display font-bold text-lg text-surface-900">{p.name}</h3>
              <p className="text-sm text-brand-600 mb-1">Sizes: {p.sizes}</p>
              <p className="text-surface-500 text-sm">{p.desc}</p>
            </motion.div>
          ))}
        </motion.div>
        <div className="text-center mt-10">
          <Link to="/register/customer" className="btn-primary px-8">View Full Catalog →</Link>
        </div>
      </div>
    </section>
  );
}

function Counter({ target, suffix = '' }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = target / 60;
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 30);
    return () => clearInterval(timer);
  }, [target]);
  return <span>{count.toLocaleString()}{suffix}</span>;
}

function Impact() {
  const stats = [
    { value: 12000, suffix: '+', label: 'Tons CO₂ Saved', icon: '🌿' },
    { value: 8500, suffix: '+', label: 'Tons Paddy Diverted', icon: '🌾' },
    { value: 2500, suffix: '+', label: 'Farmers Empowered', icon: '🧑‍🌾' },
    { value: 500, suffix: '+', label: 'Businesses Served', icon: '🏢' },
  ];

  return (
    <section id="impact" className="section-padding bg-gradient-dark text-white relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-64 h-64 bg-brand-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-amber-400/5 rounded-full blur-3xl" />
      </div>
      <div className="relative max-w-7xl mx-auto">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="text-center mb-16">
          <motion.h2 variants={fadeUp} className="section-heading text-white">Environmental <span className="text-brand-300">Impact</span></motion.h2>
          <motion.p variants={fadeUp} className="text-lg text-brand-200/70 max-w-2xl mx-auto mt-4">
            Every product we create is a step towards cleaner air and a greener planet.
          </motion.p>
        </motion.div>
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <motion.div key={i} variants={fadeUp} className="text-center p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all">
              <div className="text-4xl mb-3">{s.icon}</div>
              <p className="font-display text-3xl sm:text-4xl font-bold text-white">
                <Counter target={s.value} suffix={s.suffix} />
              </p>
              <p className="text-brand-200/70 mt-1">{s.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Testimonials() {
  const testimonials = [
    { name: 'Rajesh Kumar', role: 'Farmer, Punjab', quote: 'Before BioPaddy, I used to burn my crop residue. Now I earn ₹2,000 per quintal selling the same waste. My income has increased by 30%.', avatar: '🧑‍🌾' },
    { name: 'Priya Sharma', role: 'CEO, EcoStay Hotels', quote: 'Switching to BioPaddy utensils reduced our plastic waste by 90%. Our guests love the eco-friendly approach, and the certificates boost our CSR reports.', avatar: '👩‍💼' },
    { name: 'Amit Gupta', role: 'Head Chef, Royal Caterers', quote: 'The quality is incredible. These plates and bowls hold up perfectly for our large-scale events. Plus, they compost completely — no landfill waste!', avatar: '👨‍🍳' },
  ];

  return (
    <section className="section-padding bg-surface-50">
      <div className="max-w-7xl mx-auto">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="text-center mb-16">
          <motion.h2 variants={fadeUp} className="section-heading text-surface-900">What People <span className="gradient-text">Say</span></motion.h2>
        </motion.div>
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div key={i} variants={fadeUp} className="card">
              <div className="flex items-center gap-1 text-amber-400 mb-4">
                {[...Array(5)].map((_, j) => <span key={j}>★</span>)}
              </div>
              <p className="text-surface-600 leading-relaxed mb-6 italic">"{t.quote}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center text-xl">{t.avatar}</div>
                <div>
                  <p className="font-semibold text-surface-900">{t.name}</p>
                  <p className="text-sm text-surface-500">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState(null);
  const faqs = [
    { q: 'What is BioPaddy?', a: 'BioPaddy is a platform that connects farmers with eco-conscious businesses. We collect agricultural waste (rice/wheat straw) from farms and convert it into biodegradable utensils.' },
    { q: 'How do farmers get paid?', a: 'Farmers receive payment directly to their bank account within 24 hours of paddy collection. Payment is calculated based on quantity and quality grade.' },
    { q: 'Are the products food-safe?', a: 'Yes! All our products are certified food-safe and comply with FSSAI standards. They are chemical-free and made entirely from natural crop fiber.' },
    { q: 'What is an Environmental Impact Certificate?', a: 'It\'s a verified document showing the environmental impact of your purchase — how much straw was diverted from burning, CO₂ saved, and AQI improvement. Great for CSR reporting.' },
    { q: 'Do you offer bulk/wholesale pricing?', a: 'Absolutely! We offer tiered pricing for bulk orders (100+, 500+, 1000+ units). Contact us for custom quotes on large orders.' },
    { q: 'How long do the products take to decompose?', a: 'Our products decompose naturally in 60-120 days depending on the product type and environmental conditions. They are home-compostable and leave zero waste.' },
  ];

  return (
    <section id="faq" className="section-padding bg-white">
      <div className="max-w-3xl mx-auto">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="text-center mb-12">
          <motion.h2 variants={fadeUp} className="section-heading text-surface-900">Frequently Asked <span className="gradient-text">Questions</span></motion.h2>
        </motion.div>
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div key={i} variants={fadeUp} className="border border-surface-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full text-left px-6 py-4 flex items-center justify-between hover:bg-surface-50 transition-colors"
              >
                <span className="font-semibold text-surface-800">{faq.q}</span>
                <span className={`text-brand-500 transition-transform duration-200 ${open === i ? 'rotate-180' : ''}`}>▼</span>
              </button>
              {open === i && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="px-6 pb-4">
                  <p className="text-surface-500 leading-relaxed">{faq.a}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-surface-900 text-surface-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-lg bg-gradient-brand flex items-center justify-center text-white text-lg">🌾</div>
              <span className="font-display font-bold text-xl text-white">BioPaddy</span>
            </div>
            <p className="text-surface-400 text-sm leading-relaxed">Converting agricultural waste into eco-friendly biodegradable utensils. Saving the planet, one plate at a time.</p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">For Farmers</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/register/farmer" className="hover:text-brand-400 transition-colors">Register</Link></li>
              <li><a href="#how-it-works" className="hover:text-brand-400 transition-colors">How It Works</a></li>
              <li><a href="#faq" className="hover:text-brand-400 transition-colors">FAQs</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">For Businesses</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/register/customer" className="hover:text-brand-400 transition-colors">Create Account</Link></li>
              <li><a href="#products" className="hover:text-brand-400 transition-colors">Products</a></li>
              <li><a href="#impact" className="hover:text-brand-400 transition-colors">Certificates</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>📧 hello@biopaddy.com</li>
              <li>📞 +91 98765 43210</li>
              <li>📍 Chandigarh, India</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-surface-700 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-surface-500">© 2026 BioPaddy. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-surface-500">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Support</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function CTA() {
  return (
    <section className="section-padding bg-gradient-brand relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
      </div>
      <div className="relative max-w-4xl mx-auto text-center">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
          <motion.h2 variants={fadeUp} className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Ready to Make a Difference?
          </motion.h2>
          <motion.p variants={fadeUp} className="text-lg text-white/80 mt-4 max-w-xl mx-auto">
            Whether you're a farmer looking to earn more or a business going green — BioPaddy is your partner in sustainability.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/register/farmer" className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-brand-700 font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all">
              Join as Farmer
            </Link>
            <Link to="/register/customer" className="inline-flex items-center justify-center px-8 py-3.5 bg-brand-800/50 text-white font-semibold rounded-xl border border-white/20 hover:bg-brand-800/80 transition-all">
              Join as Business
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default function LandingPage() {
  return (
    <div className="bg-white">
      <Navbar />
      <Hero />
      <About />
      <HowItWorks />
      <Products />
      <Impact />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
}
