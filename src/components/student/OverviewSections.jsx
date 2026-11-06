import Icon from './Icon.jsx';

/* Small building blocks and sections of the Student Dashboard "Overview" page.
   They are kept together because they are only used on that page. */

/** Welcome - greeting under the top bar. */
export function Welcome() {
  return (
    <section className="welcome">
      <p className="eyebrow eyebrow--green">STUDENT WORKSPACE / LIVE</p>
      <h2 className="welcome__title">WELCOME BACK, <span className="welcome__name">STUDENT</span>.</h2>
      <p className="welcome__sub">Your CampusCode activity is loaded directly from the backend.</p>
    </section>
  );
}

/** FeaturedEvent - the big "ReBuild '26" card with the OPEN EVENT button. */
export function FeaturedEvent() {
  return (
    <section className="hero">
      <div className="hero__body">
        <p className="eyebrow eyebrow--green">BUILD · LEARN · COLLABORATE</p>
        <h3 className="hero__title">ReBuild '26</h3>
        <p className="hero__text">ReBuild '26 is an individual dashboard-recreation hackathon by CampusCode. You participate alone, but you must create a team name for tracking and use it on your Unstop registration, the CampusCode portal, and every submission. Round 1 (Friday, 6 Nov, morning to 10 PM): Recreate the CampusCode user flow faithfully — Dashboard, Login, Register, and Student dashboard — and submit your demo any time till 10 PM. Round 2 (Saturday, 7 Nov, top performers from Round 1 only): Build a complete new UI in CampusCode's vibe. Frontend only, mock data is fine. No presentation round. Prizes: Winner certificate + CampusCode internship with ₹15,000 stipend, runner-up certificate, and participation certificates for all. Sunday, 8 Nov (Diwali) is free. This is a paid event (₹50 on Unstop). Paid students receive an invite code — enter it when you join this event on the portal.</p>
        <a className="btn btn--lime" href="#">OPEN EVENT <span className="btn__arrow">↗</span></a>
      </div>
      <div className="hero__art" aria-hidden="true">
        <span className="hero__avatar"><svg><use href="#avatar" /></svg></span>
        <span className="hero__badge">RE</span>
      </div>
    </section>
  );
}

const STATS = [
  { label: 'REGISTERED', value: 2 },
  { label: 'ONGOING', value: 1 },
  { label: 'COMPLETED', value: 1 },
  { label: 'CERTIFICATES', value: 1 },
];

/** Stats - the four number cards (REGISTERED / ONGOING / COMPLETED / CERTIFICATES). */
export function Stats() {
  return (
    <section className="stats">
      {STATS.map((s) => (
        <article className="stat" key={s.label}>
          <p className="stat__label">{s.label}</p>
          <p className="stat__value">{s.value}</p>
          <p className="stat__note">FROM BACKEND</p>
        </article>
      ))}
    </section>
  );
}

// Events in "DISCOVER EVENTS": badge letters, optional dark badge, text lines and button.
const DISCOVER = [
  { badge: 'RE', cat: 'Web Development', name: "ReBuild '26", meta: ['Nov 06, 2026', 'Individual participation'], button: 'JOINED' },
  { badge: 'FQ', cat: 'Open Innovation', name: "FirstCommit '26 Quiz Competition 2.0", meta: ['–'], button: 'JOIN NOW ↗', join: true },
  { badge: 'FQ', dark: true, cat: 'Open Innovation', name: "FirstCommit '26 Quiz Competition", meta: ['–'], button: 'JOINED' },
];

