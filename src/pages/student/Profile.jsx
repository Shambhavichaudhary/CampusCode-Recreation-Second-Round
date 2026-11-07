import { useState } from 'react';
import useDocumentTitle from '../../hooks/useDocumentTitle.js';
import FeaturePage from '../../components/student/FeaturePage.jsx';
import { useStudentUI } from '../../context/StudentUIContext.jsx';

function extraKey(email) {
  return `campuscode_profile_extra_${(email || 'guest').toLowerCase()}`;
}

function readExtra(email) {
  try {
    return JSON.parse(localStorage.getItem(extraKey(email)) || '{}') || {};
  } catch {
    return {};
  }
}

export default function Profile() {
  useDocumentTitle('CampusCode — Profile');
  const { user } = useStudentUI();
  const email = user?.email || '';
  const [extra, setExtra] = useState(() => readExtra(email));
  const [saved, setSaved] = useState(false);

  function onChange(field) {
    return (event) => {
      setSaved(false);
      setExtra((prev) => ({ ...prev, [field]: event.target.value }));
    };
  }

  function onSubmit(event) {
    event.preventDefault();
    localStorage.setItem(extraKey(email), JSON.stringify({
      college: extra.college || '',
      year: extra.year || '',
      github: extra.github || '',
      bio: extra.bio || '',
    }));
    setSaved(true);
  }

  return (
    <FeaturePage
      kicker="Account"
      title="Profile"
      description="Name and email come from the signed-in account and stay read-only here. Optional fields below are stored in this browser only."
    >
      <div className="sd-feature-grid">
        <article className="sd-feature-card">
          <h3 className="panel__label">Signed in as</h3>
          <p className="sd-feature__title" style={{ fontSize: 24, marginTop: 12 }}>{user?.fullName || 'Student'}</p>
          <p className="sd-feature__lead">{email}</p>
          <p className="sd-feature__lead" style={{ marginTop: 4 }}>{user?.accountType || 'student'}</p>
        </article>
        <form className="sd-feature-card" onSubmit={onSubmit}>
          <div className="sd-field">
            <span>College</span>
            <input value={extra.college || ''} onChange={onChange('college')} placeholder="e.g. GGSIPU" />
          </div>
          <div className="sd-field">
            <span>Year</span>
            <input value={extra.year || ''} onChange={onChange('year')} placeholder="e.g. 3rd year" />
          </div>
          <div className="sd-field">
            <span>GitHub</span>
            <input value={extra.github || ''} onChange={onChange('github')} placeholder="username" />
          </div>
          <div className="sd-field">
            <span>Bio</span>
            <textarea value={extra.bio || ''} onChange={onChange('bio')} placeholder="Short note for your team card" />
          </div>
          <div className="sd-actions">
            <button type="submit" className="sd-solid-btn">Save profile extras</button>
            {saved ? <span className="sd-pill">Saved</span> : null}
          </div>
        </form>
      </div>
    </FeaturePage>
  );
}
