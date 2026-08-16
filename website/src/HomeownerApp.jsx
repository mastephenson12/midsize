import React from 'react';

const resources = [
  {
    title: 'Roof Cost Estimator',
    description: 'Get a realistic starting range before you talk with a contractor so you can ask better questions and spot estimates that deserve a closer look.',
    href: 'https://estimator.midsizeai.com',
    cta: 'Estimate My Roof Cost',
  },
  {
    title: 'Repair or Replace?',
    description: 'Use age, leak history, visible damage, material type, and the size of the problem to decide which conversation you should have first.',
    href: '#repair-or-replace',
    cta: 'See the Decision Guide',
  },
  {
    title: 'Compare Roofing Estimates',
    description: 'Compare scope, materials, ventilation, flashing, underlayment, warranties, cleanup, permits, and exclusions instead of comparing price alone.',
    href: '#compare-estimates',
    cta: 'Use the Checklist',
  },
  {
    title: 'Questions to Ask a Roofer',
    description: 'A practical list of questions that helps you understand who is doing the work, what is included, what can change the price, and what happens if something goes wrong.',
    href: '#questions',
    cta: 'View the Questions',
  },
];

const questions = [
  'How long have you worked in this area?',
  'Who will supervise the job on site?',
  'What exactly is included in this estimate?',
  'What could cause the final price to change?',
  'How are decking problems handled if they are found?',
  'What underlayment, flashing, and ventilation are included?',
  'What manufacturer and workmanship warranties apply?',
  'How will landscaping, driveways, and cleanup be protected?',
];

const compareItems = [
  'Roofing material and manufacturer',
  'Removal and disposal of existing roofing',
  'Underlayment type',
  'Flashing and penetrations',
  'Ventilation work',
  'Decking replacement terms',
  'Permits and code requirements',
  'Cleanup and magnet sweep',
  'Workmanship warranty',
  'Manufacturer warranty eligibility',
  'Payment schedule',
  'Explicit exclusions',
];

