import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, useReducedMotion } from 'framer-motion';

// Same easing curve the rest of the landing page uses (see BuildTogether / HeroOrbs).
const EASE = [0.22, 0.61, 0.36, 1];

/**
 * FinalCta - last call-to-action: "YOUR NEXT PROJECT STARTS HERE." + join button.
 *
 * Entrance: when the content scrolls into view it reveals once, in sequence:
 * READY? -> YOUR NEXT -> PROJECT -> STARTS HERE. -> button. `once: true` means it
 * never replays when the user scrolls slightly up and down. With reduced motion the
 * movement is dropped and only a very short fade remains.
 */
export default function FinalCta() {
  const contentRef = useRef(null);
  const reduce = useReducedMotion();
  const inView = useInView(contentRef, { once: true, amount: 0.3 });

  // One helper keeps every step on the same fade + gentle upward drift.
  const reveal = (delay, y = 22, duration = 0.9) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y },
    animate: inView ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: reduce ? 0.01 : duration, ease: EASE, delay: reduce ? 0 : delay },
  });

  return (
    <section className="final-cta-section" id="join">
      <div className="cta-background-circle"></div>

      <div className="final-cta-content" ref={contentRef}>
        <motion.span className="final-cta-label" {...reveal(0, 0, 0.7)}>READY?</motion.span>

        <h2 className="final-cta-title">
          <motion.span className="cta-solid" {...reveal(0.15)}>YOUR NEXT</motion.span>
          <motion.span className="cta-outline cta-outline--reveal" {...reveal(0.32, 28, 1.1)}>PROJECT</motion.span>
          <motion.span className="cta-solid" {...reveal(0.5)}>STARTS HERE.</motion.span>
        </h2>

        <motion.div className="final-cta-action" {...reveal(0.72, 16)}>
          {/* Same pill button as "BUILD WITH CAMPUSCODE" (btx-cta in build-together.css) */}
          <Link to="/register" className="btx-cta btx-cta--landing">
            JOIN CAMPUSCODE
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M7 17L17 7M8 7h9v9" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
