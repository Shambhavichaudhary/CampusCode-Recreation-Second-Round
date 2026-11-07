import { motion, useReducedMotion } from 'framer-motion';

/* Small line icons (stroke = currentColor) matching the reference design. */
const ICONS = {
  chip: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="12" y="12" width="24" height="24" rx="5" />
      <rect x="19" y="19" width="10" height="10" rx="2" />
      <path d="M18 12V6M24 12V6M30 12V6M18 42v-6M24 42v-6M30 42v-6M12 18H6M12 24H6M12 30H6M42 18h-6M42 24h-6M42 30h-6" />
    </svg>
  ),
  layers: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M24 6 7 15l17 9 17-9-17-9Z" />
      <path d="m7 23 17 9 17-9" />
      <path d="m7 31 17 9 17-9" />
    </svg>
  ),
  laptop: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="9" y="10" width="30" height="21" rx="2.5" />
      <path d="M4 37h40l-2.5 3H6.5L4 37Z" />
    </svg>
  ),
};

// The three hackathon categories.
const CATEGORIES = [
  { id: 'ai', icon: 'chip', title: 'AI INNOVATION', text: 'Build intelligent solutions with the power of AI.' },
  { id: 'web', icon: 'layers', title: 'FUTURE WEB', text: 'Create the next generation of web experiences.' },
  { id: 'campus', icon: 'laptop', title: 'CAMPUS TECH', text: 'Solve real campus challenges with technology.' },
];

// Easing + "play once when ~25% visible" so scrolling never replays the entrance.
const EASE = [0.2, 0.8, 0.2, 1];
const VIEWPORT = { once: true, amount: 0.25 };
const ROW_STAGGER = 0.11; // ~110ms between rows

/**
 * ArenaItem - one clickable card.
 * The entrance animation sits on a wrapper (.arena-item-reveal), not on the <a>:
 * Framer Motion writes an inline `transform`, which would override the CSS hover lift.
 */
function ArenaItem({ icon, title, text, index, reduce }) {
  return (
    <motion.div
      className="arena-item-reveal"
      initial={reduce ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.6, ease: EASE, delay: 0.25 + index * ROW_STAGGER }}
    >
      <a href="#" className="arena-item">
        <span className="arena-icon">{ICONS[icon]}</span>
        <span className="arena-divider" aria-hidden="true" />
        <span className="arena-copy">
          <h3>{title}</h3>
          <p>{text}</p>
        </span>
        <span className="arena-arrow" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 12h17M14 5.5 20.5 12 14 18.5" />
          </svg>
        </span>
      </a>
    </motion.div>
  );
}

/** ArenaSection - section 04 "ENTER THE ARENA". */
export default function ArenaSection() {
  const reduce = useReducedMotion();

  return (
    <section className="arena-section" id="arena">
      {/* Top label bar */}
      <div className="arena-topbar">
        <span className="arena-topbar-left">04 – ENTER THE ARENA</span>
        <span className="arena-topbar-center">
          <i aria-hidden="true" />
          THE CAMPUSCODE EXPERIENCE
          <i aria-hidden="true" />
        </span>
        <span className="arena-topbar-right">00 / 06</span>
      </div>

      {/* Heading + subtitle: soft fade + slight rise on entering the viewport */}
      <motion.div
        className="arena-header"
        initial={reduce ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT}
        transition={{ duration: 0.65, ease: EASE }}
      >
        <h2>ENTER THE ARENA.</h2>
        <p>Choose your track. Build. Innovate. Compete.</p>
      </motion.div>

      <div className="arena-list">
        {CATEGORIES.map((item, i) => (
          <ArenaItem key={item.id} {...item} index={i} reduce={reduce} />
        ))}
      </div>
    </section>
  );
}
