import React, { useEffect, useMemo, useState } from 'react';

const scenarios = [
  {
    id: 'roofer',
    label: 'Roofing owner missing calls',
    context: 'Qualified prospect · Clear lead-response problem',
    prospect: 'We miss calls when everyone is on a roof, but I do not want a robot frustrating homeowners.',
    conversation: [
      ['Samantha', 'That concern makes sense. I help roofing companies explore AI call coverage without replacing the human team. About how many new calls do you receive in a typical month?'],
      ['Prospect', 'Usually 80 to 120, and more after storms.'],
      ['Samantha', 'When nobody answers, do those calls reach voicemail, an answering service, or another workflow?'],
      ['Prospect', 'Mostly voicemail. Our office manager calls them back when she can.'],
      ['Samantha', 'That sounds like a good candidate for a controlled missed-call or after-hours pilot. I can schedule a free workflow review to map the questions, escalation rules, calendar, and human handoff before anything speaks to a customer.'],
    ],
    fields: ['Company and trade', 'Monthly inbound-call range', 'Current missed-call process', 'CRM and calendar', 'Service area', 'Desired human handoff', 'Best review time'],
    decision: 'Strong fit for workflow review',
    action: 'Offer a MidSize AI workflow-review appointment. Do not promise revenue or implementation results.',
    handoff: 'MidSize AI consultant validates call data, systems, constraints, pricing, and pilot scope.',
  },
  {
    id: 'hvac',
    label: 'HVAC company exploring AI',
    context: 'Qualified prospect · Different home-service trade',
    prospect: 'We are an HVAC company. Can your agents schedule tune-ups and emergency calls?',
    conversation: [
      ['Samantha', 'MidSize AI works with home-service workflows, including HVAC. I first need to understand what your team considers an emergency and which calls an agent may schedule.'],
      ['Prospect', 'No-cooling calls take priority. Maintenance can go straight on the calendar.'],
      ['Samantha', 'Which scheduling and CRM systems do you use, and do you already have an on-call rotation?'],
      ['Prospect', 'We use Housecall Pro and have an on-call technician.'],
      ['Samantha', 'That gives the workflow review a clear starting point: maintenance booking, no-cooling triage, and escalation to the approved on-call contact. I can help schedule that review.'],
    ],
    fields: ['Company and trade', 'Call types', 'Emergency definition', 'CRM and scheduling system', 'On-call process', 'Booking permissions', 'Review contact'],
    decision: 'Potential fit requiring trade-specific rules',
    action: 'Book discovery with HVAC workflow notes attached.',
    handoff: 'Human confirms technical feasibility, compliance, and the exact call types included.',
  },
  {
    id: 'skeptic',
    label: 'Owner worried about AI quality',
    context: 'Objection handling · Trust-first',
    prospect: 'I have heard terrible AI calls. Why should I trust yours with my reputation?',
    conversation: [
      ['Samantha', 'You should not trust any agent without reviewing and testing it. MidSize AI starts with one narrow workflow, your approved language, and explicit human-escalation rules.'],
      ['Prospect', 'What happens when the caller asks something unexpected?'],
      ['Samantha', 'The agent should not invent an answer. The workflow defines what it may answer, what information it may collect, and when it must transfer or create a human callback.'],
      ['Prospect', 'Can I hear it before it goes live?'],
      ['Samantha', 'Yes. The responsible next step is a workflow review followed by test calls. You approve the script, exceptions, and handoff before any customer-facing pilot.'],
    ],
    fields: ['Primary trust concern', 'Calls considered too sensitive', 'Required escalation standard', 'Approval stakeholders', 'Preferred pilot scope'],
    decision: 'Interested but requires proof and controls',
    action: 'Offer a workflow review and controlled test-call plan—not a hard close.',
    handoff: 'Human demonstrates the proposed workflow and documents approvals.',
  },
  {
    id: 'notready',
    label: 'Business not ready yet',
    context: 'Education · No-pressure outcome',
    prospect: 'I am just starting and only receive a few calls each month. Do I need an AI agent?',
    conversation: [
      ['Samantha', 'Probably not yet. An agent should solve a measured workflow problem, not become another bill. How are calls handled today?'],
      ['Prospect', 'I answer nearly all of them myself.'],
      ['Samantha', 'If that is working, your best next step may be to track missed calls, response time, and repetitive admin before investing.'],
      ['Prospect', 'When should I look again?'],
      ['Samantha', 'Revisit it when missed or after-hours inquiries become frequent, follow-up becomes inconsistent, or administrative work prevents you from serving customers. The free calculator can help you monitor that point.'],
    ],
    fields: ['Company stage', 'Current call volume', 'Missed-call frequency', 'Existing process', 'Future trigger for review'],
    decision: 'Not ready for implementation',
    action: 'Recommend measurement and the free calculator. Do not force an appointment.',
    handoff: 'None required unless the prospect requests advice.',
  },
];

