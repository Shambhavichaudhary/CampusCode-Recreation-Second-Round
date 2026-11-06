import { Fragment } from 'react';

// The words that scroll across the strip.
const WORDS = ['PEOPLE', 'PRODUCTS', 'INNOVATION', 'COMMUNITY', 'IDEAS'];

/**
 * One copy of the scrolling text. The strip needs TWO identical copies side by side:
 * the CSS animation slides the track left by 50% (one copy), so the loop looks endless.
 */
function MarqueeContent({ hidden }) {
  return (
    <div className="marquee-content" aria-hidden={hidden ? 'true' : undefined}>
      {WORDS.map((word) => (
        // Fragment = group two elements without adding an extra <div>/<span> to the page
        <Fragment key={word}>
          <span>{word}</span>
          <span className="marquee-star">✦</span>
        </Fragment>
      ))}
    </div>
  );
}

/** MarqueeStrip - the moving "PEOPLE ✦ PRODUCTS ✦ ..." band under the hero. */
export default function MarqueeStrip() {
  return (
    <div className="marquee-section">
      <div className="marquee-track">
        <MarqueeContent />
        {/* Duplicate content for seamless movement */}
        <MarqueeContent hidden />
      </div>
    </div>
  );
}
