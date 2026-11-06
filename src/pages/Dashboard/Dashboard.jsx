import usePageStyles from '../../hooks/usePageStyles.js';
import useDocumentTitle from '../../hooks/useDocumentTitle.js';
import landingCss from '../../styles/pages/landing.css?inline';

import Navbar from '../../components/landing/Navbar.jsx';
import Hero from '../../components/landing/Hero.jsx';
import MarqueeStrip from '../../components/landing/MarqueeStrip.jsx';
import AboutSection from '../../components/landing/AboutSection.jsx';
import BuildTogether from '../../components/landing/BuildTogether.jsx';
import HowItWorks from '../../components/landing/HowItWorks.jsx';
import ArenaSection from '../../components/landing/ArenaSection.jsx';
import MissionSection from '../../components/landing/MissionSection.jsx';
import FindPeopleSection from '../../components/landing/FindPeopleSection.jsx';
import FinalCta from '../../components/landing/FinalCta.jsx';
import Footer from '../../components/landing/Footer.jsx';

/**
 * Dashboard page (landing page, route "/") - original Dashboard/index.html.
 * The page is just the sections stacked in order; each section is its own component
 * in components/landing/. Its CSS (landing.css) is active only while this page is shown.
 */
export default function Dashboard() {
  useDocumentTitle('CampusCode | Build. Compete. Ship.');
  usePageStyles([landingCss]);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <MarqueeStrip />
        <AboutSection />
        <BuildTogether />
        <HowItWorks />
        <ArenaSection />
        <MissionSection />
        <FindPeopleSection />
        <FinalCta />
        <Footer />
      </main>
    </>
  );
}
