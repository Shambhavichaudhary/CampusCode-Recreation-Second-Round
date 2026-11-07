import { useCallback, useMemo, useRef, useState } from 'react';
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

function clonePrefs(prefs) {
  return normalizePrefs({
    ...prefs,
    order: [...(prefs.order || [])],
    hidden: [...(prefs.hidden || [])],
  });
}

/**
 * Dashboard layout preferences, keyed per logged-in student.
 * Appearance, layout and widget visibility apply immediately and persist to localStorage.
 */
export default function useDashboardPrefs() {
  const [saved, setSaved] = useState(readPrefs);
  const [draft, setDraft] = useState(saved);
  const [panelOpen, setPanelOpen] = useState(false);
  const snapshotRef = useRef(null);

  const commit = useCallback((next) => {
    const normalized = normalizePrefs(next);
    writePrefs(normalized);
    setSaved(normalized);
    setDraft(normalized);
    return normalized;
  }, []);

  const openPanel = useCallback(() => {
    snapshotRef.current = clonePrefs(saved);
    setDraft(saved);
    setPanelOpen(true);
  }, [saved]);

  const closePanel = useCallback((revert = false) => {
    if (revert && snapshotRef.current) {
      commit(snapshotRef.current);
    }
    setPanelOpen(false);
  }, [commit]);

  const save = useCallback(() => {
    commit(draft);
    setPanelOpen(false);
  }, [commit, draft]);

  const reset = useCallback(() => {
    commit({ ...DEFAULT_PREFS, order: [...DEFAULT_PREFS.order], hidden: [] });
  }, [commit]);

  const updateDraft = useCallback((patch) => {
    setDraft((prev) => {
      const next = normalizePrefs({ ...prev, ...patch });
      writePrefs(next);
      setSaved(next);
      return next;
    });
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
      const next = { ...prev, order };
      writePrefs(next);
      setSaved(next);
      return next;
    });
  }, []);

  const toggleHidden = useCallback((id) => {
    setDraft((prev) => {
      const hidden = prev.hidden.includes(id)
        ? prev.hidden.filter((item) => item !== id)
        : [...prev.hidden, id];
      const next = { ...prev, hidden };
      writePrefs(next);
      setSaved(next);
      return next;
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
