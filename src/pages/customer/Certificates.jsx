import { mockCertificates } from '../../data/mockData';

export default function Certificates() {
  return (
    <div className="page-enter space-y-6">
      <div>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-surface-900">Environmental Certificates</h1>
        <p className="text-surface-500 mt-1">Your sustainability impact, verified and certified</p>
      </div>

      {/* Cumulative Impact */}
      <div className="card bg-gradient-dark text-white">
        <h3 className="font-display font-bold text-lg mb-4">🌍 Cumulative Environmental Impact</h3>
        <div className="grid sm:grid-cols-4 gap-4">
          {[
            { label: 'Paddy Diverted', value: '2,430 kg', icon: '🌾' },
            { label: 'CO₂ Saved', value: '3,645 kg', icon: '💨' },
            { label: 'AQI Improvement', value: '0.19%', icon: '🌬️' },
            { label: 'Certificates', value: '3', icon: '📜' },
          ].map((s, i) => (
            <div key={i} className="text-center p-4 rounded-xl bg-white/5">
              <div className="text-2xl mb-2">{s.icon}</div>
              <p className="font-display text-xl font-bold">{s.value}</p>
              <p className="text-sm text-white/60">{s.label}</p>
            </div>
          ))}
        </div>
        <button className="mt-4 w-full py-2 text-sm font-medium text-brand-300 hover:text-white border border-white/10 rounded-xl hover:bg-white/5 transition-all">
          📊 Download Annual Impact Report (PDF)
        </button>
      </div>

      {/* Certificate List */}
      <div className="space-y-4">
        {mockCertificates.map(cert => (
          <div key={cert.certificate_id} className="card">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-emerald-50 flex items-center justify-center text-2xl">📜</div>
                <div>
                  <p className="font-semibold text-surface-900">{cert.company_name}</p>
                  <p className="text-sm text-surface-500">Certificate #{cert.certificate_id.toUpperCase()}</p>
                  <p className="text-xs text-surface-400">Order: {cert.order_id.toUpperCase()}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`badge ${cert.verification_status === 'issued' ? 'badge-success' : 'badge-warning'}`}>{cert.verification_status}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-surface-100 grid sm:grid-cols-3 gap-4">
              <div className="text-center p-3 bg-emerald-50 rounded-xl">
                <p className="text-sm text-emerald-600">Paddy Diverted</p>
                <p className="font-display text-xl font-bold text-emerald-800">{cert.paddy_diverted_kg} kg</p>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-xl">
                <p className="text-sm text-blue-600">CO₂ Saved</p>
                <p className="font-display text-xl font-bold text-blue-800">{cert.co2_saved_kg} kg</p>
              </div>
              <div className="text-center p-3 bg-amber-50 rounded-xl">
                <p className="text-sm text-amber-600">AQI Reduction</p>
                <p className="font-display text-xl font-bold text-amber-800">{(cert.aqi_impact_reduction * 100).toFixed(2)}%</p>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {cert.verification_status === 'issued' && (
                <>
                  <button className="btn-primary text-sm py-2">📥 Download PDF</button>
                  <button className="btn-secondary text-sm py-2">📤 Share on LinkedIn</button>
                </>
              )}
              {cert.verification_status === 'pending' && (
                <p className="text-sm text-amber-600">⏳ Certificate pending verification. You'll be notified when it's ready.</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
