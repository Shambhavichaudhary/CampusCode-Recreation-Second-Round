import { Link } from 'react-router-dom';
import BrandLogo from '../common/BrandLogo.jsx';

/**
 * AuthFrame - the page "shell" shared by Register and Login:
 *   drifting background dots -> header (logo + back link) -> <main> -> footer.
 * The two pages only provide what is different (the hero text and the form card)
 * as `children`.
 *
 * Props:
 *   mainClassName - extra class for <main> (Login adds "login-layout")
 *   children      - the <section>s that go inside <main>
 */
export default function AuthFrame({ mainClassName = '', children }) {
  return (
    <>
      {/* Decorative dots - the grid and glows are drawn by CSS (body::before / ::after) */}
      <div className="bg-dots" aria-hidden="true">
        <span className="bg-dot bg-dot--1"></span>
        <span className="bg-dot bg-dot--2"></span>
        <span className="bg-dot bg-dot--3"></span>
        <span className="bg-dot bg-dot--4"></span>
        <span className="bg-dot bg-dot--5"></span>
        <span className="bg-dot bg-dot--6"></span>
      </div>

      <header className="site-header">
        {/* Dashboard header symbol (replaces the old SVG logo of these pages) */}
        <BrandLogo />

        <nav className="site-nav" aria-label="Main">
          <Link className="site-nav__link" to="/">← BACK TO HOME</Link>
        </nav>
      </header>

      <main className={`main-layout ${mainClassName}`.trim()}>{children}</main>

      <footer className="site-footer">
        <span>CAMPUSCODE © 2026</span>
        <span>LEARN · BUILD · COMPETE · SHIP</span>
        <span className="site-footer__status">ALL SYSTEMS OPERATIONAL</span>
      </footer>
    </>
  );
}
