import React, { useEffect } from 'react';

const ESTIMATOR_URL = 'https://estimator.midsizeai.com';
const APPLICATION_URL = 'https://apply.midsizeai.com/application';

const contractorSolutions = [
  ['Answer when your team cannot', 'Samantha supports consistent first-line and after-hours call intake using information and escalation rules approved by your company.'],
  ['Capture usable project details', 'Collect the property address, reason for the call, timing, contact preferences, and other information your team needs for follow-up.'],
  ['Build a clearer next step', 'Route qualified opportunities toward the calendar, CRM, or follow-up workflow selected during implementation.'],
];

function RoofingApp() {
  useEffect(() => {
    document.title = 'MidSize AI for Roofers | Education, Estimating and AI Intake';
    const description = 'MidSize AI for Roofers connects homeowner education and roof cost planning with modern communication and lead-intake systems for roofing companies.';
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) { meta = document.createElement('meta'); meta.name = 'description'; document.head.appendChild(meta); }
    meta.content = description;
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.appendChild(canonical); }
    canonical.href = 'https://roofers.midsizeai.com/';
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-400 selection:text-slate-950">
      <div className="border-b border-amber-400/20 bg-amber-400/10 px-6 py-2 text-center text-xs font-semibold text-amber-300">
        A specialized roofing division of <a className="font-bold underline hover:text-amber-200" href="https://www.midsizeai.com">MidSize AI</a>
      </div>
      <nav className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/90 px-4 py-2 backdrop-blur-md sm:px-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <a href="/" aria-label="MidSize AI for Roofers home" className="flex items-center gap-3">
            <span className="shrink-0 rounded-lg bg-white px-2 py-1"><img src="/midsize-ai-logo.webp" alt="MidSize AI" className="h-14 w-auto sm:h-16" /></span>
            <span className="hidden text-xs font-bold uppercase tracking-[0.18em] text-amber-400 sm:block">Roofing Division</span>
          </a>
          <div className="flex items-center gap-3 text-sm">
            <a className="hidden text-slate-400 transition hover:text-white md:block" href="#podcast">Podcast</a>
            <a className="hidden text-slate-400 transition hover:text-white md:block" href="#contractors">For Contractors</a>
            <a className="rounded-lg bg-amber-400 px-4 py-2 font-bold text-slate-950 transition hover:bg-amber-300" href={APPLICATION_URL}>See If We Fit</a>
          </div>
        </div>
      </nav>
      <main>
        <header className="relative overflow-hidden px-6 py-20 sm:py-28">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,.2),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(251,191,36,.13),transparent_38%)]" />
          <div className="relative mx-auto max-w-6xl text-center">
            <p className="mb-6 text-xs font-extrabold uppercase tracking-[0.25em] text-amber-400">MidSize AI · Roofing Division</p>
            <h1 className="mx-auto max-w-5xl text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
              Smarter roofing experiences for <span className="bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">homeowners and contractors</span>
            </h1>
            <p className="mx-auto mt-7 max-w-3xl text-lg leading-relaxed text-slate-300 sm:text-xl">Practical roofing education and cost-planning tools for homeowners. Modern communication and lead-intake systems for roofing companies.</p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a href={ESTIMATOR_URL} className="w-full rounded-xl bg-amber-400 px-8 py-4 font-bold text-slate-950 transition hover:bg-amber-300 sm:w-auto">I&apos;m a Homeowner</a>
              <a href="#contractors" className="w-full rounded-xl border border-slate-700 bg-slate-900 px-8 py-4 font-bold text-white transition hover:border-slate-500 hover:bg-slate-800 sm:w-auto">I Run a Roofing Company</a>
            </div>
            <p className="mt-4 text-xs text-slate-500">The estimator requires no email to display its educational range. Contractor contact details are requested only after you choose to apply.</p>
          </div>
        </header>
        <section className="border-t border-slate-900 px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 text-center"><p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400">Choose your path</p><h2 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl">Useful before we ask for your information</h2></div>
            <div className="grid gap-5 md:grid-cols-2">
              <article className="rounded-3xl border border-slate-800 bg-slate-900 p-8 sm:p-10"><span className="text-xs font-bold uppercase tracking-widest text-amber-400">For Homeowners</span><h3 className="mt-3 text-2xl font-bold text-white">Start with a realistic cost range</h3><p className="mt-4 leading-relaxed text-slate-400">Use the free roof estimator to understand the variables that shape a replacement budget before scheduling a sales conversation.</p><a href={ESTIMATOR_URL} className="mt-7 inline-flex rounded-xl bg-amber-400 px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-amber-300">Estimate My Roof Cost →</a></article>
              <article className="rounded-3xl border border-slate-800 bg-slate-900 p-8 sm:p-10"><span className="text-xs font-bold uppercase tracking-widest text-amber-400">For Homeowners</span><h3 className="mt-3 text-2xl font-bold text-white">Learn how to compare proposals</h3><p className="mt-4 leading-relaxed text-slate-400">The Honest Roofer Podcast will break down scope, materials, warranties, communication, and the questions worth asking.</p><a href="#podcast" className="mt-7 inline-flex rounded-xl bg-amber-400 px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-amber-300">Explore the Podcast →</a></article>
            </div>
          </div>
        </section>
        <section id="podcast" className="border-t border-slate-900 bg-slate-900/35 px-6 py-20">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
            <div className="rounded-3xl border border-amber-400/20 bg-slate-950 p-4 text-center sm:p-6"><img src="/honest-roofer-podcast-logo.jpg" alt="The Honest Roofer Podcast logo featuring homeowners, roofers, microphones, and roofing tools" width="1080" height="1080" loading="lazy" decoding="async" className="mx-auto aspect-square w-full rounded-2xl object-cover" /><p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-amber-400">The Honest Roofer Podcast</p><p className="mt-3 text-sm leading-relaxed text-slate-400">Roofing transparency for homeowners and modern operators.</p></div>
            <div><p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400">Trust before technology</p><h2 className="mt-3 text-3xl font-extrabold text-white sm:text-5xl">Better roofing decisions begin with clearer information.</h2><p className="mt-5 text-lg leading-relaxed text-slate-300">The Honest Roofer Podcast is being built as an education hub: proposal breakdowns, warranty questions, maintenance, storm preparation, communication standards, and conversations with roofers who value trust.</p><div className="mt-7 rounded-2xl border border-slate-800 bg-slate-950 p-5"><p className="font-bold text-white">Coming first</p><p className="mt-2 text-slate-400">The 10 Questions Every Homeowner Should Ask Before Hiring a Roofer, with a companion checklist for comparing estimates.</p></div></div>
          </div>
        </section>
        <section id="contractors" className="border-t border-slate-900 px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-3xl"><p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400">For Roofing Contractors</p><h2 className="mt-3 text-3xl font-extrabold text-white sm:text-5xl">Make responsiveness part of the customer experience.</h2><p className="mt-5 text-lg leading-relaxed text-slate-400">MidSize AI helps roofing companies examine what happens from the first call through qualification and follow-up. The goal is a reliable process configured around your company—not a generic bot making promises.</p></div>
            <div className="mt-10 grid gap-5 md:grid-cols-3">{contractorSolutions.map(([title, description]) => <article key={title} className="rounded-2xl border border-slate-800 bg-slate-900 p-7"><div className="mb-5 h-1 w-12 rounded bg-amber-400" /><h3 className="text-xl font-bold text-white">{title}</h3><p className="mt-3 leading-relaxed text-slate-400">{description}</p></article>)}</div>
            <div className="mt-10 rounded-3xl border border-amber-400/25 bg-amber-400/10 p-8 sm:flex sm:items-center sm:justify-between sm:gap-8"><div><h3 className="text-2xl font-bold text-white">Ready to show interest?</h3><p className="mt-2 max-w-2xl text-slate-300">The short application helps us understand your company, service area, and current lead-handling process before recommending a next step.</p></div><a href={APPLICATION_URL} className="mt-6 inline-flex shrink-0 rounded-xl bg-amber-400 px-7 py-4 font-bold text-slate-950 transition hover:bg-amber-300 sm:mt-0">Start Contractor Application →</a></div>
          </div>
        </section>
        <section className="border-t border-slate-900 bg-slate-900/35 px-6 py-16"><div className="mx-auto max-w-4xl text-center"><h2 className="text-2xl font-bold text-white">Clear roles across the MidSize AI ecosystem</h2><p className="mt-4 leading-relaxed text-slate-400">This site provides education, planning tools, and information about technology services. MidSize AI is not a roofing contractor, home inspector, insurer, adjuster, law firm, or emergency service. Estimates are educational ranges, and contractors remain responsible for their professional work, representations, pricing, and compliance.</p></div></section>
      </main>
      <footer className="border-t border-slate-900 px-6 py-10 text-sm text-slate-500"><div className="mx-auto flex max-w-6xl flex-col gap-4 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left"><p>© {new Date().getFullYear()} MidSize AI · Roofing Division</p><div className="flex flex-wrap justify-center gap-5"><a className="hover:text-white" href="https://www.midsizeai.com">MidSize AI Home</a><a className="hover:text-white" href={ESTIMATOR_URL}>Roof Estimator</a><a className="hover:text-white" href={APPLICATION_URL}>Contractor Application</a></div></div></footer>
    </div>
  );
}

export default RoofingApp;