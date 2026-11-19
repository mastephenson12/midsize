import { readFile, writeFile } from 'node:fs/promises';
import { createServer } from 'vite';
import React from 'react';
import { renderToString } from 'react-dom/server';

// Render the actual React components so crawlers and visitors receive the same content.
const server = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
  optimizeDeps: { noDiscovery: true, include: [] },
});
try {
  const template = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');
  for (const [file, component, page] of [
    ['index.html', '/src/App.jsx', 'home'],
    ['roofers.html', '/src/RoofingApp.jsx', 'roofers'],
    ['samantha-demo.html', '/src/SamanthaDemo.jsx', 'demo'],
  ]) {
    const { default: Component } = await server.ssrLoadModule(component);
    const markup = renderToString(React.createElement(Component));
    const path = new URL(`../dist/${file}`, import.meta.url);
    let html = page === 'demo' ? template : await readFile(path, 'utf8');
    if (page === 'demo') html = html.replace(/<title>.*?<\/title>/, '<title>Interactive Samantha Demo | MidSize AI</title>').replace('https://www.midsizeai.com/" />', 'https://www.midsizeai.com/samantha-demo" />');
    const placeholder = '<div id="root"></div>';
    if (!html.includes(placeholder)) throw new Error(`Missing root placeholder in ${file}`);
    await writeFile(path, html.replace(placeholder, () => `<div id="root" data-prerender="${page}">${markup}</div>`));
    console.log(`Prerendered ${file}: ${markup.length} characters`);
  }
} finally {
  await server.close();
}
