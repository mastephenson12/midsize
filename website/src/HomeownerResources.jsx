import React from 'react';

const resources = [
  {
    label: 'Homeowner Library',
    title: 'The Honest Roofer',
    description: 'Straight answers about estimates, repairs, replacement, insurance questions, ventilation, and contractor red flags before you hire a roofer.',
    href: 'https://homeowner.midsizeai.com/',
    cta: 'Explore the Homeowner Library',
  },
  {
    label: 'Free Private Tool',
    title: 'Roofing Estimate Decoder',
    description: 'Paste a written roofing scope and turn it into plain-English questions about what appears covered, what may be missing, and what deserves clarification.',
    href: 'https://homeowner.midsizeai.com/estimate-decoder/',
    cta: 'Decode My Estimate',
  },
  {
    label: 'Free Decision Tool',
    title: 'Repair or Replace?',
    description: 'Answer a few questions about roof age, leak history, visible damage, and prior repairs to get an educational starting point before agreeing to expensive work.',
    href: 'https://homeowner.midsizeai.com/roofing/repair-or-replace/',
    cta: 'Check My Roof Situation',
  },
  {
    label: 'Free Cost Tool',
    title: 'Roof Replacement Estimator',
    description: 'Build a low-to-high educational roof replacement range based on square footage, pitch, and material choices before speaking with a salesperson.',
    href: 'https://estimator.midsizeai.com/',
    cta: 'Estimate My Roof Cost',
  },
  {
    label: 'Free Checklist',
    title: '10 Questions Before Hiring a Roofer',
    description: 'Use a practical pre-hire checklist to compare contractors, clarify the written scope, and slow down pressure decisions before signing.',
    href: 'https://homeowner.midsizeai.com/downloads/10-questions-before-hiring-a-roofer.pdf',
    cta: 'Open the Checklist',
  },
  {
    label: 'Homeowner Education',
    title: 'The Honest Roofer Podcast',
    description: 'Learn the language of roofing from contractors and industry guests so estimates, materials, warranties, and common sales claims are easier to evaluate.',
    href: 'https://homeowner.midsizeai.com/#podcast',
    cta: 'Explore the Podcast',
  },
];

export default function HomeownerResources() {
  return (
    <section id="homeowner-tools" className="border-t border-slate-900 bg-slate-950 px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400">Free tools for homeowners</p>
          <h2 className="mt-3 text-3xl font-extrabold text-white sm:text-5xl">Understand the roof before you buy the roof.</h2>
          <p className="mt-5 text-base leading-7 text-slate-400 sm:text-lg">
            MidSize AI builds systems for home-service businesses, but better home services also require better-informed homeowners. These free resources help people understand roofing decisions before they sign, schedule, or spend.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {resources.map((resource) => (
            <article key={resource.title} className="flex flex-col rounded-2xl border border-slate-800 bg-slate-900 p-7">
              <p className="text-xs font-bold uppercase tracking-widest text-amber-400">{resource.label}</p>
              <h3 className="mt-3 text-xl font-bold text-white">{resource.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-6 text-slate-400">{resource.description}</p>
              <a
                href={resource.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex font-bold text-amber-400 transition-colors hover:text-amber-300"
              >
                {resource.cta} &rarr;
              </a>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-5 rounded-2xl border border-amber-400/20 bg-amber-400/10 p-7 text-center sm:flex-row sm:text-left">
          <div>
            <h3 className="text-xl font-bold text-white">Why put homeowner tools on a contractor-AI site?</h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300">Because trust starts before the phone rings. Homeowners who understand scope, pricing questions, and contractor red flags are better prepared to have a productive conversation with a legitimate home-service company.</p>
          </div>
          <a href="https://homeowner.midsizeai.com/" target="_blank" rel="noopener noreferrer" className="whitespace-nowrap rounded-xl bg-white px-6 py-3 text-sm font-bold text-slate-950 hover:bg-slate-100">Visit The Honest Roofer</a>
        </div>
      </div>
    </section>
  );
}
