import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { makePlan, makeClientUpdate } from '../public/clients/kickoff/plan.js';

const base = { company: 'Example Roofing', owner: 'Project owner', stage: 'blocked', completed: 'Tracker reviewed with office manager.', remaining: 'Calendar integration not tested.', blockers: 'Waiting for client access; no launch approved.', nextAction: 'Client owner supplies access; Mark tests the calendar.', nextUpdate: '2026-11-23' };

test('update separates verified work, unknowns, blockers and the next owner without implying sending', () => {
  const draft = makeClientUpdate(base);
  for (const value of Object.values(base).filter(v => v !== 'blocked')) assert.ok(draft.includes(value));
  assert.match(draft, /Blocked or paused/);
  assert.match(draft, /No message has been sent/);
  assert.match(draft, /needs agreement before that change proceeds/);
  for (const patch of [{ nextUpdate: '2026-02-29' }, { stage: 'live' }, { blockers: '' }, { owner: ' ' }, { nextAction: '' }]) assert.throws(() => makeClientUpdate({ ...base, ...patch }));
});

test('changing update answers clears the previous draft; invalid submissions retain no stale output', () => {
  const nodes = new Map();
  const get = id => { if (!nodes.has(id)) nodes.set(id, { value: '', textContent: '', handlers: {}, addEventListener(k,fn) { this.handlers[k]=fn; }, focus() {} }); return nodes.get(id); };
  const context = vm.createContext({ document: { getElementById: get }, makePlan, makeClientUpdate });
  const source = readFileSync(new URL('../public/clients/kickoff/kickoff.js', import.meta.url), 'utf8').replace(/^import .*;\n/, '');
  vm.runInContext(source, context);
  const map = { company: 'company', owner: 'owner', stage: 'stage', completed: 'completed', remaining: 'remaining', blockers: 'blockers', nextAction: 'action', nextUpdate: 'date' };
  for (const [key,id] of Object.entries(map)) get('update-'+id).value = base[key];
  const submit = () => get('update-form').handlers.submit({ preventDefault() {} });
  submit(); assert.match(get('update-draft').value, /Calendar integration not tested/);
  get('update-form').handlers.change(); assert.equal(get('update-draft').value, '');
  submit(); get('update-owner').value = ''; submit();
  assert.equal(get('update-draft').value, ''); assert.match(get('update-error').textContent, /Complete every update field/);
});
