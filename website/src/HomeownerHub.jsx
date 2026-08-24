const helpPaths = [
  {
    eyebrow: 'Start here',
    title: 'My roof is leaking',
    description: 'Take the right first steps, protect the inside of your home, and know what information to collect before calling a professional.',
    href: '#leak-help',
    action: 'See the first steps',
    accent: 'border-rose-200 bg-rose-50',
  },
  {
    eyebrow: 'Plan ahead',
    title: 'What might a new roof cost?',
    description: 'Build a private educational low-to-high replacement range in about two minutes. No email or contractor call required.',
    href: 'https://estimator.midsizeai.com/',
    action: 'Use the free estimator',
    accent: 'border-amber-200 bg-amber-50',
  },
  {
    eyebrow: 'Make a decision',
    title: 'Repair or replace?',
    description: 'Learn which questions can help you discuss roof age, damage, recurring leaks, materials, and long-term cost with a roofer.',
    href: '#coming-next',
    action: 'See what we are building',
    accent: 'border-sky-200 bg-sky-50',
  },
  {
    eyebrow: 'Compare clearly',
    title: 'I have roofing estimates',
    description: 'Compare scope, materials, warranties, exclusions, payment terms, and other details before you sign an agreement.',
    href: '#coming-next',
    action: 'Preview the toolkit',
    accent: 'border-emerald-200 bg-emerald-50',
  },
  {
    eyebrow: 'Hire carefully',
    title: 'How do I choose a roofer?',
    description: 'Use practical questions to evaluate licensing, insurance, workmanship, communication, and what happens if something goes wrong.',
    href: '#coming-next',
    action: 'Get the question list',
    accent: 'border-violet-200 bg-violet-50',
  },
  {
    eyebrow: 'Learn first',
    title: 'Watch honest conversations',
    description: 'Hear experienced roofing professionals explain materials, repairs, coatings, estimates, and the decisions homeowners face.',
    href: '#podcast',
    action: 'Watch the podcast',
    accent: 'border-orange-200 bg-orange-50',
  },
]

function ArrowIcon() {
  return <span aria-hidden="true">→</span>
}

