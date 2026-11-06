import { Link } from 'react-router-dom';

/** FinalCta - last call-to-action: "YOUR NEXT PROJECT STARTS HERE." + join button. */
export default function FinalCta() {
  return (
    <section className="final-cta-section" id="join">
      <div className="cta-background-circle"></div>

      <div className="final-cta-content">
        <span className="final-cta-label">READY?</span>

        <h2 className="final-cta-title">
          <span className="cta-solid">YOUR NEXT</span>
          <span className="cta-outline">PROJECT</span>
          <span className="cta-solid">STARTS HERE.</span>
        </h2>

        <Link to="/register" className="final-cta-button">
          JOIN CAMPUSCODE
          <span>↗</span>
        </Link>
      </div>
    </section>
  );
}
