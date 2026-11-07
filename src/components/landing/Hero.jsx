import HeroOrbs from './HeroOrbs.jsx';

/**
 * Hero - first screen: animated background (glows, dashed paths, floating dots),
 * tagline, giant "BUILD. COMPETE. SHIP." heading and the call-to-action button.
 * All motion is CSS animation (see landing.css: dashMove, dotFloat).
 */
export default function Hero() {
  return (
    <section className="hero" id="home">
      {/* Background effects */}
      <div className="hero-background">
        <div className="hero-glow hero-glow-purple"></div>
        <div className="hero-glow hero-glow-green"></div>

        {/* Dashed curved paths */}
        <svg className="hero-paths" viewBox="0 0 1800 800" preserveAspectRatio="none" aria-hidden="true">
          <path d="M 100 100 C 300 300, 450 100, 650 300 S 1000 500, 1200 200 S 1550 100, 1800 300" />
          <path d="M 0 750 C 250 500, 450 700, 650 550 S 950 250, 1200 450 S 1550 650, 1800 200" />
          <path d="M 1000 800 C 1200 600, 1400 700, 1600 500 S 1750 350, 1800 300" />
        </svg>

        {/* Abstract 3D floating blobs (drawn above the paths, below the dots) */}
        <HeroOrbs />

        {/* Floating purple dots */}
        <span className="hero-dot dot-one"></span>
        <span className="hero-dot dot-two"></span>
        <span className="hero-dot dot-three"></span>
        <span className="hero-dot dot-four"></span>
        <span className="hero-dot dot-five"></span>
      </div>

      {/* Top information row */}
      <div className="hero-top-info">
        <p className="hero-tagline">
          <span className="status-dot"></span>
          THE DIGITAL HOME FOR STUDENT INNOVATION
        </p>
        <p className="hero-location">
          CHENNAI <span>·</span> INDIA
        </p>
      </div>

      {/* Main heading */}
      <div className="hero-content">
        <p className="hero-index">CAMPUSCODE / 001</p>
        <h1 className="hero-title">
          <span className="title-solid">BUILD.</span>
          <span className="title-outline">COMPETE.</span>
          <span className="title-solid">SHIP.</span>
        </h1>
      </div>

      {/* Subtitle + CTA */}
      <div className="hero-bottom">
        <p className="hero-subtitle">
          A digital arena for students<br />
          who don't just have ideas.<br />
          They build them.
        </p>
        {/* Same pill button as "BUILD WITH CAMPUSCODE" (btx-cta in build-together.css) */}
        <a href="#arena" className="btx-cta btx-cta--landing">
          EXPLORE HACKATHONS
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M7 17L17 7M8 7h9v9" />
          </svg>
        </a>
      </div>
    </section>
  );
}
