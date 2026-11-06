import { Link, useLocation } from 'react-router-dom';
import Icon from './Icon.jsx';
import usePageStyles from '../../hooks/usePageStyles.js';
import sidebarCss from '../../styles/shared/sidebar.css?inline';

/**
 * Menu items. `to` = a real page of the app; items without `to` are placeholders
 * (href="#") exactly like in the original HTML.
 */
const NAV_ITEMS = [
  { label: 'Overview', icon: 'i-grid', to: '/student' },
  { label: 'Events', icon: 'i-trophy', to: '/student/events' },
  { label: 'My Events', icon: 'i-clock', to: '/student/my-events' },
  { label: 'HackMate AI', icon: 'i-sparkles' },
  { label: 'IdeaCheck AI', icon: 'i-sparkles' },
  { label: 'Certificates', icon: 'i-award' },
  { label: 'Digital Card', icon: 'i-card' },
  { label: 'RuleBot AI', icon: 'i-bot', tag: 'AI' },
  { label: 'Student Guide', icon: 'i-bot' },
  { label: 'Official Communication', icon: 'i-bell' },
  { label: 'Notifications', icon: 'i-bell' },
  { label: 'Help & Support', icon: 'i-bot' },
  { label: 'Profile', icon: 'i-user' },
];

/**
 * Sidebar - the Student Dashboard sidebar. ONE component used by three pages:
 * Student Dashboard (/student), Events and My Events - so it always looks and behaves
 * identically. Its CSS lives in styles/shared/sidebar.css (loaded together with it).
 *
 * The highlighted (lime) item with the "→" arrow is picked automatically by comparing
 * each item's `to` with the current URL, so no page needs to tell the sidebar who is active.
 *
 * NOTE: icons come from <SvgSprite />, so the page must render that too.
 */
export default function Sidebar() {
  usePageStyles([sidebarCss]);
  const { pathname } = useLocation();

  return (
    <aside className="sidebar">
      <a className="brand" href="#">
        <svg className="brand__mark"><use href="#mark" /></svg>
        <span className="brand__text">
          <span className="brand__name">CAMPUSCODE</span>
          <span className="brand__sub">HACKATHON ARENA</span>
        </span>
      </a>

      <p className="sidebar__heading">WORKSPACE</p>

      <nav className="nav">
        {NAV_ITEMS.map((item) => {
          const active = item.to === pathname;
          const className = active ? 'nav__item nav__item--active' : 'nav__item';
          const content = (
            <>
              <Icon name={item.icon} className="nav__icon" />
              <span className="nav__label">{item.label}</span>
              {item.tag && <span className="nav__tag">{item.tag}</span>}
              {active && <span className="nav__arrow">→</span>}
            </>
          );
          // Real pages use the router's <Link>; placeholder items stay plain "#" links.
          return item.to ? (
            <Link key={item.label} className={className} to={item.to}>{content}</Link>
          ) : (
            <a key={item.label} className={className} href="#">{content}</a>
          );
        })}
      </nav>
    </aside>
  );
}
