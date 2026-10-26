import test from 'node:test';
import assert from 'node:assert/strict';
import handler from '../api/homeowner-lead.js';
async function call(method,body,headers={origin:'https://www.midsizeai.com','content-type':'application/json'}){const res={setHeader(){},status(code){this.code=code;return this;},json(data){this.data=data;return this;}};await handler({method,body,headers},res);return res;}
test('estimate gateway reports readiness and never forwards raw estimates',async()=>{
  const prior=process.env.HOMEOWNER_LEAD_WEBHOOK_URL, oldFetch=global.fetch;
  try{
    delete process.env.HOMEOWNER_LEAD_WEBHOOK_URL;
    assert.equal((await call('GET')).data.ready,false);
    const lead={name:'Test',email:'test@example.com',zip:'85001',situation:'second-opinion',tool:'estimate-decoder',score:null,consent:true,estimate:'PRIVATE ESTIMATE',file:'PRIVATE FILE'};
    assert.equal((await call('POST',lead)).code,503);
    process.env.HOMEOWNER_LEAD_WEBHOOK_URL='https://example.com/test';
    assert.equal((await call('GET')).data.ready,true);
    assert.equal((await call('POST',{...lead,consent:false})).code,400);
    let sent;
    global.fetch=async(url,options)=>{sent=JSON.parse(options.body);return {ok:true};};
    assert.equal((await call('POST',lead)).code,200);
    assert.equal(sent.decoderScore,null);assert.equal(sent.estimate,undefined);assert.equal(sent.file,undefined);assert.ok(sent.consentText);assert.ok(sent.consentVersion);
    global.fetch=async()=>({ok:false});assert.equal((await call('POST',lead)).code,502);
  }finally{global.fetch=oldFetch;if(prior===undefined)delete process.env.HOMEOWNER_LEAD_WEBHOOK_URL;else process.env.HOMEOWNER_LEAD_WEBHOOK_URL=prior;}
});

test('homeowner intake rejects cross-site, non-JSON, malformed and oversized requests before delivery',async()=>{
 const previous=global.fetch;
 let requests=0;
 global.fetch=async()=>{requests++;throw Error('must not deliver invalid input');};
 try {
  assert.equal((await call('POST',{}, {origin:'https://attacker.example','content-type':'application/json'})).code,403);
  assert.equal((await call('POST',{}, {'content-type':'application/json'})).code,403);
  assert.equal((await call('POST',{}, {origin:'https://www.midsizeai.com','content-type':'text/plain'})).code,415);
  assert.equal((await call('POST','{')).code,400);
  assert.equal((await call('POST',[])).code,400);
  assert.equal((await call('POST',null)).code,400);
  assert.equal((await call('POST',{payload:'x'.repeat(9000)})).code,413);
  assert.equal((await call('POST',JSON.stringify({payload:'x'.repeat(9000)}))).code,413);
  assert.equal(requests,0);
 } finally {global.fetch=previous;}
});

test('contact preference is validated and forwarded to the integration',async()=>{
 const prior=process.env.HOMEOWNER_LEAD_WEBHOOK_URL, oldFetch=global.fetch;
 const lead={name:'Test',email:'test@example.com',zip:'85001',situation:'find-roofer',tool:'roof-leak-triage',consent:true};
 let sent, calls=0;
 try {
  process.env.HOMEOWNER_LEAD_WEBHOOK_URL='https://example.com/test';
  global.fetch=async(url,options)=>{calls++;sent=JSON.parse(options.body);return {ok:true};};
  for(const changes of [{contactMethod:'text'},{contactMethod:'phone'},{phone:'abcdefghij'},{phone:'123'}]) {
   assert.equal((await call('POST',{...lead,...changes})).code,400);
  }
  assert.equal(calls,0);
  assert.equal((await call('POST',{...lead,phone:'+1 (202) 555-0123',contactMethod:'phone',urgency:'today'})).code,200);
  assert.equal(sent.contactMethod,'phone');assert.equal(sent.urgency,'today');assert.equal(sent.routingStatus,'pending-midsize-review');assert.equal(sent.rooferAssigned,false);assert.equal(sent.consentVersion,'2026-10-26');
  assert.equal((await call('POST',lead)).code,200);assert.equal(sent.contactMethod,'email');
 } finally {global.fetch=oldFetch;if(prior===undefined)delete process.env.HOMEOWNER_LEAD_WEBHOOK_URL;else process.env.HOMEOWNER_LEAD_WEBHOOK_URL=prior;}
});
