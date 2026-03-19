import { useState } from 'react';

export default function FarmerSupport() {
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [ticketForm, setTicketForm] = useState(false);

  const faqs = [
    { q: 'When will I receive payment after collection?', a: 'Payments are processed within 24 hours of successful collection and quality assessment. The amount is transferred directly to your registered bank account.' },
    { q: 'How is the quality grade determined?', a: 'Our field team assesses moisture content, debris level, and overall straw condition at the time of collection. Grade A is premium dry straw, Grade B has minor moisture, Grade C needs processing.' },
    { q: 'Can I cancel a booked slot?', a: 'Yes, you can cancel a booking up to 24 hours before the scheduled collection time at no cost. Late cancellations may affect your booking priority.' },
    { q: 'What if the vehicle doesn\'t arrive?', a: 'If the collection vehicle doesn\'t arrive within the scheduled window, contact our support team immediately. We\'ll reschedule at the earliest convenience with priority.' },
    { q: 'How do I update my bank details?', a: 'For security reasons, bank detail changes require identity verification. Please contact support or visit your nearest BioPaddy center with your Aadhaar card.' },
  ];

  return (
    <div className="page-enter space-y-6">
      <div>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-surface-900">Help & Support</h1>
        <p className="text-surface-500 mt-1">Get help with your account, bookings, and payments</p>
      </div>

      {/* Contact Cards */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="card text-center hover:border-brand-200">
          <div className="text-3xl mb-3">📞</div>
          <h3 className="font-semibold text-surface-900 mb-1">Call Us</h3>
          <p className="text-brand-600 font-bold">1800-BIO-PADDY</p>
          <p className="text-xs text-surface-400 mt-1">Mon-Sat, 8am - 8pm</p>
        </div>
        <div className="card text-center hover:border-brand-200">
          <div className="text-3xl mb-3">💬</div>
          <h3 className="font-semibold text-surface-900 mb-1">WhatsApp</h3>
          <p className="text-brand-600 font-bold">+91 98765 43210</p>
          <p className="text-xs text-surface-400 mt-1">Quick support via chat</p>
        </div>
        <div className="card text-center hover:border-brand-200">
          <div className="text-3xl mb-3">📧</div>
          <h3 className="font-semibold text-surface-900 mb-1">Email</h3>
          <p className="text-brand-600 font-bold">farmer@biopaddy.com</p>
          <p className="text-xs text-surface-400 mt-1">Response in 24 hours</p>
        </div>
      </div>

      {/* FAQs */}
      <div className="card">
        <h3 className="font-display font-bold text-surface-900 mb-4">Frequently Asked Questions</h3>
        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-surface-100 rounded-xl overflow-hidden">
              <button onClick={() => setExpandedFaq(expandedFaq === i ? null : i)} className="w-full text-left px-5 py-3.5 flex items-center justify-between hover:bg-surface-50 transition-colors">
                <span className="font-medium text-surface-800 text-sm">{faq.q}</span>
                <span className={`text-brand-500 transition-transform text-xs ${expandedFaq === i ? 'rotate-180' : ''}`}>▼</span>
              </button>
              {expandedFaq === i && (
                <div className="px-5 pb-4"><p className="text-sm text-surface-500 leading-relaxed">{faq.a}</p></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Submit Ticket */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-bold text-surface-900">Submit a Ticket</h3>
          <button onClick={() => setTicketForm(!ticketForm)} className="btn-secondary text-sm py-2">
            {ticketForm ? 'Cancel' : '+ New Ticket'}
          </button>
        </div>
        {ticketForm && (
          <form className="space-y-4">
            <div><label className="input-label">Subject</label><input type="text" placeholder="Brief description of your issue" className="input-field" /></div>
            <div><label className="input-label">Category</label>
              <select className="input-field"><option>Payment Issue</option><option>Booking Issue</option><option>Quality Dispute</option><option>Account Issue</option><option>Other</option></select>
            </div>
            <div><label className="input-label">Description</label><textarea rows={4} placeholder="Describe your issue in detail..." className="input-field" /></div>
            <button type="button" className="btn-primary">Submit Ticket</button>
          </form>
        )}
        {!ticketForm && (
          <p className="text-sm text-surface-400">No open tickets. Click "New Ticket" to create one.</p>
        )}
      </div>
    </div>
  );
}
