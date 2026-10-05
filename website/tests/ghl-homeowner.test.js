import test from 'node:test';
import assert from 'node:assert/strict';
import {deliverToGhl,ghlConfigured} from '../lib/ghl-homeowner.js';
const env={GHL_HOMEOWNER_ENABLED:'true',GHL_PRIVATE_INTEGRATION_TOKEN:'fake-test-token',GHL_LOCATION_ID:'location-test',GHL_ASSIGNEE_USER_ID:'owner-test'};
const lead={name:'Test homeowner',email:'test@example.invalid',phone:'',zip:'85001',situation:'second-opinion',roofType:'Tile',timeline:'Within 7 days',microApp:'estimate-decoder',source:'honest-roofer-estimate-decoder',submittedAt:'2026-10-05T12:00:00Z',consentVersion:'2026-10-03',consentText:'Contact me about this request only',requestId:'12345678-1234-1234-1234-123456789012',estimate:'PRIVATE',file:'PRIVATE'};
const now=new Date('2026-10-05T12:00:00Z');
function mockApi(){const calls=[],tasks=[];return {calls,tasks,async fetchImpl(url,opts){calls.push({url,...opts});const body=opts.body?JSON.parse(opts.body):null;if(url.endsWith('/upsert'))return {ok:true,json:async()=>({contact:{id:'contact-test',locationId:'location-test'}})};if(opts.method==='GET')return {ok:true,json:async()=>({tasks})};tasks.push({...body,id:'task-test'});return {ok:true,json:async()=>({task:tasks.at(-1)})};}};}
test('GHL creates contact and due task without files, marketing consent or DND changes',async()=>{
 const api=mockApi();await deliverToGhl(lead,{env,now,fetchImpl:api.fetchImpl});
 assert.equal(api.calls.length,3);assert.equal(api.tasks[0].dueDate,'2026-10-06T12:00:00.000Z');assert.equal(api.tasks[0].assignedTo,'owner-test');
 assert.match(api.tasks[0].body,/Contact me about this request only/);assert.doesNotMatch(JSON.stringify(api.calls),/PRIVATE|"dnd"|"tags"/);
 assert.equal(JSON.parse(api.calls[0].body).phone,undefined);
 await deliverToGhl(lead,{env,now,fetchImpl:api.fetchImpl});assert.equal(api.tasks.length,1);
});
test('urgent requests create tasks due immediately',async()=>{
 const api=mockApi();await deliverToGhl({...lead,timeline:'Emergency / active leak'},{env,now,fetchImpl:api.fetchImpl});assert.match(api.tasks[0].title,/URGENT/);assert.equal(api.tasks[0].dueDate,now.toISOString());
});
test('missing configuration, wrong account, and task failures never claim success',async()=>{
 assert.equal(ghlConfigured({}),false);
 await assert.rejects(deliverToGhl(lead,{env:{},now}),/configuration/);
 await assert.rejects(deliverToGhl(lead,{env,now,fetchImpl:async()=>({ok:true,json:async()=>({contact:{id:'c',locationId:'wrong'}})})}),/unexpected contact/);
 const api=mockApi();await assert.rejects(deliverToGhl(lead,{env,now,fetchImpl:(url,opts)=>opts.method==='POST'&&!url.endsWith('/upsert')?Promise.resolve({ok:false,status:500}):api.fetchImpl(url,opts)}),/failed/);
});
