import React, { useState } from 'react';
import HomeownerResources from './HomeownerResources.jsx';
import GrowthAudit from './GrowthAudit.jsx';

export default function App() {
  const [activeTab, setActiveTab] = useState('samantha');
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-400 selection:text-slate-950">
      <div className="bg-amber-400 text-slate-950 text-center px-4 py-2 text-sm font-semibold">Explore our approved service packages and transparent starting prices: <a className="underline font-extrabold" href="https://www.midsizeai.com/pricing/">Services &amp; Pricing</a></div>
      {/* Top Utility Bar */}
      <div className="bg-amber-400/10 border-b border-amber-400/20 py-2 px-6 text-center text-xs text-amber-300 font-medium">
        Homeowner looking for roofing estimate help?{' '}
        <a
          href="/estimate-decoder/"
          className="underline hover:text-amber-200 font-bold ml-1"
        >
          Evaluate it free &rarr;
        </a>
      </div>

      {/* Main Navigation */}
      <nav aria-label="Main navigation" onKeyDown={(event) => {
        if (event.key === 'Escape' && menuOpen) {
          setMenuOpen(false);
          event.currentTarget.querySelector('button[aria-controls="site-menu"]').focus();
        }
      }} className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50 px-4 sm:px-6 py-2">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <a href="/" aria-label="MidSize AI home" className="shrink-0 rounded-lg bg-white px-2 py-1">
              <img
                src="/midsizeai-header-672.png"
                width={672}
                height={140}
                alt="MidSize AI — Smart AI solutions for home service businesses"
                className="block w-[min(45vw,12rem)] sm:w-56 h-auto"
              />
            </a>
            <span className="hidden lg:inline-flex text-xs bg-slate-800 text-slate-400 border border-slate-700 px-2.5 py-1 rounded-full font-mono">
              Home Services
            </span>
          </div>
          <div className="flex items-center gap-3">
            <a href="#growth-audit" className="hidden md:inline-flex bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-4 py-3 rounded-lg text-sm">
              Free Growth Audit
            </a>
            <button type="button" aria-expanded={menuOpen} aria-controls="site-menu" onClick={() => setMenuOpen(!menuOpen)} className="min-h-11 rounded-lg border border-slate-600 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-400">
              {menuOpen ? 'Close menu' : 'Menu'}
            </button>
          </div>
        </div>
        <div id="site-menu" hidden={!menuOpen} className="mx-auto max-w-7xl max-h-[70vh] overflow-y-auto">
          <div className="mt-3 grid gap-1 border-t border-slate-700 py-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ['Homeowner Tools', '#homeowner-tools'],
              ['Roofer Services', '/roofers'],
              ['Services & Pricing', '/pricing/'],
              ['Roofing AI Guide', '/guides/ai-receptionist-for-roofing-companies/'],
              ['Free Roofer Resources', '/resources/#contractors'],
              ['Missed Lead Calculator', '/missed-lead-calculator'],
              ['Call Coverage & Missed Leads', '#audiences'],
              ['Request Free Growth Audit', 'https://apply.midsizeai.com/application?utm_source=midsizeai.com&utm_medium=navigation&utm_campaign=workflow_audit&utm_content=menu_cta'],
            ].map(([label, href]) => (
              <a key={href} href={href} onClick={() => setMenuOpen(false)} className="rounded-lg px-4 py-3 text-sm font-semibold text-slate-100 hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-400">
                {label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="max-w-5xl mx-auto text-center px-6 pt-20 pb-16">
        <div className="inline-flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-full px-4 py-1.5 text-xs text-amber-400 font-semibold mb-8">
          Built for roofing company owners
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6 text-white">
          On the roof? <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500">
            Your next customer is calling.
          </span>
        </h1>

        <p className="text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Help your roofing company answer calls, capture project details, and follow up on open estimates while your team is in the field. MidSize AI builds practical AI systems around your business and the tools you already use.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="/samantha-demo"
            className="w-full sm:w-auto bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-8 py-4 rounded-xl text-base transition-all shadow-lg hover:shadow-amber-400/20"
          >
            Explore the Samantha Demo
          </a>
          <a
            href="/missed-lead-calculator?utm_source=midsizeai.com&utm_medium=hero&utm_campaign=missed_leads"
            className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white font-semibold px-8 py-4 rounded-xl border border-slate-800 text-base transition-all"
          >
            Calculate My Missed Leads
          </a>
        </div>
        <div className="mt-7 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs font-semibold text-slate-500">
          <span>✓ Call coverage built around your team</span>
          <span>✓ Estimate follow-up</span>
          <span>✓ Clear human handoff</span>
        </div>
      </header>

      <section id="audiences" className="border-t border-slate-800 px-6 py-12">
        <div className="mx-auto max-w-5xl rounded-3xl border border-amber-400/25 bg-slate-900 p-7 sm:p-10">
          <p className="text-sm font-bold text-amber-400">Start with your own numbers</p>
          <h2 className="mt-3 text-3xl font-extrabold text-white">What could missed leads mean for your roofing business?</h2>
          <p className="mt-4 leading-relaxed text-slate-300">Use your call volume, missed-lead rate, average job value, and close rate to explore the potential opportunity. Check the estimate against your records, lead quality, and capacity.</p>
          <a href="/missed-lead-calculator" className="mt-6 inline-flex rounded-xl bg-amber-400 px-6 py-3 font-bold text-slate-950 hover:bg-amber-300">Open the Missed Lead Calculator</a>
          <p className="mt-4 text-sm text-slate-400">Practical AI systems for growing home-service teams, with dedicated services for roofing companies.</p>
          <a href="/services/ai-receptionist-for-roofers" className="mt-5 inline-flex font-bold text-amber-300 underline">Explore after-hours and field-time receptionist services</a>
        </div>
      </section>

      {/* Contractor Growth Plan */}
      <section id="growth-system" className="border-t border-slate-900 px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-amber-400">A simple plan for home-service businesses</p>
            <h2 className="mt-3 text-3xl font-extrabold text-white sm:text-5xl">Get Found. Get Trusted. Get Booked.</h2>
            <p className="mt-4 text-slate-400">Good contractors should not lose opportunities just because someone else is better at marketing. Start with a practical plan that connects your online presence to your customer follow-up.</p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              ['01', 'Get Found', 'Plan helpful social content and improve local visibility so homeowners can discover your business.'],
              ['02', 'Get Trusted', 'Show real project photos, answer customer questions and request honest reviews.'],
              ['03', 'Get Booked', 'Give interested customers a clear next step, respond promptly and follow up with appropriate consent and human handoff.']
            ].map(([number, title, description]) => (
              <article key={number} className="rounded-3xl border border-slate-800 bg-slate-900 p-7">
                <span className="text-sm font-bold text-amber-400">{number}</span>
                <h3 className="mt-3 text-2xl font-bold text-white">{title}</h3>
                <p className="mt-3 leading-relaxed text-slate-400">{description}</p>
              </article>
            ))}
          </div>
          <div className="mt-8 text-center">
            <a href="#growth-audit" className="inline-flex rounded-xl bg-amber-400 px-6 py-3 font-bold text-slate-950 hover:bg-amber-300">Take My Free Growth Audit</a>
            <p className="mt-3 text-sm text-slate-400">Get an instant self-assessment and practical recommendations, with an optional workflow review.</p>
          </div>
        </div>
      </section>

      <GrowthAudit />

      {/* Founder / Field Context */}
      <section className="border-t border-slate-900 px-6 py-16">
        <div className="mx-auto grid max-w-6xl items-center gap-8 overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60 lg:grid-cols-[0.9fr_1.1fr]">
          <figure className="h-full min-h-80 bg-slate-900">
            <img
              src="/mid-size-ai-founder-field-context.webp"
              alt="MidSize AI founder Mark Stephenson observing the working conditions home-service teams face in the field"
              className="h-full w-full object-cover"
              loading="lazy"
              width="1536"
              height="1024"
            />
          </figure>
          <div className="px-7 pb-9 lg:px-4 lg:pb-0 lg:pr-12">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400">Built with respect for the field</p>
            <h2 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl">AI support for the calls that arrive while your team is working.</h2>
            <p className="mt-5 text-base leading-7 text-slate-300">
              MidSize AI does not sell roofing services or replace field crews. We design practical AI-agent workflows for home-service businesses whose calls, estimates, scheduling, and follow-up cannot always wait until someone is back at a desk.
            </p>
            <p className="mt-4 text-sm leading-6 text-slate-400">
              Founder Mark Stephenson brings firsthand familiarity with the realities surrounding field-service work. Every recommendation starts with your actual process, approved customer language, and a clear human handoff.
            </p>
            <a href="#ecosystem" className="mt-7 inline-flex font-bold text-amber-400 hover:text-amber-300">
              See the workflow approach &rarr;
            </a>
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
                  href="/estimate-decoder/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-6 py-3 rounded-xl text-sm transition-all"
                >
                  Check an Estimate &rarr;
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

      <HomeownerResources />

      {/* Clear Next Steps */}
      <section id="contact" className="max-w-5xl mx-auto px-6 py-20 border-t border-slate-900">
        <div className="grid md:grid-cols-2 gap-5">
          <article className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-10">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">For Homeowners</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-3 mb-3">Understand your roofing estimate before you sign</h2>
            <p className="text-slate-400 text-sm sm:text-base mb-7">Use the free MidSize AI estimate decoder to check what is included, what may be missing, and which questions to ask before accepting a proposal.</p>
            <a href="/estimate-decoder/" target="_blank" rel="noopener noreferrer" className="inline-block bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-6 py-3 rounded-xl text-sm transition-all">Check My Estimate</a>
          </article>
          <article className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-10">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">For Home-Service Businesses</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-3 mb-3">Ready to turn more interest into booked appointments?</h2>
            <p className="text-slate-400 text-sm sm:text-base mb-7">Take the free self-assessment to identify practical next steps for visibility, trust and follow-up based on your business. No email required.</p>
            <a href="#growth-audit" className="inline-block bg-white hover:bg-slate-100 text-slate-950 font-bold px-6 py-3 rounded-xl text-sm transition-all">Take My Free Growth Audit</a>
          </article>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-10 text-center text-slate-500 text-xs">
        <p>&copy; {new Date().getFullYear()} MidSize AI &bull; The Honest Roofer Podcast. All rights reserved.</p>
        <p className="mt-3">COOPERANTE LLC, doing business as MidSize AI</p>
        <p className="mt-3">Questions? <a className="underline" href="mailto:mark@midsizeai.com">mark@midsizeai.com</a> · <a className="underline" href="tel:+16233303589">(623) 330-3589</a></p>
        <nav aria-label="Legal information" className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          <a href="/clients/what-to-expect/" className="text-slate-400 underline underline-offset-4 hover:text-amber-400">What to Expect</a>
          <a href="/sms-signup" className="text-slate-400 underline underline-offset-4 hover:text-amber-400">Text Messaging &amp; Consent</a>
          <a href="/privacy-policy" className="text-slate-400 underline underline-offset-4 hover:text-amber-400">Privacy Policy</a>
          <a href="/terms-of-service" className="text-slate-400 underline underline-offset-4 hover:text-amber-400">Terms of Service</a>
        </nav>
      </footer>
    </div>
  );
}
