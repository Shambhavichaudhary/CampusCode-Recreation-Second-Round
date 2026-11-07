import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import usePageStyles from '../../hooks/usePageStyles.js';
import howCss from '../../styles/pages/how-it-works.css?inline';

/**
 * HowItWorks - section 03: four overlapping, tilted cards joined by hand-drawn curves.
 *
 * Styles live in styles/pages/how-it-works.css. Every class starts with "cc-hiw", so
 * nothing here can touch (or be touched by) any other section. The section keeps
 * id="how-it-works" because the navbar link scrolls to it.
 *
 * HOW THE LAYOUT WORKS
 * The cards sit on a "stage" that has a fixed aspect ratio. Card positions, sizes and the
 * SVG connector curves are all written in the SAME coordinate space (the LAYOUT numbers
 * below), so the curves stay glued to the cards at every screen width.
 *   - desktop / tablet : a wide staggered row   (stage 1240 x 440)
 *   - mobile (< 840px) : a zig-zag column       (stage 400 x 1170)
 * Both layouts are rendered by the same markup; CSS picks which one is visible.
 */

const EASE = [0.22, 0.61, 0.36, 1];

const STEPS = [
  { number: '01', title: 'DISCOVER', text: 'Explore hackathons, opportunities and events that match your interests.' },
  { number: '02', title: 'TEAM UP', text: 'Connect with talented developers and build your dream team.' },
  { number: '03', title: 'BUILD', text: 'Turn your ideas into working projects with your team.' },
  { number: '04', title: 'SHIP', text: 'Showcase your work, get recognition and make a real impact.' },
];

/* ---------------------------------------------------------------------------
   LAYOUT - x / y = top-left of the card, w / h = size, r = rotation in degrees,
   z = stacking order. Units are the stage's own coordinate space (see above).
   `from` / `to` say where each connector starts / ends: [card index, fx, fy], where
   fx / fy is a point on the card as a fraction of its width / height
   (0,0 = top-left, 1,1 = bottom-right). `lift` is how high the curve arches.
--------------------------------------------------------------------------- */
const LAYOUT = {
  desktop: {
    W: 1240,
    H: 440,
    cards: [
      { x: 74, y: 84, w: 288, h: 318, r: 3.5, z: 2 },
      { x: 344, y: 14, w: 288, h: 336, r: 6, z: 4 },
      { x: 614, y: 88, w: 288, h: 320, r: -4, z: 1 },
      { x: 884, y: 56, w: 288, h: 322, r: 5.5, z: 3 },
    ],
    links: [
      { from: [0, 0.58, 0], to: [1, 0, 0.1], lift: 58 },
      { from: [1, 1, 0.1], to: [2, 0.34, 0], lift: 34 },
      { from: [2, 0.8, 0], to: [3, 0.1, 0.04], lift: 44 },
    ],
  },
  mobile: {
    W: 400,
    H: 1170,
    cards: [
      { x: 14, y: 20, w: 270, h: 300, r: -2.5, z: 1 },
      { x: 112, y: 292, w: 270, h: 300, r: 3, z: 2 },
      { x: 14, y: 564, w: 270, h: 300, r: -3, z: 3 },
      { x: 112, y: 836, w: 270, h: 300, r: 2.5, z: 4 },
    ],
    links: [
      { from: [0, 1, 0.78], to: [1, 0.82, 0], lift: 40 },
      { from: [1, 0, 0.78], to: [2, 0.18, 0], lift: 40 },
      { from: [2, 1, 0.78], to: [3, 0.82, 0], lift: 40 },
    ],
  },
};

/* Where each card enters from (px offset before it settles). */
const ENTER_FROM = [
  { x: -90, y: 0 }, // 01 - from the left
  { x: 0, y: -70 }, // 02 - slightly from the top
  { x: 90, y: 0 }, // 03 - from the right
  { x: 70, y: 80 }, // 04 - from the bottom-right
];
const CARD_STAGGER = 0.14; // seconds between cards
const CARD_DURATION = 0.95;
const LINES_START = 0.75; // connectors start drawing once the cards are nearly settled
const LINE_DURATION = 0.7;
const LINE_STEP = 0.55; // delay between one connector and the next

