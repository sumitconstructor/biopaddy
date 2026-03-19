import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Checkout() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('razorpay');
  const [orderPlaced, setOrderPlaced] = useState(false);

  if (orderPlaced) {
    return (
      <div className="page-enter max-w-2xl mx-auto py-8">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="card text-center py-12">
          <div className="w-20 h-20 rounded-full bg-brand-100 flex items-center justify-center text-4xl mx-auto mb-6 animate-pulse-glow">✅</div>
          <h2 className="font-display text-2xl font-bold text-surface-900 mb-2">Order Placed Successfully!</h2>
          <p className="text-surface-500 mb-6">Thank you for choosing eco-friendly products</p>
          <div className="bg-surface-50 rounded-xl p-6 text-left space-y-3 mb-6">
            <div className="flex justify-between"><span className="text-surface-500">Order ID</span><span className="font-mono font-semibold">ORD-{Date.now().toString(36).toUpperCase()}</span></div>
            <div className="flex justify-between"><span className="text-surface-500">Payment</span><span className="font-semibold capitalize">{paymentMethod}</span></div>
            <div className="flex justify-between"><span className="text-surface-500">Estimated Delivery</span><span className="font-semibold">Apr 5, 2026</span></div>
            <div className="flex justify-between border-t border-surface-200 pt-3"><span className="text-surface-500 font-medium">Total Amount</span><span className="font-bold text-brand-600 text-lg">₹12,450</span></div>
          </div>
          <div className="flex items-center gap-2 justify-center text-sm text-surface-400 mb-6">
            <span>📧</span><span>Confirmation email sent to your registered address</span>
          </div>
          <div className="flex gap-3 justify-center">
            <button onClick={() => navigate('/customer/orders')} className="btn-primary">View Orders</button>
            <button onClick={() => navigate('/customer/products')} className="btn-secondary">Continue Shopping</button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="page-enter space-y-6">
      <div>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-surface-900">Checkout</h1>
        <p className="text-surface-500 mt-1">Complete your order in a few simple steps</p>
      </div>

      {/* Progress */}
      <div className="flex items-center justify-center gap-3">
        {['Delivery', 'Payment', 'Review'].map((s, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${i + 1 <= step ? 'bg-brand-500 text-white' : 'bg-surface-200 text-surface-500'}`}>{i + 1}</div>
            <span className={`text-sm font-medium ${i + 1 <= step ? 'text-brand-600' : 'text-surface-400'}`}>{s}</span>
            {i < 2 && <div className={`w-12 h-0.5 ${i + 1 < step ? 'bg-brand-500' : 'bg-surface-200'}`} />}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {step === 1 && (
            <div className="card">
              <h3 className="font-display font-bold text-surface-900 mb-4">Delivery Address</h3>
              <div className="space-y-4">
                <div className="p-4 rounded-xl border-2 border-brand-500 bg-brand-50/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-surface-900">Default Address</span>
                    <span className="badge-success">Selected</span>
                  </div>
                  <p className="text-sm text-surface-600">GreenPlate Foods Pvt Ltd<br/>12 MG Road, Sector 17<br/>Gurugram, Haryana 122001</p>
                </div>
                <button className="w-full py-3 border-2 border-dashed border-surface-200 rounded-xl text-sm text-surface-500 hover:border-brand-300 hover:text-brand-600 transition-colors">
                  + Add New Address
                </button>
                <div><label className="input-label">Special Delivery Instructions (optional)</label><textarea rows={2} placeholder="e.g. Ring gate bell, deliver to loading dock" className="input-field" /></div>
                <button onClick={() => setStep(2)} className="btn-primary w-full">Continue to Payment →</button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="card">
              <h3 className="font-display font-bold text-surface-900 mb-4">Payment Method</h3>
              <div className="space-y-3 mb-6">
                {[
                  { key: 'razorpay', label: 'Razorpay (Card, UPI, Netbanking)', icon: '💳', desc: 'Pay securely with multiple options' },
                  { key: 'bank_transfer', label: 'Bank Transfer (NEFT/RTGS)', icon: '🏦', desc: 'For orders above ₹10,000' },
                ].map(m => (
                  <button key={m.key} onClick={() => setPaymentMethod(m.key)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all ${paymentMethod === m.key ? 'border-brand-500 bg-brand-50/30' : 'border-surface-200 hover:border-brand-200'}`}>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{m.icon}</span>
                      <div>
                        <p className="font-semibold text-surface-900">{m.label}</p>
                        <p className="text-xs text-surface-500">{m.desc}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="btn-ghost border border-surface-200 flex-1">← Back</button>
                <button onClick={() => setStep(3)} className="btn-primary flex-1">Review Order →</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="card">
              <h3 className="font-display font-bold text-surface-900 mb-4">Review & Confirm</h3>
              <div className="space-y-4">
                <div className="p-4 bg-surface-50 rounded-xl">
                  <h4 className="font-semibold text-surface-800 text-sm mb-2">📍 Delivery Address</h4>
                  <p className="text-sm text-surface-600">GreenPlate Foods Pvt Ltd, 12 MG Road, Gurugram, Haryana 122001</p>
                </div>
                <div className="p-4 bg-surface-50 rounded-xl">
                  <h4 className="font-semibold text-surface-800 text-sm mb-2">💳 Payment Method</h4>
                  <p className="text-sm text-surface-600 capitalize">{paymentMethod.replace('_', ' ')}</p>
                </div>
                <div className="p-4 bg-surface-50 rounded-xl">
                  <h4 className="font-semibold text-surface-800 text-sm mb-3">📦 Order Items</h4>
                  <div className="space-y-2">
                    {[{ name: 'Eco Cup 200ml', qty: 500, price: 1912 }, { name: 'Round Plate 8"', qty: 1000, price: 4400 }, { name: 'Eco Spoon', qty: 2000, price: 3200 }].map((item, i) => (
                      <div key={i} className="flex justify-between text-sm">
                        <span className="text-surface-600">{item.name} × {item.qty}</span>
                        <span className="font-semibold">₹{item.price.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setStep(2)} className="btn-ghost border border-surface-200 flex-1">← Back</button>
                  <button onClick={() => setOrderPlaced(true)} className="btn-primary flex-1 py-3.5">🔒 Place Order</button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Summary */}
        <div className="card h-fit sticky top-24">
          <h3 className="font-display font-bold text-surface-900 mb-4">Order Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-surface-500">Subtotal (3 items)</span><span>₹9,512</span></div>
            <div className="flex justify-between text-emerald-600"><span>Bulk Discount</span><span>-₹1,427</span></div>
            <div className="flex justify-between"><span className="text-surface-500">Shipping</span><span className="text-emerald-600">Free</span></div>
            <div className="flex justify-between"><span className="text-surface-500">GST (18%)</span><span>₹1,455</span></div>
            <div className="flex justify-between font-bold text-lg border-t border-surface-200 pt-3"><span>Total</span><span className="text-brand-600">₹9,540</span></div>
          </div>
          <div className="mt-4 p-3 bg-emerald-50 rounded-xl text-sm text-emerald-700">
            🌿 This order saves ~87.5 kg CO₂ equivalent
          </div>
        </div>
      </div>
    </div>
  );
}
