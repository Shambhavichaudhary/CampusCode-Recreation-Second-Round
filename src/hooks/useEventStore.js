import { useCallback, useMemo, useState } from 'react';
import { EVENTS, MY_EVENT_SEED } from '../data/eventsData.js';
import { getCurrentUser } from '../utils/auth.js';

function keys() {
  const who = getCurrentUser()?.email?.toLowerCase() || 'guest';
  return {
    joined: `campuscode_joined_events_${who}`,
    wish: `campuscode_wishlist_${who}`,
    tasks: `campuscode_tasks_${who}`,
  };
}

function readJson(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || 'null');
    return value ?? fallback;
  } catch {
    return fallback;
  }
}

const DEFAULT_TASKS = [
  { id: 't1', label: 'Register for FirstCommit Quiz 2.0', done: false, when: 'Today' },
  { id: 't2', label: 'Submit ReBuild ’26 round work', done: false, when: 'Today' },
  { id: 't3', label: 'Update digital card', done: true, when: 'This week' },
  { id: 't4', label: 'Upload latest certificate', done: false, when: 'This week' },
];

function readJoined() {
  const stored = readJson(keys().joined, null);
  return Array.isArray(stored) ? stored : MY_EVENT_SEED;
}

/**
 * Student event participation (joined + wishlist + tasks).
 * Seeds match the original My Events records so registration ids and teams stay intact.
 */
export default function useEventStore() {
  const [joined, setJoined] = useState(readJoined);
  const [wishlist, setWishlist] = useState(() => readJson(keys().wish, []));
  const [tasks, setTasks] = useState(() => readJson(keys().tasks, DEFAULT_TASKS));

  const persistJoined = (next) => {
    setJoined(next);
    localStorage.setItem(keys().joined, JSON.stringify(next));
  };

  const persistWish = (next) => {
    setWishlist(next);
    localStorage.setItem(keys().wish, JSON.stringify(next));
  };

  const isJoined = useCallback(
    (eventId) => joined.some((row) => row.eventId === eventId),
    [joined],
  );

  const isWished = useCallback(
    (eventId) => wishlist.includes(eventId),
    [wishlist],
  );

  const register = useCallback((eventId) => {
    setJoined((prev) => {
      if (prev.some((row) => row.eventId === eventId)) return prev;
      const seed = MY_EVENT_SEED.find((row) => row.eventId === eventId);
      const next = [
        ...prev,
        seed || {
          eventId,
          registration: crypto.randomUUID(),
          team: 'NOT ASSIGNED',
        },
      ];
      localStorage.setItem(keys().joined, JSON.stringify(next));
      return next;
    });
  }, []);

  const toggleWish = useCallback((eventId) => {
    setWishlist((prev) => {
      const next = prev.includes(eventId)
        ? prev.filter((id) => id !== eventId)
        : [...prev, eventId];
      localStorage.setItem(keys().wish, JSON.stringify(next));
      return next;
    });
  }, []);

  const toggleTask = useCallback((taskId) => {
    setTasks((prev) => {
      const next = prev.map((task) => (
        task.id === taskId ? { ...task, done: !task.done } : task
      ));
      localStorage.setItem(keys().tasks, JSON.stringify(next));
      return next;
    });
  }, []);

  const records = useMemo(() => {
    const byId = Object.fromEntries(EVENTS.map((event) => [event.id, event]));
    return joined
      .map((row) => {
        const event = byId[row.eventId];
        if (!event) return null;
        return { ...event, ...row };
      })
      .filter(Boolean);
  }, [joined]);

  return {
    joined,
    wishlist,
    tasks,
    records,
    isJoined,
    isWished,
    register,
    toggleWish,
    toggleTask,
    persistJoined,
    persistWish,
  };
}
