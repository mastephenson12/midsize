import React, { useEffect } from 'react';

const APPLICATION_URL = 'https://apply.midsizeai.com/application';

const serviceFunnels = {
  '/services/ai-receptionist-for-roofers': {
    eyebrow: 'AI receptionist for roofing companies',
    title: 'Answer More Roofing Calls Without Hiring Another Full-Time Office Role',
    highlight: 'Answer More Roofing Calls',
    description:
      'A roofing-specific AI receptionist workflow that answers missed and after-hours calls, captures project details, and routes real opportunities to your team.',
    canonical: 'https://roofers.midsizeai.com/services/ai-receptionist-for-roofers',
    pain: 'Most roofing companies do not lose leads because they are bad at roofing. They lose them because a homeowner calls while the team is on a roof, in an inspection, driving, or already buried in follow-up.',
    promise: 'Samantha gives callers a professional first response, gathers the details your team needs, and keeps the next step clear.',
    bullets: [
      'After-hours and overflow call intake',
      'Roofing-specific questions for leaks, storm damage, inspections, and estimates',
      'Human handoff rules for urgent or high-value calls',
      'CRM notes your office can actually use',
    ],
    workflow: [
      ['Map your calls', 'We document your common roofing call types, service area, escalation rules, and booking preferences.'],
      ['Build the intake', 'We create the approved script, qualification logic, and handoff path for Samantha.'],
      ['Test before launch', 'Your team reviews test calls before real homeowners interact with the workflow.'],
    ],
    cta: 'Request My AI Receptionist Review',
    proof: 'Best fit: roofers who miss calls during inspections, production days, evenings, weekends, or storm surges.',
  },
  '/services/missed-call-recovery-for-roofers': {
    eyebrow: 'Missed-call recovery for roofers',
    title: 'Turn Missed Roofing Calls Into Fast Follow-Up Before the Lead Goes Cold',
    highlight: 'Fast Follow-Up',
    description:
      'A focused workflow that detects missed calls, responds quickly, collects context, and gives your team a clean path to recover the opportunity.',
    canonical: 'https://roofers.midsizeai.com/services/missed-call-recovery-for-roofers',
    pain: 'A missed call is not just a notification. It is often a homeowner comparing roofers in real time. If they wait too long, they may already be talking to someone else.',
    promise: 'MidSize AI helps you build a recovery loop so missed calls get a timely response and your team knows which ones deserve attention first.',
    bullets: [
      'Missed-call text-back and follow-up sequence',
      'Basic lead capture for name, address, issue, timing, and urgency',
      'Escalation for active leaks, storm damage, and high-intent estimates',
      'Simple reporting so you can see what is being recovered',
    ],
    workflow: [
      ['Audit the leak', 'We review where missed calls happen and what currently happens next.'],
      ['Create the recovery sequence', 'We write the first response, follow-up timing, and handoff rules.'],
      ['Measure the lift', 'We track recovered conversations and booked next steps so the system stays honest.'],
    ],
    cta: 'Request a Missed-Call Recovery Review',
    proof: 'Best fit: roofers with good lead flow but inconsistent phone coverage.',
  },
  '/services/estimate-follow-up-for-roofers': {
    eyebrow: 'Estimate follow-up for roofing companies',
    title: 'Follow Up on Roofing Estimates Without Sounding Desperate or Disappearing',
    highlight: 'Follow Up on Roofing Estimates',
    description:
      'A practical follow-up workflow for open roofing estimates, unsold inspections, and homeowners who need a clear next step.',
    canonical: 'https://roofers.midsizeai.com/services/estimate-follow-up-for-roofers',
    pain: 'Many roofing estimates do not close or die. They drift. The homeowner is comparing options, waiting on a spouse, checking insurance, or simply unsure what to ask next.',
    promise: 'We help your team follow up with useful, professional messages that clarify the decision instead of pestering the homeowner.',
    bullets: [
      'Estimate follow-up sequences for open proposals',
      'Different messaging for retail, insurance, repair, and replacement opportunities',
      'Reminders for unresolved objections and next-step scheduling',
      'Human takeover when the homeowner asks pricing, scope, or timing questions',
    ],
    workflow: [
      ['Define estimate stages', 'We map what happens after inspection, after proposal, and before the lead is marked lost.'],
      ['Write useful follow-up', 'We build messages that answer real homeowner concerns and invite a clear next step.'],
      ['Keep control with your team', 'Your office approves timing, language, stop rules, and handoff triggers.'],
    ],
    cta: 'Request an Estimate Follow-Up Review',
    proof: 'Best fit: roofers with a proposal backlog, slow follow-up, or open estimates sitting in the CRM.',
  },
  '/services/roofing-review-automation': {
    eyebrow: 'Review automation for roofers',
    title: 'Ask Happy Roofing Customers for Reviews at the Right Time',
    highlight: 'Reviews at the Right Time',
    description:
      'A review request workflow that helps roofing companies ask satisfied customers for feedback after the job is complete.',
    canonical: 'https://roofers.midsizeai.com/services/roofing-review-automation',
    pain: 'Roofing companies earn trust in the field, then forget to capture that trust online. Reviews often depend on whoever remembers to ask at the end of a long job.',
    promise: 'MidSize AI helps you create a consistent review request process that supports your reputation without pressuring customers.',
    bullets: [
      'Review request timing after completion or final payment',
      'Simple routing to Google Business Profile or preferred review links',
      'Internal feedback capture for unhappy customers before public review requests',
      'Lightweight reporting for review activity and response opportunities',
    ],
    workflow: [
      ['Choose the trigger', 'We pick the right completion milestone from your current workflow.'],
      ['Write the ask', 'We create short, human review requests that match your company voice.'],
      ['Protect the brand', 'We include internal feedback paths and clear stop rules.'],
    ],
    cta: 'Request a Review Automation Plan',
    proof: 'Best fit: roofers who complete good work but do not consistently turn it into online trust.',
  },
};

