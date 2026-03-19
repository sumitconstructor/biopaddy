import { useState } from 'react';

export default function Resources() {
  const [activeTab, setActiveTab] = useState('tips');

  const tips = [
    { title: 'How to Prepare Paddy for Collection', icon: '🌾', content: 'Ensure straw is dry and free from major debris. Bundle loosely for easy loading. Store in a covered area to prevent moisture damage.', tag: 'Collection' },
    { title: 'Understanding Quality Grades', icon: '📊', content: 'Grade A: Premium dry straw (<12% moisture), earning ₹2,000/qtl. Grade B: Good quality with minor moisture, ₹1,600/qtl. Grade C: Standard, needs processing, ₹1,200/qtl.', tag: 'Quality' },
    { title: 'Storage Best Practices', icon: '🏠', content: 'Store straw off the ground on raised platforms. Cover with tarpaulin during monsoons. Keep away from fire sources and chemicals.', tag: 'Storage' },
    { title: 'Maximizing Your Earnings', icon: '💡', content: 'Book slots early for preferred time slots. Maintain Grade A quality consistently. Supply larger quantities for volume bonuses.', tag: 'Earnings' },
  ];

  const articles = [
    { title: 'Why Stubble Burning Hurts Everyone', date: '2026-03-10', readTime: '5 min read', desc: 'Understanding the environmental and health impact of crop residue burning in Northern India.', tag: 'Environment' },
    { title: 'Seasonal Farming Guide: Rabi Season 2026', date: '2026-02-15', readTime: '8 min read', desc: 'Best practices for wheat cultivation and straw management during the Rabi season.', tag: 'Farming' },
    { title: 'Government Subsidies for Sustainable Farming', date: '2026-01-20', readTime: '6 min read', desc: 'A guide to available government schemes and subsidies for farmers adopting sustainable practices.', tag: 'Schemes' },
    { title: 'Success Story: How Gurpreet Earns ₹3L Extra', date: '2026-03-05', readTime: '4 min read', desc: 'Gurpreet Singh from Jalandhar shares how selling straw to BioPaddy transformed his income.', tag: 'Story' },
  ];

  return (
    <div className="page-enter space-y-6">
      <div>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-surface-900">Resources & Learning</h1>
        <p className="text-surface-500 mt-1">Tips, guides, and articles to help you succeed</p>
      </div>

      <div className="flex gap-2">
        <button onClick={() => setActiveTab('tips')} className={`px-5 py-2 rounded-xl text-sm font-medium transition-all ${activeTab === 'tips' ? 'bg-brand-500 text-white' : 'bg-white border border-surface-200 text-surface-600'}`}>
          💡 Tips & Best Practices
        </button>
        <button onClick={() => setActiveTab('articles')} className={`px-5 py-2 rounded-xl text-sm font-medium transition-all ${activeTab === 'articles' ? 'bg-brand-500 text-white' : 'bg-white border border-surface-200 text-surface-600'}`}>
          📰 Articles & Guides
        </button>
      </div>

      {activeTab === 'tips' && (
        <div className="grid sm:grid-cols-2 gap-4">
          {tips.map((tip, i) => (
            <div key={i} className="card hover:border-brand-200 group">
              <div className="flex items-start gap-3 mb-3">
                <span className="text-2xl">{tip.icon}</span>
                <div>
                  <span className="badge-info text-xs mb-1">{tip.tag}</span>
                  <h3 className="font-display font-bold text-surface-900 group-hover:text-brand-700 transition-colors">{tip.title}</h3>
                </div>
              </div>
              <p className="text-surface-500 text-sm leading-relaxed">{tip.content}</p>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'articles' && (
        <div className="space-y-4">
          {articles.map((a, i) => (
            <div key={i} className="card hover:border-brand-200 group cursor-pointer flex flex-col sm:flex-row gap-4">
              <div className="sm:w-40 h-32 sm:h-auto rounded-xl bg-gradient-to-br from-brand-100 to-brand-50 flex items-center justify-center text-4xl flex-shrink-0">
                📄
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="badge-neutral text-xs">{a.tag}</span>
                  <span className="text-xs text-surface-400">{a.date}</span>
                  <span className="text-xs text-surface-400">• {a.readTime}</span>
                </div>
                <h3 className="font-display font-bold text-lg text-surface-900 group-hover:text-brand-700 transition-colors">{a.title}</h3>
                <p className="text-surface-500 text-sm mt-1">{a.desc}</p>
                <button className="text-sm text-brand-600 font-medium mt-2 hover:text-brand-700">Read More →</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
