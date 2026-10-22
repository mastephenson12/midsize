import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { evaluateEstimate, reportText } from '../src/estimateEvaluator.js';

function page(fetch) {
  const element = () => ({ value:'', style:{}, hidden:true, disabled:false, innerHTML:'', textContent:'', handlers:{}, attrs:{}, classList:{add(){},remove(){}}, setAttribute(k,v){this.attrs[k]=v;}, addEventListener(k,fn){this.handlers[k]=fn;}, focus(){}, scrollIntoView(){} });
  const nodes = new Map();
  const get = id => { if(!nodes.has(id))nodes.set(id,element()); return nodes.get(id); };
  get('project').value='replacement';
  const choices=['second-opinion','another-estimate','find-roofer'].map(situation=>({...element(),dataset:{situation}}));
  const details=[{open:false},{open:true}];
  const events={}; let copied='';
  const document={getElementById:get,querySelectorAll:s=>s==='.choice'?choices:s==='#results details'?details:[]};
  const context=vm.createContext({document,fetch,evaluateEstimate,reportText,createUploadReader:()=>({cancel(){}}),crypto:{randomUUID:()=> 'test-request-id'},AbortSignal,window:{addEventListener:(name,fn)=>events[name]=fn},navigator:{clipboard:{writeText:async text=>{copied=text;}}}});
  const script=readFileSync(new URL('../estimate-decoder/index.html',import.meta.url),'utf8').match(/<script type="module">([\s\S]*?)<\/script>/)[1].replace(/^import .*;\n/gm,'');
  vm.runInContext(script,context);
  return {get,choices,events,details,context,copy:()=>copied};
}

test('results prioritize clarification and copy only questions while printing preserves all detail',async()=>{
  const p=page();
  p.get('estimate').value='PRIVATE OWNER: Example. Replace roofing shingles. Total price $15000. Flashing not included. Additional decking charges apply.';
  p.context.analyze();
  assert.equal(p.get('results').style.display,'block');
  assert.match(p.get('nextQuestions').innerHTML,/flashing|extra charges/i);
  assert.ok((p.get('nextQuestions').innerHTML.match(/<li>/g)||[]).length<=3);
  await p.get('copyQuestions').handlers.click();
  assert.match(p.copy(),/Which flashings/);assert.doesNotMatch(p.copy(),/PRIVATE OWNER|15000/);
  p.events.beforeprint();assert.ok(p.details.every(d=>d.open));
  p.events.afterprint();assert.equal(p.details[0].open,false);assert.equal(p.details[1].open,true);
});

test('unavailable follow-up keeps contact fields hidden and offers a manual alternative',async()=>{
  const p=page(async()=>({ok:true,json:async()=>({ready:false})}));
  await p.choices[0].handlers.click();
  assert.equal(p.get('leadform').style.display,'none');assert.equal(p.get('helpFallback').hidden,false);assert.equal(p.get('submitLead').disabled,true);
});

test('old readiness responses cannot reopen stale requests or override the latest choice',async()=>{
  const pending=[];const p=page(()=>new Promise(resolve=>pending.push(resolve)));
  const old=p.choices[0].handlers.click();const current=p.choices[1].handlers.click();
  pending[1]({ok:true,json:async()=>({ready:true})});await current;
  assert.equal(p.get('situation').value,'another-estimate');
  pending[0]({ok:true,json:async()=>({ready:false})});await old;
  assert.equal(p.get('leadform').style.display,'block');assert.equal(p.get('helpFallback').hidden,true);
  const editing=p.choices[2].handlers.click();p.context.invalidate();
  pending[2]({ok:true,json:async()=>({ready:true})});await editing;
  assert.equal(p.get('leadform').style.display,'none');assert.ok(p.choices.every(c=>c.attrs['aria-pressed']==='false'));
});
