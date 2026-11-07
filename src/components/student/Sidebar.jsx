import { Link, useLocation } from 'react-router-dom';
import Icon from './Icon.jsx';
import BrandLogo from '../common/BrandLogo.jsx';
import { useStudentUI } from '../../context/StudentUIContext.jsx';

/**
 * Menu items. `to` = a real page of the app; items without `to` are placeholders
 * (href="#") exactly like the original dashboard.
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
 * Student Dashboard sidebar. BrandLogo is the same component as the landing navbar —
 * only wrapped so it sits on a light plate against the dark sidebar.
 */
export default function Sidebar() {
  const { pathname } = useLocation();
  const { openPanel } = useStudentUI();

  return (
    <aside className="sidebar sd-sidebar">
      <div className="sd-sidebar__brand">
        <BrandLogo to="/student" />
      </div>

      <p className="sidebar__heading">Workspace</p>

      <nav className="nav" aria-label="Student workspace">
        {NAV_ITEMS.map((item) => {
          const active = item.to === pathname;
          const className = active ? 'nav__item nav__item--active' : 'nav__item';
          const content = (
            <>
              <Icon name={item.icon} className="nav__icon" />
              <span className="nav__label">{item.label}</span>
              {item.tag && <span className="nav__tag">{item.tag}</span>}
            </>
          );
          return item.to ? (
            <Link key={item.label} className={className} to={item.to}>{content}</Link>
          ) : (
            <a key={item.label} className={className} href="#">{content}</a>
          );
        })}
      </nav>

      <div className="sd-sidebar__foot">
        <button type="button" className="sd-sidebar__customize" onClick={openPanel}>
          <Icon name="i-sliders" className="nav__icon" />
          <span>
            Customize Dashboard
            <small>Make it yours</small>
          </span>
        </button>
      </div>
    </aside>
  );
}
