export const categories = [
  { id: 'visibility', title: 'Get found: local visibility', questions: [
    ['Can customers find accurate hours, services and contact details on your Google Business Profile?', 'Review and complete your Google Business Profile.'],
    ['Does your website clearly explain your services, service area and how to request help?', 'Make your service area and inquiry button clear on your website.']
  ]},
  { id: 'social', title: 'Get found: social media', questions: [
    ['Do you publish helpful local content consistently?', 'Plan a weekly schedule of useful homeowner questions and answers.'],
    ['Do your posts offer a relevant next step, such as requesting an estimate?', 'Connect posts to relevant service pages or inquiry forms.']
  ]},
  { id: 'trust', title: 'Get trusted: reputation', questions: [
    ['Do you routinely ask customers for honest reviews after completed jobs?', 'Create a consistent, policy-compliant review request process.'],
    ['Do you share real project photos and explain your work with customer permission?', 'Collect approved project photos and explain the problem and solution.']
  ]},
  { id: 'conversion', title: 'Get booked: lead conversion', questions: [
    ['Do new calls and web inquiries receive a prompt response, including when your team is busy?', 'Map missed-call coverage and assign ownership of new inquiries.'],
    ['Do you consistently follow up on open estimates and track booked appointments?', 'Set up consent-aware estimate follow-up and appointment tracking.']
  ]},
  { id: 'retention', title: 'Keep growing: customer retention', questions: [
    ['Do you check in with customers after work is completed?', 'Add a post-job check-in to catch unresolved concerns.'],
    ['Do you have a process for appropriate repeat-service reminders or referral requests?', 'Create a permission-based customer retention and referral process.']
  ]}
];
export const choices = [['0', 'Not yet / not sure'], ['1', 'Sometimes'], ['2', 'Consistently']];
export function scoreAudit(answers) {
  const keys = categories.flatMap(c => c.questions.map((_, i) => c.id + '-' + i));
  if (!keys.every(k => choices.some(([v]) => v === answers[k]))) return null;
  const results = categories.map(c => {
    const values = c.questions.map((_, i) => Number(answers[c.id + '-' + i]));
    return { id: c.id, title: c.title, score: Math.round(values.reduce((a,b) => a+b,0) / (2 * values.length) * 100),
      actions: c.questions.flatMap((q,i) => values[i] < 2 ? [{ text:q[1], value:values[i] }] : []) };
  });
  const score = Math.round(results.reduce((sum,c) => sum+c.score,0)/results.length);
  const actions = results.flatMap(c => c.actions).sort((a,b) => a.value-b.value).slice(0,3).map(a => a.text);
  return { score, categories: results, actions: actions.length ? actions : ['Keep tracking qualified inquiries and booked appointments to identify the next improvement.'] };
}
