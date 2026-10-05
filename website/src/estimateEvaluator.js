// A deterministic reading checklist, never a price, quality or contract judgment.
export const topics = [
  ['Scope and quantities', /\b(scope|remove|replace(?:ment)?|install(?:ation)?|repair|sq\.?\s*ft|square feet|squares)\b/i, 'What exact areas, quantities and work are included in the written price?'],
  ['Materials', /\b(shingles?|tiles?|metal|membrane|tpo|foam|coating|underlayment)\b/i, 'Which product brand, line, grade and quantity will you use?'],
  ['Removal', /\b(tear[- ]?off|remove(?: existing|[^.;\n]{0,60}(?:shingles?|roofing|layers?))|removal|demolition)\b/i, 'Is existing roofing being removed or retained, and how many layers are included?', 'replacement'],
  ['Water protection', /\b(underlayment|ice (?:and|&) water|water barrier|felt)\b/i, 'What water-protection materials and locations are included?', 'replacement'],
  ['Flashing', /\b(flashing|flashings|drip edge|valley metal|pipe jack)\b/i, 'Which flashings will be replaced, repaired or reused?'],
  ['Hidden damage and wood repair', /\b(decking|plywood|osb|rotten wood|wood replacement|sheet price)\b/i, 'What happens if hidden damage is found, and how will extra work be priced and approved?'],
  ['Ventilation', /\b(ventilation|ridge vent|intake vent|exhaust vent|soffit vent|roof vent)\b/i, 'Will ventilation be evaluated, and are any changes included?', 'replacement'],
  ['Permits and inspections', /\b(permits?|code|inspections?)\b/i, 'Who checks permit and inspection requirements and handles them when applicable?'],
  ['Cleanup', /\b(cleanup|clean up|disposal|dumpster|haul away|debris|magnet)\b/i, 'What debris removal, site protection and final cleanup are included?'],
  ['Warranty', /\b(warrant(?:y|ies)|workmanship)\b/i, 'Who provides each warranty, for how long, and what is excluded?'],
  ['Payment schedule', /\b(deposit|payment|balance due|financing|due upon)\b/i, 'What amount is due at each milestone, and what must be completed first?'],
  ['Exclusions and changes', /\b(exclusions?|excluded?|not included|additional cost|change orders?|extra(?: charge)?|allowance)\b/i, 'Which items can change the price, and will changes require written approval?'],
];

