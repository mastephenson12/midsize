import React from 'react';

export default function App() {
  const handleScrollToForm = () => {
    const formEl = document.getElementById('lead-form');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      {/* Header / Nav */}
      <nav className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-50 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-black tracking-tight text-white">
            MidSize<span className="text-amber-400">AI</span>
          </span>
          <span className="hidden sm:inline-block text-xs bg-amber-400/10 text-amber-400 border border-amber-400/20 px-2.5 py-1 rounded-full font-medium">
            The Honest Roofer Podcast
          </span>
        </div>
        <button
          onClick={handleScrollToForm}
          className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-5 py-2.5 rounded-lg text-sm transition-all shadow-md hover:shadow-amber-400/20"
        >
          Get Started
        </button>
      </nav>

      {/* Hero Section */}
      <header className="max-w-5xl mx-auto text-center px-6 pt-20 pb-16">
        <div className="inline-flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-full px-4 py-1.5 text-xs text-amber-400 font-semibold mb-8">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
          Powered by Samantha AI
        </div>
        
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight mb-6 text-white">
          Turn Missed Calls Into <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500">
            Booked Roofing Jobs
          </span>
        </h1>
        
        <p className="text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Samantha is the 24/7 AI receptionist built for contractors. She answers inbound calls, qualifies homeowners, and schedules estimates straight to your calendar.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={handleScrollToForm}
            className="w-full sm:w-auto bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-8 py-4 rounded-xl text-base transition-all shadow-lg hover:shadow-amber-400/20"
          >
            Test Samantha Live
          </button>
        </div>
      </header>

      {/* Value Pillars */}
      <section className="max-w-6xl mx-auto px-6 py-12 border-t border-slate-800/60">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl">
            <div className="w-12 h-12 bg-amber-400/10 border border-amber-400/20 rounded-xl flex items-center justify-center text-amber-400 text-xl font-bold mb-4">
              ⚡
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Instant Response</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Never let a lead call your competitor. Samantha picks up on the first ring, 24 hours a day, 365 days a year.
            </p>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl">
            <div className="w-12 h-12 bg-amber-400/10 border border-amber-400/20 rounded-xl flex items-center justify-center text-amber-400 text-xl font-bold mb-4">
              🎯
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Smart Lead Qualification</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Samantha collects project scope, roof age, insurance status, and address details before booking the appointment.
            </p>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl">
            <div className="w-12 h-12 bg-amber-400/10 border border-amber-400/20 rounded-xl flex items-center justify-center text-amber-400 text-xl font-bold mb-4">
              🎙️
            </div>
            <h3 className="text-xl font-bold text-white mb-2">The Honest Roofer</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Built alongside industry veterans to provide full transparency, protect homeowners, and scale top-tier contractors.
            </p>
          </div>
        </div>
      </section>

      {/* GoHighLevel Form Embed Section */}
      <section id="lead-form" className="max-w-3xl mx-auto px-6 py-16 scroll-mt-20">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Ready to Upgrade Your Lead Intake?
            </h2>
            <p className="text-slate-400 text-sm">
              Fill out the form below to connect with our team or schedule a guest spot on The Honest Roofer Podcast.
            </p>
          </div>

          {/* GoHighLevel Form Placeholder */}
          <div className="min-h-[450px] bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-center text-slate-500 text-sm p-4 text-center">
            [ Paste your GoHighLevel Form Embed Code / iFrame Here ]
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-8 text-center text-slate-500 text-xs">
        <p>&copy; {new Date().getFullYear()} MidSize AI &bull; The Honest Roofer Podcast. All rights reserved.</p>
      </footer>
    </div>
  );
}
