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
  for (const [file, component, page] of [
    ['index.html', '/src/App.jsx', 'home'],
    ['roofers.html', '/src/RoofingApp.jsx', 'roofers'],
  ]) {
    const { default: Component } = await server.ssrLoadModule(component);
    const markup = renderToString(React.createElement(Component));
    const path = new URL(`../dist/${file}`, import.meta.url);
    const html = await readFile(path, 'utf8');
    const placeholder = '<div id="root"></div>';
    if (!html.includes(placeholder)) throw new Error(`Missing root placeholder in ${file}`);
    await writeFile(path, html.replace(placeholder, () => `<div id="root" data-prerender="${page}">${markup}</div>`));
    console.log(`Prerendered ${file}: ${markup.length} characters`);
  }
} finally {
  await server.close();
}
