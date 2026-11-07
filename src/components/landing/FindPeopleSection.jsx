import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import usePageStyles from '../../hooks/usePageStyles.js';
import findPeopleCss from '../../styles/pages/find-people-section.css?inline';

/*
 * FindPeopleSection - "FIND YOUR PEOPLE." heading (left), orbit (centre), three statements (right).
 * Animations:
 *   FIND / YOUR  -> staggered fade-up
 *   PEOPLE.      -> black outline drawn left -> right
 *   orbit        -> fades in, then turns continuously and very slowly (pure CSS);
 *                   it pauses while the section is off-screen
 *   statements   -> sequential fade-up, 150ms apart
 * Every class is prefixed "fyp-" so nothing leaks into other sections.
 */

// Same easing + "play once" viewport as the Mission section, so both read as one piece.
const EASE = [0.22, 0.61, 0.36, 1];
const VIEWPORT = { once: true, amount: 0.2 };

/*
 * One un-clipped parent (the <section>) drives every reveal through Framer Motion variants.
 * (Observing the clipped PEOPLE. line itself would never fire: a browser treats an element
 * that is fully clipped as not visible.) All delays below share a single clock.
 */
const FADE_UP = {
  hidden: { opacity: 0, y: 30 },
  show: (delay) => ({ opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE, delay } }),
};
const FADE_UP_SMALL = {
  hidden: { opacity: 0, y: 20 },
  show: (delay) => ({ opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE, delay } }),
};
const DRAW = {
  hidden: { clipPath: 'inset(-12% 100% -12% -2%)' },
  show: (delay) => ({
    clipPath: 'inset(-12% -3% -12% -2%)',
    transition: { duration: 1.3, ease: [0.65, 0, 0.35, 1], delay },
  }),
};
const GROW = {
  hidden: { scaleX: 0, opacity: 0 },
  show: (delay) => ({ scaleX: 1, opacity: 1, transition: { duration: 0.8, ease: EASE, delay } }),
};
const ORBIT_IN = {
  hidden: { opacity: 0, scale: 0.94 },
  show: (delay) => ({ opacity: 1, scale: 1, transition: { duration: 1.2, ease: EASE, delay } }),
};

/* ---------------- orbit geometry (viewBox is 400 x 400, centre 200,200) ---------------- */
const C = 200;
const OUTER_R = 168;
const INNER_R = 112;

// Point on a circle, angle in degrees measured clockwise from 3 o'clock (SVG y points down).
const pointOn = (r, deg) => {
  const a = (deg * Math.PI) / 180;
  return { x: C + r * Math.cos(a), y: C + r * Math.sin(a) };
};

// Nodes sit on the outer path at these angles (top-right, left, bottom-right - as in the reference).
const NODE_ANGLES = [-48, 188, 58];

/**
 * Arrowhead that lies on a circle, pointing along the path.
 * It is drawn at 3 o'clock and then rotated about the centre to `deg`, so it always sits
 * exactly on the line. `cw` = clockwise (points down at 3 o'clock) or counter-clockwise.
 */
function PathArrow({ r, deg, cw }) {
  const x = C + r;
  const dir = cw ? 1 : -1;
  return (
    <g transform={`rotate(${deg} ${C} ${C})`}>
      <path
        d={`M ${x - 7} ${C - 8 * dir} L ${x} ${C + 6 * dir} L ${x + 7} ${C - 8 * dir} Z`}
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </g>
  );
}

/* ---------------- statement icons (stroke = currentColor) ---------------- */
const ICON_PROPS = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
};

const ICONS = {
  code: (
    <svg {...ICON_PROPS}>
      <path d="m8 8-4 4 4 4" />
      <path d="m16 8 4 4-4 4" />
      <path d="m13.5 6-3 12" />
    </svg>
  ),
  pen: (
    <svg {...ICON_PROPS}>
      <path d="m12 19 7-7 3 3-7 7-3-3Z" />
      <path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5Z" />
      <path d="m2 2 7.6 7.6" />
      <circle cx="11" cy="11" r="2" />
    </svg>
  ),
  trophy: (
    <svg {...ICON_PROPS}>
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  ),
};

