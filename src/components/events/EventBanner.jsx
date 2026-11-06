/**
 * EventBanner - the coloured banner at the top of every event card.
 * It is used on the Events page AND the My Events page (same markup, only the size
 * changes through CSS: ".my-card .banner" in events.css).
 *
 * Props:
 *   type          - "rebuild" (ReBuild '26 hackathon) or "quiz" (FirstCommit '26 quiz)
 *   showQuestions - quiz only: adds the small "QUESTIONS" caption under the big "50"
 *                   (My Events page has it, Events page does not)
 */
export default function EventBanner({ type, showQuestions = false }) {
  if (type === 'rebuild') {
    return (
      <div className="banner rebuild">
        <div className="logo"><i></i><i></i><i></i></div>
        <div className="txt">
          <div className="pre">CAMPUSCODE PRESENTS</div>
          <h3>ReBuild <em>'26</em></h3>
          <div className="sub">THE DASHBOARD RECREATION HACKATHON</div>
          <div className="pills">
            <span>CERTIFICATE FOR WINNERS</span>
            <span>INTERNSHIP OPPORTUNITY</span>
            <span>REGISTER BY 5 NOV 2026</span>
          </div>
        </div>
        <div className="bar"></div>
      </div>
    );
  }

  return (
    <div className="banner quiz">
      <div className="blob1"></div>
      <div className="blob2"></div>
      <div className="big">50</div>
      {showQuestions && <div className="qs">QUESTIONS</div>}
      <div className="logo"><i></i><i></i><i></i></div>
      <div className="txt">
        <div className="pre">CAMPUSCODE</div>
        <h3>FIRSTCOMMIT '26</h3>
        <div className="qc">QUIZ COMPETITION</div>
        {/* &nbsp; keeps the spaces around the dots, like the original */}
        <div className="meta">50 QUESTIONS &nbsp;·&nbsp; TECH &nbsp;·&nbsp; AI &nbsp;·&nbsp; ENGINEERING</div>
        <div className="date">SUNDAY, 1 NOVEMBER 2026</div>
      </div>
      <div className="bar"></div>
    </div>
  );
}
