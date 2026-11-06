import usePageStyles from '../../hooks/usePageStyles.js';
import useDocumentTitle from '../../hooks/useDocumentTitle.js';
import eventsCss from '../../styles/pages/events.css?inline';

import SvgSprite from '../../components/student/SvgSprite.jsx';
import Sidebar from '../../components/student/Sidebar.jsx';
import EventsTopbar from '../../components/events/EventsTopbar.jsx';
import EventBanner from '../../components/events/EventBanner.jsx';
import { MY_EVENTS } from '../../data/eventsData.js';

/** MyEventCard - one joined event: banner, registration id, status, team, journey button. */
function MyEventCard({ event }) {
  return (
    <article className="my-card">
      <EventBanner type={event.banner} showQuestions />

      <div className="reg-row">
        <span className="l">Registration</span>
        <span className="r">{event.registration}</span>
      </div>

      <div className={event.start ? 'my-title start' : 'my-title'}>
        <div className={event.dark ? 'circle dark' : 'circle'}>{event.circle}</div>
        <h2>{event.title}</h2>
      </div>

      <div className="row first">Status: <b>Registered</b></div>
      <div className="row team">TEAM: <b className={event.teamIsName ? 'name' : undefined}>{event.team}</b></div>
      <a className="btn-journey" href="#">Open Journey ↗</a>
    </article>
  );
}

/**
 * My Events page (route "/student/my-events") - original Student-Dashboard/My-Events.html.
 * Same shared Sidebar + events.css as the Events page.
 */
export default function MyEvents() {
  useDocumentTitle('My Events — CampusCode Student');
  usePageStyles([eventsCss]);

  return (
    <div className="shell">
      <SvgSprite />
      <Sidebar />

      <div className="main">
        <EventsTopbar title="My Events" />

        <main className="content">
          <section className="hero">
            <div>
              <div className="eyebrow">MY ACTIVITY / BACKEND DATA</div>
              <h1>MY EVENTS.</h1>
              <p>Every event you joined, in one place. Open one to see its rounds, team, results and certificates.</p>
            </div>
            <div className="live"><b>02</b><span>LIVE DATA</span></div>
          </section>

          <section className="my-grid">
            {MY_EVENTS.map((event) => (
              <MyEventCard key={event.registration} event={event} />
            ))}
          </section>
        </main>
      </div>
    </div>
  );
}
