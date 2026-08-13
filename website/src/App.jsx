import React, { useState } from 'react';
import ReadinessAssessment from './ReadinessAssessment.jsx';

export default function App() {
  const [activeTab, setActiveTab] = useState('samantha');
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-400 selection:text-slate-950">
      {/* Top Utility Bar */}
      <div className="bg-amber-400/10 border-b border-amber-400/20 py-2 px-6 text-center text-xs text-amber-300 font-medium">
        Looking for a quick roof replacement estimate?{' '}
        <a 
          href="https://estimator.midsizeai.com" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="underline hover:text-amber-200 font-bold ml-1"
        >
          Try estimator.midsizeai.com &rarr;
        </a>
      </div>

      {/* Main Navigation */}
      <nav className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50 px-4 sm:px-6 py-2">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <a href="/" aria-label="MidSize AI home" className="shrink-0 rounded-lg bg-white px-2 py-1">
              <img
                src="/midsize-ai-logo.webp"
                alt="MidSize AI — Smart AI solutions for home service businesses"
                className="h-14 sm:h-16 w-auto"
              />
            </a>
            <span className="hidden sm:inline-flex text-xs bg-slate-800 text-slate-400 border border-slate-700 px-2.5 py-1 rounded-full font-mono">
              Home Services
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a 
              href="#ecosystem" 
              className="hidden md:inline-block text-sm text-slate-400 hover:text-white transition-colors"
            >
              Solutions
            </a>
            <a 
              href="#contact" 
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-4 py-2 rounded-lg text-sm transition-all"
            >
              Take Assessment
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="max-w-5xl mx-auto text-center px-6 pt-20 pb-16">
        <div className="inline-flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-full px-4 py-1.5 text-xs text-amber-400 font-semibold mb-8">
          AI Automation Built for Growing Contractors & Business Operators
        </div>
        
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6 text-white">
          Practical AI Systems for <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500">
            MidSize Home Services
          </span>
        </h1>
        
        <p className="text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          MidSize AI helps growing home-service companies improve call coverage, lead response, scheduling, and follow-up with focused automation built around the way their teams already work.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="#assessment"
            className="w-full sm:w-auto bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-8 py-4 rounded-xl text-base transition-all shadow-lg hover:shadow-amber-400/20"
          >
            Take the Free AI Assessment
          </a>
          <a
            href="https://roofers.midsizeai.com"
            className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white font-semibold px-8 py-4 rounded-xl border border-slate-800 text-base transition-all"
          >
            Explore the Roofing Division &rarr;
          </a>
        </div>
      </header>

      <ReadinessAssessment />\n\n      {/* Interactive Ecosystem Switcher */}
      <section id="ecosystem" className="max-w-6xl mx-auto px-6 py-16 border-t border-slate-900">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white">The MidSize AI Platform</h2>
          <p className="text-slate-400 text-sm mt-2">Select a product to view its dedicated workflow and audience target.</p>
          
          <div className="flex justify-center gap-2 mt-8 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800 max-w-xl mx-auto">
            <button
              onClick={() => setActiveTab('samantha')}
              className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'samantha'
                  ? 'bg-amber-400 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Samantha AI (Roofers)
            </button>
            <button
              onClick={() => setActiveTab('podcast')}
              className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'podcast'
                  ? 'bg-amber-400 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Honest Roofer Podcast
            </button>
            <button
              onClick={() => setActiveTab('estimator')}
              className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'estimator'
                  ? 'bg-amber-400 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Roof Estimator
            </button>
          </div>
        </div>

        {/* Dynamic Tab Content */}
        <div className="bg-slate-900/40 border border-slate-800/80 rounded-3xl p-8 sm:p-12">
          {activeTab === 'samantha' && (
            <div id="samantha" className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Built Exclusively for Roofing Contractors</span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-2 mb-4">Samantha: The 24/7 Inbound AI Receptionist</h3>
                <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-6">
                  Roofers lose thousands when calls go to voicemail while crews are on top of a job. Samantha answers on the first ring, captures address/roof details, qualifies project budget, and books appointments directly to your calendar.
                </p>
                <ul className="space-y-3 text-sm text-slate-300 mb-8">
                  <li className="flex items-center gap-2"><span className="text-amber-400">✓</span> 100% First-Ring Call Capture</li>
                  <li className="flex items-center gap-2"><span className="text-amber-400">✓</span> Automated Qualification & Calendar Booking</li>
                  <li className="flex items-center gap-2"><span className="text-amber-400">✓</span> Direct Integration with Roofing CRMs</li>
                </ul>
                <a href="/samantha.html" className="inline-block bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-6 py-3 rounded-xl text-sm transition-all">\n                  Explore Samantha & Request a Demo\n                </a>
              </div>
              <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl">
                <div className="text-xs text-slate-500 font-mono mb-4">// Live Call Intake Simulation</div>
                <div className="space-y-3 text-xs">
                  <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 text-slate-300">
                    <span className="text-amber-400 font-bold">Homeowner:</span> "Hi, we had hail damage last night and need an inspection."
                  </div>
                  <div className="bg-amber-400/10 p-3 rounded-lg border border-amber-400/20 text-amber-200">
                    <span className="font-bold">Samantha AI:</span> "I can help with that right away! What is the property address and how old is the current roof?"
                  </div>
                  <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 text-slate-300">
                    <span className="text-amber-400 font-bold">Homeowner:</span> "1248 Oak St, roof is about 14 years old."
                  </div>
                  <div className="bg-amber-400/10 p-3 rounded-lg border border-amber-400/20 text-amber-200">
                    <span className="font-bold">Samantha AI:</span> "Got it. I have an inspection slot open tomorrow at 10 AM. Should I lock that in for you?"
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'podcast' && (
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">For Homeowners & Elite Roofers</span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-2 mb-4">The Honest Roofer Podcast</h3>
                <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-6">
                  Cutting through industry noise to bring complete transparency to roofing. We educate homeowners on avoiding storm-chaser scams while providing high-quality contractors a platform to reach educated leads.
                </p>
                <div className="flex gap-4">
                  <a href="#contact" className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-6 py-3 rounded-xl text-sm transition-all">
                    Apply as a Podcast Guest
                  </a>
                </div>
              </div>
              <div className="bg-slate-950 border border-slate-800 p-8 rounded-2xl text-center">
                <div className="text-5xl mb-4">🎙️</div>
                <h4 className="text-lg font-bold text-white mb-2">Streaming Across All Platforms</h4>
                <p className="text-xs text-slate-400">Weekly episodes uncovering contractor marketing, material breakdowns, and industry insider interviews.</p>
              </div>
            </div>
          )}

          {activeTab === 'estimator' && (
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Self-Serve Homeowner Tool</span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-2 mb-4">Instant Roof Replacement Calculator</h3>
                <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-6">
                  Hosted at <code className="text-amber-400 bg-slate-950 px-2 py-1 rounded">estimator.midsizeai.com</code>, this standalone calculator gives homeowners realistic ballpark pricing based on square footage, pitch, and material choices before speaking to sales reps.
                </p>
                <a 
                  href="https://estimator.midsizeai.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-block bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-6 py-3 rounded-xl text-sm transition-all"
                >
                  Open Estimator Tool &rarr;
                </a>
              </div>
              <div className="bg-slate-950 border border-slate-800 p-8 rounded-2xl text-center">
                <div className="text-5xl mb-4">🏠</div>
                <h4 className="text-lg font-bold text-white mb-2">Transparent Ballpark Pricing</h4>
                <p className="text-xs text-slate-400">Calculates materials, pitch difficulty, and labor estimates in seconds.</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Clear Next Steps */}
      <section id="contact" className="max-w-5xl mx-auto px-6 py-20 border-t border-slate-900">
        <div className="grid md:grid-cols-2 gap-5">
          <article className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-10">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">For Homeowners</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-3 mb-3">Plan a roof replacement without a sales call</h2>
            <p className="text-slate-400 text-sm sm:text-base mb-7">Use the free MidSize AI estimator to build an educational low-to-high roof replacement range. No email is required to see the result.</p>
            <a href="https://estimator.midsizeai.com" target="_blank" rel="noopener noreferrer" className="inline-block bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-6 py-3 rounded-xl text-sm transition-all">Estimate My Roof Cost</a>
          </article>
          <article className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-10">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">For Roofing Contractors</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-3 mb-3">See how Samantha handles missed calls</h2>
            <p className="text-slate-400 text-sm sm:text-base mb-7">Review the roofing-specific intake workflow, common questions, and request a tailored demonstration for your company.</p>
            <a href="/samantha.html" className="inline-block bg-white hover:bg-slate-100 text-slate-950 font-bold px-6 py-3 rounded-xl text-sm transition-all">Explore Samantha AI</a>
          </article>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-10 text-center text-slate-500 text-xs">
        <p>&copy; {new Date().getFullYear()} MidSize AI &bull; The Honest Roofer Podcast. All rights reserved.</p>
      </footer>
    </div>
  );
}
