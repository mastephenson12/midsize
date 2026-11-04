import test from 'node:test';
import assert from 'node:assert/strict';
import {notifyHomeownerRequest} from '../lib/homeowner-alert.js';
const env={HOMEOWNER_ALERT_WEBHOOK_URL:'https://services.leadconnectorhq.com/hooks/test/webhook-trigger/test'};
test('alerts preserve request references and exclude estimate contents',async()=>{
  let sent;
  const result=await notifyHomeownerRequest({requestId:'test-reference',name:'Synthetic',email:'test@example.com',estimateText:'private',phone:'private',rooferAssigned:false},{env,fetchImpl:async(url,options)=>{sent=JSON.parse(options.body);return {ok:true};}});
  assert.equal(result.sent,true);assert.equal(sent.requestId,'test-reference');assert.equal(sent.rooferAssigned,false);
  assert.equal('estimateText' in sent,false);assert.equal('phone' in sent,false);
});
test('disabled, invalid and failed alerts do not fail accepted intake',async()=>{
  assert.equal((await notifyHomeownerRequest({},{env:{},fetchImpl:()=>{throw Error('must not call');}})).sent,false);
  assert.equal((await notifyHomeownerRequest({},{env:{HOMEOWNER_ALERT_WEBHOOK_URL:'https://example.com'},fetchImpl:()=>{throw Error('must not call');}})).sent,false);
  assert.equal((await notifyHomeownerRequest({},{env,fetchImpl:async()=>({ok:false})})).sent,false);
});
