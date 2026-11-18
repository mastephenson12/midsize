import { makePlan, makeClientUpdate } from './plan.js';
const get = id => document.getElementById(id);
let currentPlan = '';
let dirty = false;
function markDirty() {
  if (!currentPlan) return;
  dirty = true;
  get('stale').hidden = false;
  get('download').disabled = true;
  get('print').disabled = true;
}
get('kickoff-form').addEventListener('input', markDirty);
get('kickoff-form').addEventListener('change', markDirty);
get('kickoff-form').addEventListener('submit', event => {
  event.preventDefault();
  get('error').textContent = '';
  const optionalCount = id => get(id).value === '' ? null : Number(get(id).value);
  try {
    currentPlan = makePlan({ company: get('company').value, owner: get('owner').value, system: get('system').value, goal: get('goal').value, start: get('start').value, total: Number(get('total').value), assigned: optionalCount('assigned'), scheduled: optionalCount('scheduled') });
    dirty = false;
    get('summary').textContent = currentPlan;
    get('plan').hidden = false;
    get('stale').hidden = true;
    get('download').disabled = false;
    get('print').disabled = false;
    get('plan-heading').focus();
  } catch (error) { get('error').textContent = error.message; }
});
get('download').addEventListener('click', () => {
  if (!currentPlan || dirty) return;
  const url = URL.createObjectURL(new Blob([currentPlan], { type: 'text/plain;charset=utf-8' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = 'midsize-ai-kickoff-plan.txt';
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
});
get('print').addEventListener('click', () => { if (currentPlan && !dirty) window.print(); });

get('update-form').addEventListener('input', () => {
  get('update-draft').value = '';
  get('update-status').textContent = 'Answers changed. Build a new draft before sharing.';
});
get('update-form').addEventListener('change', () => {
  get('update-draft').value = '';
  get('update-status').textContent = 'Answers changed. Build a new draft before sharing.';
});
get('update-form').addEventListener('submit', event => {
  event.preventDefault(); get('update-error').textContent = ''; get('update-draft').value = '';
  try {
    get('update-draft').value = makeClientUpdate({ company: get('update-company').value, owner: get('update-owner').value, stage: get('update-stage').value, completed: get('update-completed').value, remaining: get('update-remaining').value, blockers: get('update-blockers').value, nextAction: get('update-action').value, nextUpdate: get('update-date').value });
    get('update-status').textContent = 'Draft prepared. Check every claim, then copy it into your agreed communication channel. Nothing has been sent.';
    get('update-draft').focus();
  } catch (error) { get('update-error').textContent = error.message; }
});
