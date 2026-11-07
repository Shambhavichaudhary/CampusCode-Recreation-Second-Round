import { useState } from 'react';
import useDocumentTitle from '../../hooks/useDocumentTitle.js';
import FeaturePage from '../../components/student/FeaturePage.jsx';
import { GUIDE_SECTIONS } from '../../data/studentPagesData.js';

export default function StudentGuide() {
  useDocumentTitle('CampusCode — Student Guide');
  const [active, setActive] = useState(GUIDE_SECTIONS[0].id);
  const section = GUIDE_SECTIONS.find((row) => row.id === active) || GUIDE_SECTIONS[0];

  return (
    <FeaturePage
      kicker="Handbook"
      title="Student Guide"
      description="How this workspace is meant to be used. Sections stay on one page so you can scan without leaving the dashboard."
    >
      <div className="sd-feature-grid">
        <nav className="sd-feature-card sd-guide-nav" aria-label="Guide sections">
          {GUIDE_SECTIONS.map((row) => (
            <button
              key={row.id}
              type="button"
              className={row.id === active ? 'is-on' : ''}
              onClick={() => setActive(row.id)}
            >
              {row.title}
            </button>
          ))}
        </nav>
        <article className="sd-feature-card">
          <h3 className="panel__label">{section.title}</h3>
          <p className="sd-feature__lead" style={{ marginTop: 12 }}>{section.body}</p>
        </article>
      </div>
    </FeaturePage>
  );
}
