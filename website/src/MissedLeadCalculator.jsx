import React, { useEffect, useMemo, useRef, useState } from 'react';

function track(name, params = {}) {
  if (typeof window.gtag === 'function') window.gtag('event', name, { source: 'missed_lead_calculator', ...params });
}

const defaults = {
  trade: 'roofing',
  monthlyLeads: 100,
  averageJobValue: 8500,
  missedLeadRate: 20,
  closeRate: 25,
};

const tradeLabels = {
  roofing: 'Roofing',
  hvac: 'HVAC',
  plumbing: 'Plumbing',
  electrical: 'Electrical',
  remodeling: 'Remodeling',
  other: 'Other home service',
};

const questions = [
  {
    key: 'trade',
    eyebrow: 'First, tell us what you do',
    title: 'What type of home-service business are you running?',
    help: 'This helps us frame the result around your kind of work.',
  },
  {
    key: 'monthlyLeads',
    eyebrow: 'Now let’s size your lead flow',
    title: 'About how many new leads come in each month?',
    help: 'Count calls, forms, chats, texts, and other new inquiries.',
  },
  {
    key: 'averageJobValue',
    eyebrow: 'Next, the value of a sold job',
    title: 'What is your average sold job worth?',
    help: 'Use a realistic average contract or collected revenue amount.',
  },
  {
    key: 'missedLeadRate',
    eyebrow: 'Now the painful part',
    title: 'What percentage of leads are not reached promptly?',
    help: 'Include unanswered calls, after-hours inquiries, and leads that wait long enough to shop elsewhere.',
  },
  {
    key: 'closeRate',
    eyebrow: 'Last number',
    title: 'What percentage of qualified leads usually become sold jobs?',
    help: 'Use your actual close rate when you have it. A reasonable estimate is fine for this directional tool.',
  },
];

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

function NumericInput({ id, label, value, prefix, suffix, min, max, step, onChange }) {
  return (
    <div className="relative mx-auto mt-8 max-w-sm">
      {prefix && <span className="pointer-events-none absolute inset-y-0 left-5 flex items-center text-xl font-extrabold text-slate-500">{prefix}</span>}
      <input
        id={id}
        aria-label={label}
        required
        type="number"
        inputMode="decimal"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={`w-full rounded-2xl border border-slate-700 bg-slate-950 py-5 text-center text-3xl font-extrabold text-white outline-none transition focus:border-amber-400 focus:ring-4 focus:ring-amber-400/10 ${prefix ? 'pl-12 pr-5' : suffix ? 'pl-5 pr-12' : 'px-5'}`}
      />
      {suffix && <span className="pointer-events-none absolute inset-y-0 right-5 flex items-center text-xl font-extrabold text-slate-500">{suffix}</span>}
    </div>
  );
}

