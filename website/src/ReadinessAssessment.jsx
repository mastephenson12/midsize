import React, { useMemo, useState } from 'react';

const initialAnswers = {
  serviceType: '',
  monthlyLeads: '',
  answerRate: '',
  responseTime: '',
  adminHours: '',
  systems: '',
};

const questions = [
  {
    key: 'serviceType',
    label: 'What kind of home-service company do you operate?',
    options: [
      ['roofing', 'Roofing'],
      ['hvac', 'HVAC'],
      ['plumbing', 'Plumbing'],
      ['electrical', 'Electrical'],
      ['remodeling', 'Remodeling'],
      ['other', 'Another home service'],
    ],
  },
  {
    key: 'monthlyLeads',
    label: 'About how many calls and web leads arrive each month?',
    options: [
      ['under-50', 'Fewer than 50'],
      ['50-149', '50-149'],
      ['150-399', '150-399'],
      ['400-plus', '400 or more'],
    ],
  },
  {
    key: 'answerRate',
    label: 'What usually happens when your team cannot answer a call?',
    options: [
      ['covered', 'A person reliably answers or calls back quickly'],
      ['voicemail', 'It goes to voicemail'],
      ['rotation', 'It depends on who is available'],
      ['unknown', 'We do not consistently track it'],
    ],
  },
  {
    key: 'responseTime',
    label: 'How quickly are new web leads normally contacted?',
    options: [
      ['under-5', 'Within 5 minutes'],
      ['under-30', 'Within 30 minutes'],
      ['same-day', 'Later the same day'],
      ['next-day', 'The next day or later'],
    ],
  },
  {
    key: 'adminHours',
    label: 'How many team hours per week go to repetitive intake, scheduling, and follow-up?',
    options: [
      ['under-5', 'Fewer than 5 hours'],
      ['5-15', '5-15 hours'],
      ['16-30', '16-30 hours'],
      ['30-plus', 'More than 30 hours'],
    ],
  },
  {
    key: 'systems',
    label: 'How connected are your phone, CRM, calendar, and follow-up tools?',
    options: [
      ['connected', 'Connected and working reliably'],
      ['partial', 'Some are connected'],
      ['manual', 'Mostly manual or disconnected'],
      ['unsure', 'I am not sure'],
    ],
  },
];

const leadScores = { 'under-50': 1, '50-149': 2, '150-399': 3, '400-plus': 4 };
const adminMidpoints = { 'under-5': 3, '5-15': 10, '16-30': 23, '30-plus': 36 };

function buildResult(answers) {
  let score = leadScores[answers.monthlyLeads] || 1;
  if (answers.answerRate !== 'covered') score += 2;
  if (answers.responseTime === 'same-day' || answers.responseTime === 'next-day') score += 2;
  if (answers.adminHours === '16-30' || answers.adminHours === '30-plus') score += 2;
  if (answers.systems !== 'connected') score += 2;

  const weeklyAdmin = adminMidpoints[answers.adminHours] || 3;
  const lowHours = Math.max(2, Math.round(weeklyAdmin * 4.33 * 0.2));
  const highHours = Math.max(lowHours + 2, Math.round(weeklyAdmin * 4.33 * 0.4));

  const priorities = [];
  if (answers.answerRate !== 'covered') {
    priorities.push(['Call coverage', 'Create a consistent first response for missed and after-hours calls.']);
  }
  if (answers.responseTime === 'same-day' || answers.responseTime === 'next-day') {
    priorities.push(['Speed-to-lead', 'Acknowledge web inquiries immediately and route qualified requests to the right person.']);
  }
  if (answers.adminHours !== 'under-5') {
    priorities.push(['Intake and follow-up', 'Standardize repetitive questions, reminders, scheduling, and status updates.']);
  }
  if (answers.systems !== 'connected') {
    priorities.push(['System connection', 'Reduce retyping by connecting the phone, CRM, calendar, and approved workflows.']);
  }
  if (!priorities.length) {
    priorities.push(['Workflow quality', 'Document what already works, then automate only the repetitive steps that preserve service quality.']);
  }

  if (score >= 9) return { level: 'Strong opportunity', summary: 'Several repetitive or time-sensitive steps appear ready for a focused automation pilot.', lowHours, highHours, priorities };
  if (score >= 6) return { level: 'Good pilot candidate', summary: 'One carefully selected workflow could improve consistency without rebuilding your entire operation.', lowHours, highHours, priorities };
  return { level: 'Build the foundation first', summary: 'Your strongest next move is documenting lead handling and measuring response times before adding more technology.', lowHours, highHours, priorities };
}

