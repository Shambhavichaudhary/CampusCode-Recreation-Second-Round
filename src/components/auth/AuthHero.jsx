/**
 * AuthHero - the left branding column of Register and Login:
 * status line, step counter, giant heading, intro text, three feature cards, footer strip.
 *
 * Props (everything that differs between the two pages):
 *   status        - text next to the green dot, e.g. "CAMPUSCODE / REGISTRATION"
 *   step          - [label, counter], e.g. ["CREATE", "02 / 02"]
 *   lines         - the 3 heading words; the LAST one is the outlined word
 *   titleClass    - extra class on <h1>            (Login: "login-hero__title")
 *   accentClass   - extra class on the outlined word (Login: "login-hero__accent")
 *   text          - intro paragraph
 *   cardsClass    - extra class on the cards <ul>   (Login: "login-feature-cards")
 *   cards         - [{ meta: ["01", "IDENTITY"], title, text?, line? }]
 *   footerStatus  - text of the green footer status
 */
export default function AuthHero({
  status, step, lines, titleClass = '', accentClass = '', text,
  cardsClass = '', cards, footerStatus,
}) {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <p className="hero__status"><span className="dot dot--lime"></span>{status}</p>
      <p className="hero__steps"><span>{step[0]}</span><span>{step[1]}</span></p>

      <h1 className={`hero__title ${titleClass}`.trim()} id="hero-title">
        <span className="hero__line">{lines[0]}</span>
        <span className="hero__line">{lines[1]}</span>
        {/* Outlined word: fills purple on hover (CSS) */}
        <span className={`hero__line hero__line--outline ${accentClass}`.trim()}>{lines[2]}</span>
      </h1>

      <p className="hero__text">{text}</p>

      <ul className={`feature-cards ${cardsClass}`.trim()}>
        {cards.map((card) => (
          <li className="feature-card" key={card.title}>
            <div className="feature-card__meta">
              {card.meta.map((m) => <span key={m}>{m}</span>)}
            </div>
            <h2 className="feature-card__title">{card.title}</h2>
            {card.text && <p className="feature-card__text">{card.text}</p>}
            {card.line && <span className="feature-card__line" aria-hidden="true"></span>}
          </li>
        ))}
      </ul>

      <div className="hero__footer">
        <span className="hero__footer-status"><span className="dot dot--lime"></span>{footerStatus}</span>
        <span>STUDENT INNOVATION NETWORK</span>
        <span>2026</span>
      </div>
    </section>
  );
}
