// Uploads stay in the browser. Never silently evaluate an unreadable PDF page.
export function checkExtractedPages(pages) {
  const missing = pages.flatMap((text,i)=>text.replace(/\s/g,'').length<20 ? [i+1] : []);
  if(missing.length) throw new Error(`PDF page${missing.length===1?'':'s'} ${missing.join(', ')} could not be read reliably. Upload clear photos of those pages or paste their text. No partial PDF was used.`);
  return checkTextLength(pages.join('\n\n'));
}
export function checkTextLength(text) {
  if(text.trim().length<40) throw new Error('Too little readable text. Use a brighter, straight-on photo with all four corners visible, or paste the written scope.');
  if(text.length>100000) throw new Error('This estimate exceeds 100,000 characters. Choose only the relevant estimate pages.');
  return text.trim();
}
export function createUploadReader({loadOcr, status}) {
  let active=0, worker=null;
  const cancel=()=>{++active; if(worker){void worker.terminate();worker=null;}};
  async function read(files, appendText='') {
    cancel(); const job=active;
    const current=()=>job===active;
    const update=message=>{if(current())status(message);};
    if(files.length>10) throw new Error('Choose up to 10 files from the same estimate at a time.');
    if(files.reduce((n,f)=>n+f.size,0)>30*1024*1024) throw new Error('Choose fewer or smaller files: the combined limit is 30 MB.');
    const parts=[]; const warnings=[];
    for(const file of files){
      if(!current())return null;
      if(file.size>15*1024*1024) throw new Error(`${file.name} is larger than 15 MB. Choose a smaller copy.`);
      let text;
      if(file.type==='application/pdf'||/\.pdf$/i.test(file.name)) {
        update(`Opening ${file.name}…`);
        const pdfjs=await import('pdfjs-dist');
        const {default:pdfWorkerUrl}=await import('pdfjs-dist/build/pdf.worker.min.mjs?url');
        pdfjs.GlobalWorkerOptions.workerSrc=pdfWorkerUrl;
        const loading=pdfjs.getDocument({data:await file.arrayBuffer(),isEvalSupported:false});
        try {
          const pdf=await loading.promise;
          if(pdf.numPages>30)throw new Error('Choose a PDF with 30 pages or fewer.');
          const pages=[];
          for(let n=1;n<=pdf.numPages;n++){
            if(!current())return null;
            update(`Reading ${file.name}: page ${n} of ${pdf.numPages}…`);
            const page=await pdf.getPage(n); const content=await page.getTextContent();
            pages.push(content.items.map(item=>(item.str||'')+(item.hasEOL?'\n':' ')).join(''));
          }
          text=checkExtractedPages(pages);
        } finally {await loading.destroy();}
      } else if(['image/jpeg','image/png','image/webp'].includes(file.type)) {
        update(`Preparing ${file.name}…`); await loadOcr(); if(!current())return null;
        const localWorker=await window.Tesseract.createWorker('eng',1,{logger:m=>{if(m.status==='recognizing text')update(`Reading ${file.name}: ${Math.round((m.progress||0)*100)}%…`);}});
        if(!current()){await localWorker.terminate();return null;}
        worker=localWorker;
        try {
          const result=await localWorker.recognize(file);
          text=checkTextLength(result.data.text);
          if(result.data.confidence<75)warnings.push(`${file.name}: some words may be misread`);
        } finally {if(worker===localWorker){worker=null;await localWorker.terminate();}}
      } else if(file.type==='text/plain'||/\.txt$/i.test(file.name)) text=checkTextLength(await file.text());
      else throw new Error('Choose PDF, JPG, PNG, WEBP, or TXT. For an iPhone HEIC photo, export a JPG or use a screenshot.');
      parts.push(text);
    }
    if(!current())return null;
    return {text:checkTextLength([appendText,...parts].filter(Boolean).join('\n\n')),warnings};
  }
  return {read,cancel};
}
