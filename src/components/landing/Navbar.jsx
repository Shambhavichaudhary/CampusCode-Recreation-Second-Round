import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import BrandLogo from '../common/BrandLogo.jsx';
import usePageStyles from '../../hooks/usePageStyles.js';
import navbarCss from '../../styles/pages/navbar.css?inline';

/**
 * Navbar - floating neumorphic pill at the top of the landing page.
 *   Left:   the shared CampusCode logo (<BrandLogo />, untouched)
 *   Center: section links ("#about" style links scroll to the section with that id)
 *   Right:  LOGIN (/login) and JOIN CAMPUSCODE (/register)
 *
 * On tablet / phone the centre links collapse into a hamburger menu. Every
 * destination is kept; Login + Join move into the menu on small phones.
 * All styles live in styles/pages/navbar.css (every class starts with "cc-nav").
 */
const NAV_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#how-it-works', label: 'How It Works' },
  { href: '#arena', label: 'Hackathons' },
  { href: '#community', label: 'Community' },
];

function JoinButton({ onClick }) {
  return (
    <Link to="/register" className="cc-nav__cta" onClick={onClick}>
      Join CampusCode
      <span className="cc-nav__arrow" aria-hidden="true">↗</span>
    </Link>
  );
}

export default function Navbar() {
  usePageStyles([navbarCss]);

  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const close = () => setOpen(false);

  // Escape closes the menu; growing past the tablet breakpoint resets it.
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    const mq = window.matchMedia('(min-width: 961px)');
    const onChange = (e) => e.matches && setOpen(false);
    window.addEventListener('keydown', onKey);
    mq.addEventListener('change', onChange);
    return () => {
      window.removeEventListener('keydown', onKey);
      mq.removeEventListener('change', onChange);
    };
  }, []);

  return (
    <header className="cc-nav-header">
      <div className="cc-nav-shell">
        <nav className="cc-nav" aria-label="Primary">
          <div className="cc-nav__brand">
            {/* Shared CampusCode symbol (also used on Register and Login) */}
            <BrandLogo />
          </div>

          <ul className="cc-nav__links">
            {NAV_LINKS.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="cc-nav__link">{item.label}</a>
              </li>
            ))}
          </ul>

          <div className="cc-nav__actions">
            <Link to="/login" className="cc-nav__login">Login</Link>
            <JoinButton />

            <button
              type="button"
              className="cc-nav__toggle"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="cc-nav-panel"
              onClick={() => setOpen((v) => !v)}
            >
              <span className="cc-nav__toggle-bar" />
              <span className="cc-nav__toggle-bar" />
              <span className="cc-nav__toggle-bar" />
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              id="cc-nav-panel"
              className="cc-nav__panel"
              initial={reduceMotion ? false : { opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.22, 0.61, 0.36, 1] }}
            >
              <ul className="cc-nav__panel-list">
                {NAV_LINKS.map((item) => (
                  <li key={item.href}>
                    <a href={item.href} className="cc-nav__panel-link" onClick={close}>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>

              <div className="cc-nav__panel-actions">
                <Link to="/login" className="cc-nav__login" onClick={close}>Login</Link>
                <JoinButton onClick={close} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
