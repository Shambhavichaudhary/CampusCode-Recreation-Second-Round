/**
 * EventBanner - coloured banner at the top of event cards.
 * `rebuild` and `quiz` markup is the original pair; workshop/meetup are quieter
 * CampusCode plates for the extra catalogue items.
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

  if (type === 'quiz') {
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
          <div className="meta">50 QUESTIONS &nbsp;·&nbsp; TECH &nbsp;·&nbsp; AI &nbsp;·&nbsp; ENGINEERING</div>
          <div className="date">SUNDAY, 1 NOVEMBER 2026</div>
        </div>
        <div className="bar"></div>
      </div>
    );
  }

  const isMeetup = type === 'meetup';

  return (
    <div className={`banner plate ${isMeetup ? 'meetup' : 'workshop'}`}>
      <div className="logo"><i></i><i></i><i></i></div>
      <div className="txt">
        <div className="pre">CAMPUSCODE</div>
        <h3>{isMeetup ? 'Arena Meetup' : 'Build Night'}</h3>
        <div className="sub">{isMeetup ? 'Community session' : 'Hands-on workshop'}</div>
      </div>
      <div className="bar"></div>
    </div>
  );
}
