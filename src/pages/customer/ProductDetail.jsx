import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockProducts } from '../../data/mockData';

export default function ProductDetail() {
  const { id } = useParams();
  const product = mockProducts.find(p => p.product_id === id) || mockProducts[0];
  const [quantity, setQuantity] = useState(100);
  const [activeTab, setActiveTab] = useState('specs');

  const discount = quantity >= 1000 ? product.bulk_discount_percentage + 5 :
                   quantity >= 500 ? product.bulk_discount_percentage + 2 :
                   quantity >= 100 ? product.bulk_discount_percentage : 0;
  const unitPrice = product.unit_price_rupees * (1 - discount / 100);
  const totalPrice = unitPrice * quantity;
  const co2PerUnit = 0.025;

  const categoryIcons = { cups: '☕', plates: '🍽️', bowls: '🥣', spoons: '🥄', containers: '📦' };

  return (
    <div className="page-enter space-y-6">
      <div className="flex items-center gap-2 text-sm text-surface-500">
        <Link to="/customer/products" className="hover:text-brand-600">Products</Link>
        <span>→</span>
        <span className="text-surface-800 capitalize">{product.category}</span>
        <span>→</span>
        <span className="text-surface-800">{product.product_name}</span>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="card p-8">
          <div className="w-full h-72 rounded-2xl bg-gradient-to-br from-brand-50 to-brand-100/50 flex items-center justify-center text-8xl">
            {categoryIcons[product.category] || '📦'}
          </div>
          <div className="flex gap-2 mt-4 justify-center">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className={`w-16 h-16 rounded-xl bg-brand-50 flex items-center justify-center text-2xl border-2 ${i === 1 ? 'border-brand-500' : 'border-transparent'} cursor-pointer hover:border-brand-300 transition-colors`}>
                {categoryIcons[product.category] || '📦'}
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-5">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="badge-success capitalize">{product.category}</span>
              <div className="flex items-center gap-1 text-amber-400">
                {'★'.repeat(Math.floor(product.rating))}
                <span className="text-surface-500 text-sm ml-1">{product.rating} ({product.reviews} reviews)</span>
              </div>
            </div>
            <h1 className="font-display text-3xl font-bold text-surface-900">{product.product_name}</h1>
            <p className="text-surface-500 mt-2">{product.description}</p>
          </div>

          <div className="flex items-end gap-3">
            <span className="font-display text-4xl font-bold text-brand-600">₹{unitPrice.toFixed(1)}</span>
            <span className="text-surface-400 text-lg">/unit</span>
            {discount > 0 && (
              <span className="badge-success ml-2">{discount}% bulk discount</span>
            )}
          </div>

          {/* Quantity & Pricing */}
          <div className="card bg-surface-50 border-surface-200">
            <h4 className="font-semibold text-surface-800 mb-3">Bulk Pricing Calculator</h4>
            <div className="flex items-center gap-4 mb-4">
              <label className="text-sm text-surface-600 font-medium">Quantity:</label>
              <input type="number" value={quantity} onChange={e => setQuantity(parseInt(e.target.value) || 0)}
                className="input-field w-32" min={1} />
            </div>
            <div className="grid grid-cols-3 gap-3 text-center">
              {[100, 500, 1000].map(q => (
                <button key={q} onClick={() => setQuantity(q)}
                  className={`py-2 rounded-lg text-sm font-medium border transition-all ${
                    quantity === q ? 'bg-brand-500 text-white border-brand-500' : 'border-surface-200 text-surface-600 hover:border-brand-200'
                  }`}>{q}+ units</button>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-surface-200 space-y-2">
              <div className="flex justify-between text-sm"><span className="text-surface-500">Unit Price</span><span>₹{unitPrice.toFixed(2)}</span></div>
              <div className="flex justify-between text-sm"><span className="text-surface-500">Quantity</span><span>{quantity.toLocaleString()}</span></div>
              <div className="flex justify-between text-sm"><span className="text-surface-500">Discount</span><span className="text-emerald-600">-{discount}%</span></div>
              <div className="flex justify-between font-bold text-lg border-t border-surface-200 pt-2"><span>Total</span><span className="text-brand-600">₹{totalPrice.toLocaleString()}</span></div>
            </div>
          </div>

          {/* Environmental Impact */}
          <div className="flex items-center gap-4 p-3 bg-emerald-50 rounded-xl border border-emerald-100">
            <span className="text-2xl">🌿</span>
            <div className="text-sm">
              <p className="font-medium text-emerald-800">This order saves ~{(co2PerUnit * quantity).toFixed(1)} kg CO₂</p>
              <p className="text-emerald-600">Equivalent to planting {Math.ceil(co2PerUnit * quantity / 22)} trees</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button className="btn-primary flex-1 py-3.5 text-base">🛒 Add to Cart</button>
            <button className="btn-secondary py-3.5">♡ Save</button>
          </div>

          <p className="text-sm text-surface-400">
            📦 Lead time: {product.manufacturing_lead_time_days} days • ✓ {product.quantity_in_stock.toLocaleString()} in stock
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="card">
        <div className="flex border-b border-surface-100 mb-4">
          {['specs', 'reviews', 'sustainability'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-all capitalize ${
                activeTab === tab ? 'border-brand-500 text-brand-700' : 'border-transparent text-surface-500 hover:text-surface-700'
              }`}>{tab === 'specs' ? 'Specifications' : tab}</button>
          ))}
        </div>

        {activeTab === 'specs' && product.specs && (
          <div className="grid sm:grid-cols-2 gap-4">
            {Object.entries(product.specs).map(([key, val]) => (
              <div key={key} className="flex justify-between p-3 bg-surface-50 rounded-xl">
                <span className="text-sm text-surface-500 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                <span className="text-sm font-semibold text-surface-800">{val}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-4">
            {[
              { name: 'Priya S.', rating: 5, comment: 'Excellent quality! Our hotel guests love these eco-friendly plates.', date: '2026-03-08' },
              { name: 'Amit G.', rating: 4, comment: 'Good product. Holds up well for hot items. Slightly higher price but worth it for sustainability.', date: '2026-02-20' },
            ].map((r, i) => (
              <div key={i} className="p-4 bg-surface-50 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-amber-400">{'★'.repeat(r.rating)}</span>
                    <span className="font-semibold text-sm">{r.name}</span>
                  </div>
                  <span className="text-xs text-surface-400">{r.date}</span>
                </div>
                <p className="text-sm text-surface-600">{r.comment}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'sustainability' && (
          <div className="space-y-4">
            <div className="flex items-start gap-3"><span className="text-xl">♻️</span><div><h4 className="font-semibold">100% Biodegradable</h4><p className="text-sm text-surface-500">Made entirely from agricultural waste. Decomposes in {product.specs?.compostable || '60-90 days'}.</p></div></div>
            <div className="flex items-start gap-3"><span className="text-xl">🌾</span><div><h4 className="font-semibold">Crop Residue Based</h4><p className="text-sm text-surface-500">Made from rice and wheat straw that would otherwise be burned, causing air pollution.</p></div></div>
            <div className="flex items-start gap-3"><span className="text-xl">🏠</span><div><h4 className="font-semibold">Home Compostable</h4><p className="text-sm text-surface-500">Can be composted at home without any industrial composting facility.</p></div></div>
            <div className="flex items-start gap-3"><span className="text-xl">🧪</span><div><h4 className="font-semibold">Chemical-Free</h4><p className="text-sm text-surface-500">No chemicals, plastics, or synthetic materials used in manufacturing.</p></div></div>
          </div>
        )}
      </div>
    </div>
  );
}
