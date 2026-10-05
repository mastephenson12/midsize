import test from 'node:test';
import assert from 'node:assert/strict';
import { evaluateEstimate, reportText } from '../src/estimateEvaluator.js';
const row = (text,name,project) => evaluateEstimate(text,project).rows.find(r=>r.name===name);
test('exclusions and extra charges are never treated as confirmed coverage',()=>{
  assert.equal(row('Roof replacement scope. Warranty is not included. Flashing costs extra.','Warranty').status,'Clarify wording');
  assert.equal(row('Roof replacement scope. Warranty is not included. Flashing costs extra.','Flashing').status,'Clarify wording');
});
test('quoted evidence is retained and unrelated clauses do not contaminate it',()=>{
  const r=row('Roof shingles installation. Ten year workmanship warranty. Decking is extra.','Warranty');
  assert.equal(r.status,'Mentioned');assert.deepEqual(r.evidence,['Ten year workmanship warranty']);
});
test('repair does not demand full replacement components',()=>{
  assert.equal(row('Repair roof flashing around one chimney and clean up debris.','Ventilation','repair').status,'Scope dependent');
});
test('empty, non-roofing and excessive inputs require correction',()=>{
  for(const text of ['', 'Paint all kitchen cabinets and install handles on all the doors.', 'roof '.repeat(21000)]) assert.throws(()=>evaluateEstimate(text));
});
test('pressure wording and absent price produce useful questions without scores',()=>{
  const r=evaluateEstimate('Roof replacement with new shingles. Sign today for guaranteed approval.');
  assert.equal(r.pressure,true);assert.equal(r.hasPrice,false);assert.equal(r.score,undefined);assert.match(reportText(r),/total project price/);
});

test('unit costs and monthly amounts do not replace a full project total',()=>{
  for(const price of ['$95 per sheet','Monthly payment $250','Total price $95 per square']) {
    const r=evaluateEstimate('Roof replacement with asphalt shingles. '+price);
    assert.ok(r.attention.some(a=>a.title==='Confirm the full project price'));
  }
  const r=evaluateEstimate('Roof replacement with shingles. Total price $18,750. Decking $95 per sheet.');
  assert.ok(!r.attention.some(a=>a.title==='Confirm the full project price'));
});
test('conflicting totals, conditional charges and upfront payment surface with evidence',()=>{
  const r=evaluateEstimate('Roof replacement. Total price $12000. Total price $15000. Full payment due before work begins. Decking costs extra.');
  for(const title of ['Clarify which total applies','Review payment before work begins','Ask how the price can change']) assert.ok(r.attention.some(a=>a.title===title&&a.evidence.length));
  assert.match(reportText(r),/CHECK THESE FIRST/);
});
test('ordinary final payment does not trigger advance payment warning',()=>{
  const r=evaluateEstimate('Roof shingles replacement. Total price $18000. Full payment after final inspection.');
  assert.ok(!r.attention.some(a=>a.title==='Review payment before work begins'));
});
test('keywords inside unrelated words do not satisfy topics',()=>{
  assert.equal(row('Roof repair with a decorative metal finish and a payment plan.','Water protection').status,'Not found');
});
test('mixed inclusion and exclusion stays in clarification',()=>{
  assert.equal(row('Roof replacement. Manufacturer warranty included. Workmanship warranty excluded.','Warranty').status,'Clarify wording');
});

test('removing a layer of shingles is recognized as removal',()=>{
  assert.equal(row('Remove one layer of existing asphalt shingles down to roof decking.','Removal').status,'Mentioned');
});
