import React, { useState } from 'react';

export default function App() {
  const [sqft, setSqft] = useState(2200);
  const [pitch, setPitch] = useState('standard');
  const [material, setMaterial] = useState('shingle');

  const materialRates = { shingle: 4.50, metal: 9.00, tile: 11.50 };
  const pitchMultipliers = { standard: 1.0, steep: 1.25, ultra: 1.45 };

  const basePrice = sqft * materialRates[material] * pitchMultipliers[pitch];
  const lowEstimate = Math.round(basePrice * 0.9);
  const highEstimate = Math.round(basePrice * 1.15);

  const handleScrollToForm = () => {
    const formEl = document.getElementById('ghl-form');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      {/* Header / Nav */}
      <nav className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-50 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-xl font-black tracking-tight text-white">MidSize<span className="text-amber-400">AI</span></span>
          <span className="text-xs bg-amber-400/10 text-amber-400 border border-amber-400/20 px-2 py-0.5 rounded-full font-mono">Honest Roofer</span>
        </div>
        <button 
          onClick={handleScrollToForm}
          className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-4 py-2 rounded-lg text-sm transition-all"
        >
          Book Demo / Get Estimate
        </button>
      </nav>

      {/* Hero Section */}
      <header className="max-w-5xl mx-auto text-center px-6 pt-16 pb-12">
        <div className="inline-block bg-slate-900 border border-slate-800 rounded-full px-4 py-1.5 text-xs text-amber-400 font-semibold mb-6">
          Powered by Samantha AI & The Honest Roofer Podcast
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight mb-6">
          Never Miss a Roofing Lead Again. <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">
            Automated Inbound AI for Contractors.
          </span>
        </h1>
        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-8">
          MidSize AI handles missed calls, schedules estimates, and qualifies homeowners 24/7 so you can focus on building roofs.
        </p>
      </header>

      {/* Interactive Estimator Tool */}
      <section className="max-w-4xl mx-auto px-6 mb-20">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl">
          <div className="text-center mb-8">
            <span className="text-amber-400 font-semibold uppercase text-xs tracking-widest">Interactive Calculator</span>
            <h2 className="text-2xl md:text-3xl font-bold mt-1">Instant Roof Cost Estimator</h2>
            <p className="text-slate-400 text-sm mt-1">Calculate real labor and material expectations instantly.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2 text-sm">
                  <span className="text-slate-300 font-medium">Roof Size</span>
                  <span className="text-amber-400 font-bold">{sqft.toLocaleString()} sq ft</span>
                </div>
                <input
                  type="range"
                  min="800"
                  max="6000"
                  step="100"
                  value={sqft}
                  onChange={(e) => setSqft(Number(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 uppercase font-semibold mb-2">Roof Pitch</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'standard', label: 'Standard' },
                    { id: 'steep', label: 'Steep' },
                    { id: 'ultra', label: 'Very Steep' },
                  ].map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setPitch(p.id)}
                      className={`py-2 text-xs font-semibold rounded-lg border transition-all ${
                        pitch === p.id
                          ? 'bg-amber-400 text-slate-950 border-amber-400'
                          : 'bg-slate-800 text-slate-300 border-slate-700 hover:border-slate-600'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-400 uppercase font-semibold mb-2">Material Type</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'shingle', label: 'Shingle' },
                    { id: 'metal', label: 'Metal' },
                    { id: 'tile', label: 'Tile' },
                  ].map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setMaterial(m.id)}
                      className={`py-2 text-xs font-semibold rounded-lg border transition-all ${
                        material === m.id
                          ? 'bg-amber-400 text-slate-950 border-amber-400'
                          : 'bg-slate-800 text-slate-300 border-slate-700 hover:border-slate-600'
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 text-center flex flex-col justify-between h-full">
              <div>
                <span className="text-xs text-slate-400 uppercase tracking-widest">Estimated Price Range</span>
                <div className="text-3xl font-extrabold text-amber-400 my-4">
                  ${lowEstimate.toLocaleString()} - ${highEstimate.toLocaleString()}
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Calculated using standard local labor, tear-off, and material costs.
                </p>
              </div>

              <button
                onClick={handleScrollToForm}
                className="mt-6 w-full py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-lg transition-colors text-sm"
              >
                Lock In This Estimate via Samantha AI
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* GoHighLevel Form Target Section */}
      <section id="ghl-form" className="max-w-3xl mx-auto px-6 pb-24 scroll-mt-24">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center shadow-xl">
          <h3 className="text-2xl font-bold mb-2">Connect With MidSize AI</h3>
          <p className="text-slate-400 text-sm mb-6">
            Fill out the form below to test Samantha live or request a podcast guest slot.
          </p>

          {/* Place your GoHighLevel Form or iFrame here */}
          <div className="min-h-[400px] bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-center text-slate-500 text-sm">
            [ Paste your GoHighLevel Form Embed / iFrame Code Here ]
          </div>
        </div>
      </section>
    </div>
  );
}
