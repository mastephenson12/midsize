import React, { useEffect, useMemo, useState } from 'react';

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

function NumericInput({ id, value, prefix, suffix, min, max, step, onChange }) {
  return (
    <div className="relative mx-auto mt-8 max-w-sm">
      {prefix && <span className="pointer-events-none absolute inset-y-0 left-5 flex items-center text-xl font-extrabold text-slate-500">{prefix}</span>}
      <input
        id={id}
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
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [saveState, setSaveState] = useState({ status: 'idle', message: '' });

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
    setEmail('');
    setConsent(false);
    setSaveState({ status: 'idle', message: '' });
  }

  async function saveReport(event) {
    event.preventDefault();
    if (!email || !consent) {
      setSaveState({ status: 'error', message: 'Enter your email and check the box so we can send the report.' });
      return;
    }

    setSaveState({ status: 'loading', message: 'Saving your numbers…' });

    try {
      const response = await fetch('/api/contractor-calculator-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          trade: values.trade,
          monthlyLeads: Number(values.monthlyLeads),
          averageJobValue: Number(values.averageJobValue),
          missedLeadRate: Number(values.missedLeadRate),
          closeRate: Number(values.closeRate),
          monthlyRevenue: result.monthlyRevenue,
          annualRevenue: result.annualRevenue,
          consent,
        }),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || 'We could not save your report. Please try again.');
      setSaveState({ status: 'success', message: 'Saved. Your numbers were sent for report delivery.' });
    } catch (error) {
      setSaveState({ status: 'error', message: error.message || 'We could not save your report. Please try again.' });
    }
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
      averageJobValue: { min: 0, max: 10000000, step: 100, prefix: '$' },
      missedLeadRate: { min: 0, max: 100, step: 1, suffix: '%' },
      closeRate: { min: 0, max: 100, step: 1, suffix: '%' },
    };

    return (
      <NumericInput
        id={current.key}
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
          <section className="mx-auto max-w-3xl rounded-3xl border border-slate-800 bg-slate-900/50 p-6 shadow-2xl shadow-black/20 sm:p-10">
            <div className="flex items-center justify-between gap-4">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400">Free contractor tool · No email required</p>
              <p className="text-xs font-bold text-slate-500">Step {step + 1} of {questions.length}</p>
            </div>

            <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800">
              <div className="h-full rounded-full bg-amber-400 transition-all" style={{ width: `${((step + 1) / questions.length) * 100}%` }} />
            </div>

            <p className="mt-10 text-sm font-bold text-slate-400">{current.eyebrow}</p>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">{current.title}</h1>
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
                type="button"
                onClick={next}
                className="rounded-xl bg-amber-400 px-6 py-3 font-extrabold text-slate-950 transition hover:bg-amber-300"
              >
                {step === questions.length - 1 ? 'Show My Revenue Leak' : 'Continue'}
              </button>
            </div>
          </section>
        </main>
      ) : (
        <main>
          <header className="border-b border-slate-900 px-6 py-12 text-center sm:py-16">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-400">Your missed-lead estimate</p>
            <h1 className="mx-auto mt-4 max-w-4xl text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
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
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-300">Optional</p>
                <h2 className="mt-3 text-2xl font-extrabold text-white">Save this result to your email</h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">
                  Keep the numbers for later. We’ll also include a short missed-call response checklist you can use even if you never buy anything from MidSize AI.
                </p>

                <form onSubmit={saveReport} className="mt-6">
                  <label htmlFor="report-email" className="text-sm font-bold text-white">Business email</label>
                  <input
                    id="report-email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@company.com"
                    className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-4 text-white outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20"
                  />

                  <label className="mt-4 flex items-start gap-3 text-xs leading-relaxed text-slate-400">
                    <input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} className="mt-1 h-4 w-4 accent-amber-400" />
                    <span>Send me this calculator result and the related free checklist. I can unsubscribe from future emails at any time.</span>
                  </label>

                  <button
                    type="submit"
                    disabled={saveState.status === 'loading'}
                    className="mt-5 w-full rounded-xl bg-amber-400 px-6 py-4 font-extrabold text-slate-950 transition hover:bg-amber-300 disabled:cursor-wait disabled:opacity-60"
                  >
                    {saveState.status === 'loading' ? 'Saving…' : 'Email My Free Report'}
                  </button>

                  {saveState.message && (
                    <p className={`mt-3 text-sm ${saveState.status === 'success' ? 'text-emerald-300' : saveState.status === 'error' ? 'text-rose-300' : 'text-slate-400'}`}>
                      {saveState.message}
                    </p>
                  )}
                </form>

                <div className="mt-8 border-t border-slate-800 pt-6">
                  <p className="text-sm font-bold text-white">Want MidSize AI to look at the leak with you?</p>
                  <a
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
