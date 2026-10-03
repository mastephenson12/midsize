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
  assert.equal(r.pressure,true);assert.equal(r.hasPrice,false);assert.equal(r.score,undefined);assert.match(reportText(r),/total price/);
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
