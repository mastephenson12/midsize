import React, { useState, useRef } from 'react';
import { categories, choices, scoreAudit } from './growthAudit.js';

export default function GrowthAudit() {
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const resultRef = useRef(null);
  const count = Object.keys(answers).length;
  function submit(event) {
    event.preventDefault();
    const next = scoreAudit(answers);
    if (!next) return;
    setResult(next);
  }
  return (
    <section id="growth-audit" className="scroll-mt-28 border-t border-slate-800 px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <p className="text-xs font-bold uppercase tracking-widest text-amber-400">Free home-service growth audit</p>
        <h2 className="mt-3 text-3xl font-extrabold text-white sm:text-5xl">Find out where your next customers could come from.</h2>
        <p className="mt-4 text-slate-300">Answer ten questions about your business. See your score and three practical next steps immediately. No email required.</p>
        <form onSubmit={submit} className="mt-8 space-y-6">
          {categories.map(category => (
            <div key={category.id} className="rounded-2xl border border-slate-800 bg-slate-900 p-5 sm:p-7">
              <h3 className="mb-5 text-xl font-bold text-amber-300">{category.title}</h3>
              {category.questions.map(([question], i) => {
                const key = category.id + '-' + i;
                return <fieldset key={key} className="mb-5 last:mb-0">
                  <legend className="mb-3 font-semibold text-white">{question}</legend>
                  <div className="grid gap-2 sm:grid-cols-3">
                    {choices.map(([value, label]) => <label key={value} className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-700 p-3 text-sm text-slate-200 hover:border-amber-400">
                      <input required type="radio" name={key} value={value} checked={answers[key] === value} onChange={() => {setAnswers(old => ({...old, [key]:value})); setResult(null);}} className="accent-amber-400" />
                      {label}
                    </label>)}
                  </div>
                </fieldset>;
              })}
            </div>
          ))}
          <p aria-live="polite" className="text-sm text-slate-300">{count} of 10 questions answered</p>
          <button type="submit" disabled={count !== 10} className="rounded-xl bg-amber-400 px-6 py-3 font-bold text-slate-950 disabled:opacity-50">See My Growth Score</button>
        </form>
        {result && <div ref={resultRef} aria-live="polite" className="mt-8 rounded-3xl border border-amber-400/30 bg-slate-900 p-6 sm:p-9">
          <p className="text-sm font-bold uppercase tracking-widest text-amber-400">Your growth readiness score</p>
          <p className="mt-2 text-5xl font-extrabold text-white">{result.score}<span className="text-xl text-slate-400"> / 100</span></p>
          <p className="mt-3 text-sm text-slate-300">Based on your own answers, with five equally weighted categories. This is a planning checklist, not an independent business rating or a revenue forecast.</p>
          <div className="mt-6 space-y-4">
            {result.categories.map(c => <div key={c.id}><div className="flex justify-between gap-3 text-sm text-slate-200"><span>{c.title}</span><span>{c.score}/100</span></div><div className="mt-2 h-2 rounded bg-slate-700"><div className="h-full rounded bg-amber-400" style={{width: c.score + '%'}} /></div></div>)}
          </div>
          <h3 className="mt-8 text-xl font-bold text-white">Your recommended next steps</h3>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-slate-300">{result.actions.map(a => <li key={a}>{a}</li>)}</ol>
          <p className="mt-6 text-sm text-slate-300">Want help putting these steps into practice? Request a free workflow review. Your answers stay on this page and are not sent to the application.</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a href="https://apply.midsizeai.com/application?utm_source=midsizeai.com&utm_medium=growth_audit&utm_campaign=workflow_audit&utm_content=result" className="rounded-xl bg-amber-400 px-6 py-3 font-bold text-slate-950">Request My Free Growth Review</a>
            <button type="button" onClick={() => {setAnswers({}); setResult(null); document.getElementById('growth-audit')?.scrollIntoView();}} className="rounded-xl border border-slate-600 px-6 py-3 font-bold text-white">Start Over</button>
          </div>
        </div>}
      </div>
    </section>
  );
}
