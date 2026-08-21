import React, { useEffect, useMemo, useState } from 'react';

const scenarios = [
  {
    id: 'storm',
    label: 'Storm-damage inspection',
    context: 'After-hours · New homeowner lead',
    homeowner: 'We had hail last night and I can see shingles in the yard. Can someone inspect the roof?',
    questions: [
      ['Samantha', 'I can help collect the details for the roofing team. Is anyone in immediate danger, and is water entering near electrical fixtures?'],
      ['Homeowner', 'No immediate danger. There is a small ceiling stain in the hallway.'],
      ['Samantha', 'Thank you. What is the property address, your best callback number, and whether you own the property?'],
      ['Homeowner', '1248 Oak Street. I own it, and this number is best.'],
      ['Samantha', 'The property is inside the service area. I can request the next available storm inspection. Would tomorrow between 10 and noon work?'],
    ],
    fields: ['Name and callback number', 'Property address', 'Property ownership', 'Storm date and visible symptoms', 'Immediate-danger screening', 'Preferred inspection window'],
    decision: 'Qualified inspection request',
    action: 'Hold tomorrow, 10:00 AM–12:00 PM and notify the on-call coordinator.',
    handoff: 'Human confirms the appointment, urgency, and any temporary mitigation advice.',
  },
  {
    id: 'leak',
    label: 'Active roof leak',
    context: 'Business hours · Safety-sensitive',
    homeowner: 'Water is dripping through the ceiling near a light. What should I do?',
    questions: [
      ['Samantha', 'Please keep people away from the wet area. Because water is near electricity, I will not provide repair instructions. If there is sparking, smoke, fire, or immediate danger, call emergency services.'],
      ['Homeowner', 'There is no smoke or sparking, but the light is wet.'],
      ['Samantha', 'I am marking this for urgent human review. What is the property address and safest callback number?'],
      ['Homeowner', '88 Pine Avenue, and this number is correct.'],
      ['Samantha', 'Thank you. I am sending this to the roofing team now. Please avoid the affected area while you wait for their call.'],
    ],
    fields: ['Callback number', 'Property address', 'Leak location', 'Electrical/fire danger screen', 'Occupant safety status'],
    decision: 'Urgent human escalation',
    action: 'Do not schedule automatically. Alert the designated human immediately.',
    handoff: 'A trained person assesses urgency and gives company-approved next steps.',
  },
  {
    id: 'warranty',
    label: 'Existing-customer warranty call',
    context: 'Business hours · Service request',
    homeowner: 'Your company replaced my roof last year and I found a stain after the rain.',
    questions: [
      ['Samantha', 'I can create a service request for the team. May I have the property address and the name on the original project?'],
      ['Homeowner', 'The project was under Jordan Lee at 450 Mesa Drive.'],
      ['Samantha', 'Thank you. When did you first notice the stain, and is water actively entering now?'],
      ['Homeowner', 'I noticed it this morning. It is not dripping now.'],
      ['Samantha', 'I have recorded the details for warranty review. A team member will verify the project record and contact you before scheduling.'],
    ],
    fields: ['Customer name', 'Project address', 'Original-job lookup', 'Symptom and timing', 'Active-leak status', 'Photos requested by follow-up'],
    decision: 'Existing-customer service review',
    action: 'Create a warranty-review task without promising coverage.',
    handoff: 'Human verifies warranty terms and contacts the customer.',
  },
  {
    id: 'outside',
    label: 'Outside the service area',
    context: 'New lead · Not eligible',
    homeowner: 'I need a roof estimate for a property about 90 miles away.',
    questions: [
      ['Samantha', 'I can check whether the property is in the company’s service area. What is the ZIP code?'],
      ['Homeowner', 'The ZIP code is 85901.'],
      ['Samantha', 'That ZIP code is outside the approved service area. I do not want to promise an appointment the team cannot keep.'],
      ['Homeowner', 'Can you recommend someone else?'],
      ['Samantha', 'I can record your request, but I can only share referral options specifically approved by the company.'],
    ],
    fields: ['Name and callback number', 'Property ZIP code', 'Requested service', 'Permission to retain inquiry'],
    decision: 'Not qualified: outside service area',
    action: 'Do not book. Use only an approved referral or polite decline.',
    handoff: 'Optional review if the company handles exceptions.',
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
    document.title = 'Interactive Samantha Roofing Call Demo | MidSize AI';
    const description = 'Explore a clearly labeled sample of how Samantha could intake, qualify, schedule, or escalate common roofing calls.';
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
    scenario.id === 'storm' && !slotsAvailable
      ? 'No approved slot is available. Create a priority callback task instead of promising a time.'
      : scenario.action;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="border-b border-amber-400/20 bg-amber-400/10 px-6 py-2 text-center text-xs font-semibold text-amber-200">
        Interactive example using sample information — not a live customer call
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
            See how a roofing call moves from first ring to the right next step.
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-400">
            Choose a common call. Then inspect the conversation, captured information, decision, CRM result, and human handoff.
          </p>
        </header>

        <section className="mx-auto max-w-7xl px-6 pb-20">
          <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
            <aside className="space-y-5">
              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                <h2 className="text-sm font-bold uppercase tracking-wider text-white">1. Choose a call</h2>
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
                  Approved inspection slots are available
                </label>
              </div>
            </aside>

            <div className="space-y-6">
              <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6 sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-amber-400">Sample call</p>
                    <h2 className="mt-2 text-2xl font-extrabold text-white">{scenario.label}</h2>
                  </div>
                  <button type="button" onClick={() => setStep(0)} className="text-sm font-bold text-slate-400 hover:text-white">Restart</button>
                </div>

                <div className="mt-7 rounded-xl border border-slate-800 bg-slate-950 p-4 text-sm leading-6 text-slate-300">
                  <strong className="text-white">Homeowner:</strong> “{scenario.homeowner}”
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
                    Continue call →
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
                      It demonstrates an approved decision path. A real implementation still requires your service area, call-recording rules, emergency language, calendar permissions, CRM fields, escalation contacts, and test calls.
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
