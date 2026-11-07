import { motion, useReducedMotion } from 'framer-motion';
import usePageStyles from '../../hooks/usePageStyles.js';
import aboutCss from '../../styles/pages/about-section.css?inline';
import OrbitalOrb from './OrbitalOrb.jsx';

/**
 * AboutSection - "WHAT IS CAMPUSCODE?"
 * Left: oversized "WHERE STUDENTS BUILD." heading, description, three-column info strip.
 * Right: <OrbitalOrb /> (monochrome sphere with orbital rings and particles).
 *
 * Styles live in styles/pages/about-section.css. Every class starts with "cc-about" / "cc-orb",
 * so nothing here can touch (or be touched by) the rest of the landing page.
 * The section keeps id="about" because the navbar's "About" link scrolls to it.
 */

const EASE = [0.22, 0.61, 0.36, 1];

const INFO = [
  { no: '01', title: 'STUDENTS', text: 'Discover opportunities, form teams and build real projects.' },
  { no: '02', title: 'ORGANIZERS', text: 'Host hackathons, manage events and engage talent.' },
  { no: '03', title: 'HACKATHONS', text: 'Participate, collaborate and build together.' },
];

export default function AboutSection() {
  usePageStyles([aboutCss]);
  const reduce = useReducedMotion();

  // With reduced motion every "hidden" state equals the final state, so nothing moves.
  const rise = (distance, duration = 0.9, delay = 0) => ({
    hidden: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: distance },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0 : duration, delay: reduce ? 0 : delay, ease: EASE },
    },
  });

  const headingVariants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.12 } },
  };

  // BUILD. is revealed left to right, like the outline being drawn
  const buildVariants = {
    hidden: { clipPath: reduce ? 'inset(-10% -6% -10% -6%)' : 'inset(-10% 106% -10% -6%)' },
    show: {
      clipPath: 'inset(-10% -6% -10% -6%)',
      transition: { duration: reduce ? 0 : 1.3, delay: reduce ? 0 : 0.35, ease: EASE },
    },
  };

  const stripVariants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.12, delayChildren: reduce ? 0 : 0.1 } },
  };

  const viewport = { once: true, amount: 0.3 };

  return (
    <section className="cc-about" id="about">
      <div className="cc-about__inner">
        <div className="cc-about__top">
          <span className="cc-about__no">01</span>
          <span className="cc-about__dot" aria-hidden="true"></span>
          <p className="cc-about__label">WHAT IS CAMPUSCODE?</p>
        </div>

        <div className="cc-about__grid">
          {/* Left: heading, description, information strip */}
          <div className="cc-about__content">
            <motion.h2
              className="cc-about__title"
              aria-label="Where students build."
              variants={headingVariants}
              initial="hidden"
              whileInView="show"
              viewport={viewport}
            >
              <motion.span className="cc-about__line" variants={rise(28)} aria-hidden="true">
                WHERE
              </motion.span>
              <motion.span className="cc-about__line" variants={rise(28)} aria-hidden="true">
                STUDENTS
              </motion.span>
              <motion.span className="cc-about__line" variants={rise(28)} aria-hidden="true">
                <motion.span className="cc-about__build" variants={buildVariants}>
                  BUILD.
                </motion.span>
              </motion.span>
            </motion.h2>

            <motion.p
              className="cc-about__description"
              variants={rise(18, 0.9, 0.5)}
              initial="hidden"
              whileInView="show"
              viewport={viewport}
            >
              CampusCode brings students, teams, organizers and hackathons into one connected
              ecosystem.
            </motion.p>

            <motion.ul
              className="cc-about__strip"
              variants={stripVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
            >
              {INFO.map((item) => (
                <motion.li className="cc-about__item" key={item.no} variants={rise(16, 0.8)}>
                  <span className="cc-about__item-no">{item.no}</span>
                  <h3 className="cc-about__item-title">{item.title}</h3>
                  <p className="cc-about__item-text">{item.text}</p>
                </motion.li>
              ))}
            </motion.ul>
          </div>

          {/* Right: orbital visual */}
          <div className="cc-about__visual">
            <OrbitalOrb />
          </div>
        </div>
      </div>
    </section>
  );
}
