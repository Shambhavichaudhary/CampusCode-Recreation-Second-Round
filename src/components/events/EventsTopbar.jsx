/**
 * EventsTopbar - sticky top bar shared by the Events and My Events pages.
 * Only the page title changes ("Events" / "My Events"), so it is a prop.
 */
export default function EventsTopbar({ title }) {
  return (
    <header className="topbar">
      <div>
        <div className="crumb">CampusCode / Student</div>
        <div className="crumb-title">{title}</div>
      </div>
      <div className="top-actions">
        <button className="icon-btn" aria-label="Notifications">
          <svg viewBox="0 0 16 16"><path d="M4 11V7a4 4 0 0 1 8 0v4l1 1.5H3zM6.5 14h3" /></svg>
          <span className="dot"></span>
        </button>
        <button className="refresh">
          <span className="ico">
            <svg viewBox="0 0 16 16"><path d="M13.5 6A5.5 5.5 0 0 0 3.2 5M2.5 2.5V5.2h2.7M2.5 10a5.5 5.5 0 0 0 10.3 1M13.5 13.5V10.8h-2.7" /></svg>
          </span>
          REFRESH
        </button>
        <div className="user"><div className="avatar"></div><span>Shambhavi Chaudhary</span></div>
      </div>
    </header>
  );
}
