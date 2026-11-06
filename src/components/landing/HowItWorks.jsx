// Data for the four cards - the markup is identical, only the text changes,
// so we write the card once and repeat it with .map().
const STEPS = [
  { number: '01', title: 'DISCOVER', text: 'Find a challenge that makes you want to build.' },
  { number: '02', title: 'TEAM UP', text: 'Find people who share your ambition.' },
  { number: '03', title: 'BUILD', text: 'Turn your idea into something people can use.' },
  { number: '04', title: 'SHIP', text: 'Submit your work and take it to the arena.' },
];

/** ProcessCard - one card of the "HOW IT WORKS" row (lifts up on hover via CSS). */
function ProcessCard({ number, title, text }) {
  return (
    <article className="process-card">
      <span className="process-number">{number}</span>
      <div className="process-divider"></div>
      <h3>{title}</h3>
      <p>{text}</p>
      <span className="process-arrow">↗</span>
    </article>
  );
}

/** HowItWorks - section 03 with the four process cards. */
export default function HowItWorks() {
  return (
    <section className="how-it-works-section" id="how-it-works">
      <div className="how-section-header">
        <div className="how-section-title">
          <span className="how-section-number">03</span>
          <h2>HOW IT WORKS</h2>
        </div>
        <p className="how-section-caption">
          FROM IDEA<br />
          TO IMPACT.
        </p>
      </div>

      <div className="process-cards">
        {STEPS.map((step) => (
          <ProcessCard key={step.number} {...step} />
        ))}
      </div>
    </section>
  );
}
