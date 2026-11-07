import Icon from '../student/Icon.jsx';
import EventBanner from './EventBanner.jsx';

export default function EventDetailsModal({ event, onClose, joined, onRegister, wished, onWish }) {
  if (!event) return null;

  return (
    <div className="sd-modal" role="dialog" aria-modal="true" aria-labelledby="event-detail-title">
      <button type="button" className="sd-drawer__scrim" aria-label="Close details" onClick={onClose} />
      <div className="sd-modal__card">
        <EventBanner type={event.banner} showQuestions={event.banner === 'quiz'} />
        <div className="sd-modal__body">
          <div className="sd-modal__kicker">
            <span>{event.category}</span>
            <span className={event.status === 'LIVE' ? 'badge-live' : 'badge-done'}>{event.status}</span>
          </div>
          <h2 id="event-detail-title">{event.title}</h2>
          {event.kind && <p className="kind">{event.kind}</p>}
          <p className="desc">{event.description}</p>
          <div className="facts">
            {event.facts.map(([label, value]) => (
              <div key={label}><small>{label}</small><span>{value}</span></div>
            ))}
            <div><small>Location</small><span>{event.location}</span></div>
          </div>
          <div className="actions">
            <button type="button" className="btn-view" onClick={onClose}>Close</button>
            <button type="button" className="sd-wish-btn" onClick={() => onWish(event.id)} aria-pressed={wished}>
              <Icon name="i-heart" className="sd-wish-btn__icon" />
              {wished ? 'Saved' : 'Wishlist'}
            </button>
            {joined ? (
              <button type="button" className="btn-joined">✓ Joined</button>
            ) : (
              <button type="button" className="btn-reg" onClick={() => onRegister(event.id)}>
                Register now ↗
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
