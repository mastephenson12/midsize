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
              href="/guides/ai-receptionist-for-roofing-companies/"
              className="hidden lg:inline-block text-sm text-slate-400 hover:text-white transition-colors"
            >
              Roofing AI Guide
            </a>
            <a
              href="/missed-lead-calculator"
              className="hidden lg:inline-block text-sm text-slate-400 hover:text-white transition-colors"
            >
              Missed Lead Calculator
            </a>
            <a 
              href="https://apply.midsizeai.com/application?utm_source=midsizeai.com&utm_medium=navigation&utm_campaign=workflow_audit&utm_content=header_cta" 
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-4 py-2 rounded-lg text-sm transition-all"
            >
              Request Free Audit
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="max-w-5xl mx-auto text-center px-6 pt-20 pb-16">
        <div className="inline-flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-full px-4 py-1.5 text-xs text-amber-400 font-semibold mb-8">
          AI Call Coverage and Lead Follow-Up for Home-Service Companies
        </div>
        
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6 text-white">
          Capture More Home-Service Leads <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500">
            Without Adding More Admin Work
          </span>
        </h1>
        
        <p className="text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          MidSize AI helps roofing, HVAC, plumbing, electrical, remodeling, and other home-service companies answer calls, respond faster, schedule work, and follow up consistently—without replacing the team or systems they already trust.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="/missed-lead-calculator"
            className="w-full sm:w-auto bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-8 py-4 rounded-xl text-base transition-all shadow-lg hover:shadow-amber-400/20"
          >
            Calculate My Missed-Lead Revenue
          </a>
          <a
            href="#value-equation"
            className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white font-semibold px-8 py-4 rounded-xl border border-slate-800 text-base transition-all"
          >
            See How the System Fits
          </a>
          
        </div>
        <div className="mt-7 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs font-semibold text-slate-500">
          <span>✓ Home-service call intake</span>
          <span>✓ Works after hours</span>
          <span>✓ Built around your current workflow</span>
        </div>
      </header>

      <section id="value-equation" className="border-t border-slate-900 px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400">Practical automation—not AI theater</p>
            <h2 className="mt-3 text-3xl font-extrabold text-white sm:text-5xl">More captured opportunities with less operational drag</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            <article className="rounded-2xl border border-slate-800 bg-slate-900 p-7"><p className="text-xs font-bold uppercase tracking-widest text-amber-400">Dream outcome</p><h3 className="mt-3 text-xl font-bold text-white">More booked work</h3><p className="mt-3 text-sm leading-relaxed text-slate-400">Give more callers and web leads a fast response, capture the right details, and guide qualified customers toward a scheduled next step.</p></article>
            <article className="rounded-2xl border border-slate-800 bg-slate-900 p-7"><p className="text-xs font-bold uppercase tracking-widest text-amber-400">Believable path</p><h3 className="mt-3 text-xl font-bold text-white">Use your real workflow</h3><p className="mt-3 text-sm leading-relaxed text-slate-400">We review your calls, lead sources, questions, service area, capacity, calendar, and handoff rules before recommending automation.</p></article>
            <article className="rounded-2xl border border-slate-800 bg-slate-900 p-7"><p className="text-xs font-bold uppercase tracking-widest text-amber-400">Shorter time to value</p><h3 className="mt-3 text-xl font-bold text-white">Pilot one bottleneck</h3><p className="mt-3 text-sm leading-relaxed text-slate-400">Start with one missed-call, after-hours, speed-to-lead, scheduling, or follow-up workflow instead of waiting for a company-wide transformation.</p></article>
            <article className="rounded-2xl border border-slate-800 bg-slate-900 p-7"><p className="text-xs font-bold uppercase tracking-widest text-amber-400">Less effort and sacrifice</p><h3 className="mt-3 text-xl font-bold text-white">No forced rebuild</h3><p className="mt-3 text-sm leading-relaxed text-slate-400">Keep the people and systems that work. Your team approves the script, exceptions, escalation rules, and final customer handoff.</p></article>
          </div>
        </div>
      </section>

      {/* Home-Service Conversion Path */}
      <section id="ecosystem" className="max-w-6xl mx-auto px-6 py-16 border-t border-slate-900">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white">See a Focused Home-Service Workflow in Action</h2>
          <p className="text-slate-400 text-sm mt-2">Samantha shows the roofing-specific version. The same workflow method begins with your trade, customer questions, service area, capacity, and approved next steps.</p>
          
          <div className="flex justify-center gap-2 mt-8 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800 max-w-md mx-auto">
            <button
              onClick={() => setActiveTab('samantha')}
              className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'samantha'
                  ? 'bg-amber-400 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Roofing Example
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
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">MidSize AI Sales Agent</span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-2 mb-4">Samantha: Explore the Right AI Agent for Your Business</h3>
                <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-6">
                  Samantha is MidSize AI’s sales agent. She asks about your trade, call volume, missed-lead process, systems, and concerns; explains where an AI agent may fit; and schedules a workflow review when there is a credible use case.
                </p>
                <ul className="space-y-3 text-sm text-slate-300 mb-8">
                  <li className="flex items-center gap-2"><span className="text-amber-400">✓</span> Needs Discovery Without a Generic Software Pitch</li>
                  <li className="flex items-center gap-2"><span className="text-amber-400">✓</span> Fit Assessment and Objection Handling</li>
                  <li className="flex items-center gap-2"><span className="text-amber-400">✓</span> Workflow Review Booking and CRM Handoff</li>
                </ul>
                <a href="/samantha-demo" className="inline-block bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-6 py-3 rounded-xl text-sm transition-all">
                  Try the Interactive Samantha Demo
                </a>
              </div>
              <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl">
                <div className="text-xs text-slate-500 font-mono mb-4">// Sample AI-Agent Sales Conversation</div>
                <div className="space-y-3 text-xs">
                  <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 text-slate-300">
                    <span className="text-amber-400 font-bold">Business owner:</span> "We miss calls when everyone is in the field. Can an AI agent help without frustrating customers?"
                  </div>
                  <div className="bg-amber-400/10 p-3 rounded-lg border border-amber-400/20 text-amber-200">
                    <span className="font-bold">Samantha:</span> "Possibly. About how many new calls do you receive, and what happens when nobody answers?"
                  </div>
                  <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 text-slate-300">
                    <span className="text-amber-400 font-bold">Business owner:</span> "Around 100 each month. Most missed calls go to voicemail."
                  </div>
                  <div className="bg-amber-400/10 p-3 rounded-lg border border-amber-400/20 text-amber-200">
                    <span className="font-bold">Samantha:</span> "That may be a good fit for a controlled missed-call pilot. Let’s map your questions, escalation rules, CRM, and human handoff before recommending anything."
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

      <ReadinessAssessment />

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
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-3 mb-3">Ready to stop losing roofing opportunities?</h2>
            <p className="text-slate-400 text-sm sm:text-base mb-7">Request a free review of your call coverage, speed-to-lead, scheduling, and follow-up workflow. You’ll receive a practical starting recommendation—not a generic software pitch.</p>
            <a href="https://apply.midsizeai.com/application?utm_source=midsizeai.com&utm_medium=cta&utm_campaign=workflow_audit&utm_content=closing_cta" className="inline-block bg-white hover:bg-slate-100 text-slate-950 font-bold px-6 py-3 rounded-xl text-sm transition-all">Request My Free Workflow Audit</a>
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
