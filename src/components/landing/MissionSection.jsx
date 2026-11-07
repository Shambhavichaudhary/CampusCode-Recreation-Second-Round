import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import usePageStyles from '../../hooks/usePageStyles.js';
import missionCss from '../../styles/pages/mission-section.css?inline';

/*
 * MissionSection - section 05 "GREAT IDEAS NEED BUILDERS."
 * Animations (all play once, when the section scrolls into view):
 *   GREAT / IDEAS  -> fade-up, staggered
 *   NEED           -> outline fades in gradually
 *   BUILDERS.      -> black outline is drawn left -> right
 *   paragraph      -> soft fade-up AFTER the heading has finished
 *   BUILD (bg)     -> very slow scroll parallax
 * Every class is prefixed "msn-" so nothing leaks into other sections.
 */

// Same easing + "play once" viewport the other landing sections use.
const EASE = [0.22, 0.61, 0.36, 1];
const VIEWPORT = { once: true, amount: 0.3 };

/*
 * The reveal is driven from ONE un-clipped parent (.msn-content) through Framer Motion
 * variants. (Observing the clipped BUILDERS. line itself would never fire: a browser treats
 * an element that is fully clipped as not visible.) It also keeps every delay below on a
 * single shared clock.
 */
const FADE_UP = {
  hidden: { opacity: 0, y: 34 },
  show: (delay) => ({ opacity: 1, y: 0, transition: { duration: 0.95, ease: EASE, delay } }),
};
const FADE_UP_SMALL = {
  hidden: { opacity: 0, y: 18 },
  show: (delay) => ({ opacity: 1, y: 0, transition: { duration: 0.95, ease: EASE, delay } }),
};
const FADE_IN = {
  hidden: { opacity: 0 },
  show: (delay) => ({ opacity: 1, transition: { duration: 1.4, ease: EASE, delay } }),
};
const DRAW = {
  hidden: { clipPath: 'inset(-12% 100% -12% -2%)' },
  show: (delay) => ({
    clipPath: 'inset(-12% -3% -12% -2%)',
    transition: { duration: 1.5, ease: [0.65, 0, 0.35, 1], delay },
  }),
};
const GROW = {
  hidden: { scaleX: 0, opacity: 0 },
  show: (delay) => ({ scaleX: 1, opacity: 1, transition: { duration: 0.8, ease: EASE, delay } }),
};

// Timeline in seconds - keeps the heading, paragraph and accent line in sequence.
const T = {
  solid: 0.05,      // GREAT starts here, IDEAS follows STAGGER later
  stagger: 0.14,
  need: 0.42,
  builders: 0.62,
  paragraph: 1.55,  // after the heading has finished drawing
  accent: 1.85,
};

export default function MissionSection() {
  usePageStyles([missionCss]);

  const reduce = useReducedMotion();
  const sectionRef = useRef(null);

  // ---- Parallax for the BUILD background word -------------------------------------
  // Progress 0 -> 1 while the section travels through the viewport. The offset is tiny
  // (about 6% of the word's height each way) and run through a soft spring, so it
  // glides rather than tracks the scrollbar. Nothing re-renders: motion values only.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const smooth = useSpring(scrollYProgress, { stiffness: 40, damping: 22, mass: 0.9 });
  const bgY = useTransform(smooth, [0, 1], ['-5%', '5%']);
  const bgX = useTransform(smooth, [0, 1], ['1.5%', '-1.5%']);

  // Reduced motion: no variants are passed, so everything simply renders in its final state.
  const v = (variants, custom) => (reduce ? {} : { variants, custom });

  return (
    <section className="msn-section" id="mission" ref={sectionRef}>
      {/* Soft grey silk shapes from the reference - background only, no interaction */}
      <svg className="msn-waves" viewBox="0 0 1600 900" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="msn-wave-a" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="0.55" stopColor="#e9e9eb" stopOpacity="0.75" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="msn-wave-b" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="0.6" stopColor="#f1f1f3" stopOpacity="0.9" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="1" />
          </linearGradient>
        </defs>
        <path d="M0 260 C260 120 420 60 560 -40 L0 -40 Z" fill="#ececee" opacity="0.55" />
        <path d="M600 900 C900 640 1180 560 1600 330 L1600 900 Z" fill="url(#msn-wave-a)" />
        <path d="M900 900 C1160 760 1360 700 1600 560 L1600 900 Z" fill="url(#msn-wave-b)" />
      </svg>

      {/* Oversized faded word behind the heading, with scroll parallax */}
      <motion.div
        className="msn-bg-word"
        aria-hidden="true"
        style={reduce ? { rotate: -4 } : { rotate: -4, y: bgY, x: bgX }}
      >
        BUILD
      </motion.div>

      <div className="msn-label">
        <span>05</span>
        <span>-</span>
        <span>THE MISSION</span>
      </div>

      <motion.div
        className="msn-content"
        {...(reduce ? {} : { initial: 'hidden', whileInView: 'show', viewport: VIEWPORT })}
      >
        <h2 className="msn-title">
          <motion.span className="msn-line msn-solid" {...v(FADE_UP, T.solid)}>
            GREAT
          </motion.span>
          <motion.span className="msn-line msn-solid" {...v(FADE_UP, T.solid + T.stagger)}>
            IDEAS
          </motion.span>

          {/* NEED: existing outlined type, simply fades in slowly */}
          <motion.span className="msn-line msn-outline" {...v(FADE_IN, T.need)}>
            NEED
          </motion.span>

          {/* BUILDERS.: the outline is wiped in from the left, so it reads as being drawn */}
          <motion.span className="msn-line msn-outline msn-builders" {...v(DRAW, T.builders)}>
            BUILDERS.
          </motion.span>
        </h2>

        <motion.p className="msn-description" {...v(FADE_UP_SMALL, T.paragraph)}>
          Your university is full of people with ideas.
          CampusCode gives those ideas somewhere to go.
        </motion.p>

        <motion.span className="msn-accent" aria-hidden="true" {...v(GROW, T.accent)} />
      </motion.div>
    </section>
  );
}
