import React, { useEffect, useMemo, useState } from 'react';

const APPLICATION_URL = 'https://apply.midsizeai.com/application';
const reviewUrl = (placement) => `${APPLICATION_URL}?utm_source=roofers.midsizeai.com&utm_medium=landing_page&utm_campaign=roofing_workflow_review&utm_content=${placement}`;

const contractorSolutions = [
  ['Missed-call coverage', 'Plan first-line and after-hours intake with Samantha. Capture contact and project details using your approved information, with clear rules for handing a conversation to your team.'],
  ['Faster lead response', 'Map what happens after a call or website inquiry, who owns the next step, and how homeowners move toward an inspection. Confirm tool compatibility before implementation.'],
  ['Estimate follow-up', 'Create a consistent process for checking in after a proposal, collecting questions, and handing interested homeowners back to the right person on your team.'],
];

function RoofingMissedLeadEstimate() {
  const [monthlyCalls, setMonthlyCalls] = useState(100);
  const [missedRate, setMissedRate] = useState(20);
  const [averageJob, setAverageJob] = useState(12000);
  const [closeRate, setCloseRate] = useState(25);

  const estimate = useMemo(() => {
    const calls = Math.max(0, Number(monthlyCalls) || 0);
    const missed = calls * Math.min(100, Math.max(0, Number(missedRate) || 0)) / 100;
    const jobs = missed * Math.min(100, Math.max(0, Number(closeRate) || 0)) / 100;
    const revenue = jobs * Math.max(0, Number(averageJob) || 0);
    return { missed, jobs, revenue };
  }, [monthlyCalls, missedRate, averageJob, closeRate]);

  const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

  const fields = [
    ['Monthly inbound leads', monthlyCalls, setMonthlyCalls, 1, 'Calls, forms, texts, and other new inquiries.'],
    ['Leads not reached promptly (%)', missedRate, setMissedRate, 1, 'Use call and CRM data when available.'],
    ['Average sold roofing job ($)', averageJob, setAverageJob, 100, 'Use your normal collected or contracted average.'],
    ['Close rate on qualified leads (%)', closeRate, setCloseRate, 1, 'Use your actual sold-job rate when known.'],
  ];

  return (
    <section id="missed-lead-estimate" className="mt-12 rounded-3xl border border-amber-400/25 bg-gradient-to-br from-amber-400/10 via-slate-900 to-blue-500/10 p-6 sm:p-9">
      <div className="grid gap-9 lg:grid-cols-[1fr_.9fr] lg:items-start">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400">No email required</p>
          <h3 className="mt-3 text-3xl font-extrabold text-white">Estimate what missed roofing leads may represent.</h3>
          <p className="mt-4 leading-relaxed text-slate-400">Adjust four assumptions. The result updates immediately and gives you a starting point for checking your real call and CRM data.</p>
          <div className="mt-7 grid gap-5 sm:grid-cols-2">
            {fields.map(([label, value, setter, step, help]) => (
              <label key={label} className="block">
                <span className="text-sm font-bold text-white">{label}</span>
                <input type="number" min="0" step={step} value={value} onChange={(event) => setter(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20" />
                <span className="mt-2 block text-xs leading-relaxed text-slate-500">{help}</span>
              </label>
            ))}
          </div>
        </div>
        <div aria-live="polite" className="rounded-2xl border border-slate-700 bg-slate-950/80 p-6">
          <p className="text-sm text-slate-400">Estimated leads not reached each month</p>
          <p className="mt-1 text-4xl font-extrabold text-white">{estimate.missed.toFixed(1)}</p>
          <p className="mt-6 text-sm text-slate-400">Potential jobs represented</p>
          <p className="mt-1 text-3xl font-extrabold text-white">{estimate.jobs.toFixed(1)}</p>
          <div className="mt-6 border-t border-slate-800 pt-6">
            <p className="text-sm text-slate-400">Directional monthly revenue opportunity</p>
            <p className="mt-1 break-words text-4xl font-extrabold text-amber-300">{money.format(estimate.revenue)}</p>
          </div>
          <p className="mt-5 text-xs leading-relaxed text-slate-500">This is not a revenue promise. It assumes missed leads resemble your normal qualified leads and could close at the rate entered. Verify the opportunity against real records, capacity, margins, duplicates, and lead quality.</p>
          <a href={`${APPLICATION_URL}?utm_source=roofers.midsizeai.com&utm_medium=calculator&utm_campaign=roofing_missed_leads&utm_content=result`} className="mt-6 block rounded-xl bg-amber-400 px-6 py-4 text-center font-bold text-slate-950 transition hover:bg-amber-300">Request My Free Workflow Review</a>
        </div>
      </div>
    </section>
  );
}

function RoofingApp() {
  useEffect(() => {
    document.title = 'AI Call Answering and Lead Follow-Up for Roofers | MidSize AI';
    const description = 'Help your roofing company answer more calls, respond faster, qualify homeowners, and book inspections with a focused AI workflow built around your team.';
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
        A specialized roofing division of <a className="font-bold underline hover:text-amber-200" href="https://midsizeai.com">MidSize AI</a>
      </div>
      <nav className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/90 px-4 py-2 backdrop-blur-md sm:px-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <a href="/" aria-label="MidSize AI for Roofers home" className="flex items-center gap-3">
            <span className="shrink-0 rounded-lg bg-white px-2 py-1"><img src="/midsize-ai-logo.webp" alt="MidSize AI" className="h-14 w-auto sm:h-16" /></span>
            <span className="hidden text-xs font-bold uppercase tracking-[0.18em] text-amber-400 sm:block">Roofing Division</span>
          </a>
          <div className="flex items-center gap-3 text-sm">
            <a className="hidden text-slate-400 transition hover:text-white md:block" href="/resources/roofing-after-hours-call-script/">Free Call Script</a>
            <a className="hidden text-slate-400 transition hover:text-white xl:block" href="https://midsizeai.com/guides/ai-receptionist-for-roofing-companies/">AI Guide</a>
            <a className="hidden text-slate-400 transition hover:text-white lg:block" href="#how-it-works">How It Works</a>
            <a className="rounded-lg bg-amber-400 px-4 py-2 font-bold text-slate-950 transition hover:bg-amber-300" href={reviewUrl('navigation')}>Request Free Review</a>
          </div>
        </div>
      </nav>
      <main>
        <header className="relative overflow-hidden px-6 py-20 sm:py-28">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,.2),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(251,191,36,.13),transparent_38%)]" />
          <div className="relative mx-auto max-w-6xl text-center">
            <p className="mb-6 text-xs font-extrabold uppercase tracking-[0.25em] text-amber-400">MidSize AI for Roofing Companies</p>
            <h1 className="mx-auto max-w-5xl text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
              Keep Roofing Leads Moving <span className="bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">Even When Your Crew Is Busy</span>
            </h1>
            <p className="mx-auto mt-7 max-w-3xl text-lg leading-relaxed text-slate-300 sm:text-xl">Missed calls, slow replies, and forgotten estimate follow-ups can leave good opportunities waiting. Build call coverage and follow-up around the way your roofing company works.</p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a href={reviewUrl('hero')} className="w-full rounded-xl bg-amber-400 px-8 py-4 font-bold text-slate-950 transition hover:bg-amber-300 sm:w-auto">Request My Free Workflow Review</a>
              <a href="#missed-lead-estimate" className="text-base text-slate-300 underline underline-offset-4 hover:text-white">Explore the missed-lead calculator</a>
            </div>
            <p className="mt-4 text-xs text-slate-500">Use the calculator without an email. Share contact details only if you choose to request a workflow review.</p>
          </div>
        </header>
        <section className="border-t border-slate-900 px-6 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 text-center"><p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400">A practical path to more captured opportunities</p><h2 className="mt-3 text-3xl font-extrabold text-white sm:text-5xl">The outcome matters. So does how you get there.</h2></div>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              <article className="rounded-2xl border border-slate-800 bg-slate-900 p-7"><p className="text-xs font-bold uppercase tracking-widest text-amber-400">Call coverage</p><h3 className="mt-3 text-xl font-bold text-white">More qualified appointments</h3><p className="mt-3 text-base leading-relaxed text-slate-400">Give more inbound homeowners a fast, professional response and a clear next step instead of sending good opportunities to voicemail.</p></article>
              <article className="rounded-2xl border border-slate-800 bg-slate-900 p-7"><p className="text-xs font-bold uppercase tracking-widest text-amber-400">Your approval</p><h3 className="mt-3 text-xl font-bold text-white">Test the workflow first</h3><p className="mt-3 text-base leading-relaxed text-slate-400">Review the questions, qualification rules, escalation points, and booking logic. Test calls before anything touches a real customer.</p></article>
              <article className="rounded-2xl border border-slate-800 bg-slate-900 p-7"><p className="text-xs font-bold uppercase tracking-widest text-amber-400">Focused setup</p><h3 className="mt-3 text-xl font-bold text-white">Start with one call type</h3><p className="mt-3 text-base leading-relaxed text-slate-400">Begin with a focused missed-call or after-hours workflow and see the proposed customer experience before a larger rollout.</p></article>
              <article className="rounded-2xl border border-slate-800 bg-slate-900 p-7"><p className="text-xs font-bold uppercase tracking-widest text-amber-400">Your existing tools</p><h3 className="mt-3 text-xl font-bold text-white">Keep the systems that work</h3><p className="mt-3 text-base leading-relaxed text-slate-400">Your team approves the script and exceptions. We check compatibility with your phone, calendar, and CRM before recommending a setup, and define when a person takes over.</p></article>
            </div>
          </div>
        </section>
        <section id="contractors" className="border-t border-slate-900 px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-3xl"><p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400">For Roofing Contractors</p><h2 className="mt-3 text-3xl font-extrabold text-white sm:text-5xl">Capture more roofing opportunities without rebuilding your company.</h2><p className="mt-5 text-lg leading-relaxed text-slate-400">MidSize AI maps what happens from the first ring through qualification, scheduling, and follow-up. Then we design one controlled workflow around your company’s rules, capacity, service area, and customer experience.</p></div>
            <div id="how-it-works" className="mt-10 grid gap-5 md:grid-cols-3">{contractorSolutions.map(([title, description]) => <article key={title} className="rounded-2xl border border-slate-800 bg-slate-900 p-7"><div className="mb-5 h-1 w-12 rounded bg-amber-400" /><h3 className="text-xl font-bold text-white">{title}</h3><p className="mt-3 leading-relaxed text-slate-400">{description}</p></article>)}</div>
            <RoofingMissedLeadEstimate />
            <div className="mt-10 rounded-3xl border border-amber-400/25 bg-amber-400/10 p-8 sm:flex sm:items-center sm:justify-between sm:gap-8"><div><h3 className="text-2xl font-bold text-white">Know what to improve first.</h3><p className="mt-2 max-w-2xl text-slate-300">Tell us how inquiries reach your team, where follow-up gets stuck, and which tools you use. Your free review focuses on a practical starting recommendation. Scope and pricing for any paid setup are discussed separately.</p></div><a href={reviewUrl('closing')} className="mt-6 inline-flex shrink-0 rounded-xl bg-amber-400 px-7 py-4 font-bold text-slate-950 transition hover:bg-amber-300 sm:mt-0">Request My Free Workflow Review</a></div>
          </div>
        </section>
        <section aria-labelledby="review-details" className="border-t border-slate-900 px-6 py-16">
          <div className="mx-auto max-w-4xl">
            <h2 id="review-details" className="text-3xl font-bold text-white">What we’ll work through in your free review</h2>
            <ul className="mt-6 list-disc space-y-3 pl-6 text-base text-slate-300">
              <li>Your main gap in call coverage or follow-up.</li>
              <li>The first workflow worth testing and the rules your team needs to approve.</li>
              <li>How inquiries should reach a real person.</li>
              <li>Whether a paid implementation makes sense for your business.</li>
            </ul>
            <div className="mt-10 space-y-4">
              <details className="rounded-xl border border-slate-800 p-5"><summary className="cursor-pointer text-lg font-bold">Will this replace my office team?</summary><p className="mt-4 text-base text-slate-300">The goal is to support intake and follow-up. Your team handles exceptions, relationships, and conversations that need judgment. We define the handoff before implementation.</p></details>
              <details className="rounded-xl border border-slate-800 p-5"><summary className="cursor-pointer text-lg font-bold">Does this include new roofing leads?</summary><p className="mt-4 text-base text-slate-300">This offer focuses on responding to and following up with your inquiries. MidSizeAI also provides homeowner tools, but the workflow review does not promise lead volume or exclusive referrals.</p></details>
              <details className="rounded-xl border border-slate-800 p-5"><summary className="cursor-pointer text-lg font-bold">Can Samantha quote roofs or answer insurance questions?</summary><p className="mt-4 text-base text-slate-300">Intake uses information your company approves. Roof pricing, inspection findings, and insurance questions go to the appropriate person on your team.</p></details>
            </div>
            <p className="mt-8 text-base text-slate-400">Looking for help understanding your own estimate? <a className="underline underline-offset-4 hover:text-white" href="https://homeowner.midsizeai.com/">Visit our homeowner resources.</a></p>
          </div>
        </section>
        <section className="border-t border-slate-900 bg-slate-900/35 px-6 py-16"><div className="mx-auto max-w-4xl text-center"><h2 className="text-2xl font-bold text-white">Clear roles across the MidSize AI ecosystem</h2><p className="mt-4 leading-relaxed text-slate-400">This site explains technology and workflow services for roofing companies. MidSize AI is not a roofing contractor, insurer, adjuster, law firm, or emergency service. Roofing companies remain responsible for their professional work, representations, pricing, customer communication, and compliance.</p></div></section>
      </main>
      <footer className="border-t border-slate-900 px-6 py-10 text-sm text-slate-500"><div className="mx-auto flex max-w-6xl flex-col gap-4 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left"><p>© {new Date().getFullYear()} MidSize AI · Roofing Division</p><div className="flex flex-wrap justify-center gap-5"><a className="hover:text-white" href="https://midsizeai.com">MidSize AI Home</a><a className="hover:text-white" href="/resources/roofing-after-hours-call-script/">Free Call Script</a><a className="hover:text-white" href={APPLICATION_URL}>Free Workflow Review</a></div></div></footer>
    </div>
  );
}

export default RoofingApp;
