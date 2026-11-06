import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import Register from './pages/Register/Register.jsx';
import Login from './pages/Login/Login.jsx';
import StudentDashboard from './pages/StudentDashboard/StudentDashboard.jsx';
import Events from './pages/Events/Events.jsx';
import MyEvents from './pages/MyEvents/MyEvents.jsx';
import ProtectedRoute from './components/auth/ProtectedRoute.jsx';
import CursorGlow from './components/motion/CursorGlow.jsx';
/**
 * In the original site every page was its own HTML file and opened scrolled to the top.
 * In a single-page app the browser keeps the old scroll position, so we reset it
 * when a page change finishes. Hash links like "#about" are not affected.
 *
 * (This used to run in a useEffect on every pathname change. With page transitions the
 * old page is still fading out at that moment, so the reset now happens in
 * AnimatePresence's onExitComplete - i.e. exactly when the new page takes over.)
 */
const scrollToTop = () => window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

/**
 * PAGE TRANSITION
 * Fade-out of the old page, then fade-in of the new one (mode="wait" = one at a time).
 * Why "wait": every page injects its own stylesheet while mounted (usePageStyles), and
 * those stylesheets must never overlap - so the old page is fully removed before the
 * new one mounts. Only opacity is animated: no transform means position:fixed parts
 * (student sidebar) stay perfectly still while the page fades.
 */
const PAGE_FADE = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.28, ease: [0.22, 0.61, 0.36, 1] },
};

/**
 * App = the route table. One URL -> one page component.
 *   Original file                        ->  URL
 *   Dashboard/index.html (landing)       ->  /
 *   Login/index.html                     ->  /login
 *   Register/index.html                  ->  /register
 *   Student-Dashboard/index.html         ->  /student
 *   Student-Dashboard/Events.html        ->  /student/events
 *   Student-Dashboard/My-Events.html     ->  /student/my-events
 */
export default function App() {
  const location = useLocation();

  return (
    <>
      {/* One glow for the whole site, outside the routed page so it never remounts */}
      <CursorGlow />

      <AnimatePresence mode="wait" onExitComplete={scrollToTop}>
        {/* key = pathname: a new URL means a new page, which triggers exit + enter.
            Routes gets the SAME location so the old page stays rendered while it fades out. */}
        <motion.div className="page-transition" key={location.pathname} {...PAGE_FADE}>
          <Routes location={location}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/student" element={<StudentDashboard />} />
              <Route path="/student/events" element={<Events />} />
              <Route path="/student/my-events" element={<MyEvents />} />
            </Route>
          </Routes>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
