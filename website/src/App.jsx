import React, { useState } from 'react';

export default function App() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
    }
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-400 selection:text-slate-950">
      {/* Navigation */}
      <nav className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <span className="text-xl font-black tracking-tight text-white">
            MidSize<span className="text-amber-400">AI</span>
          </span>
          <span className="hidden sm:inline-block text-xs bg-amber-400/10 text-amber-400 border border-amber-400/20 px-3 py-1 rounded-full font-medium">
            The Honest Roofer Podcast
          </span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => scrollToSection('podcast')}
            className="hidden md:inline-block text-sm text-slate-300 hover:text-white transition-colors"
          >
            Podcast
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-4 py-2 rounded-lg text-sm transition-all shadow-md"
          >
            Get Early Access
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="max-w-5xl mx-auto text-center px-6 pt-24 pb-20">
        <div className="inline-flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-full px-4 py-1.5 text-xs text-amber-400 font-semibold mb-8">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
          Meet Samantha: The 24/7 AI Receptionist for Contractors
        </div>
        
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6 text-white">
          Never Miss a Lead. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500">
            Dominate Your Local Market.
          </span>
        </h1>
        
        <p className="text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Built for roofing contractors and home service pros. Samantha answers calls instantly, qualifies homeowners, and schedules estimates straight to your calendar while you're out on the job.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => scrollToSection('contact')}
            className="w-full sm:w-auto bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-8 py-4 rounded-xl text-base transition-all shadow-xl hover:shadow-amber-400/20"
          >
            Get Started with Samantha
          </button>
          <button
            onClick={() => scrollToSection('podcast')}
            className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white font-semibold px-8 py-4 rounded-xl border border-slate-800 text-base transition-all"
          >
            Listen to The Honest Roofer Podcast
          </button>
        </div>
      </header>

      {/* Features Grid */}
      <section className="max-w-6xl mx-auto px-6 py-16 border-t border-slate-900">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-slate-900/40 border border-slate-800/80 p-8 rounded-2xl">
            <div className="w-12 h-12 bg-amber-400/10 border border-amber-400/20 rounded-xl flex items-center justify-center text-amber-400 text-xl font-bold mb-6">
              ⚡
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Instant First-Ring Pickup</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Homeowners call the next contractor if you don't answer in 3 rings. Samantha picks up instantly, every single time, day or night.
            </p>
          </div>

          <div className="bg-slate-900/40 border border-slate-800/80 p-8 rounded-2xl">
            <div className="w-12 h-12 bg-amber-400/10 border border-amber-400/20 rounded-xl flex items-center justify-center text-amber-400 text-xl font-bold mb-6">
              🎯
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Smart Lead Qualification</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              She filters out spam, captures roof age, material preferences, and property address before you ever spend time calling them back.
            </p>
          </div>

          <div className="bg-slate-900/40 border border-slate-800/80 p-8 rounded-2xl">
            <div className="w-12 h-12 bg-amber-400/10 border border-amber-400/20 rounded-xl flex items-center justify-center text-amber-400 text-xl font-bold mb-6">
              🗓️
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Automated Calendar Booking</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Qualified homeowners are booked directly onto your calendar with zero back-and-forth text chains or phone tag.
            </p>
          </div>
        </div>
      </section>

      {/* Podcast Teaser Section */}
      <section id="podcast" className="max-w-5xl mx-auto px-6 py-20 border-t border-slate-900">
        <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-8 sm:p-12 shadow-2xl flex flex-col md:flex-row items-center gap-8">
          <div className="w-24 h-24 sm:w-32 sm:h-32 bg-amber-400/10 border border-amber-400/30 rounded-2xl flex items-center justify-center text-amber-400 text-4xl font-extrabold shrink-0">
            🎙️
          </div>
          <div>
            <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">Industry Leadership</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 mb-3">The Honest Roofer Podcast</h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-6">
              Exposing industry secrets, breaking down contractor marketing myths, and interviewing top-tier operators scaling modern roofing businesses with transparency and tech.
            </p>
            <span className="inline-block text-xs font-semibold text-slate-300 bg-slate-800 px-3 py-1.5 rounded-lg">
              New Episodes Streaming Weekly
            </span>
          </div>
        </div>
      </section>

      {/* Clean Contact Form Section (No GHL Dependency) */}
      <section id="contact" className="max-w-3xl mx-auto px-6 py-20 border-t border-slate-900">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12 text-center shadow-2xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Get Connected with MidSize AI
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mb-8 max-w-lg mx-auto">
            Drop your email below to request early deployment access for your roofing company or inquire about podcast guest spots.
          </p>

          {submitted ? (
            <div className="bg-amber-400/10 border border-amber-400/30 text-amber-300 p-6 rounded-2xl text-sm font-medium">
              Thank you! We've received your request and will be in touch shortly.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                placeholder="Enter your business email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-grow bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />
              <button
                type="submit"
                className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-6 py-3 rounded-xl text-sm transition-all shrink-0"
              >
                Request Access
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-10 text-center text-slate-500 text-xs">
        <p>&copy; {new Date().getFullYear()} MidSize AI &bull; The Honest Roofer Podcast. All rights reserved.</p>
      </footer>
    </div>
  );
}
