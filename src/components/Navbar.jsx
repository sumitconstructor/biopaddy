import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiArrowRight } from 'react-icons/fi';
import { GiWheat } from 'react-icons/gi';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { label: 'For Farmers', href: '#farmers' },
  { label: 'For Business', href: '#businesses' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Products', href: '#products' },
  { label: 'Impact', href: '#impact' },
];

const dashboardLinks = [
  { label: 'Farmer Dashboard', path: '/farmer' },
  { label: 'Corporate Dashboard', path: '/corporate' },
  { label: 'Admin', path: '/admin' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'py-3 bg-dark/80 backdrop-blur-2xl border-b border-white/06'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shadow-glow group-hover:shadow-glow-lg transition-all duration-300">
              <GiWheat className="text-white text-lg" />
            </div>
            <span className="font-heading font-bold text-xl text-white tracking-tight">
              Farm<span className="text-gradient">Easy</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-4 py-2 rounded-xl text-sm font-medium text-white/60 hover:text-white hover:bg-white/06 transition-all duration-200"
              >
                {link.label}
              </a>
            ))}

            {/* Dashboard Dropdown */}
            <div className="relative ml-1" onMouseEnter={() => setDropdownOpen(true)} onMouseLeave={() => setDropdownOpen(false)}>
              <button className="px-4 py-2 rounded-xl text-sm font-medium text-white/60 hover:text-white hover:bg-white/06 transition-all duration-200 flex items-center gap-1">
                Dashboards
                <svg className={`w-3.5 h-3.5 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.97 }}
                    transition={{ duration: 0.18 }}
                    className="absolute top-full left-0 w-52 mt-2 py-2 rounded-2xl overflow-hidden"
                    style={{ background: 'rgba(10,22,16,0.95)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(20px)' }}
                  >
                    {dashboardLinks.map((d) => (
                      <Link
                        key={d.path}
                        to={d.path}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-white/65 hover:text-white hover:bg-white/08 transition-all duration-150"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                        {d.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a href="#businesses" className="btn-outline text-sm px-5 py-2.5">
              Buy Products
            </a>
            <a href="#farmers" className="btn-primary text-sm px-5 py-2.5">
              Start Earning
              <FiArrowRight className="text-sm" />
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden w-10 h-10 rounded-xl flex items-center justify-center text-white hover:bg-white/10 transition-colors"
          >
            {mobileOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 top-16 z-40 mx-4 rounded-2xl overflow-hidden lg:hidden"
            style={{ background: 'rgba(8,20,14,0.97)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(30px)' }}
          >
            <div className="p-5 space-y-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-2.5 rounded-xl text-sm font-medium text-white/70 hover:text-white hover:bg-white/08 transition-all"
                >
                  {link.label}
                </motion.a>
              ))}
              <hr className="divider my-3" />
              {dashboardLinks.map((d, i) => (
                <motion.div key={d.path} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: (navLinks.length + i) * 0.05 }}>
                  <Link
                    to={d.path}
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-2.5 rounded-xl text-sm font-medium text-white/70 hover:text-white hover:bg-white/08 transition-all"
                  >
                    {d.label}
                  </Link>
                </motion.div>
              ))}
              <div className="pt-3 flex flex-col gap-2">
                <a href="#farmers" className="btn-primary w-full" onClick={() => setMobileOpen(false)}>
                  Start Earning as Farmer
                </a>
                <a href="#businesses" className="btn-outline w-full" onClick={() => setMobileOpen(false)}>
                  Buy Eco Products
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