const crmLabels = {
  ghl: 'GoHighLevel',
  jobber: 'Jobber',
  housecall: 'Housecall Pro',
};

export default function SamanthaDemo() {
  const [scenarioId, setScenarioId] = useState('storm');
  const [step, setStep] = useState(0);
  const [crm, setCrm] = useState('ghl');
  const [slotsAvailable, setSlotsAvailable] = useState(true);

  const scenario = useMemo(
    () => scenarios.find((item) => item.id === scenarioId) || scenarios[0],
    [scenarioId],
  );

  useEffect(() => {
    document.title = 'Interactive Samantha AI-Agent Sales Demo | MidSize AI';
    const description = 'Explore how Samantha discovers business needs, assesses fit for MidSize AI agents, handles objections, and books a workflow review.';
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content = description;
    setStep(0);
  }, [scenarioId]);

  const visibleMessages = scenario.questions.slice(0, step + 1);
  const complete = step >= scenario.questions.length - 1;
  const schedulingAction =
    scenario.decision.includes('fit') && !reviewSlotsAvailable
      ? 'No review time is available now. Create a callback request instead of promising an appointment.'
      : scenario.action;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="border-b border-amber-400/20 bg-amber-400/10 px-6 py-2 text-center text-xs font-semibold text-amber-200">
        Interactive example using sample information — not a live sales conversation
      </div>

      <nav className="border-b border-slate-800 bg-slate-950/95 px-5 py-3">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <a href="/" className="rounded-lg bg-white px-2 py-1" aria-label="MidSize AI home">
            <img src="/midsize-ai-logo.webp" alt="MidSize AI" className="h-12 w-auto" />
          </a>
          <a href="https://apply.midsizeai.com/application?utm_source=midsizeai.com&utm_medium=demo&utm_campaign=samantha_demo" className="rounded-lg bg-amber-400 px-4 py-2 text-sm font-bold text-slate-950 hover:bg-amber-300">
            Request Free Workflow Review
          </a>
        </div>
      </nav>

      <main>
        <header className="px-6 py-14 text-center sm:py-20">
          <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-amber-400">Samantha workflow lab</p>
          <h1 className="mx-auto mt-4 max-w-4xl text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
            See how Samantha qualifies businesses that may need an AI agent.
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-400">
            Choose a prospect conversation. Then inspect the discovery questions, fit decision, CRM record, next step, and human handoff.
          </p>
        </header>

        <section className="mx-auto max-w-7xl px-6 pb-20">
          <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
            <aside className="space-y-5">
              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                <h2 className="text-sm font-bold uppercase tracking-wider text-white">1. Choose a prospect</h2>
                <div className="mt-4 space-y-2">
                  {scenarios.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setScenarioId(item.id)}
                      className={`w-full rounded-xl border p-4 text-left transition ${
                        scenarioId === item.id
                          ? 'border-amber-400 bg-amber-400/10'
                          : 'border-slate-800 bg-slate-950 hover:border-slate-600'
                      }`}
                    >
                      <span className="block font-bold text-white">{item.label}</span>
                      <span className="mt-1 block text-xs text-slate-500">{item.context}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                <h2 className="text-sm font-bold uppercase tracking-wider text-white">2. Company rules</h2>
                <label className="mt-4 block text-sm font-semibold text-slate-300">
                  CRM destination
                  <select value={crm} onChange={(event) => setCrm(event.target.value)} className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-3 text-white">
                    {Object.entries(crmLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                  </select>
                </label>
                <label className="mt-4 flex items-start gap-3 text-sm text-slate-300">
                  <input type="checkbox" checked={slotsAvailable} onChange={(event) => setSlotsAvailable(event.target.checked)} className="mt-1 h-4 w-4 accent-amber-400" />
                  Workflow-review appointments are available
                </label>
              </div>
            </aside>

            <div className="space-y-6">
              <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6 sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-amber-400">Sample sales conversation</p>
                    <h2 className="mt-2 text-2xl font-extrabold text-white">{scenario.label}</h2>
                  </div>
                  <button type="button" onClick={() => setStep(0)} className="text-sm font-bold text-slate-400 hover:text-white">Restart</button>
                </div>

                <div className="mt-7 rounded-xl border border-slate-800 bg-slate-950 p-4 text-sm leading-6 text-slate-300">
                  <strong className="text-white">Prospect:</strong> “{scenario.homeowner}”
                </div>

                <div aria-live="polite" className="mt-4 space-y-3">
                  {visibleMessages.map(([speaker, message], index) => (
                    <div key={`${speaker}-${index}`} className={`rounded-xl border p-4 text-sm leading-6 ${
                      speaker === 'Samantha'
                        ? 'border-amber-400/25 bg-amber-400/10 text-amber-100'
                        : 'border-slate-800 bg-slate-950 text-slate-300'
                    }`}>
                      <strong className={speaker === 'Samantha' ? 'text-amber-300' : 'text-white'}>{speaker}:</strong> “{message}”
                    </div>
                  ))}
                </div>

                {!complete && (
                  <button type="button" onClick={() => setStep((value) => Math.min(value + 1, scenario.questions.length - 1))} className="mt-6 w-full rounded-xl bg-amber-400 px-6 py-4 font-bold text-slate-950 hover:bg-amber-300 sm:w-auto">
                    Continue conversation →
                  </button>
                )}
              </section>

              {complete && (
                <section className="grid gap-5 md:grid-cols-2">
                  <article className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
                    <p className="text-xs font-bold uppercase tracking-wider text-amber-400">Captured for {crmLabels[crm]}</p>
                    <ul className="mt-4 space-y-3 text-sm text-slate-300">
                      {scenario.fields.map((field) => <li key={field} className="flex gap-3"><span className="text-emerald-400">✓</span>{field}</li>)}
                    </ul>
                  </article>
                  <article className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
                    <p className="text-xs font-bold uppercase tracking-wider text-amber-400">Workflow result</p>
                    <h3 className="mt-3 text-xl font-bold text-white">{scenario.decision}</h3>
                    <p className="mt-4 text-sm leading-6 text-slate-300"><strong className="text-white">System action:</strong> {schedulingAction}</p>
                    <p className="mt-3 text-sm leading-6 text-slate-400"><strong className="text-white">Human handoff:</strong> {scenario.handoff}</p>
                  </article>
                  <article className="rounded-2xl border border-blue-400/20 bg-blue-400/10 p-6 md:col-span-2">
                    <h3 className="text-lg font-bold text-white">What this demonstration proves—and what it does not</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-300">
                      It demonstrates an approved decision path. It demonstrates an approved sales-discovery path. A real Samantha deployment still requires MidSize AI’s qualification criteria, claims boundaries, pricing rules, calendar permissions, CRM fields, escalation contacts, and test calls.
                    </p>
                    <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                      <a href="/missed-lead-calculator" className="rounded-xl border border-slate-600 px-5 py-3 text-center text-sm font-bold text-white hover:bg-slate-800">Calculate missed-lead opportunity</a>
                      <a href="https://apply.midsizeai.com/application?utm_source=midsizeai.com&utm_medium=demo_result&utm_campaign=samantha_demo" className="rounded-xl bg-amber-400 px-5 py-3 text-center text-sm font-bold text-slate-950 hover:bg-amber-300">Map my real workflow</a>
                    </div>
                  </article>
                </section>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
