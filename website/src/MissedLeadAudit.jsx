import React, { useEffect } from 'react';

const bullets = [
  'Missed-call and after-hours coverage review',
  'Website and form response-time check',
  'Lead follow-up and handoff review',
  'Google Business Profile conversion check',
  'Booking and scheduling friction review',
  'One-page prioritized action plan',
];

export default function MissedLeadAudit() {
  useEffect(() => {
    const originalTitle = document.title;
    const description = document.querySelector('meta[name="description"]');
    const originalDescription = description?.getAttribute('content') || '';
    document.title = '$99 Missed Lead Audit for Home-Service Companies | MidSize AI';
    description?.setAttribute('content', 'A focused $99 review of where your roofing, HVAC, plumbing or other home-service company may be losing inbound leads and what to fix first.');
    return () => {
      document.title = originalTitle;
      description?.setAttribute('content', originalDescription);
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <nav className="border-b border-slate-800 bg-slate-950 px-5 py-3">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-5">
          <a href="/" className="rounded-lg bg-white px-2 py-1" aria-label="MidSize AI home">
            <img src="/midsize-ai-logo.webp" alt="MidSize AI" className="h-12 w-auto sm:h-14" />
          </a>
          <a href="/missed-lead-calculator" className="text-sm font-bold text-slate-300 hover:text-white">Run the free calculator</a>
        </div>
      </nav>

      <main>
        <header className="border-b border-slate-900 px-6 py-16 text-center sm:py-24">
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-amber-400">For roofing, HVAC, plumbing, electrical & home services</p>
          <h1 className="mx-auto mt-5 max-w-5xl text-4xl font-black tracking-tight text-white sm:text-6xl">
            Find out where your next customer is falling through the cracks.
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-slate-400 sm:text-xl">
            I’ll review the path from first call or form submission through follow-up and booking, then give you a short action plan showing what to fix first.
          </p>
          <div className="mx-auto mt-8 inline-flex items-end gap-2 rounded-2xl border border-amber-400/30 bg-amber-400/10 px-6 py-4">
            <span className="text-4xl font-black text-amber-300">$99</span>
            <span className="pb-1 text-sm font-bold text-slate-300">one-time audit</span>
          </div>
          <div className="mt-7">
            <a href="https://apply.midsizeai.com/application?utm_source=midsizeai.com&utm_medium=website&utm_campaign=99_missed_lead_audit&utm_content=hero" className="inline-block rounded-xl bg-amber-400 px-7 py-4 text-base font-black text-slate-950 transition hover:bg-amber-300">
              Start My $99 Audit
            </a>
          </div>
          <p className="mx-auto mt-3 max-w-xl text-xs text-slate-500">Submit the short application first. We’ll confirm fit and send payment instructions before the audit begins.</p>
        </header>

        <section className="px-6 py-14 sm:py-18">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_.9fr]">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-blue-400">What gets reviewed</p>
              <h2 className="mt-3 text-3xl font-black text-white">A revenue-leak review, not a 73-page consultant artifact.</h2>
              <p className="mt-4 max-w-2xl text-slate-400">The goal is to identify obvious places where good leads wait too long, get lost, fail to book, or never receive a useful follow-up.</p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {bullets.map((item) => (
                  <div key={item} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
                    <span className="font-bold text-amber-300">✓</span> <span className="font-bold text-white">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <aside className="rounded-3xl border border-slate-800 bg-slate-900/70 p-7 sm:p-8">
              <h2 className="text-2xl font-black text-white">What you get</h2>
              <ol className="mt-6 space-y-5 text-slate-300">
                <li><strong className="text-white">1. Leak map.</strong> Where leads are most likely being lost or slowed down.</li>
                <li><strong className="text-white">2. Priority fixes.</strong> The few changes most likely to improve response and booking.</li>
                <li><strong className="text-white">3. Practical action plan.</strong> What you can fix yourself and where automation may actually help.</li>
                <li><strong className="text-white">4. No forced software rebuild.</strong> We work around useful systems you already have instead of replacing things for sport.</li>
              </ol>
              <a href="https://apply.midsizeai.com/application?utm_source=midsizeai.com&utm_medium=website&utm_campaign=99_missed_lead_audit&utm_content=sidebar" className="mt-8 block rounded-xl bg-blue-500 px-6 py-4 text-center font-black text-white hover:bg-blue-400">Request the Audit</a>
            </aside>
          </div>
        </section>

        <section className="border-y border-slate-900 bg-slate-900/30 px-6 py-14">
          <div className="mx-auto max-w-5xl text-center">
            <h2 className="text-3xl font-black text-white">Who this is for</h2>
            <p className="mx-auto mt-4 max-w-3xl text-slate-400">Home-service companies already getting calls, forms, referrals or paid leads, but unsure how many opportunities disappear between first contact and a booked appointment.</p>
            <p className="mx-auto mt-4 max-w-3xl text-sm text-slate-500">This is not a revenue guarantee. The audit identifies workflow opportunities based on the information you can provide.</p>
          </div>
        </section>

        <section className="px-6 py-16 text-center">
          <div className="mx-auto max-w-3xl rounded-3xl border border-amber-400/20 bg-gradient-to-br from-amber-400/10 to-blue-500/10 p-8 sm:p-12">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-amber-400">First-dollar offer</p>
            <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">Spend $99 to learn where leads may be leaking before spending thousands on another tool.</h2>
            <a href="https://apply.midsizeai.com/application?utm_source=midsizeai.com&utm_medium=website&utm_campaign=99_missed_lead_audit&utm_content=bottom" className="mt-7 inline-block rounded-xl bg-amber-400 px-7 py-4 font-black text-slate-950 hover:bg-amber-300">Start My Audit</a>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-900 px-6 py-9 text-center text-xs text-slate-500">© {new Date().getFullYear()} MidSize AI</footer>
    </div>
  );
}
