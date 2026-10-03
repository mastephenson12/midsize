import test from 'node:test';
import assert from 'node:assert/strict';
import handler from '../api/homeowner-lead.js';
async function call(method,body){const res={setHeader(){},status(code){this.code=code;return this;},json(data){this.data=data;return this;}};await handler({method,body},res);return res;}
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
