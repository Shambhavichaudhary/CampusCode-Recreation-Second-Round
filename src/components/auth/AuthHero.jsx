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
      <div className="auth-particles" aria-hidden="true">
        <span className="auth-particle auth-particle--ink"></span>
        <span className="auth-particle auth-particle--purple"></span>
        <span className="auth-particle auth-particle--green"></span>
        <span className="auth-particle auth-particle--ink auth-particle--sm"></span>
        <span className="auth-particle auth-particle--purple auth-particle--sm"></span>
      </div>
      <p className="hero__status"><span className="dot dot--lime"></span>{status}</p>
      <p className="hero__steps"><span>{step[0]}</span><span>{step[1]}</span></p>

      <h1 className={`hero__title ${titleClass}`.trim()} id="hero-title">
        <span className="hero__line">{lines[0]}</span>
        <span className="hero__line">{lines[1]}</span>
        {/* Outlined word: fills purple on hover (CSS) */}
        <span className={`hero__line hero__line--outline ${accentClass}`.trim()}>{lines[2]}</span>
      </h1>

      <p className="hero__text">{text}</p>

      <div className={`feature-cards-wrap ${cardsClass}`.trim()}>
        <svg className="feature-cards__connectors" viewBox="0 0 400 120" preserveAspectRatio="none" aria-hidden="true">
          <path className="feature-cards__path feature-cards__path--a"
            d="M78 70 C 118 18, 158 16, 198 58" fill="none" />
          <path className="feature-cards__path feature-cards__path--b"
            d="M202 58 C 242 108, 278 110, 318 70" fill="none" />
          <circle className="feature-cards__node feature-cards__node--a" cx="78" cy="70" r="3.2" />
          <circle className="feature-cards__node feature-cards__node--b" cx="198" cy="58" r="3.2" />
          <circle className="feature-cards__node feature-cards__node--c" cx="202" cy="58" r="3.2" />
          <circle className="feature-cards__node feature-cards__node--d" cx="318" cy="70" r="3.2" />
        </svg>
        <ul className="feature-cards">
          {cards.map((card, index) => (
            <li className={`feature-card feature-card--${index + 1}`} key={card.title}>
              <span className="feature-card__num">{card.meta[0]}</span>
              {card.meta[1] && <span className="feature-card__tag">{card.meta[1]}</span>}
              <h2 className="feature-card__title">{card.title}</h2>
              {card.text && <p className="feature-card__text">{card.text}</p>}
            </li>
          ))}
        </ul>
      </div>

      <div className="hero__footer">
        <span className="hero__footer-status"><span className="dot dot--lime"></span>{footerStatus}</span>
        <span>STUDENT INNOVATION NETWORK</span>
        <span>2026</span>
      </div>
    </section>
  );
}
