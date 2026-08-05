export default function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto">
        <div className="text-2xl font-black tracking-wider text-cyan-400">
          MIDSIZE<span className="text-white">AI</span>
        </div>
        <div className="space-x-6 hidden md:flex text-slate-300">
          <a href="#features" className="hover:text-white transition">Features</a>
          <a href="#podcast" className="hover:text-white transition text-yellow-400 font-semibold">
            🎙️ Honest Roofer Podcast
          </a>
        </div>
        <a 
          href="tel:7252571810" 
          className="bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-bold px-5 py-2 rounded-lg transition shadow-lg shadow-cyan-500/20"
        >
          Call Samantha Demo
        </a>
      </nav>

      {/* Hero Section */}
      <header className="max-w-5xl mx-auto text-center py-20 px-4">
        <span className="bg-slate-800 text-cyan-400 text-sm font-bold px-4 py-1.5 rounded-full uppercase tracking-widest border border-slate-700">
          Built Exclusively for Home Services
        </span>
        <h1 className="text-5xl md:text-7xl font-extrabold mt-6 tracking-tight leading-tight">
          Stop Losing Jobs Because You're <span className="text-cyan-400">On A Roof.</span>
        </h1>
        <p className="text-xl text-slate-400 mt-6 max-w-2xl mx-auto">
          MidsizeAI deploys automated receptionists and hyper-local marketing review systems that capture leads, qualify them, and book appointments 24/7.
        </p>

        {/* Live Call Action Box */}
        <div className="mt-10 max-w-md mx-auto bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-2xl">
          <p className="text-sm uppercase tracking-wider text-slate-400 font-semibold">Test the AI Receptionist Right Now</p>
          <a href="tel:7252571810" className="block text-3xl font-black text-cyan-400 my-3 hover:underline">
            725-257-1810
          </a>
          <p className="text-xs text-slate-500">Call from your cell. See how Samantha qualifies your trade business.</p>
        </div>
      </header>

      {/* The Podcast Integration & GHL Form Section */}
      <section id="podcast" className="bg-slate-950 border-t border-slate-800 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-amber-400 text-4xl mb-4">🎙️</div>
          <h2 className="text-3xl md:text-4xl font-bold">The Honest Roofer Podcast Ecosystem</h2>
          <p className="text-slate-400 mt-4 max-w-xl mx-auto">
            We don't just build tech; we champion the pros who do good work. Our community is built to expose storm chasers and help honest contractors dominate their local markets.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 mt-12 text-left">
            {/* Embedded GoHighLevel Guest Form */}
            <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
              <h3 className="text-xl font-bold text-white mb-2">Are you a Roofer?</h3>
              <p className="text-slate-400 text-sm mb-4">
                Apply to be featured on the podcast, clean up the trade's reputation, and test our GHL snapshot built for missed call text-back.
              </p>
              
              {/* GoHighLevel Form Embed */}
              <div className="w-full overflow-hidden rounded-lg min-h-[400px]">
                <iframe
                  src="https://link.midsizeai.com/widget/form/YOUR_GHL_FORM_ID"
                  className="w-full h-[450px] border-none"
                  id="ghl-podcast-form"
                  title="Podcast Guest Application"
                ></iframe>
              </div>
            </div>

            {/* Homeowner Magnet */}
            <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Are you a Homeowner?</h3>
                <p className="text-slate-400 text-sm mb-4">
                  Learn how to spot roofing scams, verify local deductibles, and find a certified contractor using our vetted network.
                </p>
              </div>
              <a href="#newsletter" className="inline-block bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-4 py-3 rounded-lg text-center transition">
                Download the Scam Guide →
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
