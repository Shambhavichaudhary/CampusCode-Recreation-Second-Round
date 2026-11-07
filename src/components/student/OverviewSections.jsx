import { Link } from 'react-router-dom';
import Icon from './Icon.jsx';
import { useStudentUI } from '../../context/StudentUIContext.jsx';
import { EVENTS } from '../../data/eventsData.js';

function firstName(fullName) {
  return (fullName || 'Student').split(' ')[0];
}

/** Welcome - greeting under the top bar. */
export function Welcome() {
  const { user } = useStudentUI();
  const name = firstName(user?.fullName);

  return (
    <section className="welcome sd-welcome">
      <p className="eyebrow eyebrow--green">Student workspace / live</p>
      <h2 className="welcome__title">Hey, <span className="welcome__name">{name}</span>.</h2>
      <p className="welcome__sub">Welcome back to CampusCode. Your activity is loaded from this account.</p>
    </section>
  );
}

/** FeaturedEvent - original ReBuild '26 card, restyled. */
export function FeaturedEvent() {
  return (
    <section className="hero sd-featured">
      <div className="hero__body">
        <p className="eyebrow eyebrow--green">Build · Learn · Collaborate</p>
        <h3 className="hero__title">ReBuild '26</h3>
        <p className="hero__text">ReBuild '26 is an individual dashboard-recreation hackathon by CampusCode. You participate alone, but you must create a team name for tracking and use it on your Unstop registration, the CampusCode portal, and every submission. Round 1 (Friday, 6 Nov, morning to 10 PM): Recreate the CampusCode user flow faithfully — Dashboard, Login, Register, and Student dashboard — and submit your demo any time till 10 PM. Round 2 (Saturday, 7 Nov, top performers from Round 1 only): Build a complete new UI in CampusCode's vibe. Frontend only, mock data is fine. No presentation round. Prizes: Winner certificate + CampusCode internship with ₹15,000 stipend, runner-up certificate, and participation certificates for all. Sunday, 8 Nov (Diwali) is free. This is a paid event (₹50 on Unstop). Paid students receive an invite code — enter it when you join this event on the portal.</p>
        <Link className="btn btn--lime" to="/student/events">OPEN EVENT <span className="btn__arrow">↗</span></Link>
      </div>

      {/* Brand geometry only — no avatars. Motion is CSS; frozen under reduced-motion. */}
      <div className="hero__motion" aria-hidden="true">
        <span className="hero__motion-grid"></span>
        <span className="hero__motion-ring"></span>
        <span className="hero__motion-orbit"></span>
        <span className="hero__bars">
          <i></i><i></i><i></i>
        </span>
        <span className="hero__scan"></span>
      </div>
    </section>
  );
}

export function Stats() {
  const { records } = useStudentUI();
  const registered = records.length;
  const ongoing = records.filter((e) => e.status === 'LIVE' || e.status === 'UPCOMING').length;
  const completed = records.filter((e) => e.status === 'COMPLETED').length;

  const STATS = [
    { label: 'Registered', value: registered, icon: 'i-cal' },
    { label: 'Ongoing', value: ongoing, icon: 'i-bolt' },
    { label: 'Completed', value: completed, icon: 'i-trophy' },
    { label: 'Certificates', value: completed, icon: 'i-award' },
  ];

  return (
    <section className="stats">
      {STATS.map((s) => (
        <article className="stat" key={s.label}>
          <span className="stat__icon"><Icon name={s.icon} className="stat__svg" /></span>
          <p className="stat__value">{s.value}</p>
          <p className="stat__label">{s.label}</p>
        </article>
      ))}
    </section>
  );
}

