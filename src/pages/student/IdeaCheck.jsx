import { useState } from 'react';
import useDocumentTitle from '../../hooks/useDocumentTitle.js';
import FeaturePage from '../../components/student/FeaturePage.jsx';

function analyse(idea) {
  const text = idea.toLowerCase();
  const scope = text.includes('backend') || text.includes('database') ? 42 : 78;
  const brand = text.includes('neon') || text.includes('rainbow') ? 38 : 84;
  const clarity = idea.trim().length > 40 ? 80 : 55;
  return {
    scope,
    brand,
    clarity,
    notes: [
      scope < 50
        ? 'This demo is frontend-only. Drop backend claims from the pitch.'
        : 'Scope fits a frontend recreation with mock data.',
      brand < 50
        ? 'Stay with black, white, grey, dark purple and dark green.'
        : 'Colour language is close to CampusCode.',
      clarity < 70
        ? 'Add who it is for, what ships, and what is out of scope.'
        : 'The idea is specific enough to judge.',
    ],
  };
}

export default function IdeaCheck() {
  useDocumentTitle('CampusCode — IdeaCheck AI');
  const [idea, setIdea] = useState('');
  const [report, setReport] = useState(null);

  function onSubmit(event) {
    event.preventDefault();
    if (!idea.trim()) return;
    setReport(analyse(idea));
  }

  return (
    <FeaturePage
      kicker="AI workspace"
      title="IdeaCheck AI"
      description="Paste a product idea. CampusCode constraints are scored locally so you can tighten scope before you build."
    >
      <form className="sd-feature-card" onSubmit={onSubmit}>
        <div className="sd-field">
          <span>Idea</span>
          <textarea
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder="Who is it for, what ships in the demo, and what you will not build."
            required
          />
        </div>
        <button type="submit" className="sd-solid-btn">Analyse idea</button>
      </form>

      {report ? (
        <div className="sd-feature-stack">
          <div className="sd-feature-card sd-score">
            <p><strong>{report.scope}</strong><span>Scope</span></p>
            <p><strong>{report.brand}</strong><span>Brand fit</span></p>
            <p><strong>{report.clarity}</strong><span>Clarity</span></p>
          </div>
          {report.notes.map((note) => (
            <article className="sd-feature-card" key={note}>
              <p>{note}</p>
            </article>
          ))}
        </div>
      ) : (
        <p className="sd-feature-card sd-empty">No analysis yet. Submit an idea to see scores.</p>
      )}
    </FeaturePage>
  );
}
