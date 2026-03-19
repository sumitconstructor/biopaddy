import { useState } from 'react';
import { motion } from 'framer-motion';

const timeSlots = ['morning', 'afternoon', 'evening'];
const grades = [
  { value: 'A', label: 'Grade A — Premium', desc: 'Dry, clean, well-stored straw', rate: 2000 },
  { value: 'B', label: 'Grade B — Good', desc: 'Slightly moist, minor debris', rate: 1600 },
  { value: 'C', label: 'Grade C — Standard', desc: 'Needs processing, mixed quality', rate: 1200 },
];

const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
const getFirstDay = (year, month) => new Date(year, month, 1).getDay();

export default function SlotBooking() {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);
  const [timeSlot, setTimeSlot] = useState('');
  const [quantity, setQuantity] = useState('');
  const [grade, setGrade] = useState('');
  const [notes, setNotes] = useState('');
  const [booked, setBooked] = useState(false);

  const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const dayNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDay(currentYear, currentMonth);
  const today = new Date();

  const blockedDates = [5, 12, 19, 26]; // Sundays typically blocked
  const bookedDates = [8, 15, 22]; // Already booked

  const prevMonth = () => {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(currentYear - 1); }
    else setCurrentMonth(currentMonth - 1);
  };
  const nextMonth = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(currentYear + 1); }
    else setCurrentMonth(currentMonth + 1);
  };

  const selectedGrade = grades.find(g => g.value === grade);
  const estimatedPayment = selectedGrade && quantity ? (parseFloat(quantity) * selectedGrade.rate) : 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    setBooked(true);
  };

  if (booked) {
    return (
      <div className="page-enter max-w-2xl mx-auto">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="card text-center py-12">
          <div className="w-20 h-20 rounded-full bg-brand-100 flex items-center justify-center text-4xl mx-auto mb-6">✅</div>
          <h2 className="font-display text-2xl font-bold text-surface-900 mb-2">Booking Confirmed!</h2>
          <p className="text-surface-500 mb-6">Your collection slot has been booked successfully</p>
          <div className="bg-surface-50 rounded-xl p-6 text-left space-y-3 mb-6">
            <div className="flex justify-between"><span className="text-surface-500">Booking ID</span><span className="font-mono font-semibold">BK-{Date.now().toString(36).toUpperCase()}</span></div>
            <div className="flex justify-between"><span className="text-surface-500">Collection Date</span><span className="font-semibold">{selectedDate} {monthNames[currentMonth]} {currentYear}</span></div>
            <div className="flex justify-between"><span className="text-surface-500">Time Slot</span><span className="font-semibold capitalize">{timeSlot}</span></div>
            <div className="flex justify-between"><span className="text-surface-500">Quantity</span><span className="font-semibold">{quantity} quintals</span></div>
            <div className="flex justify-between"><span className="text-surface-500">Quality Grade</span><span className="font-semibold">Grade {grade}</span></div>
            <div className="flex justify-between border-t border-surface-200 pt-3"><span className="text-surface-500 font-medium">Estimated Payment</span><span className="font-bold text-brand-600 text-lg">₹{estimatedPayment.toLocaleString()}</span></div>
          </div>
          <p className="text-sm text-surface-400 mb-6">📱 SMS confirmation sent to your phone</p>
          <div className="flex gap-3 justify-center">
            <button onClick={() => setBooked(false)} className="btn-secondary">Book Another Slot</button>
            <button onClick={() => window.location.href='/farmer/bookings'} className="btn-primary">View My Bookings</button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="page-enter space-y-6">
      <div>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-surface-900">Book Collection Slot</h1>
        <p className="text-surface-500 mt-1">Select a date and time for paddy collection</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2 card">
          <div className="flex items-center justify-between mb-4">
            <button onClick={prevMonth} className="p-2 hover:bg-surface-100 rounded-lg">←</button>
            <h3 className="font-display font-bold text-surface-900">{monthNames[currentMonth]} {currentYear}</h3>
            <button onClick={nextMonth} className="p-2 hover:bg-surface-100 rounded-lg">→</button>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {dayNames.map(d => (
              <div key={d} className="text-center text-xs font-semibold text-surface-400 py-2">{d}</div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1">
            {[...Array(firstDay)].map((_, i) => <div key={`empty-${i}`} />)}
            {[...Array(daysInMonth)].map((_, i) => {
              const day = i + 1;
              const isBlocked = blockedDates.includes(day);
              const isBooked = bookedDates.includes(day);
              const isPast = new Date(currentYear, currentMonth, day) < new Date(today.getFullYear(), today.getMonth(), today.getDate());
              const isSelected = selectedDate === day;
              const isToday = day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();

              return (
                <button
                  key={day}
                  disabled={isBlocked || isPast}
                  onClick={() => setSelectedDate(day)}
                  className={`aspect-square rounded-xl text-sm font-medium transition-all ${
                    isSelected ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/30 scale-105' :
                    isBlocked ? 'bg-surface-100 text-surface-300 cursor-not-allowed' :
                    isPast ? 'text-surface-300 cursor-not-allowed' :
                    isBooked ? 'bg-blue-50 text-blue-600 border border-blue-200' :
                    isToday ? 'bg-brand-50 text-brand-700 border border-brand-200' :
                    'hover:bg-brand-50 text-surface-700 hover:text-brand-700'
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 mt-4 text-xs text-surface-500">
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-brand-500" /> Selected</div>
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-blue-100 border border-blue-200" /> Booked</div>
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-surface-100" /> Unavailable</div>
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-brand-50 border border-brand-200" /> Today</div>
          </div>
        </div>

        {/* Booking Form */}
        <div className="card">
          <h3 className="font-display font-bold text-surface-900 mb-4">Booking Details</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="input-label">Selected Date</label>
              <div className="input-field bg-surface-100">
                {selectedDate ? `${selectedDate} ${monthNames[currentMonth]} ${currentYear}` : 'Select a date from calendar'}
              </div>
            </div>

            <div>
              <label className="input-label">Time Slot</label>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map(t => (
                  <button key={t} type="button" onClick={() => setTimeSlot(t)}
                    className={`py-2 px-3 rounded-lg text-xs font-medium border transition-all capitalize ${
                      timeSlot === t ? 'bg-brand-500 text-white border-brand-500' : 'border-surface-200 text-surface-600 hover:border-brand-300'
                    }`}>{t === 'morning' ? '🌅 ' : t === 'afternoon' ? '☀️ ' : '🌙 '}{t}</button>
                ))}
              </div>
            </div>

            <div>
              <label className="input-label">Estimated Quantity (quintals)</label>
              <input type="number" value={quantity} onChange={e => setQuantity(e.target.value)} placeholder="e.g. 12" className="input-field" min="1" max="100" />
            </div>

            <div>
              <label className="input-label">Quality Grade</label>
              <div className="space-y-2">
                {grades.map(g => (
                  <button key={g.value} type="button" onClick={() => setGrade(g.value)}
                    className={`w-full text-left p-3 rounded-xl border transition-all ${
                      grade === g.value ? 'border-brand-500 bg-brand-50' : 'border-surface-200 hover:border-brand-200'
                    }`}>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-sm">{g.label}</span>
                      <span className="text-xs font-medium text-brand-600">₹{g.rate}/qtl</span>
                    </div>
                    <p className="text-xs text-surface-500 mt-0.5">{g.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="input-label">Notes (optional)</label>
              <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Any special instructions..." className="input-field" rows={2} />
            </div>

            {/* Price estimate */}
            {estimatedPayment > 0 && (
              <div className="bg-brand-50 rounded-xl p-4 border border-brand-100">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-brand-700">Estimated Payment</span>
                  <span className="font-display text-xl font-bold text-brand-700">₹{estimatedPayment.toLocaleString()}</span>
                </div>
                <p className="text-xs text-brand-600/70 mt-1">Final amount based on actual weight & quality assessment</p>
              </div>
            )}

            <button type="submit" disabled={!selectedDate || !timeSlot || !quantity || !grade}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed">
              Confirm Booking
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
