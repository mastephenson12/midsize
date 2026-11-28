import React from 'react';

const offers = [
  ['Calls go to voicemail while we’re on a roof.', 'MidSize FrontDesk™', 'From $349/month + $299 setup', 'Plan call intake, capture project details, and route the next step to your team. Agree on appointment rules and human handoff before launch.', '/services/ai-receptionist-for-roofers', 'Explore call coverage', '/resources/roofing-after-hours-call-script/', 'Read the free call script'],
  ['We send estimates. Then follow-up falls behind.', '14-Day Estimate Follow-Up Pilot', '$500 fixed fee · no automatic subscription', 'A tracker, three personalized message templates, kickoff, a midpoint check-in, and a closing review for one process. Your team sends the messages.', '/estimate-follow-up-pilot/', 'See the 14-day pilot', '/resources/estimate-follow-up/', 'Try the free follow-up tool'],
  ['Happy customers rarely leave us a review.', 'MidSize Reputation™', 'From $199/month + $149 setup', 'Build a repeatable process to request honest reviews, monitor feedback, and prepare responses your team can approve. Help homeowners evaluate your real work.', '/pricing/', 'See reputation service details', '/resources/#contractors', 'Browse free contractor resources'],
];

export default function RooferStart() {
  return <section id="roofer-start" aria-labelledby="roofer-start-title" className="scroll-mt-28 border-t border-slate-800 px-6 py-16">
    <div className="mx-auto max-w-6xl">
      <p className="text-sm font-bold text-amber-400">Start with the problem costing your team time</p>
      <h2 id="roofer-start-title" className="mt-3 text-3xl font-extrabold text-white sm:text-5xl">Where does your roofing business need help?</h2>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-300">Choose one process to improve first. Explore the scope, try a free resource, or ask Mark to help you choose.</p>
      <div className="mt-8 grid gap-5 lg:grid-cols-3">
        {offers.map(([title, name, price, description, href, cta, tool, toolLabel]) => <article key={name} className="flex flex-col rounded-3xl border border-slate-700 bg-slate-900 p-6 sm:p-7">
          <h3 className="text-2xl font-bold leading-snug text-white">{title}</h3>
          <p className="mt-5 font-bold text-amber-300">{name}</p>
          <p className="mt-2 text-base font-semibold text-white">{price}</p>
          <p className="mb-6 mt-4 leading-relaxed text-slate-300">{description}</p>
          <a href={href} className="mt-auto rounded-xl bg-amber-400 px-5 py-3 text-center font-bold text-slate-950 hover:bg-amber-300">{cta}</a>
          <a href={tool} className="mt-4 py-2 text-base font-semibold text-amber-300 underline underline-offset-4">{toolLabel}</a>
        </article>)}
      </div>
      <p className="mt-5 text-sm leading-relaxed text-slate-400">Starting rates in USD. Usage, integrations, and extra charges are defined in your written proposal. The pilot covers process setup and coaching; automated calling, texting, and custom integrations are outside its scope. <a href="/pricing/" className="text-amber-300 underline">Compare all services and pricing</a>.</p>
      <div className="mt-10 space-y-3">
        <h3 className="mb-4 text-2xl font-bold text-white">Before you choose</h3>
        {[
          ['Are you selling roofing leads?', 'These services focus on handling inquiries, following up on estimates, and building trust in your business. They do not include a supply of purchased roofing leads.'],
          ['Will this replace my office team?', 'We plan the workflow around your team. Your written scope defines what the system can handle, which questions go to a person, and who approves customer messages.'],
          ['Can I keep the software I already use?', 'Tell us which CRM, calendar, and phone system you use. We confirm compatibility and any integration costs before recommending a setup.'],
          ['What happens after I request a review?', 'We discuss your current process and the problem you want to solve. Before paid work starts, you receive a written scope with deliverables, fees, usage limits, responsibilities, and timing.'],
        ].map(([question, answer]) => <details key={question} className="rounded-xl border border-slate-700 bg-slate-900 p-5">
          <summary className="cursor-pointer text-lg font-semibold text-white">{question}</summary>
          <p className="mt-3 leading-relaxed text-slate-300">{answer}</p>
        </details>)}
      </div>
      <div className="mt-8 rounded-2xl border border-slate-700 p-6">
        <h3 className="text-xl font-bold text-white">Not sure which problem to tackle first?</h3>
        <p className="mt-2 text-slate-300">Request a free workflow review. We’ll look at your current process and discuss a focused next step. An inquiry does not buy or activate a service.</p>
        <a href="https://apply.midsizeai.com/application?utm_source=midsizeai.com&utm_medium=homepage&utm_campaign=roofer_workflow_review&utm_content=service_choices" className="mt-5 inline-flex rounded-xl bg-white px-6 py-3 font-bold text-slate-950 hover:bg-slate-100">Request My Free Workflow Review</a>
      </div>
    </div>
  </section>;
}
