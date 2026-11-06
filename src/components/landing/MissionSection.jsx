/** MissionSection - section 05 "GREAT IDEAS NEED BUILDERS." with a faint background text. */
export default function MissionSection() {
  return (
    <section className="mission-section" id="mission">
      {/* Big decorative text behind the content */}
      <div className="mission-background-text" aria-hidden="true">
        GOOD IDEAS DESERVE TO BE BUILT
      </div>

      <div className="mission-label">
        <span>05</span>
        <span>—</span>
        <span>THE MISSION</span>
      </div>

      <div className="mission-content">
        <h2 className="mission-title">
          <span className="mission-solid">GREAT</span>
          <span className="mission-solid">IDEAS</span>
          <span className="mission-outline">NEED</span>
          <span className="mission-outline">BUILDERS.</span>
        </h2>
        <p className="mission-description">
          Your university is full of people with ideas.
          CampusCode gives those ideas somewhere to go.
        </p>
      </div>
    </section>
  );
}
