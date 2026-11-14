const topics = [
  ['Contractor / quote date', 'Use a company name or a private label.'],
  ['Total project price', 'Record currency, taxes, fees and allowances; separate financing.'],
  ['Roof areas and removal', 'Which areas, measured scope and existing layers?'],
  ['Materials and products', 'Manufacturer, product, color and underlayment.'],
  ['Decking and extra charges', 'Unit price, labor, disposal and approval process.'],
  ['Flashing and ventilation', 'What is replaced, reused or conditional?'],
  ['Permits and cleanup', 'Responsibility, fees, disposal and final cleanup.'],
  ['Timing', 'Expected start, completion and delay handling.'],
  ['Warranties', 'Workmanship and manufacturer terms, exclusions and provider.'],
  ['Payments and changes', 'Deposit, milestones and written change approvals.'],
  ['Exclusions and open questions', 'Anything not included or still unclear.']
];
const status = document.getElementById('status');
const rows = document.getElementById('rows');
topics.forEach(([topic, hint], index) => {
  const row = document.createElement('tr');
  const heading = document.createElement('th');
  heading.scope = 'row'; heading.textContent = topic;
  const small = document.createElement('small'); small.textContent = hint; heading.append(small); row.append(heading);
  for (let quote = 0; quote < 3; quote++) {
    const cell = document.createElement('td');
    const input = document.createElement('textarea');
    input.id = `quote-${quote}-${index}`; input.maxLength = 3000;
    input.setAttribute('aria-label', `Quote ${'ABC'[quote]}: ${topic}`);
    const printed = document.createElement('div'); printed.className = 'print-value';
    cell.append(input, printed); row.append(cell);
  }
  rows.append(row);
});
const value = (quote, index) => document.getElementById(`quote-${quote}-${index}`).value.trim();
const active = quote => topics.some((_, index) => value(quote, index));
document.querySelectorAll('[data-message]').forEach(button => button.addEventListener('click', () => {
  const quote = Number(button.dataset.message);
  if (!active(quote)) { status.textContent = `Enter some details for Quote ${'ABC'[quote]} first.`; return; }
  const missing = topics.slice(1).filter((_, index) => !value(quote, index + 1)).map(([topic]) => topic);
  document.getElementById('message').value = 'Thank you for the roofing proposal. I am comparing written scopes before deciding.\n\n' +
    (missing.length ? 'Could you clarify these items in an updated written proposal?\n' + missing.map(topic => '- ' + topic).join('\n') + '\n\n' : '') +
    'Please confirm the roof areas, exact products, exclusions, any conditional work or extra-charge rules, warranties, timing and payment milestones. Please explain how we approve changes in writing before extra work starts. I would like to compare equivalent work. Thank you.';
  status.textContent = `Message prepared for Quote ${'ABC'[quote]}. Review and copy it yourself; nothing has been sent.`;
  document.getElementById('message').focus();
}));
function report() {
  const lines = ['MidSize AI | Roofing quote comparison', 'Manual notes, not verified scope or a price rating.', 'Blank entries mean not recorded, not excluded.', ''];
  for (let quote = 0; quote < 3; quote++) if (active(quote)) {
    lines.push(`QUOTE ${'ABC'[quote]}`, ...topics.map(([topic], index) => `${topic}: ${value(quote, index) || 'Not recorded — ask for written clarification'}`), '');
  }
  const message = document.getElementById('message').value.trim();
  if (message) lines.push('DRAFT MESSAGE', message, '');
  return lines.concat('https://www.midsizeai.com/compare-roofing-estimates/').join('\n');
}
document.getElementById('download').addEventListener('click', () => {
  if (![0, 1, 2].some(active)) { status.textContent = 'Enter at least one quote before downloading.'; return; }
  const url = URL.createObjectURL(new Blob([report()], {type: 'text/plain;charset=utf-8'}));
  const link = document.createElement('a'); link.href = url; link.download = 'my-roofing-quote-comparison.txt';
  document.body.append(link); link.click(); link.remove(); setTimeout(() => URL.revokeObjectURL(url), 10000);
  status.textContent = 'Download requested. Keep your copy private and check your Downloads folder.';
});
function preparePrint() {
  rows.querySelectorAll('textarea').forEach(input => { input.nextElementSibling.textContent = input.value.trim() || 'Not recorded'; });
  document.getElementById('printed-message').textContent = document.getElementById('message').value;
}
window.addEventListener('beforeprint', preparePrint);
document.getElementById('print').addEventListener('click', () => { preparePrint(); window.print(); });
document.getElementById('clear').addEventListener('click', () => {
  if (!window.confirm('Clear all quote notes and the draft message? Download a copy first if you want to keep them.')) return;
  document.querySelectorAll('textarea').forEach(input => { input.value = ''; });
  status.textContent = 'Worksheet cleared.'; document.getElementById('quote-0-0').focus();
});