export default function HomeownerApp() {
  return (
    <div className="min-h-screen bg-stone-50 text-slate-900">
      <div className="border-b border-amber-200 bg-amber-50 px-4 py-2 text-center text-xs font-semibold text-amber-900">
        Independent homeowner education from MidSize AI. Start with information, not a sales pitch.
      </div>

      <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <a href="/" className="flex items-center gap-3" aria-label="MidSize AI Homeowner Resources home">
            <img src="/midsize-ai-logo.webp" alt="MidSize AI" className="h-12 w-auto" />
            <div className="hidden sm:block">
              <div className="text-sm font-extrabold text-slate-950">Homeowner Resources</div>
              <div className="text-xs text-slate-500">Roofing first. More home services coming.</div>
            </div>
          </a>
          <a
            href="https://estimator.midsizeai.com"
            className="rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-slate-800"
          >
            Estimate Roof Cost
          </a>
        </div>
      </nav>

      <header className="mx-auto max-w-5xl px-6 pb-14 pt-16 text-center sm:pt-20">
        <p className="mb-4 text-xs font-extrabold uppercase tracking-[0.22em] text-amber-700">Understand the job before you hire for it</p>
        <h1 className="text-4xl font-black tracking-tight text-slate-950 sm:text-6xl">
          Make a Better Roofing Decision Without Becoming a Roofer
        </h1>
        <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">
          Plain-English tools and checklists for homeowners who want to understand roof costs, compare estimates, ask useful questions, and avoid expensive surprises.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href="https://estimator.midsizeai.com"
            className="rounded-xl bg-amber-400 px-7 py-4 font-extrabold text-slate-950 transition hover:bg-amber-300"
          >
            Start With the Roof Cost Estimator
          </a>
          <a
            href="#resources"
            className="rounded-xl border border-slate-300 bg-white px-7 py-4 font-bold text-slate-900 transition hover:bg-slate-100"
          >
            Browse Homeowner Guides
          </a>
        </div>
        <div className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-x-5 gap-y-2 text-sm font-semibold text-slate-500">
          <span>✓ No contractor required</span>
          <span>✓ No jargon-heavy explanations</span>
          <span>✓ Built to help you compare options</span>
        </div>
      </header>

      <section id="resources" className="border-y border-slate-200 bg-white px-6 py-14">
        <div className="mx-auto max-w-6xl">
          <div className="mb-9 max-w-2xl">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-amber-700">Start here</p>
            <h2 className="mt-2 text-3xl font-black text-slate-950">Four things to understand before signing a roofing contract</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {resources.map((resource) => (
              <article key={resource.title} className="rounded-2xl border border-slate-200 bg-stone-50 p-7 shadow-sm">
                <h3 className="text-xl font-extrabold text-slate-950">{resource.title}</h3>
                <p className="mt-3 leading-relaxed text-slate-600">{resource.description}</p>
                <a href={resource.href} className="mt-5 inline-block font-extrabold text-amber-800 hover:text-amber-950">
                  {resource.cta} →
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="repair-or-replace" className="px-6 py-16">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-amber-700">Repair or replace?</p>
            <h2 className="mt-2 text-3xl font-black text-slate-950">Start with the size of the problem, not the size of the sales pitch</h2>
            <p className="mt-5 leading-relaxed text-slate-600">
              A leak does not automatically mean you need a new roof. A cheap repair also is not automatically the smartest move. The right conversation depends on roof age, material, repeated leaks, storm damage, decking condition, and how widespread the failure is.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
            <h3 className="font-extrabold text-slate-950">Ask for evidence of:</h3>
            <ul className="mt-4 space-y-3 text-slate-700">
              <li>• Where water is entering and where it is showing up inside.</li>
              <li>• Whether the damage is isolated or repeated across the roof.</li>
              <li>• The condition of flashing, penetrations, valleys, and roof edges.</li>
              <li>• Whether prior repairs are failing.</li>
              <li>• Any decking damage that can be identified before tear-off.</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="compare-estimates" className="bg-slate-950 px-6 py-16 text-white">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-amber-400">Estimate comparison checklist</p>
            <h2 className="mt-2 text-3xl font-black sm:text-4xl">A lower number is not a lower price if half the job is missing</h2>
            <p className="mt-4 leading-relaxed text-slate-300">
              Put competing estimates side by side and make sure you are comparing the same scope. Humans remain strangely committed to comparing two completely different objects because both documents have a dollar sign at the bottom.
            </p>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {compareItems.map((item) => (
              <div key={item} className="rounded-xl border border-slate-800 bg-slate-900 p-4 text-sm font-semibold text-slate-200">
                ✓ {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="questions" className="bg-white px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-amber-700">Before you hire</p>
              <h2 className="mt-2 text-3xl font-black text-slate-950">Questions worth asking a roofer</h2>
              <p className="mt-4 leading-relaxed text-slate-600">
                You do not need to interrogate someone for three hours. You do need enough information to understand who is responsible, what is included, and what happens when the roof underneath is not as tidy as everyone hoped.
              </p>
            </div>
            <ol className="grid gap-3 sm:grid-cols-2">
              {questions.map((question, index) => (
                <li key={question} className="rounded-xl border border-slate-200 bg-stone-50 p-5 font-semibold text-slate-800">
                  <span className="mr-2 text-amber-700">{index + 1}.</span>{question}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-amber-50 px-6 py-14">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-black text-slate-950">Know your ballpark before the estimates arrive</h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            The estimator is meant to give you a planning range, not replace an on-site inspection. Use it to prepare for contractor conversations and understand which variables move the price.
          </p>
          <a
            href="https://estimator.midsizeai.com"
            className="mt-7 inline-block rounded-xl bg-slate-950 px-7 py-4 font-extrabold text-white transition hover:bg-slate-800"
          >
            Open the Roof Cost Estimator
          </a>
        </div>
      </section>

      <footer className="bg-slate-950 px-6 py-10 text-center text-sm text-slate-400">
        <p className="font-semibold text-slate-200">MidSize AI Homeowner Resources</p>
        <p className="mx-auto mt-2 max-w-2xl">
          Educational information only. Actual roofing conditions, code requirements, materials, labor, insurance, and pricing vary by property and location.
        </p>
      </footer>
    </div>
  );
}
