import { useEffect, useRef, useState } from 'react';
import usePageStyles from '../../hooks/usePageStyles.js';
import useDocumentTitle from '../../hooks/useDocumentTitle.js';
import loginCss from '../../styles/pages/login.css?inline';
import authCss from '../../styles/shared/auth.css?inline';
import { loginUser } from '../../utils/auth.js';
import { useNavigate } from 'react-router-dom';

import AuthFrame from '../../components/auth/AuthFrame.jsx';
import AuthHero from '../../components/auth/AuthHero.jsx';
import AuthCardHead from '../../components/auth/AuthCardHead.jsx';
import { TextField, PasswordField } from '../../components/auth/AuthFields.jsx';

const FEATURE_CARDS = [
  { meta: ['01'], title: 'BUILD' },
  { meta: ['02'], title: 'COMPETE' },
  { meta: ['03'], title: 'SHIP' },
];

// Captcha digits drawn in the SVG: [x, y, stroke colour, tilt, digit]
const CAPTCHA_GLYPHS = [
  { x: 30, y: 48, stroke: '#35c9bd', rotate: -6, digit: '1' },
  { x: 66, y: 46, stroke: '#e21fb5', rotate: 8, digit: '3' },
  { x: 102, y: 47, stroke: '#d6457f', rotate: -4, digit: '8' },
  { x: 138, y: 46, stroke: '#7c55ef', rotate: 5, digit: '1' },
  { x: 166, y: 48, stroke: '#35c9bd', rotate: -7, digit: '3' },
];

/**
 * Login page (route "/login") - original Login/index.html.
 * Same AuthFrame / AuthHero / form pieces as Register, plus login-only CSS.
 *
 * STYLE ORDER: login.css first, THEN the shared auth.css - exactly the order of the
 * <link> tags in the original Login page. Because later CSS wins ties, keep it this way.
 */