export default function ReadinessAssessment() {
  const [answers, setAnswers] = useState(initialAnswers);
  const [showResult, setShowResult] = useState(false);
  const complete = Object.values(answers).every(Boolean);
  const result = useMemo(() => buildResult(answers), [answers]);

  function selectAnswer(key, value) {
    setAnswers((current) => ({ ...current, [key]: value }));
    setShowResult(false);
  }

  function submit(event) {
    event.preventDefault();
    if (complete) setShowResult(true);
  }

  return (
    <section id="assessment" className="border-y border-slate-900 bg-slate-900/30 px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400">Free two-minute assessment</p>
          <h2 className="mt-3 text-3xl font-extrabold text-white sm:text-5xl">Where could AI remove friction from your business?</h2>
          <p className="mt-5 text-lg leading-relaxed text-slate-400">Answer six practical questions. See the result immediately - no email, inflated ROI promise, or sales call required.</p>
        </div>

        <form onSubmit={submit} className="rounded-3xl border border-slate-800 bg-slate-950 p-5 sm:p-9">
          <div className="grid gap-8 lg:grid-cols-2">
            {questions.map((question, index) => (
              <fieldset key={question.key} className="min-w-0">
                <legend className="mb-3 flex items-start gap-3 text-base font-bold text-white">
                  <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-400 text-xs text-slate-950">{index + 1}</span>
                  <span>{question.label}</span>
                </legend>
                <div className="grid gap-2 sm:grid-cols-2">
                  {question.options.map(([value, label]) => {
                    const selected = answers[question.key] === value;
                    return (
                      <label key={value} className={`cursor-pointer rounded-xl border px-4 py-3 text-sm transition ${selected ? 'border-amber-400 bg-amber-400/10 text-amber-200' : 'border-slate-800 bg-slate-900 text-slate-300 hover:border-slate-600'}`}>
                        <input
                          className="sr-only"
                          type="radio"
                          name={question.key}
                          value={value}
                          checked={selected}
                          onChange={() => selectAnswer(question.key, value)}
                        />
                        {label}
                      </label>
                    );
                  })}
                </div>
              </fieldset>
            ))}
          </div>

          <div className="mt-10 text-center">
            <button type="submit" disabled={!complete} className="w-full rounded-xl bg-amber-400 px-8 py-4 font-bold text-slate-950 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400 sm:w-auto">
              See My Readiness Result
            </button>
            {!complete && <p className="mt-3 text-xs text-slate-500">Answer all six questions to calculate your result.</p>}
          </div>
        </form>

        {showResult && (
          <div aria-live="polite" className="mt-8 rounded-3xl border border-amber-400/30 bg-gradient-to-br from-amber-400/10 to-blue-500/10 p-6 sm:p-10">
            <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr]">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400">Your readiness result</p>
                <h3 className="mt-2 text-3xl font-extrabold text-white">{result.level}</h3>
                <p className="mt-4 leading-relaxed text-slate-300">{result.summary}</p>
                <div className="mt-6 rounded-2xl border border-slate-700 bg-slate-950/70 p-5">
                  <p className="text-sm text-slate-400">Conservative time-saving potential</p>
                  <p className="mt-1 text-3xl font-extrabold text-white">{result.lowHours}-{result.highHours} hours/month</p>
                  <p className="mt-2 text-xs leading-relaxed text-slate-500">Directional estimate based on the repetitive administrative hours selected. Validate it against a real workflow before making an investment decision.</p>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-bold text-white">Recommended starting priorities</h4>
                <div className="mt-4 space-y-3">
                  {result.priorities.slice(0, 3).map(([title, description]) => (
                    <div key={title} className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5">
                      <p className="font-bold text-amber-300">{title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-slate-400">{description}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  {answers.serviceType === 'roofing' ? (
                    <a href="https://apply.midsizeai.com/application" className="rounded-xl bg-amber-400 px-6 py-3 text-center text-sm font-bold text-slate-950 hover:bg-amber-300">Request a Roofing Workflow Review</a>
                  ) : (
                    <a href="#ecosystem" className="rounded-xl bg-amber-400 px-6 py-3 text-center text-sm font-bold text-slate-950 hover:bg-amber-300">See How the Platform Works</a>
                  )}
                  <button type="button" onClick={() => { setAnswers(initialAnswers); setShowResult(false); }} className="rounded-xl border border-slate-700 px-6 py-3 text-sm font-bold text-white hover:bg-slate-800">Start Over</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
