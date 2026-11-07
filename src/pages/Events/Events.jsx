import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import usePageStyles from '../../hooks/usePageStyles.js';
import useDocumentTitle from '../../hooks/useDocumentTitle.js';
import eventsCss from '../../styles/pages/events.css?inline';

import EventBanner from '../../components/events/EventBanner.jsx';
import EventDetailsModal from '../../components/events/EventDetailsModal.jsx';
import Icon from '../../components/student/Icon.jsx';
import { EVENTS } from '../../data/eventsData.js';
import { useStudentUI } from '../../context/StudentUIContext.jsx';

const FILTERS = [
  { value: 'all', label: 'All events' },
  { value: 'hackathon', label: 'Hackathons' },
  { value: 'quiz', label: 'Quizzes' },
  { value: 'workshop', label: 'Workshops' },
  { value: 'meetup', label: 'Meetups' },
];

function EventCard({ event, hidden, joined, wished, onDetails, onRegister, onWish }) {
  return (
    <article className="event-card" data-type={event.type} hidden={hidden}>
      <button type="button" className="sd-wish-fab" aria-label="Wishlist" aria-pressed={wished} onClick={() => onWish(event.id)}>
        <Icon name="i-heart" className={`sd-wish-fab__icon${wished ? ' is-on' : ''}`} />
      </button>
      <EventBanner type={event.banner} />

      <div className="idrow">
        <span className="id">{event.category}</span>
        <span className={event.status === 'LIVE' ? 'badge-live' : 'badge-done'}>{event.status}</span>
      </div>

      <div className={event.kind ? 'title-row top' : 'title-row'}>
        <div className={event.dark ? 'circle dark' : 'circle'}>{event.circle}</div>
        <h2>{event.title}</h2>
      </div>

      {event.kind && <div className="kind">{event.kind}</div>}
      <p className={event.firstDesc ? 'desc first' : 'desc'}>{event.short || event.description}</p>

      <div className="spacer"></div>

      <div className="facts">
        {event.facts.map(([label, value]) => (
          <div key={label}><small>{label}</small><span>{value}</span></div>
        ))}
      </div>
      <p className="sd-card-loc">
        <Icon name="i-map" className="sd-card-loc__icon" />
        {event.location}
      </p>

      <div className="actions">
        <button className="btn-view" type="button" onClick={() => onDetails(event)}>
          View details<span>↗</span>
        </button>
        {joined
          ? <button className="btn-joined" type="button">✓ Joined</button>
          : <button className="btn-reg" type="button" onClick={() => onRegister(event.id)}>Register now ↗</button>}
      </div>
    </article>
  );
}

export default function Events() {
  useDocumentTitle('Events — CampusCode Student');
  usePageStyles([eventsCss]);

  const [params, setParams] = useSearchParams();
  const [filter, setFilter] = useState('all');
  const [timing, setTiming] = useState('upcoming');
  const [details, setDetails] = useState(null);
  const { isJoined, isWished, register, toggleWish, records } = useStudentUI();
  const q = (params.get('q') || '').trim().toLowerCase();

  const featured = EVENTS.find((e) => e.id === 'e2798ce3-a1b5-4806-9147-4d9f10c52ef1');

  const visible = useMemo(() => EVENTS.filter((event) => {
    const byType = filter === 'all' || event.type === filter;
    const byTime = timing === 'all' || event.timing === timing;
    const byQuery = !q || `${event.title} ${event.description} ${event.category}`.toLowerCase().includes(q);
    return byType && byTime && byQuery;
  }), [filter, timing, q]);

  const highlight = new Set(
    EVENTS.filter((e) => e.dateIso).map((e) => Number(e.dateIso.slice(-2))),
  );

  return (
    <main className="content sd-content sd-events">
      <section className="hero sd-page-hero">
        <div>
          <div className="eyebrow">Discover / catalogue</div>
          <h1>Events</h1>
          <p>Discover, register and manage CampusCode hackathons, quizzes, workshops and meetups.</p>
        </div>
        <a className="sd-solid-btn" href="#">
          <Icon name="i-plus" className="sd-solid-btn__icon" />
          Create event
        </a>
      </section>

      {featured && (
        <section className="sd-feature-banner">
          <div>
            <p className="eyebrow">Featured</p>
            <h2>Explore upcoming events</h2>
            <p>{featured.short}</p>
            <div className="actions">
              <button type="button" className="btn-view" onClick={() => setDetails(featured)}>View details</button>
              {isJoined(featured.id)
                ? <button type="button" className="btn-joined">✓ Joined</button>
                : <button type="button" className="btn-reg" onClick={() => register(featured.id)}>Register now ↗</button>}
            </div>
          </div>
          <EventBanner type={featured.banner} />
        </section>
      )}

      <div className="sd-events-layout">
        <div>
          <nav className="filters" aria-label="Event filters">
            {FILTERS.map((f) => (
              <button
                key={f.value}
                className={filter === f.value ? 'chip active' : 'chip'}
                data-filter={f.value}
                onClick={() => setFilter(f.value)}
              >
                {f.label}
              </button>
            ))}
          </nav>

          <div className="sd-toolbar">
            <label className="sd-search sd-search--inline">
              <Icon name="i-search" className="sd-search__icon" />
              <input
                value={params.get('q') || ''}
                placeholder="Search events…"
                onChange={(e) => {
                  const next = new URLSearchParams(params);
                  if (e.target.value) next.set('q', e.target.value);
                  else next.delete('q');
                  setParams(next, { replace: true });
                }}
              />
            </label>
            <select value={timing} onChange={(e) => setTiming(e.target.value)} aria-label="Timing">
              <option value="upcoming">Upcoming</option>
              <option value="past">Past</option>
              <option value="all">All dates</option>
            </select>
          </div>

          <section className="event-grid">
            {EVENTS.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                hidden={!visible.includes(event)}
                joined={isJoined(event.id)}
                wished={isWished(event.id)}
                onDetails={setDetails}
                onRegister={register}
                onWish={toggleWish}
              />
            ))}
          </section>
        </div>

        <aside className="sd-events-aside">
          <article className="panel sd-panel sd-cal">
            <div className="panel__head">
              <h4 className="panel__label">Event calendar</h4>
              <span>Nov 2026</span>
            </div>
            <div className="sd-cal__grid">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => <span key={d} className="sd-cal__dow">{d}</span>)}
              {Array.from({ length: 6 }).map((_, i) => <span key={`b${i}`} />)}
              {Array.from({ length: 30 }, (_, i) => i + 1).map((n) => (
                <span key={n} className={`sd-cal__day${highlight.has(n) ? ' is-mark' : ''}`}>{n}</span>
              ))}
            </div>
          </article>

          <article className="panel sd-panel">
            <h4 className="panel__label">My event stats</h4>
            <div className="sd-mini-stats">
              <div><b>{records.length}</b><span>Joined</span></div>
              <div><b>{EVENTS.filter((e) => e.type === 'hackathon').length}</b><span>Hackathons</span></div>
              <div><b>{EVENTS.filter((e) => e.type === 'quiz').length}</b><span>Quizzes</span></div>
            </div>
          </article>

          <article className="panel sd-panel">
            <h4 className="panel__label">Quick actions</h4>
            <Link className="sd-quick" to="/student/my-events">My registrations →</Link>
            <a className="sd-quick" href="#">Create new event →</a>
          </article>
        </aside>
      </div>

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
