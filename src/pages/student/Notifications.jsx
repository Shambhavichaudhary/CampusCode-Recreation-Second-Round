import { useMemo, useState } from 'react';
import useDocumentTitle from '../../hooks/useDocumentTitle.js';
import FeaturePage from '../../components/student/FeaturePage.jsx';
import { useStudentUI } from '../../context/StudentUIContext.jsx';
import { DEFAULT_NOTIFICATIONS } from '../../data/studentPagesData.js';

function storageKey(email) {
  return `campuscode_notifications_${(email || 'guest').toLowerCase()}`;
}

function readList(email) {
  try {
    const parsed = JSON.parse(localStorage.getItem(storageKey(email)) || 'null');
    return Array.isArray(parsed) ? parsed : DEFAULT_NOTIFICATIONS;
  } catch {
    return DEFAULT_NOTIFICATIONS;
  }
}

export default function Notifications() {
  useDocumentTitle('CampusCode — Notifications');
  const { user } = useStudentUI();
  const email = user?.email;
  const [items, setItems] = useState(() => readList(email));

  const unread = useMemo(() => items.filter((item) => item.unread).length, [items]);

  function persist(next) {
    setItems(next);
    localStorage.setItem(storageKey(email), JSON.stringify(next));
  }

  function toggle(id) {
    persist(items.map((item) => (item.id === id ? { ...item, unread: !item.unread } : item)));
  }

  function markAllRead() {
    persist(items.map((item) => ({ ...item, unread: false })));
  }

  return (
    <FeaturePage
      kicker="Activity"
      title="Notifications"
      description={`${unread} unread. Tap a card to toggle read state. The list is stored on this browser for your account.`}
    >
      <div className="sd-actions">
        <button type="button" className="sd-ghost-btn" onClick={markAllRead} disabled={unread === 0}>
          Mark all read
        </button>
      </div>
      <div className="sd-feature-stack">
        {items.map((item) => (
          <button
            type="button"
            key={item.id}
            className={`sd-feature-card sd-notif${item.unread ? ' is-unread' : ''}`}
            onClick={() => toggle(item.id)}
          >
            <span className="sd-notif__dot" aria-hidden="true" />
            <span>
              <strong>{item.title}</strong>
              <p className="sd-feature__lead" style={{ marginTop: 4 }}>{item.body}</p>
              <time>{item.time}</time>
            </span>
          </button>
        ))}
      </div>
    </FeaturePage>
  );
}
