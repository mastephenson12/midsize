import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';

function requestForm(fetch) {
 const node=()=>({value:'',disabled:false,textContent:'',className:'',handlers:{},classList:{add(){},remove(){}},addEventListener(k,fn){this.handlers[k]=fn;},scrollIntoView(){}});
 const fields={situation:node(),message:node(),submit:node()};
 const values={name:'Example Homeowner',email:'example@example.com',zip:'85323',consent:'yes',situation:'second-opinion',contactMethod:'email'};
 let resets=0,sequence=0;
 const form={querySelector:s=>s==='[name="situation"]'?fields.situation:s==='.message'?fields.message:fields.submit,handlers:{},addEventListener(k,fn){this.handlers[k]=fn;},reset(){resets++;},classList:{add(){}},scrollIntoView(){}};
 const context=vm.createContext({fetch,crypto:{randomUUID:()=>`test-request-${++sequence}`},AbortSignal,FormData:class{get(k){return values[k]??null;}},window:{location:{pathname:'/roofing/leak-triage/'}}});
 vm.runInContext(readFileSync(new URL('../src/micro-app-shell.js',import.meta.url),'utf8').replaceAll('export function','function'),context);
 context.wireHelpRequest({container:{querySelectorAll:()=>[]},form,tool:'roof-leak-triage',getResult:()=>({result:'active-leak',urgency:'today'})});
 return {fields,values,submit:()=>form.handlers.submit({preventDefault(){}}),resets:()=>resets};
}

for(const name of ['TimeoutError','AbortError','TypeError'])test(`${name}: shared roofing form keeps details and reference, then retries successfully`,async()=>{
 const sent=[];let fail=true;
 const p=requestForm(async(url,options)=>{sent.push(JSON.parse(options.body));if(fail){const error=new Error('Technical detail');error.name=name;throw error;}return {ok:true,json:async()=>({ok:true})};});
 await p.submit();
 assert.equal(p.fields.message.className,'message error');
 assert.match(p.fields.message.textContent,/could not confirm/);
 assert.ok(p.fields.message.textContent.includes(sent[0].requestId));
 assert.match(p.fields.message.textContent,/mark@midsizeai.com/);
 assert.doesNotMatch(p.fields.message.textContent,/Request received|Technical detail/);
 assert.equal(p.fields.submit.disabled,false);assert.equal(p.resets(),0);
 assert.equal(p.values.name,'Example Homeowner');
 assert.equal(sent[0].urgency,'today');assert.equal(sent[0].contactMethod,'email');
 fail=false;await p.submit();
 assert.equal(sent[1].requestId,sent[0].requestId);assert.equal(p.resets(),1);
 assert.equal(p.fields.message.className,'message ok');
 assert.match(p.fields.message.textContent,/No roofer or inspection has been assigned/);
 await p.submit();assert.notEqual(sent[2].requestId,sent[1].requestId);
});

test('shared form preserves validation messages and blocks overlapping submissions',async()=>{
 let resolve,count=0;
 const p=requestForm(()=>{count++;return new Promise(r=>{resolve=r;});});
 const first=p.submit();await p.submit();assert.equal(count,1);
 resolve({ok:false,json:async()=>({error:'Please enter a valid email address.'})});await first;
 assert.equal(p.fields.message.textContent,'Please enter a valid email address.');
 assert.equal(p.fields.submit.disabled,false);assert.equal(p.resets(),0);
});
