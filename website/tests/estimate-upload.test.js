import test from 'node:test';
import assert from 'node:assert/strict';
import {checkExtractedPages,createUploadReader} from '../src/estimateUpload.js';
test('mixed scanned and selectable PDFs never silently drop pages',()=>{
  assert.throws(()=>checkExtractedPages(['Install asphalt shingles and replace roof flashing.','']),/page 2/);
  assert.match(checkExtractedPages(['Install asphalt shingles and replace roof flashing.','Total price is $15000 including all labor and materials.']),/15000/);
});
test('canceling a slow upload prevents stale text from replacing edits',async()=>{
  let release; const file={name:'scope.txt',type:'text/plain',size:100,text:()=>new Promise(r=>release=r)};
  const reader=createUploadReader({status(){},loadOcr(){}});
  const pending=reader.read([file]);reader.cancel();release('Roof replacement with new asphalt shingles and all flashing.');
  assert.equal(await pending,null);
});
test('several pages append atomically; invalid batches retain caller text',async()=>{
  const reader=createUploadReader({status(){},loadOcr(){}});
  const file={name:'scope.txt',type:'text/plain',size:100,text:async()=> 'Roof replacement with new asphalt shingles and all flashing.'};
  const r=await reader.read([file,file],'Earlier page: roofing estimate.');
  assert.ok(r.text.startsWith('Earlier page'));assert.equal(r.text.match(/Roof replacement/g).length,2);
  await assert.rejects(reader.read([file,{...file,name:'bad.txt',text:async()=>''}]),/Too little/);
  await assert.rejects(reader.read(Array(11).fill(file)),/10 files/);
});
