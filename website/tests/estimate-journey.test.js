import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { evaluateEstimate, reportText, contractorMessage } from '../src/estimateEvaluator.js';

function page(fetch) {
  const element = (tag = '') => ({ tag, dataset:{}, checked:false, children:[], value:'', style:{}, hidden:true, disabled:false, innerHTML:'', textContent:'', handlers:{}, attrs:{},
    append(...nodes){for(const node of nodes){if(typeof node==='object')node.parent=this;this.children.push(node);}},
    replaceChildren(){this.children=[];},
    closest(tag){return this.tag===tag?this:this.parent?.closest(tag);},
    querySelector(tag){return this.children.find(child=>child.tag===tag);},
    querySelectorAll(selector){return selector==='input:checked'?this.children.flatMap(child=>child.checked?[child]:child.querySelectorAll?.(selector)??[]):[];},
    classList:{add(){},remove(){}}, setAttribute(k,v){this.attrs[k]=v;}, addEventListener(k,fn){this.handlers[k]=fn;}, focus(){}, reset(){}, scrollIntoView(){} });
  const nodes = new Map();
  const get = id => { if(!nodes.has(id))nodes.set(id,element()); return nodes.get(id); };
  get('project').value='replacement';
  const choices=['second-opinion','another-estimate','find-roofer'].map(situation=>({...element(),dataset:{situation}}));
  const details=[{open:false},{open:true}];
  const events={}; let copied='';
  const storage=new Map(), navigations=[];
  const document={createElement:element,getElementById:get,querySelectorAll:s=>s==='.choice'?choices:s==='#results details'?details:[]};
  let sequence=0;
  const context=vm.createContext({document,fetch,sessionStorage:{setItem:(k,v)=>storage.set(k,v)},location:{assign:path=>navigations.push(path)},evaluateEstimate,reportText,contractorMessage,createUploadReader:()=>({cancel(){}}),crypto:{randomUUID:()=> 'test-request-'+(++sequence)},AbortSignal,window:{addEventListener:(name,fn)=>events[name]=fn},navigator:{clipboard:{writeText:async text=>{copied=text;}}}});
  const script=readFileSync(new URL('../estimate-decoder/index.html',import.meta.url),'utf8').match(/<script type="module">([\s\S]*?)<\/script>/)[1].replace(/^import .*;\n/gm,'');
  vm.runInContext(script,context);
  return {get,choices,events,details,context,storage,navigations,copy:()=>copied};
}

test('results prioritize clarification and copy only questions while printing preserves all detail',async()=>{
  const p=page();
  p.get('estimate').value='PRIVATE OWNER: Example. Replace roofing shingles. Total price $15000. Flashing not included. Additional decking charges apply.';
  p.context.analyze();
  assert.equal(p.get('results').style.display,'block');
  assert.match(p.get('nextQuestions').innerHTML,/flashing|extra charges/i);
  assert.ok((p.get('nextQuestions').innerHTML.match(/<li>/g)||[]).length<=3);
  await p.get('copyQuestions').handlers.click();
  assert.match(p.copy(),/Thank you for preparing/);assert.match(p.copy(),/updated written proposal/);assert.equal(p.get('contractorMessage').textContent,p.copy());assert.match(p.copy(),/Which flashings/);assert.doesNotMatch(p.copy(),/PRIVATE OWNER|15000/);
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


test('follow-up retries retain a reference, block overlapping submits, and require explicit acceptance',async()=>{
 const pending=[],sent=[];
 const p=page((url,options)=>{sent.push(JSON.parse(options.body));return new Promise(resolve=>pending.push(resolve));});
 const submit=()=>p.get('leadform').handlers.submit({preventDefault(){}});
 const first=submit();await submit();assert.equal(sent.length,1);
 pending.shift()({ok:true,json:async()=>({ok:false,error:'Not accepted'})});await first;
 assert.equal(p.get('leadmsg').className,'leadmsg err');
 const retry=submit();assert.equal(sent[0].requestId,sent[1].requestId);
 pending.shift()({ok:true,json:async()=>({ok:true,requestId:sent[1].requestId})});await retry;
 assert.ok(p.get('leadmsg').textContent.includes(sent[1].requestId));assert.match(p.get('leadmsg').textContent,/No roofer or inspection/);
 const next=submit();assert.notEqual(sent[2].requestId,sent[1].requestId);
 pending.shift()({ok:false,json:async()=>({error:'Unavailable'})});await next;
});

for (const failure of ['TimeoutError', 'AbortError', 'TypeError']) {
 test(`${failure} preserves request details and reference for a safe retry`, async()=>{
  const sent=[]; let fail=true;
  const p=page(async(url,options)=>{
   sent.push(JSON.parse(options.body));
   if(fail){const error=new Error('Technical detail');error.name=failure;throw error;}
   return {ok:true,json:async()=>({ok:true,requestId:sent.at(-1).requestId})};
  });
  p.get('name').value='Example Homeowner';p.get('email').value='example@example.com';
  p.get('estimate').value='PRIVATE ESTIMATE TEXT';
  const submit=()=>p.get('leadform').handlers.submit({preventDefault(){}});
  await submit();
  assert.equal(p.get('leadmsg').className,'leadmsg err');
  assert.ok(p.get('leadmsg').textContent.includes(sent[0].requestId));
  assert.match(p.get('leadmsg').textContent,/could not confirm|mark@midsizeai.com/);
  assert.doesNotMatch(p.get('leadmsg').textContent,/Request received|Technical detail/);
  assert.equal(p.get('submitLead').disabled,false);
  assert.equal(p.get('name').value,'Example Homeowner');
  assert.ok(!JSON.stringify(sent[0]).includes('PRIVATE ESTIMATE TEXT'));
  fail=false;await submit();
  assert.equal(sent[1].requestId,sent[0].requestId);
  assert.equal(p.get('leadmsg').className,'leadmsg ok');
 });
}

test('comparison handoff uses only excerpts the homeowner selected and edited',()=>{
  const p=page();
  p.get('estimate').value='Replace roofing shingles. Total price $15000. Flashing not included. Additional decking charges apply.';
  p.context.analyze();
  const fields=p.get('comparisonFields');
  const decking=fields.children.find(field=>field.querySelector('legend').textContent==='Decking and extra charges');
  assert.match(decking.querySelector('textarea').value,/Additional decking charges apply/);
  p.get('openComparison').handlers.click();
  assert.equal(p.storage.size,0);
  assert.equal(p.navigations.length,0);

  decking.querySelector('label').querySelector('input').checked=true;
  decking.querySelector('textarea').value='Decking extra at $95 per sheet';
  p.get('openComparison').handlers.click();
  assert.deepEqual(JSON.parse(p.storage.get('midsize:quote-a:v1')).selected,
    [['Decking and extra charges','Decking extra at $95 per sheet']]);
  assert.deepEqual(p.navigations,['/compare-roofing-estimates/#quote-a']);
});
