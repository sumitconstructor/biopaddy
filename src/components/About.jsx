import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiShoppingCart, FiStar } from 'react-icons/fi';

const products = [
  {
    name: 'Eco Dinner Plate',
    tagline: 'Premium biodegradable dining',
    emoji: '🍽️',
    price: '₹8',
    unit: '/piece',
    moq: 'MOQ: 5,000 pcs',
    material: 'Paddy straw composite',
    rating: 4.9,
    reviews: 284,
    tags: ['Microwave Safe', 'Compostable', 'FSSAI Certified'],
    accent: '#4DC97A',
    bestseller: true,
  },
  {
    name: 'Deep Bowl',
    tagline: 'For soups, curries & desserts',
    emoji: '🥣',
    price: '₹12',
    unit: '/piece',
    moq: 'MOQ: 3,000 pcs',
    material: 'Wheat straw blend',
    rating: 4.8,
    reviews: 156,
    tags: ['Leak Resistant', 'Oil Proof', 'Compostable'],
    accent: '#60A5FA',
    bestseller: false,
  },
  {
    name: 'Spoon + Fork Set',
    tagline: 'Complete cutlery solution',
    emoji: '🥄',
    price: '₹3',
    unit: '/piece',
    moq: 'MOQ: 10,000 pcs',
    material: 'Rice husk fiber',
    rating: 4.7,
    reviews: 412,
    tags: ['BPA Free', 'Strong Grip', 'Compostable'],
    accent: '#A78BFA',
    bestseller: false,
  },
  {
    name: 'Party Kit (50 pcs)',
    tagline: 'Complete party set',
    emoji: '🎉',
    price: '₹350',
    unit: '/kit',
    moq: 'MOQ: 100 kits',
    material: 'Mixed agri-waste',
    rating: 4.9,
    reviews: 89,
    tags: ['All-in-one', 'Custom Branding', 'Premium Box'],
    accent: '#FFD166',
    bestseller: false,
  },
  {
    name: 'Custom OEM Set',
    tagline: 'Your brand on every piece',
    emoji: '🏷️',
    price: 'Custom',
    unit: '',
    moq: 'Min 50,000 pcs',
    material: 'Choose material',
    rating: 5.0,
    reviews: 32,
    tags: ['Logo Emboss', 'Custom Size', 'Priority Ship'],
    accent: '#F472B6',
    bestseller: false,
  },
  {
    name: 'Catering Tray',
    tagline: 'Large events & canteens',
    emoji: '🫕',
    price: '₹18',
    unit: '/piece',
    moq: 'MOQ: 2,000 pcs',
    material: 'Sugarcane + straw',
    rating: 4.8,
    reviews: 67,
    tags: ['Heat Resistant', 'Sectioned', 'Compostable'],
    accent: '#34D399',
    bestseller: false,
  },
];

export default function Products() {
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (i) => {
    if (!cartItems.includes(i)) setCartItems([...cartItems, i]);
  };

  return (
    <section id="products" className="relative py-28" style={{ background: 'linear-gradient(180deg, #050D0A, #08160F, #050D0A)' }}>
      <div className="absolute inset-0 bg-grid opacity-60" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="badge badge-gold mb-4">Product Catalog</span>
          <h2 className="section-title text-white mb-5">
            Eco Products <span className="text-gradient">That Sell</span>
          </h2>
          <p className="section-subtitle mx-auto text-center">
            Premium quality biodegradable utensils made from crop stubble.
            Custom branding available for all orders above 10,000 pieces.
          </p>
        </motion.div>

        {/* Cart badge */}
        {cartItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed top-24 right-6 z-30 flex items-center gap-2 px-4 py-2.5 rounded-2xl shadow-glow cursor-pointer"
            style={{ background: 'rgba(31,175,90,0.9)', backdropFilter: 'blur(20px)' }}
          >
            <FiShoppingCart className="text-white" />
            <span className="text-white text-sm font-bold">{cartItems.length} items</span>
            <span className="w-5 h-5 rounded-full bg-white flex items-center justify-center text-xs font-black text-primary">{cartItems.length}</span>
          </motion.div>
        )}

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {products.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              onHoverStart={() => setHoveredIdx(i)}
              onHoverEnd={() => setHoveredIdx(null)}
              className="relative rounded-3xl overflow-hidden transition-all duration-300 group"
              style={{
                background: hoveredIdx === i ? `${p.accent}10` : 'rgba(255,255,255,0.04)',
                border: `1px solid ${hoveredIdx === i ? `${p.accent}30` : 'rgba(255,255,255,0.08)'}`,
                boxShadow: hoveredIdx === i ? `0 20px 60px ${p.accent}15` : 'none',
              }}
            >
              {p.bestseller && (
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold"
                  style={{ background: '#FFD166', color: '#050D0A' }}>
                  ⭐ Best Seller
                </div>
              )}
              {cartItems.includes(i) && (
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold"
                  style={{ background: 'rgba(31,175,90,0.9)', color: '#fff' }}>
                  ✓ Added
                </div>
              )}

              <div className="p-6">
                {/* Emoji with glow */}
                <motion.div
                  animate={{ y: hoveredIdx === i ? -6 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-5"
                  style={{ background: `${p.accent}15`, border: `1px solid ${p.accent}25` }}
                >
                  {p.emoji}
                </motion.div>

                <h3 className="text-white font-heading font-bold text-xl mb-1">{p.name}</h3>
                <p className="text-white/45 text-sm mb-4">{p.tagline}</p>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, j) => (
                      <FiStar key={j} size={12} className="fill-amber-400" style={{ color: '#FFD166', fill: '#FFD166' }} />
                    ))}
                  </div>
                  <span className="text-white/60 text-xs">{p.rating} ({p.reviews} reviews)</span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {p.tags.map((t) => (
                    <span key={t} className="px-2.5 py-0.5 rounded-lg text-xs font-medium"
                      style={{ background: `${p.accent}12`, color: p.accent, border: `1px solid ${p.accent}20` }}>
                      {t}
                    </span>
                  ))}
                </div>

                <div className="divider mb-5" />

                {/* Pricing */}
                <div className="flex items-end justify-between mb-5">
                  <div>
                    <div className="text-white/40 text-xs mb-0.5">{p.material}</div>
                    <div className="font-heading font-bold text-2xl text-white">
                      {p.price}<span className="text-white/40 text-sm font-normal">{p.unit}</span>
                    </div>
                    <div className="text-white/35 text-xs">{p.moq}</div>
                  </div>
                </div>

                {/* CTA */}
                <div className="flex gap-2">
                  <button
                    onClick={() => addToCart(i)}
                    className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
                    style={{
                      background: cartItems.includes(i) ? 'rgba(31,175,90,0.2)' : `${p.accent}18`,
                      border: `1px solid ${cartItems.includes(i) ? 'rgba(31,175,90,0.4)' : `${p.accent}30`}`,
                      color: cartItems.includes(i) ? '#4DC97A' : p.accent,
                    }}
                  >
                    {cartItems.includes(i) ? '✓ Added to Cart' : 'Add to Cart'}
                  </button>
                  <button className="px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)' }}>
                    <FiArrowRight />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 text-center"
        >
          <p className="text-white/40 text-sm mb-4">Need custom products? We work with all sizes of businesses.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="btn-primary px-8 py-4">
              <FiShoppingCart />
              Request Bulk Quote
              <FiArrowRight />
            </button>
            <button className="btn-outline px-8 py-4">Download Product Catalog</button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
