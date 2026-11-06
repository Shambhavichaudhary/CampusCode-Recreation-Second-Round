import { Link } from 'react-router-dom';
import usePageStyles from '../../hooks/usePageStyles.js';
import brandLogoCss from '../../styles/shared/brand-logo.css?inline';

/**
 * BrandLogo - the CampusCode header symbol (bordered box, three slanted bars,
 * "CAMPUSCODE / HACKATHON ARENA"), taken from the Dashboard landing page header.
 *
 * WHY: the same symbol is needed on Dashboard, Register and Login. The Register and
 * Login pages used a different SVG logo; they now use this component instead.
 *
 * The three bars are plain <span>s coloured by CSS (black / purple / green), so
 * the symbol's CSS lives in one shared file: styles/shared/brand-logo.css.
 *
 * Props: to - where the logo links to (default "/", the landing page).
 */
export default function BrandLogo({ to = '/' }) {
  usePageStyles([brandLogoCss]);

  return (
    <Link to={to} className="landing-logo">
      <span className="landing-logo-mark">
        <span></span>
        <span></span>
        <span></span>
      </span>

      <span className="landing-logo-content">
        <span className="landing-logo-text">CAMPUSCODE</span>
        <span className="landing-logo-subtext">HACKATHON ARENA</span>
      </span>
    </Link>
  );
}
