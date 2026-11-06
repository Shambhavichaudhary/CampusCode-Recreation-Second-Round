// Footer link columns: [heading, links]. Same markup for each column -> .map().
const COLUMNS = [
  ['PRODUCT', ['About', 'Hackathons', 'How it works', 'Community']],
  ['BUILDERS', ['Students', 'Teams', 'Organizers', 'Developers']],
  ['GUIDES', ['Hackathon Rules', 'FAQ', 'Support', 'Contact']],
];

/** Footer - brand block, three link columns, giant "CampusCode" wordmark and bottom strip. */
export default function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="footer-main">
        {/* Brand block (this footer logo is styled separately from the header symbol) */}
        <div className="footer-brand">
          <a href="#home" className="footer-logo">
            <span className="footer-logo-mark">
              <span></span>
              <span></span>
              <span></span>
            </span>
            <span className="footer-logo-content">
              <span className="footer-logo-text">CAMPUSCODE</span>
              <span className="footer-logo-subtext">HACKATHON ARENA</span>
            </span>
          </a>

          <p className="footer-description">
            The student hackathon arena.<br />
            You build the idea,<br />
            we run the competition.
          </p>

          <div className="footer-status">
            <span className="status-dot"></span>
            <span>ALL SYSTEMS OPERATIONAL</span>
            <a href="#">TERMS</a>
            <a href="#">PRIVACY</a>
            <a href="#">CONTACT</a>
          </div>
        </div>

        {COLUMNS.map(([heading, links]) => (
          <div className="footer-column" key={heading}>
            <h3>{heading}</h3>
            {links.map((label) => (
              <a href="#" key={label}>{label}</a>
            ))}
          </div>
        ))}
      </div>

      <div className="footer-wordmark" aria-hidden="true">CampusCode</div>

      <div className="footer-bottom">
        <p>© 2026 CAMPUSCODE</p>
        <div className="footer-legal-links">
          <span>LEARN</span><span>·</span><span>BUILD</span><span>·</span><span>COMPETE</span><span>·</span><span>SHIP</span>
        </div>
        <span className="footer-location">CHENNAI · INDIA</span>
      </div>
    </footer>
  );
}
