import { useState } from 'react';
import { Link } from 'react-router-dom';
import usePageStyles from '../../hooks/usePageStyles.js';
import useDocumentTitle from '../../hooks/useDocumentTitle.js';
import authCss from '../../styles/shared/auth.css?inline';
import { registerUser } from '../../utils/auth.js';
import { useNavigate } from 'react-router-dom';

import AuthFrame from '../../components/auth/AuthFrame.jsx';
import AuthHero from '../../components/auth/AuthHero.jsx';
import AuthCardHead from '../../components/auth/AuthCardHead.jsx';
import { TextField, PasswordField } from '../../components/auth/AuthFields.jsx';

// Cards on the left side of the page
const FEATURE_CARDS = [
  { meta: ['01', 'IDENTITY'], title: 'CREATE', text: 'Build your student profile and enter the CampusCode ecosystem.', line: true },
  { meta: ['02', 'TEAM'], title: 'COLLABORATE', text: 'Find teammates and build projects together.' },
  { meta: ['03', 'ARENA'], title: 'COMPETE', text: 'Join hackathons and turn ideas into submissions.' },
];

// Each captcha digit: position, outline colour and tilt (copied from the original SVG)
const CAPTCHA_GLYPHS = [
  { x: 30, y: 48, stroke: '#e3b93e', rotate: -6 },
  { x: 68, y: 46, stroke: '#e21fb5', rotate: 8 },
  { x: 106, y: 47, stroke: '#3bff57', rotate: -4 },
  { x: 136, y: 46, stroke: '#7ce03a', rotate: 5 },
  { x: 164, y: 48, stroke: '#e2806e', rotate: -7 },
];

/**
 * Register page (route "/register") - original Register/index.html + script.js.
 * Layout comes from AuthFrame; this file only holds what is specific to registration.
 * Styles: the shared auth.css (the same file the Login page uses).
 */
