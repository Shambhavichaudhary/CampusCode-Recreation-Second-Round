import { useCallback, useMemo, useState } from 'react';
import { getCurrentUser } from '../utils/auth.js';
import { DEFAULT_PREFS, WIDGETS } from '../data/dashboardConfig.js';

function storageKey() {
  const user = getCurrentUser();
  const who = user?.email?.toLowerCase() || 'guest';
  return `campuscode_dashboard_prefs_${who}`;
}

/** Merge saved JSON with the current widget catalogue so new widgets still appear. */
export function normalizePrefs(raw) {
  const saved = raw && typeof raw === 'object' ? raw : {};
  const known = new Set(WIDGETS.map((w) => w.id));
  const savedOrder = Array.isArray(saved.order) ? saved.order.filter((id) => known.has(id)) : [];
  const missing = WIDGETS.map((w) => w.id).filter((id) => !savedOrder.includes(id));
  const hidden = Array.isArray(saved.hidden) ? saved.hidden.filter((id) => known.has(id)) : [];
  const layoutStyle = ['default', 'compact', 'minimal'].includes(saved.layoutStyle)
    ? saved.layoutStyle
    : DEFAULT_PREFS.layoutStyle;
  const appearance = ['balanced', 'purple', 'green'].includes(saved.appearance)
    ? saved.appearance
    : DEFAULT_PREFS.appearance;

  return {
    order: [...savedOrder, ...missing],
    hidden,
    layoutStyle,
    appearance,
  };
}

function readPrefs() {
  try {
    const parsed = JSON.parse(localStorage.getItem(storageKey()) || 'null');
    return normalizePrefs(parsed);
  } catch {
    return { ...DEFAULT_PREFS, order: [...DEFAULT_PREFS.order], hidden: [] };
  }
}

function writePrefs(prefs) {
  localStorage.setItem(storageKey(), JSON.stringify(normalizePrefs(prefs)));
}

/**
 * Dashboard layout preferences, keyed per logged-in student.
 * There is no backend in this project, so localStorage is the persistence layer
 * already used by auth.
 */
export default function useDashboardPrefs() {
  const [saved, setSaved] = useState(readPrefs);
  const [draft, setDraft] = useState(saved);
  const [panelOpen, setPanelOpen] = useState(false);

  const openPanel = useCallback(() => {
    setDraft(saved);
    setPanelOpen(true);
  }, [saved]);

  const closePanel = useCallback((revert = true) => {
    if (revert) setDraft(saved);
    setPanelOpen(false);
  }, [saved]);

  const save = useCallback(() => {
    const next = normalizePrefs(draft);
    writePrefs(next);
    setSaved(next);
    setDraft(next);
    setPanelOpen(false);
  }, [draft]);

  const reset = useCallback(() => {
    const next = { ...DEFAULT_PREFS, order: [...DEFAULT_PREFS.order], hidden: [] };
    writePrefs(next);
    setSaved(next);
    setDraft(next);
  }, []);

  const updateDraft = useCallback((patch) => {
    setDraft((prev) => normalizePrefs({ ...prev, ...patch }));
  }, []);

  const moveWidget = useCallback((fromId, toId) => {
    if (!fromId || !toId || fromId === toId) return;
    setDraft((prev) => {
      const order = [...prev.order];
      const from = order.indexOf(fromId);
      const to = order.indexOf(toId);
      if (from < 0 || to < 0) return prev;
      order.splice(from, 1);
      order.splice(to, 0, fromId);
      return { ...prev, order };
    });
  }, []);

  const toggleHidden = useCallback((id) => {
    setDraft((prev) => {
      const hidden = prev.hidden.includes(id)
        ? prev.hidden.filter((item) => item !== id)
        : [...prev.hidden, id];
      return { ...prev, hidden };
    });
  }, []);

  const prefs = panelOpen ? draft : saved;

  const visibleOrder = useMemo(
    () => prefs.order.filter((id) => !prefs.hidden.includes(id)),
    [prefs],
  );

  return {
    saved,
    draft,
    prefs,
    visibleOrder,
    panelOpen,
    openPanel,
    closePanel,
    save,
    reset,
    updateDraft,
    moveWidget,
    toggleHidden,
  };
}
