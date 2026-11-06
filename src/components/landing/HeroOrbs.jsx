import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import usePageStyles from '../../hooks/usePageStyles.js';
import orbsCss from '../../styles/pages/hero-orbs.css?inline';

/**
 * HeroOrbs - the abstract 3D-looking floating blobs behind the Hero heading.
 *
 * HOW THE ANIMATION IS SPLIT (see hero-orbs.css for the full explanation)
 *   - Framer Motion : one-time entrance (fade + soft scale-up, staggered).
 *   - CSS keyframes : the endless motion (drift, shape morph, 3D tilt, highlight).
 * CSS keyframes are used for the endless part because they run on the browser's
 * compositor with zero JavaScript per frame. Each orb has its own durations and
 * start phase, so the group never moves in sync.
 *
 * `tone` picks the colour treatment (purple / lavender / lime / dual), and the
 * position, size and timing of orb "a" .. "e" live in the CSS (.hero-orb--a ...).
 * `opacity` is the final opacity: smaller / "further away" orbs are a bit softer.
 * `delay` staggers the entrance so the shapes appear one after another.
 */
const ORBS = [
  { id: 'a', tone: 'purple', opacity: 0.96, delay: 0.1 },
  { id: 'b', tone: 'lime', opacity: 0.95, delay: 0.3 },
  { id: 'e', tone: 'dual', opacity: 0.9, delay: 0.5 },
  { id: 'c', tone: 'lavender', opacity: 0.8, delay: 0.7 },
  { id: 'd', tone: 'lime', opacity: 0.85, delay: 0.85 },
];

// Same easing curve as --motion-ease in animations.css, so it feels like the rest of the site.
const ENTRANCE_EASE = [0.22, 0.61, 0.36, 1];

export default function HeroOrbs() {
  // This stylesheet only exists while the landing page is mounted (same pattern as the other pages).
  usePageStyles([orbsCss]);

  const containerRef = useRef(null);
  const reduceMotion = useReducedMotion();

  // Pause every orb animation while the hero is off screen (saves CPU/GPU on long scrolls).
  useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof IntersectionObserver === 'undefined') return undefined;

    const observer = new IntersectionObserver(([entry]) => {
      container.classList.toggle('is-paused', !entry.isIntersecting);
    });
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="hero-orbs" ref={containerRef} aria-hidden="true">
      {ORBS.map(({ id, tone, opacity, delay }) => (
        <motion.div
          key={id}
          className={`hero-orb hero-orb--${id} hero-orb--${tone}`}
          initial={reduceMotion ? false : { opacity: 0, scale: 0.82 }}
          animate={{ opacity, scale: 1 }}
          transition={{ duration: 1.6, delay, ease: ENTRANCE_EASE }}
        >
          <div className="hero-orb__float">
            <div className="hero-orb__body">
              <span className="hero-orb__sheen" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
