const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

// Run the actual browser worksheet script against a minimal DOM fixture.
function buildFixture(windowOptions = {}) {
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
  for(const id of ['status','message','download','print','clear','printed-message','quote-a'])nodes.set(id,element());
  const buttons=[0,1,2].map(i=>{const b=element('button');b.dataset.message=String(i);return b});
  const document={
    getElementById(id){if(nodes.has(id))return nodes.get(id);return elements.find(x=>x.id===id)??null},
    createElement:element,
    querySelectorAll(q){if(q==='[data-message]')return buttons;if(q==='textarea')return elements.filter(x=>x.tagName==='TEXTAREA');return []},
    body:{append(){}}
  };
  const window={listeners:{},addEventListener(type,fn){this.listeners[type]=fn},confirm(){return true},print(){},...windowOptions};
  const URL={createObjectURL(){return 'blob:test'},revokeObjectURL(){}};
  const ctx={document,window,URL,Blob,setTimeout(){}};
  const script=fs.readFileSync(path.join(__dirname,'../public/compare-roofing-estimates/worksheet.js'),'utf8');
  vm.runInNewContext(script,ctx,{filename:'worksheet.js'});
  return {document,buttons,nodes,elements};
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
  assert.match(a,/what will you charge per sheet/);
  assert.match(a,/Flashing and ventilation/);
  assert.match(a,/Payments and changes/);
  assert.doesNotMatch(a,/- Materials and products/);
  assert.match(f.nodes.get('status').textContent,/nothing has been sent/);
  f.buttons[1].click();
  const b=f.nodes.get('message').value;
  assert.doesNotMatch(b,/- Decking and extra charges/);
  assert.doesNotMatch(b,/what will you charge per sheet/);
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

test('the worksheet consumes selected excerpts once and writes only to Quote A', () => {
  const key = 'midsize:quote-a:v1';
  const store = new Map([[key, JSON.stringify({
    expires: Date.now() + 60000,
    selected: [
      ['Decking and extra charges', 'Damaged decking is extra at $95 per sheet.'],
      ['Quote B: Materials', 'Ignore unrecognized fields'],
      ['Warranties', 'x'.repeat(3001)]
    ]
  })]]);
  const options = {
    location: {hash:'#quote-a'},
    sessionStorage: {getItem: k => store.get(k) ?? null, removeItem: k => store.delete(k)}
  };
  const f = buildFixture(options);
  assert.equal(f.document.getElementById('quote-0-4').value, 'Damaged decking is extra at $95 per sheet.');
  assert.equal(f.document.getElementById('quote-0-8').value, '');
  assert.ok(f.elements.filter(e => /^quote-[12]-/.test(e.id)).every(e => !e.value));
  assert.equal(store.has(key), false);
  const reopened = buildFixture(options);
  assert.equal(reopened.document.getElementById('quote-0-4').value, '');
  assert.match(reopened.nodes.get('quote-a').textContent, /no excerpts/);
});
