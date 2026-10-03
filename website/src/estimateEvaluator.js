// A deterministic reading checklist, never a price, quality or contract judgment.
export const topics = [
  ['Scope and quantities', /\b(scope|remove|replace|install|repair|sq\.?\s*ft|square feet|squares)\b/i, 'What exact areas, quantities and work are included in the written price?'],
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
  ['Exclusions and changes', /\b(exclusions?|not included|additional cost|change orders?|extra charge|allowance)\b/i, 'Which items can change the price, and will changes require written approval?'],
];

export function evaluateEstimate(raw, project = 'replacement') {
  const text = String(raw || '').trim();
  if (text.length < 40) throw new Error('Add at least 40 characters of the written roofing scope.');
  if (text.length > 100000) throw new Error('Please review one estimate at a time, up to 100,000 characters.');
  if (!/\b(roof\w*|shingles?|underlayment|flashing|tpo|decking)\b/i.test(text)) throw new Error('This version checks roofing estimates. Add the roofing scope, or use the homeowner hub for other questions.');
  const clauses = text.split(/\n+|[;!?]+|\.(?=\s+[A-Z]|$)/).map(s => s.trim()).filter(Boolean);
  const caution = /\b(no|not|exclude\w*|except|extra|additional|allowance|optional|by owner|owner responsibility|reuse\w*|retain\w*|as needed|if needed|where applicable)\b/i;
  const rows = topics.map(([name, pattern, question, only]) => {
    const found = clauses.filter(line => pattern.test(line));
    const relevant = project !== 'repair' || !only || found.length > 0;
    const status = !relevant ? 'Scope dependent' : !found.length ? 'Not found' : found.some(line => caution.test(line)) ? 'Clarify wording' : 'Mentioned';
    return { name, status, question, evidence: [...found].sort((a,b) => Number(caution.test(b))-Number(caution.test(a))).slice(0, 2).map(line => line.length > 320 ? line.slice(0, 320) + '…' : line) };
  });
  const pressure = /\b(today only|sign today|must sign|guaranteed approval|waive your deductible|insurance will pay)\b/i.test(text);
  const hasPrice = /\$\s?\d|\b\d[\d,]*(?:\.\d{2})?\s*(?:USD|dollars)\b/i.test(text);
  const questions = [
    ...(!hasPrice ? ['What is the total price or pricing method, including allowances and possible extra costs?'] : []),
    ...(pressure ? ['Can I take time to review this, and get any deadline or payment promises explained in writing?'] : []),
    ...rows.filter(row => row.status === 'Clarify wording' || row.status === 'Not found').map(row => row.question),
  ];
  if (!questions.length) questions.push('Can you confirm the exact materials, quantities, responsibilities and exclusions in writing?');
  return { project, rows, questions, pressure, hasPrice, mentioned: rows.filter(row => row.status === 'Mentioned').length, clarify: rows.filter(row => row.status === 'Clarify wording').length, missing: rows.filter(row => row.status === 'Not found').length };
}

export function reportText(result) {
  return ['MIDSize AI | Roofing estimate reading checklist', 'Automated wording check. Not a price rating, inspection or verification of included work.', '', ...result.rows.map(row => `${row.name}: ${row.status}\n${row.evidence.map(line => `  Text: ${line}`).join('\n')}\nAsk: ${row.question}`), '', 'QUESTIONS TO ASK', ...result.questions.map((q,i) => `${i+1}. ${q}`), '', 'Keep this report private: quoted estimate text may contain personal information.', 'More homeowner tools: https://homeowner.midsizeai.com/'].join('\n');
}
