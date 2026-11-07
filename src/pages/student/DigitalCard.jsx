import useDocumentTitle from '../../hooks/useDocumentTitle.js';
import FeaturePage from '../../components/student/FeaturePage.jsx';
import { useStudentUI } from '../../context/StudentUIContext.jsx';

function cardId(email) {
  const raw = (email || 'student').toUpperCase().replace(/[^A-Z0-9]/g, '');
  return `CC-${raw.slice(0, 4)}-${String(raw.length).padStart(4, '0')}`;
}

export default function DigitalCard() {
  useDocumentTitle('CampusCode — Digital Card');
  const { user, records } = useStudentUI();
  const name = user?.fullName || 'CampusCode Student';
  const email = user?.email || 'student@gmail.com';

  return (
    <FeaturePage
      kicker="Identity"
      title="Digital Card"
      description="A local check-in card for this account. It is not a government ID and is not synced to a server."
    >
      <div className="sd-feature-grid">
        <div className="sd-idcard">
          <p className="sd-idcard__brand">CampusCode student</p>
          <h3>{name}</h3>
          <p>{email}</p>
          <div className="sd-idcard__meta">
            <span>{cardId(email)}</span>
            <span>{user?.accountType || 'Student'}</span>
          </div>
        </div>
        <article className="sd-feature-card">
          <h3 className="panel__label">On this card</h3>
          <p className="sd-feature__lead" style={{ marginTop: 12 }}>
            Name and email come from the logged-in account. Joined events on file: {records.length}.
          </p>
          <div className="sd-actions" style={{ marginTop: 16 }}>
            <button type="button" className="sd-ghost-btn" onClick={() => window.print()}>
              Print card
            </button>
          </div>
        </article>
      </div>
    </FeaturePage>
  );
}