export default function Login() {
  const navigate = useNavigate();

  // LOGIN PROGRESS ANIMATION
  // isRiding  -> true while the bus drives across the security box (adds .is-riding, see login.css)
  // hasNavigated -> makes sure we leave the page exactly once
  const [isRiding, setIsRiding] = useState(false);
  const hasNavigated = useRef(false);
  const fallbackTimer = useRef(null);

  // Go to the dashboard - called only AFTER the bus has reached the finish line.
  const goToDashboard = () => {
    if (hasNavigated.current) return;
    hasNavigated.current = true;
    clearTimeout(fallbackTimer.current);
    navigate('/student');
  };

  // Clean up the safety timer if the user leaves the page in the meantime.
  useEffect(() => () => clearTimeout(fallbackTimer.current), []);

const handleLogin = (event) => {
  event.preventDefault();

  // Ignore extra clicks / Enter presses while the animation is running (no duplicate submits)
  if (isRiding) return;

  const form = new FormData(event.currentTarget);

  const email = form.get('email');
  const password = form.get('password');
  const captcha = form.get('captcha');

  if (captcha?.trim() !== '13813') {
    alert('Incorrect CAPTCHA!');
    return;
  }

  const user = loginUser(email, password);

  if (!user) {
    alert('Invalid email or password!');
    return;
  }

  // Authentication succeeded: start the progress animation instead of navigating right away.
  // The dashboard opens from <div className="login-security"> onAnimationEnd below.
  // The timer is only a safety net (slightly longer than the 2s busRide animation) in case
  // the browser never fires animationend, so the user can never get stuck on this page.
  setIsRiding(true);
  fallbackTimer.current = setTimeout(goToDashboard, 2400);
};
  useDocumentTitle('Login — CampusCode');
  usePageStyles([loginCss, authCss]);

  return (
    <AuthFrame mainClassName="login-layout">
      <AuthHero
        status="CAMPUSCODE / AUTHENTICATION"
        step={['ACCESS', '01 / 02']}
        lines={['ENTER', 'THE', 'ARENA.']}
        titleClass="login-hero__title"
        accentClass="login-hero__accent"
        text="Sign in to continue building, collaborating and competing with the CampusCode community."
        cardsClass="login-feature-cards"
        cards={FEATURE_CARDS}
        footerStatus="ACCESS YOUR ACCOUNT"
      />

      <section className="register login" aria-labelledby="login-title">
        <div className="register-card login-card">
          <AuthCardHead
            eyebrow="EXISTING ACCOUNT"
            code={['CC', '01']}
            title="LOGIN"
            titleId="login-title"
            subtitle="Access your CampusCode account."
          />

          {/* preventDefault keeps this demo form from reloading the page */}
          <form className="form login-form" id="login-form" noValidate onSubmit={handleLogin}>
            <TextField id="email" name="email" label="EMAIL ADDRESS" icon="@" type="email"
              placeholder="you@example.com" autoComplete="email" required />

            <PasswordField id="password" name="password" label="PASSWORD"
              placeholder="Enter your password" autoComplete="current-password" required />

            <div className="field login-captcha-field">
              <span className="field__label" id="captcha-label">CAPTCHA</span>
              <div className="captcha">
                <svg className="captcha__image login-captcha-image" viewBox="0 0 188 64" role="img" aria-label="Captcha code 13813">
                  <rect x="0.5" y="0.5" width="187" height="63" rx="10" fill="#f1f1ec" stroke="#333" />
                  <g fontFamily="Georgia,serif" fontSize="40" fontWeight="700" fill="none" strokeWidth="1.3" textAnchor="middle">
                    {CAPTCHA_GLYPHS.map((g) => (
                      <text key={g.x} x={g.x} y={g.y} stroke={g.stroke} transform={`rotate(${g.rotate} ${g.x} 38)`}>
                        {g.digit}
                      </text>
                    ))}
                  </g>
                  <path d="M12 26 C50 16 90 40 128 22 S170 36 176 40" stroke="#84c721" strokeWidth="1.6" fill="none" />
                  <path d="M10 42 C60 24 120 30 182 56" stroke="#7458f8" strokeWidth="1.6" fill="none" />
                </svg>
                <button className="captcha__new" type="button" id="captcha-new"><span aria-hidden="true">↻</span> NEW</button>
              </div>
              <div className="field__control field__control--plain login-captcha-input">
                <input className="field__input field__input--code" id="captcha-code" name="captcha" type="text"
                  placeholder="Enter the code above" aria-labelledby="captcha-label" autoComplete="off" required />
              </div>
            </div>

            {/* Security status box with the little bus (animation classes are in login.css) */}
            <div
              className={`login-security${isRiding ? ' is-riding' : ''}`}
              aria-label="Security check status"
              // animationend bubbles up from the bus: when busRide finishes, the progress is complete
              onAnimationEnd={(e) => { if (e.animationName === 'busRide') goToDashboard(); }}
            >
              <span className="login-truck" aria-hidden="true">
                <svg viewBox="0 0 90 42">
                  <rect x="2" y="3" width="84" height="34" rx="9" fill="#111" />
                  <polygon points="17,10 34,10 27,30 10,30" fill="#fff" />
                  <polygon points="38,10 55,10 48,30 31,30" fill="#7458f8" />
                  <polygon points="59,10 76,10 69,30 52,30" fill="#84c721" />
                  <circle cx="22" cy="35" r="6" fill="#111" stroke="#fff" strokeWidth="2" />
                  <circle cx="69" cy="35" r="6" fill="#111" stroke="#fff" strokeWidth="2" />
                </svg>
              </span>
              <span className="login-security__sleep">Zzz</span>
              <span className="login-security__status">READY</span>
              <span className="login-security__bar"></span>
            </div>

            <button className="submit-btn login-submit" type="submit" disabled={isRiding} aria-busy={isRiding}>
              <span className="submit-btn__label">LOGIN</span>
              <span className="submit-btn__arrow" aria-hidden="true">↗</span>
            </button>
          </form>

          <div className="login-card__bottom"><a href="#forgot-password">FORGOT PASSWORD?</a></div>
        </div>

        <div className="register__footer">
          <span>AUTH / 2026</span>
          <span className="register__footer-status"><span className="dot dot--lime"></span>SECURE LOGIN</span>
        </div>
      </section>
    </AuthFrame>
  );
}