/* ---------- geometry helpers ---------- */

const round = (n) => Math.round(n * 10) / 10;

/** A point on a (rotated) card, in stage coordinates. Matches CSS rotate() around the centre. */
function anchor(card, fx, fy) {
  const cx = card.x + card.w / 2;
  const cy = card.y + card.h / 2;
  const lx = (fx - 0.5) * card.w;
  const ly = (fy - 0.5) * card.h;
  const t = (card.r * Math.PI) / 180;
  return {
    x: cx + lx * Math.cos(t) - ly * Math.sin(t),
    y: cy + lx * Math.sin(t) + ly * Math.cos(t),
  };
}

/** A soft arch from point a to point b. */
function arch(a, b, lift) {
  const dx = b.x - a.x;
  return (
    `M${round(a.x)} ${round(a.y)} ` +
    `C${round(a.x + dx * 0.12)} ${round(a.y - lift)}, ` +
    `${round(b.x - dx * 0.12)} ${round(b.y - lift * 0.75)}, ` +
    `${round(b.x)} ${round(b.y)}`
  );
}

/** Turns a layout into its three connector curves, each with its two end points. */
function buildLinks(layout) {
  return layout.links.map(({ from, to, lift }) => {
    const a = anchor(layout.cards[from[0]], from[1], from[2]);
    const b = anchor(layout.cards[to[0]], to[1], to[2]);
    return { d: arch(a, b, lift), a, b };
  });
}

const LINKS = {
  desktop: buildLinks(LAYOUT.desktop),
  mobile: buildLinks(LAYOUT.mobile),
};

const pct = (value, total) => `${round((value / total) * 100)}%`;

/** CSS variables for one card slot: position / size / rotation / z-index for both layouts. */
function slotVars(i) {
  const d = LAYOUT.desktop;
  const m = LAYOUT.mobile;
  const dc = d.cards[i];
  const mc = m.cards[i];
  return {
    '--dl': pct(dc.x, d.W),
    '--dt': pct(dc.y, d.H),
    '--dw': pct(dc.w, d.W),
    '--dh': pct(dc.h, d.H),
    '--dr': `${dc.r}deg`,
    '--dz': dc.z,
    '--ml': pct(mc.x, m.W),
    '--mt': pct(mc.y, m.H),
    '--mw': pct(mc.w, m.W),
    '--mh': pct(mc.h, m.H),
    '--mr': `${mc.r}deg`,
    '--mz': mc.z,
  };
}

/* ---------- small pieces ---------- */

/** Thin black arrow, bottom-right of every card (slides right on hover via CSS). */
function Arrow() {
  return (
    <svg className="cc-hiw__arrow" viewBox="0 0 28 18" aria-hidden="true">
      <path d="M1 9h25M19 2l7 7-7 7" />
    </svg>
  );
}

