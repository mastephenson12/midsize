import test from 'node:test';
import assert from 'node:assert/strict';
import handler from '../api/contractor-kit.js';
const valid={firstName:'Alex',email:'alex@example.com',consent:true};
async function call(method,body){const res={headers:{},setHeader(k,v){this.headers[k]=v},status(s){this.code=s;return this},json(data){this.data=data;return this}};await handler({method,body,headers:{'content-type':'application/json'}},res);return res}
test('kit signup fails closed, validates consent, and only succeeds after delivery acceptance',async()=>{
 const previous={...process.env};const originalFetch=global.fetch;
 try{
 delete process.env.CONTRACTOR_KIT_ENABLED;delete process.env.CONTRACTOR_KIT_WEBHOOK_URL;
 assert.equal((await call('GET')).data.ready,false);
 assert.equal((await call('POST',valid)).code,503);
 process.env.CONTRACTOR_KIT_ENABLED='true';process.env.CONTRACTOR_KIT_WEBHOOK_URL='https://example.com/hook';
 assert.equal((await call('GET')).data.ready,true);
 assert.equal((await call('POST',{...valid,consent:false})).code,400);
 assert.equal((await call('POST',{...valid,email:'bad'})).code,400);
 assert.equal((await call('POST','{')).code,400);
 assert.equal((await call('POST',{...valid,companyWebsite:'spam'})).code,400);
 assert.equal((await call('DELETE')).code,405);
 global.fetch=async()=>({ok:false});assert.equal((await call('POST',valid)).code,502);
 global.fetch=async()=>{throw Error('timeout')};assert.equal((await call('POST',valid)).code,502);
 let sent;global.fetch=async(url,options)=>{sent=JSON.parse(options.body);return {ok:true}};
 assert.equal((await call('POST',valid)).code,200);
 assert.equal(sent.email,'alex@example.com');assert.equal(sent.consent,true);assert.ok(sent.consentText);assert.ok(sent.submittedAt);
 }finally{global.fetch=originalFetch;for(const key of ['CONTRACTOR_KIT_ENABLED','CONTRACTOR_KIT_WEBHOOK_URL']){if(previous[key]===undefined)delete process.env[key];else process.env[key]=previous[key]}}
});

