(function () {
  const pendingKey = 'midsize:comparison:pending:v1';
  const savedKey = 'midsize:comparison:saved:v1';
  const fieldsValid = fields => Array.isArray(fields) && fields.length === 11 && fields.every(v => typeof v === 'string' && v.length <= 3000);
  const draftValid = draft => draft && Array.isArray(draft.quotes) && draft.quotes.length === 3 && draft.quotes.every(fieldsValid) && typeof draft.message === 'string' && draft.message.length <= 10000;
  function remove(kind, key) {
    try { window[kind].removeItem(key); return true; } catch (_) { return false; }
  }
  function put(kind, key, data, validate) {
    if (!validate(data)) return false;
    try { window[kind].setItem(key, JSON.stringify({ version: 1, savedAt: Date.now(), data })); return true; } catch (_) { return false; }
  }
  function get(kind, key, lifetime, validate) {
    try {
      const raw = window[kind].getItem(key);
      if (!raw) return { state: 'empty' };
      if (raw.length > 700000) throw new Error('Invalid draft');
      const item = JSON.parse(raw);
      if (item.version !== 1 || !Number.isFinite(item.savedAt) || item.savedAt > Date.now() || !validate(item.data)) throw new Error('Invalid draft');
      if (Date.now() - item.savedAt > lifetime) { remove(kind, key); return { state: 'expired' }; }
      return { state: 'ready', data: item.data };
    } catch (_) { remove(kind, key); return { state: 'unavailable' }; }
  }
  window.MidSizeComparisonDraft = {
    putPending: fields => put('sessionStorage', pendingKey, fields, fieldsValid),
    getPending: () => get('sessionStorage', pendingKey, 30 * 60 * 1000, fieldsValid),
    clearPending: () => remove('sessionStorage', pendingKey),
    save: draft => put('localStorage', savedKey, draft, draftValid),
    load: () => get('localStorage', savedKey, 30 * 24 * 60 * 60 * 1000, draftValid),
    forget: () => remove('localStorage', savedKey),
  };
})();
