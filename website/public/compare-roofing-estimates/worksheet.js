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
function trackWorksheetEvent(eventName, detail = {}) {
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, { tool: 'roofing_quote_comparison', ...detail });
  }
}
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
const drafts = window.MidSizeComparisonDraft;
const snapshot = () => ({ quotes: [0, 1, 2].map(q => topics.map((_, i) => value(q, i))), message: document.getElementById('message').value });
const restore = draft => {
  draft.quotes.forEach((fields, quote) => fields.forEach((text, index) => { document.getElementById(`quote-${quote}-${index}`).value = text; }));
  document.getElementById('message').value = draft.message;
};
const saved = drafts.load();
if (saved.state === 'ready') { restore(saved.data); status.textContent = 'Saved progress restored from this browser. Changes are not saved until you choose Save progress again.'; }
if (saved.state === 'expired') status.textContent = 'The saved copy is older than 30 days and has been removed.';
if (saved.state === 'unavailable') status.textContent = 'Saved progress could not be read in this browser. You can still use, download, and print the worksheet.';
document.getElementById('save-progress').addEventListener('click', () => {
  if (![0, 1, 2].some(active)) { status.textContent = 'Enter at least one quote before saving.'; return; }
  status.textContent = drafts.save(snapshot()) ? 'Progress saved in this browser. Save again after changes. It can be restored for up to 30 days; use Delete saved copy when finished.' : 'This browser could not save your progress. Download or print a copy before leaving.';
});
document.getElementById('forget-progress').addEventListener('click', () => {
  status.textContent = drafts.forget() ? 'Saved copy deleted. Your current worksheet remains open and is not saved.' : 'This browser could not confirm deletion. Remove this site’s stored data in browser settings.';
});
let pending = drafts.getPending();
if (pending.state === 'ready') {
  document.getElementById('import-panel').hidden = false;
  document.getElementById('import-preview').textContent = pending.data.map((text, index) => `${topics[index][0]}: ${text || 'Not recorded — check your proposal'}`).join('\n\n');
  const empty = [0, 1, 2].find(q => !active(q));
  document.getElementById('import-slot').value = String(empty ?? 0);
}
document.getElementById('import-quote').addEventListener('click', () => {
  // Recheck age when the homeowner actually imports, not only on page load.
  pending = drafts.getPending();
  if (pending.state !== 'ready') { document.getElementById('import-status').textContent = 'The temporary excerpts are no longer available. Return to the decoder or enter the details manually.'; return; }
  const quote = Number(document.getElementById('import-slot').value);
  if (![0, 1, 2].includes(quote)) return;
  if (active(quote) && !window.confirm(`Replace the existing notes in Quote ${'ABC'[quote]} with these excerpts? Your other quotes will stay unchanged.`)) return;
  pending.data.forEach((text, index) => { document.getElementById(`quote-${quote}-${index}`).value = text; });
  document.getElementById('message').value = '';
  drafts.clearPending(); document.getElementById('import-panel').hidden = true;
  status.textContent = `Excerpts added to Quote ${'ABC'[quote]}. Verify every entry against your proposal and fill in gaps. Changes have not been saved; choose Save progress if wanted.`;
  document.getElementById(`quote-${quote}-0`).focus();
});
document.getElementById('discard-import').addEventListener('click', () => {
  drafts.clearPending(); document.getElementById('import-panel').hidden = true;
  status.textContent = 'Temporary excerpts discarded. Your worksheet is unchanged.';
});
document.querySelectorAll('[data-message]').forEach(button => button.addEventListener('click', () => {
  const quote = Number(button.dataset.message);
  if (!active(quote)) { status.textContent = `Enter some details for Quote ${'ABC'[quote]} first.`; return; }
  const missing = topics.slice(1).filter((_, index) => !value(quote, index + 1)).map(([topic]) => topic);
  document.getElementById('message').value = 'Thank you for the roofing proposal. I am comparing written scopes before deciding.\n\n' +
    (missing.length ? 'Could you clarify these items in an updated written proposal?\n' + missing.map(topic => '- ' + topic).join('\n') + '\n\n' : '') +
    'Please confirm the roof areas, exact products, exclusions, any conditional work or extra-charge rules, warranties, timing and payment milestones. Please explain how we approve changes in writing before extra work starts. I would like to compare equivalent work. Thank you.';
  status.textContent = `Message prepared for Quote ${'ABC'[quote]}. Review and copy it yourself; nothing has been sent.`;
  trackWorksheetEvent('roof_comparison_message_prepared', { quote: 'ABC'[quote] });
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
  trackWorksheetEvent('roof_comparison_download');
});
function preparePrint() {
  rows.querySelectorAll('textarea').forEach(input => { input.nextElementSibling.textContent = input.value.trim() || 'Not recorded'; });
  document.getElementById('printed-message').textContent = document.getElementById('message').value;
}
window.addEventListener('beforeprint', preparePrint);
document.getElementById('print').addEventListener('click', () => { preparePrint(); trackWorksheetEvent('roof_comparison_print'); window.print(); });
document.getElementById('clear').addEventListener('click', () => {
  if (!window.confirm('Clear all quote notes, the draft message, and any saved copy in this browser? Download a copy first if you want to keep them.')) return;
  document.querySelectorAll('textarea').forEach(input => { input.value = ''; });
  const removed = drafts.forget(); drafts.clearPending(); document.getElementById('import-panel').hidden = true;
  status.textContent = removed ? 'Worksheet and saved copy cleared.' : 'Worksheet cleared, but deletion of the saved copy could not be confirmed. Remove this site’s stored data in browser settings.'; document.getElementById('quote-0-0').focus();
});
