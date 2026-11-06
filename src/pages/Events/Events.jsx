import { useState } from 'react';
import usePageStyles from '../../hooks/usePageStyles.js';
import useDocumentTitle from '../../hooks/useDocumentTitle.js';
import eventsCss from '../../styles/pages/events.css?inline';

import SvgSprite from '../../components/student/SvgSprite.jsx';
import Sidebar from '../../components/student/Sidebar.jsx';
import EventsTopbar from '../../components/events/EventsTopbar.jsx';
import EventBanner from '../../components/events/EventBanner.jsx';
import { EVENTS } from '../../data/eventsData.js';

// Filter buttons: label + the value compared with each event's `type`
const FILTERS = [
  { value: 'all', label: 'All events' },
  { value: 'hackathon', label: 'Hackathons' },
  { value: 'quiz', label: 'Quizzes' },
];

/** EventCard - one event: banner, id/status, title, description, facts and buttons. */
function EventCard({ event, hidden }) {
  return (
    // The `hidden` attribute is hidden by CSS (".event-card[hidden]{display:none}")
    <article className="event-card" data-type={event.type} hidden={hidden}>
      <EventBanner type={event.banner} />

      <div className="idrow">
        <span className="id">{event.id}</span>
        <span className={event.status === 'LIVE' ? 'badge-live' : 'badge-done'}>{event.status}</span>
      </div>

      <div className={event.kind ? 'title-row top' : 'title-row'}>
        <div className={event.dark ? 'circle dark' : 'circle'}>{event.circle}</div>
        <h2>{event.title}</h2>
      </div>

      {event.kind && <div className="kind">{event.kind}</div>}
      <p className={event.firstDesc ? 'desc first' : 'desc'}>{event.description}</p>

      <div className="spacer"></div>

      <div className="facts">
        {event.facts.map(([label, value]) => (
          <div key={label}><small>{label}</small><span>{value}</span></div>
        ))}
      </div>

      <div className="actions">
        <button className="btn-view">View details<span>↗</span></button>
        {event.action === 'joined'
          ? <button className="btn-joined">✓ Joined</button>
          : <button className="btn-reg">Register for quiz ↗</button>}
      </div>
    </article>
  );
}

/**
 * Events page (route "/student/events") - original Student-Dashboard/Events.html.
 * Uses the shared <Sidebar /> and the shared events.css (also used by My Events).
 *
 * FILTER: `filter` state remembers the chosen button. Clicking a button changes it,
 * React re-renders, the chosen button gets the "active" class and cards of another
 * type get `hidden`. (The original did this with querySelectorAll + classList.)
 */
export default function Events() {
  useDocumentTitle('Events — CampusCode Student');
  usePageStyles([eventsCss]);

  const [filter, setFilter] = useState('all');

  return (
    <div className="shell">
      <SvgSprite />
      <Sidebar />

      <div className="main">
        <EventsTopbar title="Events" />

        <main className="content">
          <section className="hero">
            <div>
              <div className="eyebrow">DISCOVER / BACKEND DATA</div>
              <h1>EVENTS.</h1>
              <p>Explore CampusCode events — hackathons, quizzes, workshops — and join the ones you want.</p>
            </div>
            <div className="live"><b>03</b><span>LIVE DATA</span></div>
          </section>

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

          <section className="event-grid">
            {EVENTS.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                hidden={!(filter === 'all' || event.type === filter)}
              />
            ))}
          </section>
        </main>
      </div>
    </div>
  );
}
