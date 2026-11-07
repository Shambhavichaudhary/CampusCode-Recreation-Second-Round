import useDocumentTitle from '../../hooks/useDocumentTitle.js';
import FeaturePage from '../../components/student/FeaturePage.jsx';
import { OFFICIAL_NOTES } from '../../data/studentPagesData.js';

export default function OfficialComm() {
  useDocumentTitle('CampusCode — Official Communication');
  const important = OFFICIAL_NOTES.filter((n) => n.important);
  const regular = OFFICIAL_NOTES.filter((n) => !n.important);

  return (
    <FeaturePage
      kicker="From CampusCode"
      title="Official Communication"
      description="Pinned notices first, then regular updates. This list is editorial copy for the demo — it is not a live inbox."
    >
      <div className="sd-feature-stack">
        {important.map((note) => (
          <article className="sd-feature-card sd-note--important" key={note.id}>
            <p className="sd-note__flag">Important</p>
            <h3 className="panel__label" style={{ marginTop: 8 }}>{note.title}</h3>
            <time dateTime={note.date}>{note.date}</time>
            <p className="sd-feature__lead" style={{ marginTop: 8 }}>{note.body}</p>
          </article>
        ))}
        {regular.map((note) => (
          <article className="sd-feature-card" key={note.id}>
            <h3 className="panel__label">{note.title}</h3>
            <time dateTime={note.date}>{note.date}</time>
            <p className="sd-feature__lead" style={{ marginTop: 8 }}>{note.body}</p>
          </article>
        ))}
      </div>
    </FeaturePage>
  );
}
