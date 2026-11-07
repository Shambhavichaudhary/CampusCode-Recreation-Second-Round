import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import usePageStyles from '../../hooks/usePageStyles.js';
import useDocumentTitle from '../../hooks/useDocumentTitle.js';
import eventsCss from '../../styles/pages/events.css?inline';

import EventBanner from '../../components/events/EventBanner.jsx';
import EventDetailsModal from '../../components/events/EventDetailsModal.jsx';
import Icon from '../../components/student/Icon.jsx';
import { EVENTS } from '../../data/eventsData.js';
import { useStudentUI } from '../../context/StudentUIContext.jsx';

const TABS = [
  { id: 'registered', label: 'Registered' },
  { id: 'ongoing', label: 'Ongoing' },
  { id: 'completed', label: 'Completed' },
  { id: 'wishlist', label: 'Wishlist' },
];

function participation(event) {
  if (event.status === 'LIVE') return 'Ongoing';
  if (event.status === 'COMPLETED') return 'Completed';
  return 'Upcoming';
}

export default function MyEvents() {
  useDocumentTitle('My Events — CampusCode Student');
  usePageStyles([eventsCss]);

  const { records, wishlist, isJoined, isWished, register, toggleWish } = useStudentUI();
  const [tab, setTab] = useState('registered');
  const [query, setQuery] = useState('');
  const [details, setDetails] = useState(null);

  const wishedEvents = EVENTS.filter((e) => wishlist.includes(e.id));
  const ongoing = records.filter((e) => e.status === 'LIVE' || e.status === 'UPCOMING');
  const completed = records.filter((e) => e.status === 'COMPLETED');

  const lists = {
    registered: records,
    ongoing,
    completed,
    wishlist: wishedEvents,
  };

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    const source = tab === 'registered'
      ? records
      : tab === 'ongoing'
        ? ongoing
        : tab === 'completed'
          ? completed
          : wishedEvents;
    return source.filter((e) => !q || e.title.toLowerCase().includes(q));
  }, [tab, query, records, ongoing, completed, wishedEvents]);

  return (
    <main className="content sd-content sd-my-events">
      <section className="hero sd-page-hero">
        <div>
          <div className="eyebrow">My activity</div>
          <h1>My Events</h1>
          <p>Track registrations, participation and your event journey at CampusCode.</p>
        </div>
        <Link to="/student/events" className="sd-ghost-btn">Explore events</Link>
      </section>

      <section className="sd-feature-banner sd-feature-banner--split">
        <div>
          <h2>Your event journey</h2>
          <p>Every event you joined, in one place. Open one to see its rounds, team, results and certificates.</p>
        </div>
        <div className="sd-journey-stats">
          <div><b>{records.length}</b><span>Total registered</span></div>
          <div><b>{ongoing.length}</b><span>Ongoing</span></div>
          <div><b>{completed.length}</b><span>Completed</span></div>
        </div>
      </section>

      <div className="sd-toolbar sd-toolbar--tabs">
        {TABS.map((item) => (
          <button
            key={item.id}
            type="button"
            className={tab === item.id ? 'chip active' : 'chip'}
            onClick={() => setTab(item.id)}
          >
            {item.label} ({lists[item.id].length})
          </button>
        ))}
        <label className="sd-search sd-search--inline">
          <Icon name="i-search" className="sd-search__icon" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search in my events…" />
        </label>
      </div>

      <section className="sd-my-list">
        <h3>{TABS.find((t) => t.id === tab)?.label} events</h3>
        {rows.length === 0 && <p className="sd-empty">Nothing in this list yet.</p>}
        {rows.map((event) => (
          <article className="my-card sd-my-row" key={event.registration || event.id}>
            <EventBanner type={event.banner} showQuestions={event.banner === 'quiz'} />
            <div className="sd-my-row__body">
              {event.registration && (
                <div className="reg-row">
                  <span className="l">Registration</span>
                  <span className="r">{event.registration}</span>
                </div>
              )}
              <div className={event.start ? 'my-title start' : 'my-title'}>
                <div className={event.dark ? 'circle dark' : 'circle'}>{event.circle}</div>
                <h2>{event.title}</h2>
              </div>
              <p className="sd-my-meta">{event.category} · {event.date} · {event.location}</p>
              <div className="row first">Status: <b>{isJoined(event.id) || event.registration ? 'Registered' : 'Saved'}</b></div>
              {event.team && (
                <div className="row team">TEAM: <b className={event.teamIsName ? 'name' : undefined}>{event.team}</b></div>
              )}
              <div className="row">Participation: <b>{participation(event)}</b></div>
              <div className="sd-my-actions">
                <button type="button" className="btn-view" onClick={() => setDetails(event)}>View details</button>
                {event.registration && <a className="btn-journey" href="#">Open Journey ↗</a>}
                {event.status === 'LIVE' && <span className="sd-pill">View dashboard</span>}
                {!event.registration && (
                  <button type="button" className="btn-reg" onClick={() => register(event.id)}>Register now ↗</button>
                )}
              </div>
            </div>
          </article>
        ))}
      </section>

      {completed.length > 0 && tab !== 'completed' && (
        <section className="sd-past">
          <div className="panel__head">
            <h3>Past events</h3>
            <button type="button" className="link" onClick={() => setTab('completed')}>View all →</button>
          </div>
          <div className="sd-past__row">
            {completed.map((event) => (
              <button type="button" key={event.id} className="sd-past__chip" onClick={() => setDetails(event)}>
                <span className="circle">{event.circle}</span>
                <span>
                  <strong>{event.title}</strong>
                  <small>{event.date} · Completed</small>
                </span>
              </button>
            ))}
          </div>
        </section>
      )}

      <EventDetailsModal
        event={details}
        onClose={() => setDetails(null)}
        joined={details ? isJoined(details.id) : false}
        wished={details ? isWished(details.id) : false}
        onRegister={register}
        onWish={toggleWish}
      />
    </main>
  );
}