export default function MissedLeadCalculator() {
  const [values, setValues] = useState(defaults);
  const [step, setStep] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const heading = useRef(null);
  useEffect(() => { heading.current?.focus(); }, [step, showResult]);

  useEffect(() => {
    const originalTitle = document.title;
    const description = document.querySelector('meta[name="description"]');
    const originalDescription = description?.getAttribute('content') || '';
    document.title = 'Free Missed Call Revenue Calculator for Contractors | MidSize AI';
    description?.setAttribute('content', 'Use the free MidSize AI calculator to estimate how much revenue your roofing, HVAC, plumbing, electrical, or home-service business may be losing from missed leads.');
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

  const current = questions[step];

  function update(key, value) {
    setValues((currentValues) => ({ ...currentValues, [key]: value }));
  }

  function next() {
    if (step < questions.length - 1) {
      setStep((currentStep) => currentStep + 1);
    } else {
      setShowResult(true);
      track('calculator_completed', { trade: values.trade });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function back() {
    if (showResult) {
      setShowResult(false);
      return;
    }
    setStep((currentStep) => Math.max(0, currentStep - 1));
  }

  function restart() {
    setValues(defaults);
    setStep(0);
    setShowResult(false);

  }

  function downloadReport() {
    const text = [
      'MidSize AI — Missed-lead estimate',
      'Trade: ' + tradeLabels[values.trade],
      'Monthly leads: ' + values.monthlyLeads,
      'Average job value: ' + currency.format(values.averageJobValue),
      'Not reached promptly: ' + values.missedLeadRate + '%',
      'Close rate: ' + values.closeRate + '%',
      'Potential monthly opportunity: ' + currency.format(result.monthlyRevenue),
      'Annualized opportunity: ' + currency.format(result.annualRevenue),
      'Directional estimate only; verify call logs, duplicates, capacity and margins.',
      '',
      '1. Capture: Review one month of calls, forms, chats and texts. Remove spam and duplicates.',
      '2. Confirm and route: Set an acknowledgement target and assign one owner per lead.',
      '3. Nurture: Follow up consistently and measure contact, appointment and sold-job rates.',
      '', 'Follow-Up Leak Audit: https://www.midsizeai.com/resources/follow-up-leak-audit/'
    ].join('\n');
    const url = URL.createObjectURL(new Blob([text], { type: 'text/plain;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url; link.download = 'midsize-missed-lead-plan.txt'; link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    track('calculator_report_download');
  }

  function renderQuestion() {
    if (current.key === 'trade') {
      return (
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {Object.entries(tradeLabels).map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => update('trade', value)}
              aria-pressed={values.trade === value}
              className={`rounded-2xl border px-5 py-4 text-left font-bold transition ${values.trade === value ? 'border-amber-400 bg-amber-400/10 text-amber-200' : 'border-slate-700 bg-slate-950 text-slate-200 hover:border-slate-500'}`}
            >
              {label}
            </button>
          ))}
        </div>
      );
    }

    const configs = {
      monthlyLeads: { min: 0, max: 100000, step: 1 },
      averageJobValue: { min: 0, max: 10000000, step: 0.01, prefix: '$' },
      missedLeadRate: { min: 0, max: 100, step: 1, suffix: '%' },
      closeRate: { min: 0, max: 100, step: 1, suffix: '%' },
    };

    return (
      <NumericInput
        id={current.key}
        label={current.title}
        value={values[current.key]}
        onChange={(value) => update(current.key, value)}
        {...configs[current.key]}
      />
    );
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

      {!showResult ? (
        <main className="px-5 py-12 sm:px-6 sm:py-20">
          <form onSubmit={(event) => { event.preventDefault(); next(); }} className="mx-auto max-w-3xl rounded-3xl border border-slate-800 bg-slate-900/50 p-6 shadow-2xl shadow-black/20 sm:p-10">
            <div className="flex items-center justify-between gap-4">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400">Free contractor tool · No email required</p>
              <p className="text-xs font-bold text-slate-500">Step {step + 1} of {questions.length}</p>
            </div>

            <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800">
              <div className="h-full rounded-full bg-amber-400 transition-all" style={{ width: `${((step + 1) / questions.length) * 100}%` }} />
            </div>

            <p className="mt-10 text-sm font-bold text-slate-400">{current.eyebrow}</p>
            <h1 ref={heading} tabIndex={-1} className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">{current.title}</h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-400">{current.help}</p>

            {renderQuestion()}

            <div className="mt-10 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={back}
                disabled={step === 0}
                className="rounded-xl border border-slate-700 px-5 py-3 font-bold text-slate-300 disabled:cursor-not-allowed disabled:opacity-30"
              >
                Back
              </button>
              <button
                type="submit"
                className="rounded-xl bg-amber-400 px-6 py-3 font-extrabold text-slate-950 transition hover:bg-amber-300"
              >
                {step === questions.length - 1 ? 'Show My Revenue Leak' : 'Continue'}
              </button>
            </div>
          </form>
        </main>
      ) : (
        <main>
          <header className="border-b border-slate-900 px-6 py-12 text-center sm:py-16">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-400">Your missed-lead estimate</p>
            <h1 ref={heading} tabIndex={-1} className="mx-auto mt-4 max-w-4xl text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
              You may have {currency.format(result.monthlyRevenue)} per month tied to leads that are not reached promptly.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-400">
              Based on the numbers you entered for your {tradeLabels[values.trade].toLowerCase()} business. This is a directional estimate, not a revenue promise.
            </p>
          </header>

          <section className="px-5 py-12 sm:px-6 sm:py-16">
            <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.05fr_.95fr]">
              <section className="rounded-3xl border border-amber-400/30 bg-gradient-to-br from-amber-400/10 via-slate-900 to-blue-500/10 p-6 sm:p-9">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400">Your numbers</p>
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
                <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/60 p-5 text-sm leading-relaxed text-slate-400">
                  This assumes missed leads resemble your normal leads and could close at the rate you entered. Verify the estimate against call logs, response times, duplicate leads, capacity, and margins before making business decisions.
                </div>
                <button type="button" onClick={back} className="mt-6 text-sm font-bold text-slate-300 underline decoration-slate-600 underline-offset-4 hover:text-white">Change my answers</button>
              </section>

              <aside className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8">
                <h2 className="text-2xl font-extrabold text-white">Your 3-step recovery plan</h2>
                <ol className="mt-5 space-y-4 text-sm leading-relaxed text-slate-300">
                  <li><strong className="text-blue-300">1. Capture:</strong> Review one full month of unanswered calls, after-hours calls, forms, chats and texts. Separate new leads from spam and duplicates.</li>
                  <li><strong className="text-blue-300">2. Confirm and route:</strong> Set an acknowledgement target your team can meet, assign one owner per lead and define a human handoff for urgent requests.</li>
                  <li><strong className="text-blue-300">3. Nurture:</strong> Follow up consistently after missed calls and estimates. Compare contact, appointment and sold-job rates over 30 days.</li>
                </ol>
                <button type="button" onClick={downloadReport} className="mt-6 w-full rounded-xl bg-amber-400 px-5 py-4 font-extrabold text-slate-950">Download my numbers and plan</button>
                <p className="mt-2 text-xs text-slate-400">No email required. Save a text copy on your device.</p>
                <a href="/resources/follow-up-leak-audit/" onClick={() => track('follow_up_leak_audit_click')} className="mt-6 inline-block font-bold text-amber-300 underline underline-offset-4">Take the Follow-Up Leak Audit →</a>
                <div className="mt-8 border-t border-slate-800 pt-6">
                  <p className="text-sm font-bold text-white">Want MidSize AI to look at the leak with you?</p>
                  <a
                    onClick={() => track('workflow_audit_click')}
                    href="https://apply.midsizeai.com/application?utm_source=midsizeai.com&utm_medium=calculator&utm_campaign=missed_lead_audit&utm_content=result_cta"
                    className="mt-3 block rounded-xl border border-slate-700 px-5 py-3 text-center text-sm font-extrabold text-white transition hover:border-slate-500"
                  >
                    Request a Free Workflow Audit
                  </a>
                </div>
              </aside>
            </div>

            <div className="mx-auto mt-8 max-w-6xl text-center">
              <button type="button" onClick={restart} className="text-sm font-bold text-slate-500 hover:text-slate-300">Start over</button>
            </div>
          </section>
        </main>
      )}

      <footer className="border-t border-slate-900 px-6 py-9 text-center text-xs text-slate-500">
        <p>© {new Date().getFullYear()} MidSize AI. Directional planning tool, not financial advice or a revenue guarantee.</p>
      </footer>
    </div>
  );
}
