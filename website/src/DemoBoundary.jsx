import React from 'react';

export default class DemoBoundary extends React.Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() {
    if (!this.state.failed) return this.props.children;
    return <main className="mx-auto max-w-3xl px-6 py-20 text-slate-100">
      <h1 className="text-3xl font-bold">Samantha’s interactive example could not load.</h1>
      <p className="mt-5">Here is the sample workflow: ask about call volume and missed calls, collect the company’s current systems and handoff preferences, then offer a human workflow review when there is a fit.</p>
      <p className="mt-5">Your team reviews the script and test calls before launch.</p>
      <a className="mt-6 inline-block text-amber-300 underline" href="/services/ai-receptionist-for-roofers">Explore AI call answering</a>
      <a className="ml-6 text-amber-300 underline" href="/">Return to MidSize AI</a>
    </main>;
  }
}
