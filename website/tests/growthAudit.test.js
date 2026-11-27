import { test } from 'node:test';
import assert from 'node:assert/strict';
import { categories, scoreAudit } from '../src/growthAudit.js';
const answers = value => Object.fromEntries(categories.flatMap(c => c.questions.map((_,i) => [c.id+'-'+i,value])));
test('rejects incomplete and invalid answers',()=>{assert.equal(scoreAudit({}),null);assert.equal(scoreAudit({...answers('1'),'social-0':'3'}),null);});
test('scores all endpoints and midpoint',()=>{for(const [v,s] of [['0',0],['1',50],['2',100]]) assert.equal(scoreAudit(answers(v)).score,s);});
test('prioritizes weakest answers and preserves category scores',()=>{const r=scoreAudit({...answers('2'),'social-0':'0','conversion-1':'1'});assert.equal(r.score,85);assert.equal(r.categories.find(c=>c.id==='social').score,50);assert.match(r.actions[0],/weekly schedule/);assert.equal(r.actions.length,2);});
test('perfect score still provides a useful next step',()=>assert.equal(scoreAudit(answers('2')).actions.length,1));
