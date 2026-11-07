import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import usePageStyles from '../../hooks/usePageStyles.js';
import shellCss from '../../styles/shared/student-shell.css?inline';
import sidebarCss from '../../styles/shared/sidebar.css?inline';

import SvgSprite from './SvgSprite.jsx';
import Sidebar from './Sidebar.jsx';
import StudentTopbar from './StudentTopbar.jsx';
import CustomizePanel from './CustomizePanel.jsx';
import { StudentUIProvider, useStudentUI } from '../../context/StudentUIContext.jsx';

function ShellFrame() {
  const { prefs } = useStudentUI();
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return (
    <div className="sd-app" data-accent={prefs.appearance} data-style={prefs.layoutStyle}>
      <SvgSprite />
      <Sidebar />
      <div className="main sd-main">
        <StudentTopbar />
        <Outlet />
      </div>
      <CustomizePanel />
    </div>
  );
}

/** Shared chrome for Overview, Events and My Events. */
export default function StudentShell() {
  usePageStyles([shellCss, sidebarCss]);

  return (
    <StudentUIProvider>
      <ShellFrame />
    </StudentUIProvider>
  );
}