export function evaluateEstimate(raw, project = 'replacement') {
  const text = String(raw || '').trim();
  if (text.length < 40) throw new Error('Add at least 40 characters of the written roofing scope.');
  if (text.length > 100000) throw new Error('Please review one estimate at a time, up to 100,000 characters.');
  if (!/\b(roof\w*|shingles?|underlayment|flashing|tpo|decking)\b/i.test(text)) throw new Error('This version checks roofing estimates. Add the roofing scope, or use the homeowner hub for other questions.');
  const clauses = text.split(/\n+|[;!?]+|\.(?=\s+[A-Z]|$)/).map(s => s.trim()).filter(Boolean);
  const caution = /\b(no|not|exclude\w*|except|extra|additional|allowance|optional|by owner|owner responsibility|reuse\w*|retain\w*|as needed|if needed|where applicable|subject to|to be determined|tbd)\b/i;
  const rows = topics.map(([name, pattern, question, only]) => {
    const found = clauses.filter(line => pattern.test(line));
    const relevant = project !== 'repair' || !only || found.length > 0;
    const status = !relevant ? 'Scope dependent' : !found.length ? 'Not found' : found.some(line => caution.test(line)) ? 'Clarify wording' : 'Mentioned';
    return { name, status, question, evidence: [...found].sort((a,b) => Number(caution.test(b))-Number(caution.test(a))).slice(0, 2).map(line => line.length > 320 ? line.slice(0, 320) + '…' : line) };
  });
  const pressure = /\b(today only|sign today|must sign|guaranteed approval|waive your deductible|insurance will pay)\b/i.test(text);
  const hasPrice = /\$\s?\d|\b\d[\d,]*(?:\.\d{2})?\s*(?:USD|dollars)\b/i.test(text);
  // A unit price or monthly payment alone is not an identified project total.
  const totalPattern = /\b(?:grand total|total(?:\s+(?:project|contract))?\s*(?:price|cost|amount)?|contract (?:price|amount)|project (?:price|cost))\s*[:=\-]?\s*(?:USD\s*)?\$?\s*(\d[\d,]*(?:\.\d{1,2})?)\b/gi;
  const totals = [...text.matchAll(totalPattern)].filter(m => !/^\s*(?:per\b|\/|a month\b|monthly\b|sq\b)/i.test(text.slice(m.index+m[0].length))).map(m=>({amount:Number(m[1].replaceAll(',','')), evidence:m[0]}));
  const distinctTotals = [...new Set(totals.map(t=>t.amount))];
  const attention = [];
  const flag = (title, detail, question, evidence=[]) => attention.push({title, detail, question, evidence});
  if (!totals.length) flag('Confirm the full project price', hasPrice ? 'Amounts appear in the text, but no clearly labeled project total was identified. A unit price or monthly payment may not cover the whole job.' : 'No price was identified in the text you provided.', 'What is the total project price, and which allowances or extra costs can change it?');
  if (distinctTotals.length>1) flag('Clarify which total applies', 'More than one labeled total appears. These may be options or subtotals; confirm the price for the scope you want.', 'Which total and exact scope are we agreeing to?', totals.map(t=>t.evidence));
  const paymentClauses = clauses.filter(c=>/\b(?:paid? in full|full payment|100\s*%|entire (?:balance|payment))\b/i.test(c) && /\b(?:before|upfront|up front|upon signing|on signing|in advance)\b/i.test(c));
  if(paymentClauses.length) flag('Review payment before work begins', 'The wording appears to request full payment before work or at signing. Confirm the timing and completion milestones.', 'What payment is due before work starts, and what payments depend on completed work?', paymentClauses);
  const extras=clauses.filter(c=>/\b(?:extra|additional (?:cost|charge|fee)|allowance|as needed|if needed|tbd|to be determined|subject to)\b/i.test(c));
  if(extras.length) flag('Ask how the price can change', 'Some work or charges are conditional. Ask for the price or pricing method and how you approve changes.', 'Can you list possible extra charges, unit prices, and the written approval process?', extras);
  if(pressure) flag('Get time-sensitive promises in writing', 'The estimate contains urgency or payment-promise wording that deserves clarification.', 'Can I take time to review this, and get any deadline or payment promises explained in writing?', clauses.filter(c=>/today only|sign today|must sign|guaranteed approval|waive your deductible|insurance will pay/i.test(c)));
  for(const item of attention) item.evidence=item.evidence.slice(0,2).map(s=>s.length>320?s.slice(0,320)+'…':s);
  const questions = [
    ...attention.map(item=>item.question),
    ...rows.filter(row => row.status === 'Clarify wording' || row.status === 'Not found').map(row => row.question),
  ];
  if (!questions.length) questions.push('Can you confirm the exact materials, quantities, responsibilities and exclusions in writing?');
  return { project, rows, questions, attention, pressure, hasPrice, mentioned: rows.filter(row => row.status === 'Mentioned').length, clarify: rows.filter(row => row.status === 'Clarify wording').length, missing: rows.filter(row => row.status === 'Not found').length };
}

export function reportText(result) {
  return ['MidSize AI | Roofing estimate reading checklist', 'Automated wording check. Not a price rating, inspection or verification of included work.', '', 'CHECK THESE FIRST', ...result.attention.map(item=>`${item.title}\n${item.detail}\n${item.evidence.map(s=>`  Text: ${s}`).join('\n')}\nAsk: ${item.question}`), '', ...result.rows.map(row => `${row.name}: ${row.status}\n${row.evidence.map(line => `  Text: ${line}`).join('\n')}\nAsk: ${row.question}`), '', 'QUESTIONS TO ASK', ...result.questions.map((q,i) => `${i+1}. ${q}`), '', 'Keep this report private: quoted estimate text may contain personal information.', 'More homeowner tools: https://www.midsizeai.com/#homeowner-tools'].join('\n');
}
