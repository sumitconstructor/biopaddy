import { motion } from 'framer-motion';
import { FiArrowRight, FiMail, FiPhone, FiMapPin, FiTwitter, FiInstagram, FiLinkedin } from 'react-icons/fi';
import { GiWheat } from 'react-icons/gi';
import { Link } from 'react-router-dom';

const links = [
  {
    title: 'For Farmers',
    items: [
      { label: 'Earnings Calculator', href: '#farmers' },
      { label: 'Book Pickup', href: '#farmers' },
      { label: 'Farmer Dashboard', path: '/farmer' },
      { label: 'How Payments Work', href: '#how-it-works' },
    ],
  },
  {
    title: 'For Business',
    items: [
      { label: 'Product Catalog', href: '#products' },
      { label: 'Impact Calculator', href: '#businesses' },
      { label: 'Corporate Dashboard', path: '/corporate' },
      { label: 'ESG Certificates', href: '#businesses' },
    ],
  },
  {
    title: 'Company',
    items: [
      { label: 'About FarmEasy', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Press Kit', href: '#' },
      { label: 'Admin Portal', path: '/admin' },
    ],
  },
];

export default function Footer() {
  return (
    <footer style={{ background: '#030808', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      {/* Newsletter Banner */}
      <div className="border-b border-white/06">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="font-heading font-bold text-white text-2xl mb-1">
                Join the Zero-Burn Movement 🌱
              </h3>
              <p className="text-white/40 text-sm">Get updates on new states, farmer success stories, and product launches.</p>
            </div>
            <div className="flex gap-2 w-full sm:w-auto min-w-[340px]">
              <input
                type="email"
                placeholder="your@email.com"
                className="input-dark flex-1 text-sm"
              />
              <button className="btn-primary px-5 py-3 flex-shrink-0">
                Subscribe <FiArrowRight />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shadow-glow">
                <GiWheat className="text-white text-lg" />
              </div>
              <span className="font-heading font-bold text-xl text-white tracking-tight">
                Farm<span className="text-gradient">Easy</span>
              </span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed mb-6 max-w-xs">
              India's leading agri-waste platform. Turning crop stubble into eco-friendly products and farmer income since 2024.
            </p>
            <div className="space-y-2.5 text-sm text-white/40">
              <div className="flex items-center gap-2.5"><FiMapPin className="flex-shrink-0 text-primary" /><span>Chandigarh · Delhi · Mumbai</span></div>
              <div className="flex items-center gap-2.5"><FiPhone className="flex-shrink-0 text-primary" /><span>1800-FARM-EASY</span></div>
              <div className="flex items-center gap-2.5"><FiMail className="flex-shrink-0 text-primary" /><span>hello@farmeasy.in</span></div>
            </div>

            {/* Social */}
            <div className="flex gap-3 mt-6">
              {[FiTwitter, FiInstagram, FiLinkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-xl flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all duration-200"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {links.map((col) => (
            <div key={col.title}>
              <h4 className="text-white text-sm font-semibold mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.items.map((item) => (
                  <li key={item.label}>
                    {item.path ? (
                      <Link to={item.path} className="text-white/40 hover:text-white text-sm transition-colors duration-200">
                        {item.label}
                      </Link>
                    ) : (
                      <a href={item.href} className="text-white/40 hover:text-white text-sm transition-colors duration-200">
                        {item.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="mt-14 pt-8 border-t border-white/05">
          <div className="flex flex-wrap gap-4 justify-center mb-8">
            {['🇮🇳 Made in India', '✅ FSSAI Certified', '♻️ ASTM D6400', '🔒 ISO 9001:2015', '🌿 Carbon Neutral Ops'].map((c) => (
              <span key={c} className="px-4 py-2 rounded-xl text-xs font-medium text-white/45"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                {c}
              </span>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-white/25 text-xs">
            <p>© 2026 FarmEasy Technologies Pvt. Ltd. All rights reserved.</p>
            <div className="flex gap-5">
              <a href="#" className="hover:text-white/60 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white/60 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white/60 transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
