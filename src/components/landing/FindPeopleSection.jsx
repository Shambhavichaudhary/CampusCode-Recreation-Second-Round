/** FindPeopleSection - "FIND YOUR PEOPLE." heading (left) + slowly rotating orbit (right). */
export default function FindPeopleSection() {
  return (
    <section className="find-people-section" id="community">
      <div className="find-people-left">
        <span className="find-people-label">FIND YOUR PEOPLE</span>
        <h2 className="find-people-title">
          <span>FIND</span>
          <span>YOUR</span>
          <span className="find-outline">PEOPLE.</span>
        </h2>
      </div>

      <div className="find-people-right">
        <div className="people-orbit">
          <div className="people-orbit-circle outer-circle"></div>
          <div className="people-orbit-circle inner-circle"></div>
          <div className="people-center-logo">CC</div>
          <span className="people-dot people-dot-one"></span>
          <span className="people-dot people-dot-two"></span>
          <span className="people-dot people-dot-three"></span>
          <span className="people-dot people-dot-four"></span>
        </div>

        <div className="people-description">
          <p>Build with developers.</p>
          <p>Think with designers.</p>
          <p>Compete with builders.</p>
        </div>
      </div>
    </section>
  );
}
