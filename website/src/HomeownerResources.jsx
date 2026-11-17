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
    title: 'Roofing Estimate Evaluator',
    description: 'Read quoted scope details, spot wording to clarify, and save questions for your roofer. Free results without an email gate.',
    href: '/estimate-decoder/',
    cta: 'Evaluate My Estimate',
  },
  {
    label: 'Free Decision Tool',
    title: 'Repair or Replace?',
    description: 'Answer a few questions about roof age, leak history, visible damage, and prior repairs to get an educational starting point before agreeing to expensive work.',
    href: 'https://homeowner.midsizeai.com/roofing/repair-or-replace/',
    cta: 'Check My Roof Situation',
  },
  {
    label: 'Free Triage Tool',
    title: 'Roof Leak Triage',
    description: 'Sort active leaks, ceiling concerns, recurring water issues, and storm timing into safer next steps and better details to share with a roofer.',
    href: 'https://homeowner.midsizeai.com/roofing/leak-triage/',
    cta: 'Triage My Roof Leak',
  },
  {
    label: 'Free Photo Checklist',
    title: 'Storm Damage Photo Checklist',
    description: 'Document hail, wind, rain, interior water, and exterior clues safely from the ground before calling a roofer or opening a claim.',
    href: 'https://homeowner.midsizeai.com/roofing/storm-damage-photo-checklist/',
    cta: 'Build My Photo Checklist',
  },
  {
    label: 'New HVAC Tool',
    title: "Why Isn't My AC Cooling?",
    description: 'Answer seven safety-first questions to separate a thermostat or airflow check from symptoms that deserve an HVAC professional.',
    href: 'https://homeowner.midsizeai.com/hvac/not-cooling/',
    cta: 'Check My AC Symptoms',
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
          <h2 className="mt-3 text-3xl font-extrabold text-white sm:text-5xl">Understand the problem before you approve the work.</h2>
          <p className="mt-5 text-base leading-7 text-slate-400 sm:text-lg">
            MidSize AI builds systems for home-service businesses, but better home services also require better-informed homeowners. These free resources help people understand roofing and HVAC decisions before they sign, schedule, or spend.
          </p>
        </div>

        <article className="mb-8 grid gap-6 rounded-3xl border border-amber-400/40 bg-gradient-to-br from-amber-400/15 via-slate-900 to-slate-900 p-7 sm:p-9 lg:grid-cols-[1.35fr_0.65fr] lg:items-center" aria-labelledby="compare-roofing-feature-title">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400">Featured free homeowner tool</p>
            <h3 id="compare-roofing-feature-title" className="mt-3 text-2xl font-extrabold text-white sm:text-3xl">Two roof quotes. Different prices. What are you actually getting?</h3>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">Compare the work behind the numbers with our side-by-side worksheet for two or three roofing proposals. Review materials, decking, flashing, warranties, payments, and exclusions, then prepare questions to send each roofer.</p>
            <p className="mt-3 text-sm text-slate-400">No signup or email gate. Your notes stay in your browser while the page is open. Download or print a copy before leaving.</p>
            <a
              href="/compare-roofing-estimates/?utm_source=midsizeai&utm_medium=homeowner_tools&utm_campaign=estimate_clarity&utm_content=featured_comparison"
              onClick={() => {
                if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
                  window.gtag('event', 'compare_estimates_click', { source_page: 'homeowner_tools', placement: 'featured_comparison' });
                }
              }}
              className="mt-6 inline-flex min-h-12 items-center justify-center rounded-xl bg-amber-400 px-7 py-3 font-bold text-slate-950 transition hover:bg-amber-300"
            >
              Compare My Roofing Quotes &rarr;
            </a>
          </div>
          <figure className="overflow-hidden rounded-2xl border border-slate-700 bg-slate-950/70">
            <a href="/compare-roofing-estimates/?utm_source=midsizeai&utm_medium=homeowner_tools&utm_campaign=estimate_clarity&utm_content=sample_comparison_graphic" aria-label="Open the free roofing comparison worksheet">
              <img
                src="/roofing-quote-comparison-example.svg"
                width="1200"
                height="680"
                loading="lazy"
                className="block h-auto w-full"
                alt="Example: a $12,900 roof quote mentions shingles and a 10-year workmanship warranty, while a $16,400 quote lists decking repairs, flashing, vents, and an exclusion. Compare the actual work, not just price."
              />
            </a>
            <figcaption className="px-4 py-3 text-xs leading-relaxed text-slate-400">
              Illustrative examples, not real contractor bids. Open the free worksheet to compare your own proposals. A blank item is a question, not proof that work is excluded.
            </figcaption>
          </figure>
        </article>

        <section aria-labelledby="roof-parts-heading" className="mb-10 overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/70">
          <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <figure>
              <img
                src="/roof-components-explained.svg"
                alt="Simplified roof cutaway identifying roof covering, water-resistant underlayment over structural decking, flashing at joints, and a ridge ventilation detail. Actual roof systems vary."
                width="1200"
                height="700"
                loading="lazy"
                className="block h-auto w-full rounded-xl"
              />
              <figcaption className="mt-2 text-xs text-slate-400">Illustrative diagram only. Construction details vary by roof type, climate, and local codes.</figcaption>
            </figure>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400">Roofing terms explained</p>
              <h3 id="roof-parts-heading" className="mt-3 text-2xl font-extrabold text-white sm:text-3xl">Know what's under the shingles.</h3>
              <dl className="mt-5 space-y-3 text-sm leading-6 text-slate-300">
                <div><dt className="font-bold text-white">Decking</dt><dd>The wood panels supporting the roof assembly. Ask how damaged panels are priced.</dd></div>
                <div><dt className="font-bold text-white">Underlayment</dt><dd>A water-resistant layer under the roof covering. Ask which type and where it goes.</dd></div>
                <div><dt className="font-bold text-white">Flashing</dt><dd>Metal or other details that direct water away from joints, penetrations, and transitions.</dd></div>
                <div><dt className="font-bold text-white">Ventilation</dt><dd>An attic air-movement system that may include intake and exhaust vents. Ask what changes are proposed.</dd></div>
              </dl>
              <a href="/compare-roofing-estimates/?utm_source=midsizeai&utm_medium=roof_parts_education&utm_campaign=estimate_clarity"
                 className="mt-6 inline-flex items-center justify-center rounded-xl bg-amber-400 px-6 py-3 font-bold text-slate-950 hover:bg-amber-300">Compare these details in my quotes &rarr;</a>
            </div>
          </div>
        </section>

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
