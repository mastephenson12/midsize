import React, { useEffect, useMemo, useState } from 'react';

const defaults = {
  monthlyLeads: 100,
  averageJobValue: 8500,
  missedLeadRate: 20,
  closeRate: 25,
};

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

function clamp(value, min, max) {
  const number = Number(value);
  if (!Number.isFinite(number)) return min;
  return Math.min(max, Math.max(min, number));
}

function Field({ id, label, help, prefix, suffix, value, min, max, step, onChange }) {
  return (
    <label htmlFor={id} className="block">
      <span className="text-sm font-bold text-white">{label}</span>
      <span className="relative mt-2 block">
        {prefix && <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center font-bold text-slate-500">{prefix}</span>}
        <input
          id={id}
          type="number"
          inputMode="decimal"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={`w-full rounded-xl border border-slate-700 bg-slate-900 py-3 text-white outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 ${prefix ? 'pl-9 pr-4' : suffix ? 'pl-4 pr-10' : 'px-4'}`}
        />
        {suffix && <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center font-bold text-slate-500">{suffix}</span>}
      </span>
      <span className="mt-2 block text-xs leading-relaxed text-slate-500">{help}</span>
    </label>
  );
}

export default function MissedLeadCalculator() {
  const [values, setValues] = useState(defaults);

  useEffect(() => {
    const originalTitle = document.title;
    const description = document.querySelector('meta[name="description"]');
    const originalDescription = description?.getAttribute('content') || '';
    document.title = 'Missed Lead Revenue Calculator | MidSize AI';
    description?.setAttribute('content', 'Estimate how many inbound leads and how much potential revenue your home-service company may lose when calls and web inquiries go unanswered.');
    return () => {
      document.title = originalTitle;
      description?.setAttribute('content', originalDescription);
    };
  }, []);

  const result = useMemo(() => {
    const monthlyLeads = clamp(values.monthlyLeads, 0, 100000);
    const averageJobValue = clamp(values.averageJobValue, 0, 10000000);
    const missedLeadRate = clamp(values.missedLeadRate, 0, 100) / 100;
    const closeRate = clamp(values.closeRate, 0, 100) / 100;
    const missedLeads = monthlyLeads * missedLeadRate;
    const potentialJobs = missedLeads * closeRate;
    const monthlyRevenue = potentialJobs * averageJobValue;

    return {
      missedLeads,
      potentialJobs,
      monthlyRevenue,
      annualRevenue: monthlyRevenue * 12,
    };
  }, [values]);

  function update(key, value) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <nav className="border-b border-slate-800 bg-slate-950/95 px-5 py-3">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-5">
          <a href="/" aria-label="MidSize AI home" className="rounded-lg bg-white px-2 py-1">
            <img src="/midsize-ai-logo.webp" alt="MidSize AI" className="h-12 w-auto sm:h-14" />
          </a>
          <a href="/" className="text-sm font-bold text-slate-300 hover:text-white">Back to MidSize AI</a>
        </div>
      </nav>

      <main>
        <header className="border-b border-slate-900 px-6 py-16 text-center sm:py-20">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-400">Free calculator · No email required</p>
          <h1 className="mx-auto mt-4 max-w-4xl text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
            How much could missed leads be costing your business?
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-400">
            Enter four numbers to build a directional estimate. See the result immediately, then decide whether a closer workflow review is worthwhile.
          </p>
        </header>

        <section className="px-5 py-12 sm:px-6 sm:py-16">
          <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[.9fr_1.1fr]">
            <form className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6 sm:p-8" onSubmit={(event) => event.preventDefault()}>
              <h2 className="text-2xl font-extrabold text-white">Your current lead flow</h2>
              <p className="mt-2 text-sm text-slate-400">Use tracked figures when possible. You can adjust every assumption.</p>
              <div className="mt-8 grid gap-7 sm:grid-cols-2 lg:grid-cols-1">
                <Field id="monthly-leads" label="Inbound leads per month" help="Calls, forms, chats, texts, and other new inquiries." value={values.monthlyLeads} min="0" max="100000" step="1" onChange={(value) => update('monthlyLeads', value)} />
                <Field id="average-job-value" label="Average sold job value" help="Use collected revenue or the average contract amount—not your largest job." prefix="$" value={values.averageJobValue} min="0" max="10000000" step="100" onChange={(value) => update('averageJobValue', value)} />
                <Field id="missed-lead-rate" label="Leads not reached promptly" help="Include unanswered calls and web leads that wait long enough to shop elsewhere." suffix="%" value={values.missedLeadRate} min="0" max="100" step="1" onChange={(value) => update('missedLeadRate', value)} />
                <Field id="close-rate" label="Close rate on qualified leads" help="Use your actual sold-job rate when available." suffix="%" value={values.closeRate} min="0" max="100" step="1" onChange={(value) => update('closeRate', value)} />
              </div>
            </form>

            <section aria-live="polite" className="rounded-3xl border border-amber-400/30 bg-gradient-to-br from-amber-400/10 via-slate-900 to-blue-500/10 p-6 sm:p-9">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400">Directional opportunity estimate</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-700 bg-slate-950/70 p-5">
                  <p className="text-sm text-slate-400">Leads not reached monthly</p>
                  <p className="mt-1 text-4xl font-extrabold text-white">{result.missedLeads.toFixed(1)}</p>
                </div>
                <div className="rounded-2xl border border-slate-700 bg-slate-950/70 p-5">
                  <p className="text-sm text-slate-400">Potential jobs represented</p>
                  <p className="mt-1 text-4xl font-extrabold text-white">{result.potentialJobs.toFixed(1)}</p>
                </div>
              </div>
              <div className="mt-4 rounded-2xl border border-amber-400/30 bg-slate-950/80 p-6">
                <p className="text-sm text-slate-400">Potential monthly revenue opportunity</p>
                <p className="mt-1 break-words text-4xl font-extrabold text-amber-300 sm:text-5xl">{currency.format(result.monthlyRevenue)}</p>
                <p className="mt-3 text-sm text-slate-400">Annualized: <strong className="text-white">{currency.format(result.annualRevenue)}</strong></p>
              </div>

              <div className="mt-7 rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
                <h2 className="font-bold text-white">What this number means</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  This is not a promise of recovered revenue. It assumes missed leads resemble your normal leads and could close at the rate entered. A real audit should verify call logs, response time, qualification, capacity, margins, and duplicate inquiries.
                </p>
              </div>

              <a
                href="https://apply.midsizeai.com/application?utm_source=midsizeai.com&utm_medium=calculator&utm_campaign=missed_lead_audit&utm_content=result_cta"
                className="mt-7 block w-full rounded-xl bg-amber-400 px-6 py-4 text-center font-extrabold text-slate-950 transition hover:bg-amber-300"
              >
                Request My Free Workflow Audit
              </a>
              <p className="mt-3 text-center text-xs text-slate-500">Contact information is requested only after you choose to continue.</p>
            </section>
          </div>
        </section>

        <section className="border-t border-slate-900 px-6 py-14">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-2xl font-extrabold text-white">How to improve the estimate</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {[
                ['Check call logs', 'Count unanswered and after-hours calls for a full month.'],
                ['Measure response time', 'Review how long web and text inquiries wait for a human response.'],
                ['Use sold-job data', 'Replace assumptions with actual close rate and average collected job value.'],
              ].map(([title, body]) => (
                <article key={title} className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
                  <h3 className="font-bold text-amber-300">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-900 px-6 py-9 text-center text-xs text-slate-500">
        <p>© {new Date().getFullYear()} MidSize AI. Directional planning tool—not financial advice or a revenue guarantee.</p>
      </footer>
    </div>
  );
}
