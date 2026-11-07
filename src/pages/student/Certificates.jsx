import useDocumentTitle from '../../hooks/useDocumentTitle.js';
import FeaturePage from '../../components/student/FeaturePage.jsx';
import { useStudentUI } from '../../context/StudentUIContext.jsx';

function printCertificate(user, event) {
  const name = user?.fullName || 'CampusCode Student';
  const win = window.open('', '_blank', 'width=720,height=520');
  if (!win) return;
  win.document.write(`<!doctype html><title>Certificate</title>
    <body style="font-family:Georgia,serif;padding:48px;border:12px solid #111;color:#111">
      <p style="letter-spacing:.2em;text-transform:uppercase;font-size:12px">CampusCode</p>
      <h1 style="font-size:32px;margin:16px 0">Certificate of Participation</h1>
      <p>This is to certify that <strong>${name}</strong> participated in</p>
      <h2>${event.title}</h2>
      <p style="color:#666">${event.date || 'CampusCode event'}</p>
    </body>`);
  win.document.close();
  win.focus();
  win.print();
}

export default function Certificates() {
  useDocumentTitle('CampusCode — Certificates');
  const { user, records } = useStudentUI();
  const earned = records.filter((event) => event.status === 'COMPLETED');

  return (
    <FeaturePage
      kicker="Records"
      title="Certificates"
      description="Participation certificates for completed events on this account. Preview opens a print dialog — nothing is uploaded."
    >
      {earned.length === 0 ? (
        <p className="sd-feature-card sd-empty">No completed events yet. Certificates appear after a joined event is marked completed.</p>
      ) : (
        <div className="sd-feature-grid--3">
          {earned.map((event) => (
            <article className="sd-feature-card sd-cert" key={event.id}>
              <span className="sd-cert__mark">{event.circle || 'CC'}</span>
              <h3>{event.title}</h3>
              <p>{event.date && event.date !== '—' ? event.date : 'Date on file'} · {event.category || event.type}</p>
              <div className="sd-actions">
                <button type="button" className="sd-ghost-btn" onClick={() => printCertificate(user, event)}>
                  Preview
                </button>
                <button type="button" className="sd-solid-btn" onClick={() => printCertificate(user, event)}>
                  Download
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </FeaturePage>
  );
}