const serviceLinks = Object.entries(serviceFunnels).map(([path, service]) => ({ path, label: service.eyebrow.replace(' for roofing companies', '').replace(' for roofers', '') }));

function setMeta(service) {
  document.title = `${service.eyebrow.replace(/\b\w/g, (char) => char.toUpperCase())} | MidSize AI`;
  let description = document.querySelector('meta[name="description"]');
  if (!description) {
    description = document.createElement('meta');
    description.name = 'description';
    document.head.appendChild(description);
  }
  description.content = service.description;

  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.appendChild(canonical);
  }
  canonical.href = service.canonical;
}

function RooferServiceFunnel() {
  const normalizedPath = window.location.pathname.replace(/\/$/, '');
  const service = serviceFunnels[normalizedPath] || serviceFunnels['/services/ai-receptionist-for-roofers'];

  useEffect(() => {
    setMeta(service);
  }, [service]);

  const reviewUrl = `${APPLICATION_URL}?utm_source=roofers.midsizeai.com&utm_medium=service_funnel&utm_campaign=${normalizedPath.replace('/services/', '')}`;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-amber-400 selection:text-slate-950">
      <nav className="border-b border-slate-800 bg-slate-950 px-4 py-3 sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <a href="/" className="flex items-center gap-3" aria-label="MidSize AI roofing division home">
            <span className="rounded-lg bg-white px-2 py-1"><img src="/midsize-ai-logo.webp" alt="MidSize AI" className="h-12 w-auto" /></span>
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-amber-400">Roofing Division</span>
          </a>
          <div className="flex flex-wrap gap-3 text-sm text-slate-400">
            {serviceLinks.map((link) => (
              <a key={link.path} className="hover:text-white" href={link.path}>{link.label}</a>
            ))}
          </div>
        </div>
      </nav>

      <main>
        <header className="border-b border-slate-900 px-6 py-16 sm:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.08fr_.72fr] lg:items-center">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-amber-400">{service.eyebrow}</p>
              <h1 className="mt-5 max-w-4xl text-4xl font-extrabold leading-[1.06] text-white sm:text-6xl">
                {service.title}
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-300">{service.description}</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a className="rounded-xl bg-amber-400 px-7 py-4 text-center font-bold text-slate-950 transition hover:bg-amber-300" href={reviewUrl}>{service.cta}</a>
                <a className="rounded-xl border border-slate-700 bg-slate-900 px-7 py-4 text-center font-bold text-white transition hover:border-slate-500" href="/resources/roofing-after-hours-call-script/">Get the Free Call Script</a>
              </div>
              <p className="mt-4 text-sm text-slate-500">{service.proof}</p>
            </div>
            <aside className="rounded-3xl border border-amber-400/20 bg-slate-900 p-7 shadow-2xl shadow-slate-950/40">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-400">What this fixes</p>
              <p className="mt-4 text-lg leading-relaxed text-slate-300">{service.pain}</p>
              <div className="mt-6 rounded-2xl bg-slate-950 p-5">
                <p className="text-sm font-bold text-white">Practical promise</p>
                <p className="mt-2 leading-relaxed text-slate-400">{service.promise}</p>
              </div>
            </aside>
          </div>
        </header>

        <section className="px-6 py-16">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {service.bullets.map((bullet) => (
                <article key={bullet} className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
                  <div className="mb-4 h-1 w-10 rounded bg-amber-400" />
                  <p className="font-bold leading-relaxed text-white">{bullet}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-slate-900 bg-slate-900/35 px-6 py-16">
          <div className="mx-auto max-w-6xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-400">How the service gets built</p>
            <h2 className="mt-3 text-3xl font-extrabold text-white sm:text-5xl">A focused workflow first. Bigger automation later.</h2>
            <div className="mt-9 grid gap-5 md:grid-cols-3">
              {service.workflow.map(([title, body], index) => (
                <article key={title} className="rounded-2xl border border-slate-800 bg-slate-950 p-7">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-amber-400 font-extrabold text-slate-950">{index + 1}</span>
                  <h3 className="mt-5 text-xl font-bold text-white">{title}</h3>
                  <p className="mt-3 leading-relaxed text-slate-400">{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-16">
          <div className="mx-auto max-w-5xl rounded-3xl border border-amber-400/25 bg-amber-400/10 p-8 text-center sm:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400">Free workflow review</p>
            <h2 className="mt-3 text-3xl font-extrabold text-white sm:text-5xl">See the service mapped to your roofing company before you buy.</h2>
            <p className="mx-auto mt-5 max-w-3xl leading-relaxed text-slate-300">We look at your current intake, follow-up, and handoff path, then recommend the smallest workflow that can create a measurable improvement.</p>
            <a className="mt-8 inline-flex rounded-xl bg-amber-400 px-8 py-4 font-bold text-slate-950 transition hover:bg-amber-300" href={reviewUrl}>{service.cta} →</a>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-900 px-6 py-10 text-sm text-slate-500">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p>© {new Date().getFullYear()} MidSize AI · Roofing Division</p>
          <div className="flex flex-wrap justify-center gap-5">
            <a className="hover:text-white" href="/">Roofers Home</a>
            <a className="hover:text-white" href="https://midsizeai.com">MidSize AI Home</a>
            <a className="hover:text-white" href={reviewUrl}>Free Workflow Review</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default RooferServiceFunnel;
