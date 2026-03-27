import { useState } from 'react';
import { Link } from 'react-router-dom';
import { mockProducts } from '../../data/mockData';

export default function Cart() {
  const [cartItems, setCartItems] = useState([
    { product: mockProducts[0], quantity: 500 },
    { product: mockProducts[2], quantity: 1000 },
    { product: mockProducts[4], quantity: 2000 },
  ]);
  const [coupon, setCoupon] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);

  const updateQty = (idx, qty) => {
    const updated = [...cartItems];
    updated[idx].quantity = Math.max(1, qty);
    setCartItems(updated);
  };

  const removeItem = (idx) => setCartItems(cartItems.filter((_, i) => i !== idx));
  const categoryIcons = { cups: '☕', plates: '🍽️', bowls: '🥣', spoons: '🥄', containers: '📦' };

  const subtotal = cartItems.reduce((sum, item) => {
    const discount = item.quantity >= 100 ? item.product.bulk_discount_percentage : 0;
    return sum + item.product.unit_price_rupees * item.quantity * (1 - discount / 100);
  }, 0);

  const couponDiscount = couponApplied ? subtotal * 0.05 : 0;
  const gst = (subtotal - couponDiscount) * 0.18;
  const total = subtotal - couponDiscount + gst;

  return (
    <div className="page-enter space-y-6">
      <div>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-surface-900">Shopping Cart</h1>
        <p className="text-surface-500 mt-1">{cartItems.length} items in your cart</p>
      </div>

      {cartItems.length === 0 ? (
        <div className="card text-center py-16">
          <div className="text-6xl mb-4">🛒</div>
          <h3 className="font-display text-xl font-bold text-surface-900 mb-2">Your cart is empty</h3>
          <p className="text-surface-500 mb-6">Browse our catalog and add some eco-friendly products!</p>
          <Link to="/customer/products" className="btn-primary">Browse Products →</Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-3">
            {cartItems.map((item, idx) => {
              const discount = item.quantity >= 100 ? item.product.bulk_discount_percentage : 0;
              const price = item.product.unit_price_rupees * (1 - discount / 100);
              return (
                <div key={idx} className="card flex flex-col sm:flex-row gap-4 p-4">
                  <div className="w-20 h-20 rounded-xl bg-brand-50 flex items-center justify-center text-3xl flex-shrink-0">
                    {categoryIcons[item.product.category]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-surface-900">{item.product.product_name}</h3>
                    <p className="text-sm text-surface-500">₹{price.toFixed(2)}/unit {discount > 0 && <span className="text-emerald-600">({discount}% off)</span>}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <button onClick={() => updateQty(idx, item.quantity - 50)} className="w-8 h-8 rounded-lg bg-surface-100 hover:bg-surface-200 flex items-center justify-center text-surface-600 font-bold">−</button>
                      <input type="number" value={item.quantity} onChange={e => updateQty(idx, parseInt(e.target.value) || 0)} className="w-20 text-center input-field py-1.5" />
                      <button onClick={() => updateQty(idx, item.quantity + 50)} className="w-8 h-8 rounded-lg bg-surface-100 hover:bg-surface-200 flex items-center justify-center text-surface-600 font-bold">+</button>
                    </div>
                  </div>
                  <div className="flex sm:flex-col items-center sm:items-end justify-between">
                    <p className="font-display text-lg font-bold text-surface-900">₹{(price * item.quantity).toLocaleString()}</p>
                    <button onClick={() => removeItem(idx)} className="text-sm text-red-500 hover:text-red-700 font-medium">Remove</button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order Summary */}
          <div className="card h-fit sticky top-24">
            <h3 className="font-display font-bold text-surface-900 mb-4">Order Summary</h3>

            {/* Coupon */}
            <div className="flex gap-2 mb-4">
              <input type="text" value={coupon} onChange={e => setCoupon(e.target.value)} placeholder="Discount code" className="input-field flex-1 text-sm" />
              <button onClick={() => setCouponApplied(coupon.length > 0)} className="px-4 py-2 bg-brand-50 text-brand-700 font-medium rounded-xl text-sm hover:bg-brand-100">Apply</button>
            </div>
            {couponApplied && <p className="text-sm text-emerald-600 mb-3">✓ Coupon applied: 5% off</p>}

            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-surface-500">Subtotal</span><span>₹{subtotal.toLocaleString()}</span></div>
              {couponApplied && <div className="flex justify-between text-emerald-600"><span>Coupon Discount</span><span>-₹{couponDiscount.toLocaleString()}</span></div>}
              <div className="flex justify-between"><span className="text-surface-500">GST (18%)</span><span>₹{gst.toLocaleString()}</span></div>
              <div className="flex justify-between font-bold text-lg border-t border-surface-200 pt-3">
                <span>Total</span>
                <span className="text-brand-600">₹{total.toLocaleString()}</span>
              </div>
            </div>

            <Link to="/customer/checkout" className="btn-primary w-full mt-4 py-3.5 text-base">
              Proceed to Checkout →
            </Link>

            <Link to="/customer/products" className="block text-center text-sm text-brand-600 font-medium mt-3 hover:text-brand-700">
              ← Continue Shopping
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
