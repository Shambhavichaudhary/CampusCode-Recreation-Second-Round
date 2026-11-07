import { useState } from 'react';
import useDocumentTitle from '../../hooks/useDocumentTitle.js';
import FeaturePage from '../../components/student/FeaturePage.jsx';

const PROMPTS = [
  { id: 'stack', label: 'Stack brief', hint: 'Frontend stack, mock data, no backend.' },
  { id: 'roles', label: 'Solo roles', hint: 'How to cover design, build and copy alone.' },
  { id: 'submit', label: 'Submission checklist', hint: 'Team name, portal, Unstop, demo link.' },
];

function replyFor(kind, note) {
  if (kind === 'roles') {
    return 'Stay solo. Keep one team name for tracking. Split your day: layout first, then flows, then polish. Do not invent a backend.';
  }
  if (kind === 'submit') {
    return 'Same team name on Unstop, CampusCode and every file. Demo link in before 10 PM on the listed day. Invite code only if the event is paid.';
  }
  return `CampusCode-safe brief: black, white, grey, restrained purple and green. ${note ? `Your note: ${note}` : 'Keep motion subtle and respect reduced-motion.'}`;
}

export default function HackMate() {
  useDocumentTitle('CampusCode — HackMate AI');
  const [kind, setKind] = useState('stack');
  const [note, setNote] = useState('');
  const [result, setResult] = useState('');

  function onGenerate(event) {
    event.preventDefault();
    setResult(replyFor(kind, note.trim()));
  }

  return (
    <FeaturePage
      kicker="AI workspace"
      title="HackMate AI"
      description="Frame a CampusCode-safe brief for the event you are building. This helper stays in the browser and does not call a model."
    >
      <div className="sd-feature-grid">
        <form className="sd-feature-card" onSubmit={onGenerate}>
          <div className="sd-field">
            <span>Brief type</span>
            <div className="sd-actions">
              {PROMPTS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={kind === item.id ? 'sd-solid-btn' : 'sd-ghost-btn'}
                  onClick={() => setKind(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          <div className="sd-field">
            <span>Optional note</span>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder={PROMPTS.find((p) => p.id === kind)?.hint}
            />
          </div>
          <button type="submit" className="sd-solid-btn">Generate brief</button>
        </form>
        <article className="sd-feature-card">
          <h3 className="panel__label">Result</h3>
          {result ? (
            <p className="sd-feature__lead" style={{ marginTop: 12 }}>{result}</p>
          ) : (
            <p className="sd-empty">Pick a brief type and generate. The result stays on this page until you leave.</p>
          )}
        </article>
      </div>
    </FeaturePage>
  );
}
