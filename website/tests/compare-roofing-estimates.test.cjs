const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

// Run the actual browser worksheet script against a minimal DOM fixture.
function buildFixture(options = {}) {
  const nodes = new Map();
  const elements = [];
  function element(tag='div') {
    const e = {
      tagName: tag.toUpperCase(), children: [], dataset: {}, style: {}, value: '',
      textContent: '', nextElementSibling: null, listeners: {},
      append(...kids) { for(const kid of kids){ this.children.push(kid); if(this.tagName==='TD' && kid.tagName==='TEXTAREA') this._input=kid; if(this.tagName==='TD' && kid.className==='print-value' && this._input)this._input.nextElementSibling=kid; } },
      setAttribute(k,v) {this[k]=v},
      addEventListener(type,fn) {this.listeners[type]=fn},
      click(){ this.listeners.click?.() }, focus(){this.focused=true}, remove(){},
    };
    elements.push(e);return e;
  }
  const rows=element('tbody'); rows.querySelectorAll=()=>elements.filter(x=>x.tagName==='TEXTAREA');
  nodes.set('rows',rows);
  for(const id of ['status','message','download','print','clear','printed-message','save-progress','forget-progress','import-panel','import-preview','import-slot','import-quote','discard-import','import-status'])nodes.set(id,element());
  const buttons=[0,1,2].map(i=>{const b=element('button');b.dataset.message=String(i);return b});
  const document={
    getElementById(id){if(nodes.has(id))return nodes.get(id);return elements.find(x=>x.id===id)??null},
    createElement:element,
    querySelectorAll(q){if(q==='[data-message]')return buttons;if(q==='textarea')return elements.filter(x=>x.tagName==='TEXTAREA');return []},
    body:{append(){}}
  };
  const makeStorage = () => { const data = new Map(); return { getItem: key => data.get(key) ?? null, setItem: (key,value) => data.set(key,value), removeItem: key => data.delete(key) }; };
  const window={sessionStorage: options.session || makeStorage(), localStorage: options.local || makeStorage(), listeners:{},addEventListener(type,fn){this.listeners[type]=fn},confirm(){return options.confirm !== false},print(){}};
  const URL={createObjectURL(){return 'blob:test'},revokeObjectURL(){}};
  const ctx={document,window,URL,Blob,setTimeout(){}};
  const script=fs.readFileSync(path.join(__dirname,'../public/compare-roofing-estimates/worksheet.js'),'utf8');
  vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(path.join(__dirname,'../public/compare-roofing-estimates/draft-store.js'),'utf8'),ctx);
  if(options.pending) window.MidSizeComparisonDraft.putPending(options.pending);
  vm.runInContext(script,ctx,{filename:'worksheet.js'});
  return {document,buttons,nodes,elements,window};
}
test('two realistic different quotes yield clarification questions only for gaps',()=>{
  const f=buildFixture();
  const put=(quote,topic,text)=>f.document.getElementById(`quote-${quote}-${topic}`).value=text;
  put(0,0,'Contractor A, November 2026');put(0,1,'$12,900');
  put(0,2,'Remove existing shingles and dispose of waste');
  put(0,3,'Architectural shingles, synthetic underlayment');
  put(0,6,'Permit and site cleanup included');
  put(0,7,'Three working days');
  put(0,8,'10-year workmanship warranty');
  put(1,0,'Contractor B, November 2026');put(1,1,'$16,400');
  put(1,2,'Full tear-off and disposal');
  put(1,3,'Shingles, ice-water shield and underlayment');
  put(1,4,'Replace damaged decking, $95/sheet with approval');
  put(1,5,'New flashing and ridge vents');
  put(1,6,'Permit, magnetic nail cleanup');
  put(1,7,'Start in December, allow four days');
  put(1,8,'5-year workmanship, manufacturer warranty');
  put(1,9,'30% deposit, remainder upon completion');
  put(1,10,'Skylight replacement excluded');
  f.buttons[0].click();
  const a=f.nodes.get('message').value;
  assert.match(a,/Decking and extra charges/);
  assert.match(a,/Flashing and ventilation/);
  assert.match(a,/Payments and changes/);
  assert.doesNotMatch(a,/- Materials and products/);
  assert.match(f.nodes.get('status').textContent,/nothing has been sent/);
  f.buttons[1].click();
  const b=f.nodes.get('message').value;
  assert.doesNotMatch(b,/- Decking and extra charges/);
  assert.doesNotMatch(b,/- Payments and changes/);
  assert.match(b,/Please confirm the roof areas/);
});
test('no message generated for an empty quote; worksheet text never calls network APIs',()=>{
  const f=buildFixture();f.buttons[0].click();
  assert.match(f.nodes.get('status').textContent,/Enter some details/);
  assert.equal(f.nodes.get('message').value,'');
  const script=fs.readFileSync(path.join(__dirname,'../public/compare-roofing-estimates/worksheet.js'),'utf8');
  assert.doesNotMatch(script,/\bfetch\s*\(|XMLHttpRequest|sendBeacon/);
});

test('excerpts preview as text, import into a chosen quote, and protect existing notes',()=>{
  const fields=Array(11).fill('');fields[0]='Reviewed estimate';fields[5]='Flashing not included. <script>example</script>';
  const f=buildFixture({pending:fields,confirm:false});
  assert.match(f.nodes.get('import-preview').textContent,/Flashing not included/);
  assert.equal(f.document.getElementById('quote-0-5').value,'');
  f.document.getElementById('quote-0-0').value='Existing A';
  f.nodes.get('import-slot').value='0';f.nodes.get('import-quote').click();
  assert.equal(f.document.getElementById('quote-0-0').value,'Existing A');
  f.nodes.get('import-slot').value='1';f.nodes.get('import-quote').click();
  assert.equal(f.document.getElementById('quote-1-5').value,fields[5]);
  assert.equal(f.document.getElementById('quote-0-0').value,'Existing A');
  assert.equal(f.window.MidSizeComparisonDraft.getPending().state,'empty');
  assert.equal(f.window.MidSizeComparisonDraft.load().state,'empty');
});
test('saving is explicit, restores all quotes and message, and clearing deletes saved progress',()=>{
  const f=buildFixture();f.document.getElementById('quote-2-1').value='$18,750';f.nodes.get('message').value='Please confirm decking pricing.';
  assert.equal(f.window.MidSizeComparisonDraft.load().state,'empty');
  f.nodes.get('save-progress').click();
  const restored=buildFixture({local:f.window.localStorage});
  assert.equal(restored.document.getElementById('quote-2-1').value,'$18,750');
  assert.equal(restored.nodes.get('message').value,'Please confirm decking pricing.');
  restored.nodes.get('forget-progress').click();
  assert.equal(restored.window.MidSizeComparisonDraft.load().state,'empty');
  assert.equal(restored.document.getElementById('quote-2-1').value,'$18,750');
  restored.nodes.get('save-progress').click();restored.nodes.get('clear').click();
  assert.equal(restored.window.MidSizeComparisonDraft.load().state,'empty');
  assert.equal(restored.document.getElementById('quote-2-1').value,'');
});
test('blocked storage keeps worksheet usable and reports save failure',()=>{
  const blocked={getItem(){throw Error('blocked')},setItem(){throw Error('blocked')},removeItem(){throw Error('blocked')}};
  const f=buildFixture({local:blocked,session:blocked});
  f.document.getElementById('quote-0-1').value='$12000';f.nodes.get('save-progress').click();
  assert.match(f.nodes.get('status').textContent,/could not save/);
  f.buttons[0].click();assert.match(f.nodes.get('message').value,/Thank you/);
});
test('corrupt, oversized and expired records never restore contents',()=>{
  const f=buildFixture();const store=f.window.localStorage;const key='midsize:comparison:saved:v1';
  for(const raw of ['{broken', 'x'.repeat(700001), JSON.stringify({version:1,savedAt:Date.now()-31*86400000,data:{quotes:Array.from({length:3},()=>Array(11).fill('')),message:''}})]) {
    store.setItem(key,raw);const result=f.window.MidSizeComparisonDraft.load();
    assert.ok(['unavailable','expired'].includes(result.state));assert.equal(store.getItem(key),null);
  }
});
