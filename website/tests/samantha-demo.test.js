import test from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'vite';
import React from 'react';
import { renderToString } from 'react-dom/server';

test('Samantha renders every scenario, completed handoff, and unavailable-calendar outcome', async () => {
  const server = await createServer({ server: { middlewareMode: true }, appType: 'custom', optimizeDeps: { noDiscovery: true, include: [] } });
  try {
    const { default: Demo, scenarios } = await server.ssrLoadModule('/src/SamanthaDemo.jsx');
    for (const scenario of scenarios) {
      const opening = renderToString(React.createElement(Demo, { initialScenarioId: scenario.id }));
      assert.ok(opening.includes(scenario.prospect), `${scenario.id}: opening question`);
      assert.ok(opening.includes(scenario.conversation[0][1]), `${scenario.id}: first reply`);
      const finished = renderToString(React.createElement(Demo, { initialScenarioId: scenario.id, initialStep: 99, initialSlotsAvailable: false }));
      assert.ok(finished.includes(scenario.decision), `${scenario.id}: decision`);
      assert.ok(finished.includes(scenario.handoff), `${scenario.id}: human handoff`);
      assert.ok(finished.includes(scenario.id === 'notready' ? scenario.action : 'No review time is available now.'), `${scenario.id}: calendar fallback`);
    }
    const boundary = (await server.ssrLoadModule('/src/DemoBoundary.jsx')).default;
    const instance = new boundary({});
    instance.state = { failed: true };
    assert.ok(renderToString(instance.render()).includes('Explore AI call answering'));
  } finally { await server.close(); }
});
