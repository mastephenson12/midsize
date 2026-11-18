export function makePlan(data) {
  const { company, owner, system, goal, start, total, assigned, scheduled } = data;
  if (![company, owner, system, goal].every(value => typeof value === 'string' && value.trim())) throw new Error('Complete the company, owner, system, and goal fields.');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(start)) throw new Error('Choose a valid start date.');
  const date = new Date(start + 'T12:00:00Z');
  if (!Number.isFinite(date.getTime()) || date.toISOString().slice(0, 10) !== start || start < '2020-01-01' || start > '2100-12-01') throw new Error('Choose a valid start date between 2020 and 2100.');
  if (!Number.isInteger(total) || total < 1 || total > 100000) throw new Error('Enter a whole-number pilot group of at least one estimate.');
  for (const count of [assigned, scheduled]) {
    if (count !== null && (!Number.isInteger(count) || count < 0 || count > total)) throw new Error('Baseline counts must be whole numbers between zero and the number of estimates in the pilot.');
  }
  const day = offset => { const next = new Date(date); next.setUTCDate(next.getUTCDate() + offset); return next.toISOString().slice(0, 10); };
  const countLabel = value => value === null ? 'Not recorded' : String(value);
  return `MIDSIZE AI — ESTIMATE FOLLOW-UP KICKOFF PLAN

Company: ${company.trim()}
Follow-up owner: ${owner.trim()}
Current system: ${system.trim()}
Pilot window: ${day(0)} through ${day(13)} (14 calendar days)
Confirm meeting times with Mark; dates below are planning milestones.

DAY-14 GOAL
${goal.trim()}

STARTING BASELINE
Estimates in pilot: ${total}
With an assigned owner: ${countLabel(assigned)}
With a dated next action: ${countLabel(scheduled)}
Unknown counts are not zero. Complete them together at kickoff.

DAYS 1–2 | ${day(0)} to ${day(1)} | KICKOFF
Agree on estimate IDs, scope, owner, baseline, contact preferences, and stopping rules. Keep customer details in your company system.

DAYS 3–5 | ${day(2)} to ${day(4)} | SETUP
Create or adapt your tracker. Prepare receipt-check, question-answering, and close-the-loop messages. Agree on next-action dates and review messages with the team.

DAYS 6–13 | ${day(5)} to ${day(12)} | USE AND ADJUST
Your team checks for replies, reviews and sends messages, and records each outcome. Suggested midpoint check-in: ${day(6)}; confirm the time with Mark.

DAY 14 | ${day(13)} | CLOSING REVIEW
Review attempts, unique estimates contacted, replies, appointments, won/lost/pending decisions, booked value, and collected revenue separately. Compare owner and next-action coverage with the baseline. Note missing data and outcomes still pending.

DAILY TEAM CHECKLIST
1. Check replies and contact preferences before sending anything.
2. Review estimates due for a next action with the assigned owner.
3. Personalize the message and send through your existing channel.
4. Record the response, outcome, and next action in your system.
5. Stop follow-up when requested; flag questions for a person.

HANDOVER
Keep your tracker, three approved message templates, and operating checklist. Results do not guarantee sales and do not prove that every sale came from the pilot.

This plan does not book or activate a pilot. Confirm scope, dates, and payment terms with Mark. No information has been sent by this tool.
`;
}

export function makeClientUpdate(data) {
  const labels = { planned: 'Planned — work has not started', progress: 'In progress', approval: 'Waiting for client approval', blocked: 'Blocked or paused', review: 'Ready for client review', complete: 'Completed — confirmed items below' };
  const { company, owner, stage, completed, remaining, blockers, nextAction, nextUpdate } = data;
  if (![company, owner, completed, remaining, blockers, nextAction].every(value => typeof value === 'string' && value.trim())) throw new Error('Complete every update field. Use “None” only when you have checked and confirmed there is nothing to report.');
  if (!Object.hasOwn(labels, stage)) throw new Error('Choose a project stage.');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(nextUpdate)) throw new Error('Choose the agreed next update date.');
  const date = new Date(nextUpdate + 'T12:00:00Z');
  if (!Number.isFinite(date.getTime()) || date.toISOString().slice(0, 10) !== nextUpdate || nextUpdate < '2020-01-01' || nextUpdate > '2100-12-01') throw new Error('Choose a valid next update date.');
  const clean = value => value.trim();
  return `DRAFT — REVIEW BEFORE SENDING
Subject: ${clean(company).replace(/[\r\n]+/g, ' ')} | MidSize AI project update

Current stage: ${labels[stage]}
Update owner: ${clean(owner)}

COMPLETED AND VERIFIED
${clean(completed)}

REMAINING OR NOT YET VERIFIED
${clean(remaining)}

BLOCKERS, APPROVALS, OR PROPOSED CHANGES
${clean(blockers)}

NEXT ACTION AND PERSON RESPONSIBLE
${clean(nextAction)}

NEXT UPDATE
${nextUpdate} — confirm the time and communication channel in your project record.

Please reply if this differs from your understanding. Any proposed scope, price, or timeline change needs agreement before that change proceeds.

This is a manually prepared draft. No message has been sent, no approval recorded, and no live project status changed by this tool.
`;
}