export function UpcomingEvents() {
  const upcoming = EVENTS.filter((e) => e.timing === 'upcoming').slice(0, 3);
  const { isJoined, register } = useStudentUI();

  return (
    <section className="panel sd-panel">
      <div className="panel__head">
        <h4 className="panel__label">Upcoming Events</h4>
        <Link className="link" to="/student/events">View all →</Link>
      </div>
      <ul className="sd-event-list">
        {upcoming.map((event) => {
          const joined = isJoined(event.id) || event.action === 'joined';
          return (
            <li key={event.id} className="sd-event-row">
              <span className={`event__badge${event.dark ? ' event__badge--dark' : ''}`}>{event.circle}</span>
              <div>
                <p className="event__name">{event.title}</p>
                <p className="event__meta">{event.date} · {event.location}</p>
              </div>
              {joined ? (
                <span className="sd-pill">Joined</span>
              ) : (
                <button type="button" className="event__btn event__btn--join" onClick={() => register(event.id)}>
                  Register
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export function Tasks() {
  const { tasks, toggleTask } = useStudentUI();

  return (
    <section className="panel sd-panel">
      <div className="panel__head">
        <h4 className="panel__label">My Tasks</h4>
      </div>
      <ul className="sd-task-list">
        {tasks.map((task) => (
          <li key={task.id}>
            <label className={`sd-task${task.done ? ' is-done' : ''}`}>
              <input type="checkbox" checked={task.done} onChange={() => toggleTask(task.id)} />
              <span>{task.label}</span>
              <small>{task.when}</small>
            </label>
          </li>
        ))}
      </ul>
    </section>
  );
}

const JOURNEY = [
  { icon: 'i-trophy', fill: 100, count: 2, label: 'Hackathons' },
  { icon: 'i-bolt', fill: 50, count: 1, label: 'Ongoing' },
  { icon: 'i-check', fill: 50, count: 1, label: 'Completed' },
  { icon: 'i-award', fill: 50, count: 1, label: 'Certificates' },
];

export function ProgressPanel() {
  return (
    <article className="panel journey sd-panel">
      <div className="panel__head">
        <h4 className="panel__label">My Progress</h4>
        <Link className="link" to="/student/certificates">Certificates ↗</Link>
      </div>
      <div className="sd-ring-wrap">
        <div className="sd-ring" style={{ '--p': '75%' }}>
          <span>75%</span>
        </div>
        <div>
          <p className="sd-ring__title">Profile completion</p>
          <p className="sd-ring__text">Add your skills, projects and achievements.</p>
          <Link className="link" to="/student/profile">Complete profile →</Link>
        </div>
      </div>
      <ul className="journey__list">
        {JOURNEY.map((row) => (
          <li className="progress" key={row.label}>
            <span className="progress__icon"><svg><use href={`#${row.icon}`} /></svg></span>
            <span className="progress__track"><span className={`progress__fill progress__fill--${row.fill}`}></span></span>
            <span className="progress__count">{row.count}</span>
            <span className="progress__label">{row.label}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

export function CalendarPanel() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  // November 2026 starts on Sunday; this grid is Mon-first so the 1st sits in the last column of week 1.
  const blanks = 6;
  const dates = Array.from({ length: 30 }, (_, i) => i + 1);
  const marked = new Set([1, 6, 7, 14, 18]);

  return (
    <article className="panel sd-panel sd-cal">
      <div className="panel__head">
        <h4 className="panel__label">Calendar</h4>
        <span className="sd-cal__month">Nov 2026</span>
      </div>
      <div className="sd-cal__grid">
        {days.map((d) => <span key={d} className="sd-cal__dow">{d}</span>)}
        {Array.from({ length: blanks }).map((_, i) => <span key={`b${i}`} />)}
        {dates.map((n) => (
          <span key={n} className={`sd-cal__day${marked.has(n) ? ' is-mark' : ''}${n === 7 ? ' is-today' : ''}`}>{n}</span>
        ))}
      </div>
    </article>
  );
}

export function DiscoverEvents() {
  return <UpcomingEvents />;
}

export function Deadlines() {
  return (
    <article className="panel deadlines sd-panel">
      <div className="panel__head">
        <h4 className="panel__label">Upcoming deadlines</h4>
        <Link className="link" to="/student/events">View all ↗</Link>
      </div>
      <div className="deadlines__empty">
        <p className="deadlines__title">No deadlines yet.</p>
        <p className="deadlines__text">Join an event and your upcoming dates will appear here.</p>
        <Link className="btn btn--bright" to="/student/events">Browse events ↗</Link>
      </div>
    </article>
  );
}

export function Spotlight() {
  return (
    <article className="panel spotlight sd-panel">
      <h4 className="panel__label">AI Spotlight</h4>
      <h3 className="spotlight__title">Your AI teammates are ready.</h3>
      <p className="spotlight__text">Check your idea, find teammates, or ask the rules — right from here.</p>
      <div className="spotlight__chips">
        <Link className="chip" to="/student/ideacheck"><Icon name="i-sparkles" className="chip__icon" />IdeaCheck</Link>
        <Link className="chip" to="/student/hackmate"><Icon name="i-users" className="chip__icon" />HackMate</Link>
        <Link className="chip" to="/student/rulebot"><Icon name="i-bot" className="chip__icon" />RuleBot</Link>
      </div>
    </article>
  );
}

/** Trio kept for compatibility; WidgetBoard renders panels independently. */
export function Trio() {
  return (
    <section className="trio">
      <Deadlines />
      <Spotlight />
      <ProgressPanel />
    </section>
  );
}

export function Activity() {
  return (
    <article className="panel activity sd-panel">
      <div className="panel__head">
        <h4 className="panel__label">Current activity</h4>
        <Link className="link" to="/student/events">View events ↗</Link>
      </div>
      <div className="activity__row">
        <p className="activity__id">e2798ce3-a1b5-4806-9147-4d9f10c52ef1</p>
        <h5 className="activity__title">ReBuild '26</h5>
        <div className="activity__actions">
          <button className="tag-btn" type="button">Open</button>
          <button className="tag-btn tag-btn--small" type="button" aria-label="More">—</button>
          <span className="tag-btn tag-btn--date">Nov 06, 2026</span>
        </div>
      </div>
    </article>
  );
}

export function Notifications() {
  return (
    <article className="panel notifications sd-panel">
      <div className="panel__head">
        <h4 className="panel__label">Notifications</h4>
        <Link className="link" to="/student/notifications">Open all ↗</Link>
      </div>
      <div className="notifications__empty">
        <svg className="notifications__mark"><use href="#mark" /></svg>
        <p className="notifications__title">All caught up</p>
        <p className="notifications__text">No unread notifications.</p>
      </div>
    </article>
  );
}

export function Bottom() {
  return (
    <section className="bottom">
      <Activity />
      <Notifications />
    </section>
  );
}

export const WIDGET_MAP = {
  welcome: Welcome,
  featured: FeaturedEvent,
  stats: Stats,
  upcoming: UpcomingEvents,
  tasks: Tasks,
  progress: ProgressPanel,
  calendar: CalendarPanel,
  deadlines: Deadlines,
  spotlight: Spotlight,
  activity: Activity,
  notifications: Notifications,
};
