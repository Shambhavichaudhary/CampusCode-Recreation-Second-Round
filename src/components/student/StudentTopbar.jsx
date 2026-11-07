import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Icon from './Icon.jsx';
import { useStudentUI } from '../../context/StudentUIContext.jsx';
import { logoutUser } from '../../utils/auth.js';

const TITLES = {
  '/student': { crumb: 'CampusCode / Student', page: 'Overview' },
  '/student/events': { crumb: 'CampusCode / Student', page: 'Events' },
  '/student/my-events': { crumb: 'CampusCode / Student', page: 'My Events' },
  '/student/hackmate': { crumb: 'CampusCode / Student', page: 'HackMate AI' },
  '/student/ideacheck': { crumb: 'CampusCode / Student', page: 'IdeaCheck AI' },
  '/student/certificates': { crumb: 'CampusCode / Student', page: 'Certificates' },
  '/student/digital-card': { crumb: 'CampusCode / Student', page: 'Digital Card' },
  '/student/rulebot': { crumb: 'CampusCode / Student', page: 'RuleBot AI' },
  '/student/guide': { crumb: 'CampusCode / Student', page: 'Student Guide' },
  '/student/communication': { crumb: 'CampusCode / Student', page: 'Official Communication' },
  '/student/notifications': { crumb: 'CampusCode / Student', page: 'Notifications' },
  '/student/help': { crumb: 'CampusCode / Student', page: 'Help & Support' },
  '/student/profile': { crumb: 'CampusCode / Student', page: 'Profile' },
};

export default function StudentTopbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user, openPanel, reset } = useStudentUI();
  const [query, setQuery] = useState('');
  const meta = TITLES[pathname] || TITLES['/student'];
  const name = user?.fullName || 'Student';

  function onSearch(event) {
    event.preventDefault();
    const q = query.trim();
    navigate(q ? `/student/events?q=${encodeURIComponent(q)}` : '/student/events');
  }

  function onLogout() {
    logoutUser();
    navigate('/login');
  }

  return (
    <header className="topbar sd-topbar">
      <form className="sd-search" onSubmit={onSearch} role="search">
        <Icon name="i-search" className="sd-search__icon" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search events, hackathons, guides…"
          aria-label="Search events"
        />
      </form>

      <div className="sd-topbar__meta">
        <p className="topbar__crumb">{meta.crumb}</p>
        <h1 className="topbar__page">{meta.page}</h1>
      </div>

      <div className="topbar__actions sd-topbar__actions">
        {pathname === '/student' && (
          <>
            <button type="button" className="sd-ghost-btn" onClick={openPanel}>
              <Icon name="i-sliders" className="sd-ghost-btn__icon" />
              Edit Dashboard
            </button>
            <button type="button" className="sd-ghost-btn" onClick={reset}>
              Reset Layout
            </button>
          </>
        )}

        <Link className="icon-btn" to="/student/notifications" aria-label="Notifications">
          <Icon name="i-bell" className="icon-btn__icon" />
          <span className="icon-btn__dot"></span>
        </Link>

        <button className="refresh-btn" type="button" onClick={() => window.location.reload()}>
          <span className="refresh-btn__icon"><svg><use href="#i-refresh" /></svg></span>
          <span className="refresh-btn__text">Refresh</span>
        </button>

        <div className="user sd-user">
          <span className="user__avatar"><svg><use href="#avatar" /></svg></span>
          <span className="user__copy">
            <span className="user__name">{name}</span>
            <span className="user__role">{user?.accountType || 'Student'}</span>
          </span>
          <button type="button" className="sd-logout" onClick={onLogout}>Log out</button>
        </div>
      </div>
    </header>
  );
}
