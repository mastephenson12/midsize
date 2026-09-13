import test from 'node:test';
import assert from 'node:assert/strict';
import { makePlan } from '../public/clients/kickoff/plan.js';
const base = { company: 'Example Roofing', owner: 'Office manager', system: 'Shared sheet', goal: 'Every estimate has an owner', start: '2026-12-25', total: 10, assigned: 0, scheduled: null };
test('14 calendar days cross year boundary and preserve zero vs unknown', () => {
  const plan = makePlan(base);
  assert.match(plan, /2026-12-25 through 2027-01-07/);
  assert.match(plan, /With an assigned owner: 0/);
  assert.match(plan, /With a dated next action: Not recorded/);
});
test('leap day works without timezone-dependent date shifts', () => {
  assert.match(makePlan({ ...base, start: '2028-02-29' }), /2028-02-29 through 2028-03-13/);
});
test('invalid dates and impossible baseline counts are rejected', () => {
  for (const patch of [{ start: '2026-02-29' }, { start: 'bad' }, { assigned: 11 }, { scheduled: -1 }, { total: 0 }, { assigned: 1.5 }, { total: NaN }, { owner: ' ' }]) assert.throws(() => makePlan({ ...base, ...patch }));
});
