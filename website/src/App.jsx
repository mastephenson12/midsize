import React, { useState } from 'react';

export default function RoofingEstimator() {
  const [sqft, setSqft] = useState(2000);
  const [pitch, setPitch] = useState('standard'); // standard, steep, ultra
  const [material, setMaterial] = useState('shingle'); // shingle, metal, tile

  // Calculation Logic
  const materialRates = {
    shingle: 4.50, // base cost per sqft
    metal: 9.00,
    tile: 11.50,
  };

  const pitchMultipliers = {
    standard: 1.0,
    steep: 1.25,
    ultra: 1.45,
  };

  const basePrice = sqft * materialRates[material] * pitchMultipliers[pitch];
  const lowEstimate = Math.round(basePrice * 0.9);
  const highEstimate = Math.round(basePrice * 1.15);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-slate-900 text-white rounded-2xl shadow-xl border border-slate-800 my-10">
      <div className="text-center mb-8">
        <span className="text-amber-400 font-semibold tracking-wider uppercase text-sm">
          The Honest Roofer Podcast Tool
        </span>
        <h2 className="text-3xl font-bold mt-1">Instant Roof Cost Estimator</h2>
        <p className="text-slate-400 text-sm mt-2">
          Get an honest, uninflated ballpark price before talking to sales reps.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Controls */}
        <div className="space-y-6">
          {/* Square Footage Slider */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-slate-300">Estimated Roof Size</label>
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

          {/* Roof Pitch */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Roof Steepness / Pitch</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'standard', label: 'Walkable' },
                { id: 'steep', label: 'Steep' },
                { id: 'ultra', label: 'Very Steep' },
              ].map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setPitch(p.id)}
                  className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${
                    pitch === p.id
                      ? 'bg-amber-400 text-slate-950 border-amber-400'
                      : 'bg-slate-800 text-slate-300 border-slate-700 hover:border-slate-500'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Material Type */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Material Type</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'shingle', label: 'Architectural Shingle' },
                { id: 'metal', label: 'Standing Seam Metal' },
                { id: 'tile', label: 'Concrete / Clay Tile' },
              ].map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setMaterial(m.id)}
                  className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${
                    material === m.id
                      ? 'bg-amber-400 text-slate-950 border-amber-400'
                      : 'bg-slate-800 text-slate-300 border-slate-700 hover:border-slate-500'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Output Display Card */}
        <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 text-center flex flex-col justify-between h-full">
          <div>
            <span className="text-xs text-slate-400 uppercase tracking-widest">Estimated Price Range</span>
            <div className="text-3xl md:text-4xl font-extrabold text-amber-400 my-4">
              ${lowEstimate.toLocaleString()} - ${highEstimate.toLocaleString()}
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Based on realistic regional labor and material costs. Includes tear-off, underlayment, and standard labor.
            </p>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-800">
            <button
              onClick={() => {
                // Scroll to or open GoHighLevel form modal
                const formEl = document.getElementById('ghl-form');
                if (formEl) formEl.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-lg transition-colors text-sm"
            >
              Lock In This Estimate via Samantha
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
