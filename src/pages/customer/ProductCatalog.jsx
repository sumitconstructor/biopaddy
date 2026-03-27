import { useState } from 'react';
import { Link } from 'react-router-dom';
import { mockProducts } from '../../data/mockData';

export default function ProductCatalog() {
  const [view, setView] = useState('grid');
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('popular');

  const categories = ['all', 'cups', 'plates', 'bowls', 'spoons', 'containers'];
  const filtered = mockProducts
    .filter(p => category === 'all' || p.category === category)
    .filter(p => p.product_name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort === 'price-low') return a.unit_price_rupees - b.unit_price_rupees;
      if (sort === 'price-high') return b.unit_price_rupees - a.unit_price_rupees;
      if (sort === 'rating') return b.rating - a.rating;
      return b.reviews - a.reviews;
    });

  const categoryIcons = { cups: '☕', plates: '🍽️', bowls: '🥣', spoons: '🥄', containers: '📦' };

  return (
    <div className="page-enter space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-surface-900">Product Catalog</h1>
          <p className="text-surface-500 mt-1">Browse our range of biodegradable utensils</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setView('grid')} className={`p-2 rounded-lg ${view === 'grid' ? 'bg-brand-100 text-brand-700' : 'bg-surface-100 text-surface-500'}`}>▦</button>
          <button onClick={() => setView('list')} className={`p-2 rounded-lg ${view === 'list' ? 'bg-brand-100 text-brand-700' : 'bg-surface-100 text-surface-500'}`}>☰</button>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍 Search products..." className="input-field" />
        </div>
        <select value={sort} onChange={e => setSort(e.target.value)} className="input-field w-auto">
          <option value="popular">Most Popular</option>
          <option value="rating">Highest Rated</option>
          <option value="price-low">Price: Low → High</option>
          <option value="price-high">Price: High → Low</option>
        </select>
      </div>

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2">
        {categories.map(c => (
          <button key={c} onClick={() => setCategory(c)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all capitalize ${
              category === c ? 'bg-brand-500 text-white shadow-md' : 'bg-white border border-surface-200 text-surface-600 hover:border-brand-200'
            }`}>
            {c === 'all' ? '🏷️ All' : `${categoryIcons[c]} ${c}`}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      {view === 'grid' ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map(p => (
            <Link key={p.product_id} to={`/customer/products/${p.product_id}`} className="card group hover:border-brand-200 p-4">
              <div className="w-full h-36 rounded-xl bg-gradient-to-br from-brand-50 to-brand-100/50 flex items-center justify-center text-5xl mb-3 group-hover:scale-105 transition-transform">
                {categoryIcons[p.category] || '📦'}
              </div>
              <div className="flex items-center gap-1 mb-1">
                <span className="text-amber-400 text-sm">★</span>
                <span className="text-sm text-surface-600">{p.rating}</span>
                <span className="text-xs text-surface-400">({p.reviews})</span>
              </div>
              <h3 className="font-display font-bold text-surface-900 group-hover:text-brand-700 transition-colors">{p.product_name}</h3>
              <p className="text-xs text-surface-500 mt-0.5 line-clamp-2">{p.description}</p>
              <div className="flex items-center justify-between mt-3">
                <div>
                  <span className="font-display text-lg font-bold text-brand-600">₹{p.unit_price_rupees}</span>
                  <span className="text-xs text-surface-400">/unit</span>
                </div>
                <span className={`text-xs font-medium ${p.quantity_in_stock > 5000 ? 'text-emerald-600' : 'text-amber-600'}`}>
                  {p.quantity_in_stock > 5000 ? '✓ In Stock' : 'Low Stock'}
                </span>
              </div>
              {p.bulk_discount_percentage > 0 && (
                <div className="mt-2 text-xs text-brand-600 bg-brand-50 px-2 py-1 rounded-lg text-center">
                  {p.bulk_discount_percentage}% off on 100+ units
                </div>
              )}
            </Link>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(p => (
            <Link key={p.product_id} to={`/customer/products/${p.product_id}`} className="card flex flex-col sm:flex-row gap-4 p-4 hover:border-brand-200 group">
              <div className="sm:w-32 h-28 sm:h-auto rounded-xl bg-gradient-to-br from-brand-50 to-brand-100/50 flex items-center justify-center text-4xl flex-shrink-0">
                {categoryIcons[p.category] || '📦'}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="badge-neutral capitalize text-xs">{p.category}</span>
                  <span className="text-amber-400 text-sm">★ {p.rating}</span>
                  <span className="text-xs text-surface-400">({p.reviews} reviews)</span>
                </div>
                <h3 className="font-display font-bold text-surface-900 group-hover:text-brand-700 transition-colors">{p.product_name}</h3>
                <p className="text-sm text-surface-500 mt-1">{p.description}</p>
              </div>
              <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2">
                <div className="text-right">
                  <p className="font-display text-xl font-bold text-brand-600">₹{p.unit_price_rupees}</p>
                  <p className="text-xs text-surface-400">per unit</p>
                </div>
                <span className="btn-primary text-sm py-2 px-4">View →</span>
              </div>
            </Link>
          ))}
        </div>
      )}

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <div className="text-5xl mb-4">🔍</div>
          <p className="text-surface-500">No products found matching your criteria</p>
        </div>
      )}
    </div>
  );
}