/** DiscoverEvents - panel with three small event cards. */
export function DiscoverEvents() {
  return (
    <section className="panel discover">
      <div className="panel__head">
        <h4 className="panel__label">03 / DISCOVER EVENTS</h4>
        <a className="link" href="#">VIEW ALL ↗</a>
      </div>
      <div className="discover__grid">
        {DISCOVER.map((e, i) => (
          <article className="event" key={i}>
            <span className={e.dark ? 'event__badge event__badge--dark' : 'event__badge'}>{e.badge}</span>
            <div className="event__info">
              <p className="event__cat">{e.cat}</p>
              <h5 className="event__name">{e.name}</h5>
              {e.meta.map((m) => <p className="event__meta" key={m}>{m}</p>)}
            </div>
            <button className={e.join ? 'event__btn event__btn--join' : 'event__btn'} type="button">{e.button}</button>
          </article>
        ))}
      </div>
    </section>
  );
}

// Rows of "YOUR JOURNEY": icon, bar width class (100 or 50), count, label.
const JOURNEY = [
  { icon: 'i-trophy', fill: 100, count: 2, label: 'HACKATHONS' },
  { icon: 'i-bolt', fill: 50, count: 1, label: 'ONGOING' },
  { icon: 'i-check', fill: 50, count: 1, label: 'COMPLETED' },
  { icon: 'i-award', fill: 50, count: 1, label: 'CERTIFICATES' },
];

/** Trio - the three panels in one row: deadlines, AI spotlight, your journey. */
export function Trio() {
  return (
    <section className="trio">
      <article className="panel deadlines">
        <div className="panel__head">
          <h4 className="panel__label">UPCOMING DEADLINES</h4>
          <a className="link" href="#">VIEW ALL ↗</a>
        </div>
        <div className="deadlines__empty">
          <p className="deadlines__title">No deadlines yet.</p>
          <p className="deadlines__text">Join an event and your upcoming dates will appear here.</p>
          <a className="btn btn--bright" href="#">BROWSE EVENTS ↗</a>
        </div>
      </article>

      <article className="panel spotlight">
        <h4 className="panel__label">AI SPOTLIGHT</h4>
        <h3 className="spotlight__title">Your AI teammates are ready.</h3>
        <p className="spotlight__text">Check your idea, find teammates, or ask the rules — right from here.</p>
        <div className="spotlight__chips">
          <a className="chip" href="#"><Icon name="i-sparkles" className="chip__icon" />IDEACHECK</a>
          <a className="chip" href="#"><Icon name="i-users" className="chip__icon" />HACKMATE</a>
          <a className="chip" href="#"><Icon name="i-bot" className="chip__icon" />RULEBOT</a>
        </div>
      </article>

      <article className="panel journey">
        <div className="panel__head">
          <h4 className="panel__label">YOUR JOURNEY</h4>
          <a className="link" href="#">CERTIFICATES ↗</a>
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
    </section>
  );
}

/** Bottom - "CURRENT ACTIVITY" and "NOTIFICATIONS" panels. */
export function Bottom() {
  return (
    <section className="bottom">
      <article className="panel activity">
        <div className="panel__head">
          <h4 className="panel__label">01 / CURRENT ACTIVITY</h4>
          <a className="link" href="#">VIEW EVENTS ↗</a>
        </div>
        <div className="activity__row">
          <p className="activity__id">e2798ce3-a1b5-4806-9147-4d9f10c52ef1</p>
          <h5 className="activity__title">ReBuild '26</h5>
          <div className="activity__actions">
            <button className="tag-btn" type="button">OPEN</button>
            <button className="tag-btn tag-btn--small" type="button" aria-label="More">—</button>
            <span className="tag-btn tag-btn--date">NOV 06, 2026</span>
          </div>
        </div>
      </article>

      <article className="panel notifications">
        <div className="panel__head">
          <h4 className="panel__label">02 / NOTIFICATIONS</h4>
          <a className="link" href="#">OPEN ALL ↗</a>
        </div>
        <div className="notifications__empty">
          <svg className="notifications__mark"><use href="#mark" /></svg>
          <p className="notifications__title">ALL CAUGHT UP</p>
          <p className="notifications__text">No unread notifications.</p>
        </div>
      </article>
    </section>
  );
}