export default function Register() {
  const navigate = useNavigate();

const handleRegister = (event) => {
  event.preventDefault();

  const form = event.currentTarget;

  // Get form values
  const fullName = form.querySelector('#full-name').value.trim();
  const email = form.querySelector('#email').value.trim();
  const password = form.querySelector('#password').value;
  const confirmPassword = form.querySelector('#confirm-password').value;
  const captcha = form.querySelector('#captcha-code').value.trim();
  const accountType = form.querySelector('#account-type').value;
  const ageConfirmed = form.querySelector('.age-check__box').checked;

  // Check empty fields
  if (!fullName || !email || !password || !confirmPassword || !captcha) {
    alert('Please fill in all fields!');
    return;
  }

  // Validate email
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    alert('Please enter a valid email address!');
    return;
  }

  // Check password
  if (password !== confirmPassword) {
    alert('Passwords do not match!');
    return;
  }

  // Check CAPTCHA
  if (captcha !== digits.join('')) {
    alert('Incorrect CAPTCHA!');
    return;
  }

  // Check age confirmation
  if (!ageConfirmed) {
    alert('Please confirm that you are 18 years of age or older!');
    return;
  }

  // Register user
  const result = registerUser({
    fullName,
    email,
    password,
    accountType,
  });

  if (!result.ok) {
    alert(result.message);
    return;
  }

  alert('Registration successful! Please login.');
  navigate('/login');
};
  useDocumentTitle('Register — CampusCode');
  usePageStyles([authCss]);

  // Captcha digits live in state. Clicking "NEW" replaces them with random digits
  // (same as script.js did) and React redraws the SVG text.
  const [digits, setDigits] = useState(['2', '9', '8', '1', '2']);
  const newCaptcha = () => setDigits(digits.map(() => String(Math.floor(Math.random() * 10))));

  return (
    <AuthFrame>
      <AuthHero
        status="CAMPUSCODE / REGISTRATION"
        step={['CREATE', '02 / 02']}
        lines={['JOIN', 'THE', 'ARENA.']}
        text="Create your CampusCode identity and become part of a student
        ecosystem designed around ideas, teams, technology and competition."
        cards={FEATURE_CARDS}
        footerStatus="REGISTRATION OPEN"
      />

      {/* ================= REGISTRATION FORM ================= */}
      <section className="register" aria-labelledby="register-title">
        <div className="register-card">
          <AuthCardHead
            eyebrow="NEW ACCOUNT"
            code={['CC', '02']}
            title="REGISTER"
            titleId="register-title"
            subtitle="Create your CampusCode account."
          />

          {/* onSubmit preventDefault = demo only, stops the page from reloading */}
          <form className="form" id="register-form" noValidate onSubmit={handleRegister}>
            <TextField id="full-name" label="FULL NAME" icon="◇" placeholder="Your full name" autoComplete="name" />
            <TextField id="email" label="EMAIL ADDRESS" icon="@" type="email" placeholder="you@example.com" autoComplete="email" />

            {/* Account type (only Student can self-register) */}
            <div className="field">
              <label className="field__label" htmlFor="account-type">ACCOUNT TYPE</label>
              <div className="field__control">
                <span className="field__icon field__icon--emoji" aria-hidden="true">🎓</span>
                <select className="field__input field__input--select" id="account-type">
                  <option value="student">STUDENT</option>
                </select>
              </div>
              <p className="field__note">
                Organizer? Accounts are created by our team — contact{' '}
                <a className="link-strong" href="mailto:campuscode@gmail.com">campuscode@gmail.com</a>
              </p>
            </div>

            <PasswordField id="password" label="PASSWORD" placeholder="Create a password" autoComplete="new-password" />
            <PasswordField id="confirm-password" label="CONFIRM PASSWORD" placeholder="Repeat your password" autoComplete="new-password" />

            {/* ================= CAPTCHA ================= */}
            <div className="field">
              <span className="field__label" id="captcha-label">CAPTCHA</span>
              <div className="captcha">
                <svg className="captcha__image" viewBox="0 0 188 64" role="img" aria-label="Captcha code" id="captcha-svg">
                  <rect x="0.5" y="0.5" width="187" height="63" rx="10" fill="#f1f1ec" stroke="#e1e1d9" />
                  <g fontFamily="Georgia, serif" fontSize="40" fontWeight="700" fill="none" strokeWidth="1.3" textAnchor="middle">
                    {CAPTCHA_GLYPHS.map((g, i) => (
                      <text key={i} x={g.x} y={g.y} stroke={g.stroke} transform={`rotate(${g.rotate} ${g.x} 38)`}>
                        {digits[i]}
                      </text>
                    ))}
                  </g>
                  <path d="M12 26 C 50 16, 90 40, 128 22 S 170 36, 176 40" stroke="#4a90d9" strokeWidth="1.6" fill="none" />
                  <path d="M10 42 C 60 24, 120 30, 182 56" stroke="#d6457f" strokeWidth="1.6" fill="none" />
                </svg>
                <button className="captcha__new" type="button" id="captcha-new" onClick={newCaptcha}>
                  <span aria-hidden="true">↻</span> NEW
                </button>
              </div>
              <div className="field__control field__control--plain">
                <input className="field__input field__input--code" id="captcha-code" type="text"
                  placeholder="Enter the code above" aria-labelledby="captcha-label" autoComplete="off" />
              </div>
            </div>

            {/* Age confirmation */}
            <label className="age-check">
              <input className="age-check__box" type="checkbox" />
              <span>I confirm that I am <strong className="link-strong">18 years of age or older</strong>.</span>
            </label>

            {/* ================= SUBMIT BUTTON ================= */}
            <button className="submit-btn" type="submit">
              <span className="submit-btn__badge" aria-hidden="true">
                <svg viewBox="0 0 30 14">
                  <polygon points="4,0 11,0 7,14 0,14" fill="var(--color-ink)" />
                  <polygon points="12,0 19,0 15,14 8,14" fill="var(--color-purple)" />
                  <polygon points="20,0 27,0 23,14 16,14" fill="var(--color-lime)" />
                </svg>
              </span>
              <span className="submit-btn__label">SEND VERIFICATION CODE</span>
              <span className="submit-btn__arrow" aria-hidden="true">↗</span>
            </button>
          </form>

          {/* Login hint */}
          <div className="register-card__login">
            <span>ALREADY HAVE AN ACCOUNT?</span>
            <Link to="/login">LOGIN →</Link>
          </div>
        </div>

        <div className="register__footer">
          <span>AUTH / 2026</span>
          <span className="register__footer-status"><span className="dot dot--lime"></span>SECURE REGISTRATION</span>
        </div>
      </section>
    </AuthFrame>
  );
}