export default function HomeownerHub() {
  return (
    <main className="min-h-screen bg-[#f7f3ea] text-slate-900">
      <header className="border-b border-slate-900/10 bg-[#f7f3ea]/95">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-5 px-5 py-4 sm:px-8">
          <a href="/" className="group flex items-center gap-3" aria-label="The Honest Roofer home">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-[#d95d39] text-lg font-black text-white">HR</span>
            <span>
              <strong className="block font-serif text-lg leading-none">The Honest Roofer</strong>
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">Homeowner Help Center</span>
            </span>
          </a>
          <a href="#podcast" className="hidden rounded-full border border-slate-900/20 px-4 py-2 text-sm font-bold transition hover:border-slate-900 hover:bg-white sm:inline-flex">
            Watch the podcast
          </a>
        </div>
      </header>

      <section className="relative overflow-hidden border-b border-slate-900/10">
        <div className="absolute -right-28 top-12 h-80 w-80 rounded-full bg-[#f4b860]/30 blur-3xl" />
        <div className="absolute -left-28 bottom-0 h-72 w-72 rounded-full bg-[#4f8f8b]/20 blur-3xl" />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
          <div>
            <p className="mb-5 text-sm font-black uppercase tracking-[0.2em] text-[#b94728]">No pressure. No confusing roofing jargon.</p>
            <h1 className="max-w-4xl font-serif text-5xl font-black leading-[.98] tracking-tight sm:text-6xl lg:text-7xl">
              Get honest answers about your roof <span className="text-[#b94728]">before you hire anyone.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700 sm:text-xl">
              Understand your options, explore possible costs, compare contractors, and learn which questions to ask before making an expensive decision about your home.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#help" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#d95d39] px-6 py-3 font-black text-white shadow-lg shadow-orange-950/10 transition hover:-translate-y-0.5 hover:bg-[#bd4728]">
                Tell us what you need help with <ArrowIcon />
              </a>
              <a href="https://estimator.midsizeai.com/" className="inline-flex min-h-12 items-center justify-center rounded-full border border-slate-900/20 bg-white/70 px-6 py-3 font-bold transition hover:border-slate-900">
                Estimate a roof replacement
              </a>
            </div>
            <p className="mt-4 text-sm text-slate-600">Educational resources only. A qualified roofing professional must inspect your property to diagnose damage or provide a binding quote.</p>
          </div>

          <div className="rounded-[2rem] border border-slate-900/10 bg-slate-950 p-3 shadow-2xl shadow-slate-900/20">
            <div className="overflow-hidden rounded-[1.4rem] bg-black">
              <img
                src="https://i.ytimg.com/vi/iC71wRDCF4A/maxresdefault.jpg"
                alt="The Honest Roofer Podcast conversation with a roofing professional"
                className="aspect-video w-full object-cover"
              />
            </div>
            <div className="p-5 text-white">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-orange-300">Real roofers. Homeowner questions.</p>
              <h2 className="mt-2 font-serif text-2xl font-bold">Where roofs get real.</h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">Conversations designed to help you understand the recommendation—not pressure you into one.</p>
              <a href="https://www.youtube.com/watch?v=iC71wRDCF4A" className="mt-4 inline-flex items-center gap-2 text-sm font-black text-orange-300 hover:text-orange-200">
                Watch an episode <ArrowIcon />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="help" className="mx-auto max-w-6xl scroll-mt-8 px-5 py-16 sm:px-8 sm:py-24">
        <div className="max-w-3xl">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-[#b94728]">Start with your situation</p>
          <h2 className="mt-3 font-serif text-4xl font-black tracking-tight sm:text-5xl">What do you need help with?</h2>
          <p className="mt-4 text-lg leading-8 text-slate-700">You do not need to know the roofing terminology. Choose the statement that sounds most like what is happening at your home.</p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {helpPaths.map((item) => (
            <a key={item.title} href={item.href} className={`group flex min-h-72 flex-col rounded-[1.6rem] border p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl ${item.accent}`}>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-600">{item.eyebrow}</p>
              <h3 className="mt-4 font-serif text-3xl font-black leading-tight">{item.title}</h3>
              <p className="mt-4 leading-7 text-slate-700">{item.description}</p>
              <span className="mt-auto flex items-center justify-between pt-6 text-sm font-black">
                {item.action}<ArrowIcon />
              </span>
            </a>
          ))}
        </div>
      </section>

      <section id="leak-help" className="border-y border-rose-900/15 bg-[#fff8f3]">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 sm:px-8 lg:grid-cols-[.75fr_1.25fr] lg:items-start">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-rose-700">If water is entering now</p>
            <h2 className="mt-3 font-serif text-4xl font-black">Protect people first.</h2>
            <p className="mt-4 leading-7 text-slate-700">Do not climb onto a wet, storm-damaged, or unfamiliar roof. Conditions can change quickly, and damage may not be visible from the ground.</p>
          </div>
          <ol className="grid gap-4 sm:grid-cols-2">
            {[
              ['Avoid electrical hazards', 'Stay away from wet fixtures, outlets, wiring, and sagging ceilings. If safety is uncertain, leave the area and contact emergency help or your utility.'],
              ['Limit interior damage safely', 'Move people and valuables away. Use containers or plastic sheeting only when you can do so without entering an unsafe area.'],
              ['Document what you can see', 'Take photos and short videos from safe locations. Note when the leak began and what weather or event occurred.'],
              ['Call a qualified professional', 'Describe active water, ceiling movement, electrical concerns, and any visible storm damage so the situation can be prioritized appropriately.'],
            ].map(([title, copy], index) => (
              <li key={title} className="rounded-2xl border border-rose-900/10 bg-white p-5">
                <span className="mb-3 grid h-8 w-8 place-items-center rounded-full bg-rose-100 text-sm font-black text-rose-800">{index + 1}</span>
                <h3 className="font-bold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{copy}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="podcast" className="mx-auto grid max-w-6xl gap-8 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.18em] text-[#b94728]">The Honest Roofer Podcast</p>
          <h2 className="mt-3 font-serif text-4xl font-black tracking-tight sm:text-5xl">The questions homeowners are often afraid to ask.</h2>
          <p className="mt-5 text-lg leading-8 text-slate-700">We invite experienced roofing professionals to explain how roofing decisions are actually made: what can be repaired, what should be replaced, how bids differ, and which details deserve a closer look.</p>
          <a href="https://www.facebook.com/1067900579738606/" className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-full bg-slate-950 px-6 py-3 font-black text-white hover:bg-slate-800">
            Follow The Honest Roofer <ArrowIcon />
          </a>
        </div>
        <div id="coming-next" className="rounded-[2rem] bg-[#234441] p-7 text-white sm:p-9">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-emerald-200">Coming next</p>
          <h3 className="mt-3 font-serif text-3xl font-black">The Honest Roofer Homeowner Toolkit</h3>
          <ul className="mt-6 space-y-3 text-emerald-50">
            {['Roofing estimate comparison sheet', 'Questions to ask before hiring a roofer', 'Repair-or-replace discussion guide', 'Warranty comparison worksheet', 'Roofing red-flags checklist'].map((item) => (
              <li key={item} className="flex gap-3"><span className="font-black text-orange-300">✓</span><span>{item}</span></li>
            ))}
          </ul>
          <p className="mt-6 text-sm leading-6 text-emerald-100">We are building these resources carefully. For now, start with the free estimator or follow the podcast for new homeowner guides.</p>
        </div>
      </section>

      <section className="bg-slate-950 text-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-12 sm:px-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-orange-300">For roofing professionals</p>
            <h2 className="mt-2 font-serif text-2xl font-black">Help homeowners make better roofing decisions.</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">Experienced roofers can apply to share their knowledge on The Honest Roofer Podcast. Appearing does not require purchasing a MidSizeAI service.</p>
          </div>
          <a href="https://roofers.midsizeai.com/" className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-[#d95d39] px-6 py-3 font-black hover:bg-[#bd4728]">
            Visit the roofer center <ArrowIcon />
          </a>
        </div>
      </section>

      <footer className="border-t border-slate-900/10 bg-[#f7f3ea]">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-8 text-sm text-slate-600 sm:px-8 md:flex-row md:items-center md:justify-between">
          <p><strong className="text-slate-900">The Honest Roofer Podcast</strong> · A homeowner education project powered by MidSizeAI.</p>
          <p>Educational information only—not an inspection, diagnosis, quote, or legal or insurance advice.</p>
        </div>
      </footer>
    </main>
  )
}
