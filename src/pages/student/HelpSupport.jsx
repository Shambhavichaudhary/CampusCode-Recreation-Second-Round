import { Link } from 'react-router-dom';
import useDocumentTitle from '../../hooks/useDocumentTitle.js';
import FeaturePage from '../../components/student/FeaturePage.jsx';
import { HELP_TOPICS } from '../../data/studentPagesData.js';

export default function HelpSupport() {
  useDocumentTitle('CampusCode — Help & Support');

  return (
    <FeaturePage
      kicker="Support"
      title="Help & Support"
      description="Short answers for this demo workspace. There is no ticket backend — mail goes to your local mail client."
    >
      <div className="sd-feature-grid">
        <div className="sd-feature-stack">
          {HELP_TOPICS.map((topic) => (
            <article className="sd-feature-card" key={topic.q}>
              <h3 className="panel__label">{topic.q}</h3>
              <p className="sd-feature__lead" style={{ marginTop: 8 }}>{topic.a}</p>
            </article>
          ))}
        </div>
        <article className="sd-feature-card">
          <h3 className="panel__label">Contact</h3>
          <p className="sd-feature__lead" style={{ marginTop: 12 }}>
            For event or payment questions, use the same channel you used on Unstop. This button only opens a mail draft.
          </p>
          <div className="sd-actions" style={{ marginTop: 16 }}>
            <a className="sd-solid-btn" href="mailto:hello@campuscode.in?subject=CampusCode%20student%20help">
              Email support
            </a>
            <Link className="sd-ghost-btn" to="/student/guide">
              Open student guide
            </Link>
          </div>
        </article>
      </div>
    </FeaturePage>
  );
}
