// Vite copies this file into the build and gives us its URL.
import showcaseVideo from '../../assets/CampusCode_Showcase.mp4';

/** BuildTogether - "BUILD TOGETHER." heading with the autoplaying showcase video card. */
export default function BuildTogether() {
  return (
    <section className="build-together-section" id="build-together">
      <div className="bt-meta">
        <span>02 — EXPERIENCE</span>
        <span>00 / 06</span>
      </div>

      <p className="bt-eyebrow">THE CAMPUSCODE EXPERIENCE</p>

      <h2 className="build-together-title">
        BUILD<br />
        TOGETHER.
      </h2>

      <div className="showcase-card">
        {/* "muted" is required by browsers for autoplay. React needs muted as a prop. */}
        <video className="showcase-video" autoPlay muted loop playsInline preload="auto">
          <source src={showcaseVideo} type="video/mp4" />
          Your browser does not support HTML video.
        </video>
      </div>
    </section>
  );
}