const STATEMENTS = [
  { icon: 'code', lead: 'Build', rest: 'with developers.' },
  { icon: 'pen', lead: 'Think', rest: 'with designers.' },
  { icon: 'trophy', lead: 'Compete', rest: 'with builders.' },
];

export default function FindPeopleSection() {
  usePageStyles([findPeopleCss]);

  const reduce = useReducedMotion();
  const sectionRef = useRef(null);

  // Pause the (CSS) orbit while the section is off-screen. Done with a data attribute,
  // not state, so scrolling never causes a React re-render. The observer is disconnected
  // on unmount.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.setAttribute('data-active', '');
        else el.removeAttribute('data-active');
      },
      { threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Reduced motion: no variants are passed, so everything simply renders in its final state.
  const v = (variants, custom) => (reduce ? {} : { variants, custom });

  const arrowOuter = -82;  // near the top, pointing clockwise
  const arrowInner = 138;  // lower-left, pointing counter-clockwise (the way the inner ring turns)

  return (
    <motion.section
      className="fyp-section"
      id="community"
      ref={sectionRef}
      {...(reduce ? {} : { initial: 'hidden', whileInView: 'show', viewport: VIEWPORT })}
    >
      <svg className="fyp-waves" viewBox="0 0 1600 560" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="fyp-wave-a" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="0.5" stopColor="#ececee" stopOpacity="0.7" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0.95" />
          </linearGradient>
        </defs>
        <path d="M700 560 C980 430 1260 380 1600 220 L1600 560 Z" fill="url(#fyp-wave-a)" />
      </svg>

      {/* ---------- left: heading ---------- */}
      <div className="fyp-left">
        <h2 className="fyp-title">
          <motion.span className="fyp-line fyp-solid" {...v(FADE_UP, 0.05)}>
            FIND
          </motion.span>
          <motion.span className="fyp-line fyp-solid" {...v(FADE_UP, 0.19)}>
            YOUR
          </motion.span>
          <motion.span className="fyp-line fyp-outline" {...v(DRAW, 0.4)}>
            PEOPLE.
          </motion.span>
        </h2>
        <motion.span className="fyp-accent" aria-hidden="true" {...v(GROW, 1.4)} />
      </div>

      {/* ---------- centre: orbit ---------- */}
      <div className="fyp-centre">
        <motion.div className="fyp-orbit" {...v(ORBIT_IN, 0.3)}>
          {/* outer path + arrow + three nodes: turn together, clockwise, so the arrow and
              the nodes always stay on the line */}
          <svg className="fyp-ring fyp-ring-outer" viewBox="0 0 400 400" aria-hidden="true">
            <circle cx={C} cy={C} r={OUTER_R} fill="none" stroke="currentColor" strokeWidth="2.2" />
            <PathArrow r={OUTER_R} deg={arrowOuter} cw />
            {NODE_ANGLES.map((deg) => {
              const p = pointOn(OUTER_R, deg);
              return <circle key={deg} className="fyp-node" cx={p.x} cy={p.y} r="9.5" fill="currentColor" />;
            })}
          </svg>

          {/* inner dashed path + arrow: turns the opposite way */}
          <svg className="fyp-ring fyp-ring-inner" viewBox="0 0 400 400" aria-hidden="true">
            <circle
              cx={C}
              cy={C}
              r={INNER_R}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeDasharray="5 6"
            />
            <PathArrow r={INNER_R} deg={arrowInner} cw={false} />
          </svg>

          <div className="fyp-logo" role="img" aria-label="CampusCode">
            <span>CC</span>
          </div>
        </motion.div>
      </div>

      {/* ---------- right: statements ---------- */}
      <ul className="fyp-statements">
        {STATEMENTS.map((s, i) => (
          <motion.li key={s.lead} className="fyp-statement" {...v(FADE_UP_SMALL, 0.55 + i * 0.15)}>
            <span className="fyp-icon">{ICONS[s.icon]}</span>
            <p>
              <strong>{s.lead}</strong> {s.rest}
            </p>
          </motion.li>
        ))}
      </ul>
    </motion.section>
  );
}