/** One layout's connector curves + hollow end points, drawn from card 01 towards 04. */
function Connectors({ layoutKey, shown, reduce }) {
  const { W, H } = LAYOUT[layoutKey];

  const pathVariants = {
    hidden: reduce ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 },
    show: (i) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: {
          duration: reduce ? 0 : LINE_DURATION,
          delay: reduce ? 0 : LINES_START + i * LINE_STEP,
          ease: EASE,
        },
        opacity: { duration: 0.01, delay: reduce ? 0 : LINES_START + i * LINE_STEP },
      },
    }),
  };

  // end = false -> the dot appears as the line starts; end = true -> as the line finishes.
  const dotVariants = {
    hidden: reduce ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 },
    show: ({ i, end }) => ({
      opacity: 1,
      scale: 1,
      transition: {
        duration: reduce ? 0 : 0.35,
        delay: reduce ? 0 : LINES_START + i * LINE_STEP + (end ? LINE_DURATION * 0.85 : 0),
        ease: EASE,
      },
    }),
  };

  return (
    <svg
      className={`cc-hiw__lines cc-hiw__lines--${layoutKey}`}
      viewBox={`0 0 ${W} ${H}`}
      aria-hidden="true"
      focusable="false"
    >
      {LINKS[layoutKey].map((link, i) => (
        <g key={i}>
          <motion.path
            className="cc-hiw__curve"
            d={link.d}
            variants={pathVariants}
            custom={i}
            initial="hidden"
            animate={shown ? 'show' : 'hidden'}
          />
          {[
            { p: link.a, end: false },
            { p: link.b, end: true },
          ].map(({ p, end }) => (
            <motion.circle
              key={end ? 'end' : 'start'}
              className="cc-hiw__dot"
              cx={round(p.x)}
              cy={round(p.y)}
              r="5.5"
              style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
              variants={dotVariants}
              custom={{ i, end }}
              initial="hidden"
              animate={shown ? 'show' : 'hidden'}
            />
          ))}
        </g>
      ))}
    </svg>
  );
}

/* ---------- section ---------- */

export default function HowItWorks() {
  usePageStyles([howCss]);
  const reduce = useReducedMotion();

  // The cards + curves play once, when the stage scrolls into view.
  const stageRef = useRef(null);
  const shown = useInView(stageRef, { once: true, amount: 0.25 });

  const rise = (distance, delay = 0) => ({
    hidden: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: distance },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0 : 0.9, delay: reduce ? 0 : delay, ease: EASE },
    },
  });

  const headingVariants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.12 } },
  };

  const cardVariants = (i) => ({
    hidden: reduce ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...ENTER_FROM[i] },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: reduce ? 0 : CARD_DURATION, delay: reduce ? 0 : i * CARD_STAGGER, ease: EASE },
    },
  });

  return (
    <section className="cc-hiw" id="how-it-works">
      <div className="cc-hiw__inner">
        <motion.div
          className="cc-hiw__head"
          variants={headingVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
        >
          <h2 className="cc-hiw__title" aria-label="How it works.">
            <motion.span className="cc-hiw__line" variants={rise(34)} aria-hidden="true">
              HOW IT WORKS.
            </motion.span>
            {/* <motion.span className="cc-hiw__line cc-hiw__line--italic" variants={rise(34)} aria-hidden="true">
              
            </motion.span> */}
          </h2>
          <motion.p className="cc-hiw__sub" variants={rise(18, 0.3)}>
            From idea to impact — here’s your CampusCode journey.
          </motion.p>
        </motion.div>

        <div className="cc-hiw__stage" ref={stageRef}>
          <ol className="cc-hiw__cards">
            {STEPS.map((step, i) => (
              <li className="cc-hiw__slot" key={step.number} style={slotVars(i)}>
                <motion.div
                  className="cc-hiw__enter"
                  variants={cardVariants(i)}
                  initial="hidden"
                  animate={shown ? 'show' : 'hidden'}
                >
                  <article className="cc-hiw__card">
                    <span className="cc-hiw__no">{step.number}</span>
                    <span className="cc-hiw__bar" aria-hidden="true"></span>
                    <h3 className="cc-hiw__card-title">
                      <span>{step.title}</span>
                    </h3>
                    <p className="cc-hiw__text">{step.text}</p>
                    <Arrow />
                  </article>
                </motion.div>
              </li>
            ))}
          </ol>

          {/* Both sets are always in the DOM; CSS shows the one that matches the screen. */}
          <Connectors layoutKey="desktop" shown={shown} reduce={reduce} />
          <Connectors layoutKey="mobile" shown={shown} reduce={reduce} />
        </div>
      </div>
    </section>
  );
}
