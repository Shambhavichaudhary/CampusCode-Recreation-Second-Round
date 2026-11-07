import { useState } from 'react';

/**
 * TextField - one labelled input row: label, small icon on the left, the input,
 * and optional extra content on the right (e.g. the visibility button) passed as children.
 */
export function TextField({ id, label, icon, type = 'text', children, ...inputProps }) {
  return (
    <div className="field">
      <label className="field__label" htmlFor={id}>{label}</label>
      <div className="field__control">
        <span className="field__icon" aria-hidden="true">{icon}</span>
        <input className="field__input" id={id} type={type} {...inputProps} />
        {children}
      </div>
    </div>
  );
}

function OpenEyeIcon() {
  return (
    <svg className="auth-eye-btn__icon" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"
        d="M2 12c2.6-4.8 6.2-7.2 10-7.2S19.4 7.2 22 12c-2.6 4.8-6.2 7.2-10 7.2S4.6 16.8 2 12Z" />
      <circle cx="12" cy="12" r="2.6" fill="currentColor" />
    </svg>
  );
}

/** Closed eyelids pressed together — no slash, pupil, or cross. */
function ClosedEyeIcon() {
  return (
    <svg className="auth-eye-btn__icon" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"
        d="M3 12.2c2.6-2.8 5.6-4 9-4s6.4 1.2 9 4" />
      <path fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"
        d="M5.2 13.4c2.1 1.5 4.4 2.2 6.8 2.2s4.7-.7 6.8-2.2" />
    </svg>
  );
}

/**
 * PasswordField - password input with a closed/open eye toggle (Login + Register).
 * Hidden → closed eye. Visible → open eye. No slash.
 */
export function PasswordField(props) {
  const [visible, setVisible] = useState(false);

  return (
    <TextField icon="•" {...props} type={visible ? 'text' : 'password'}>
      <button
        className="auth-eye-btn"
        type="button"
        aria-label={visible ? 'Hide password' : 'Show password'}
        onClick={() => setVisible((open) => !open)}
      >
        <span className={`auth-eye-btn__face${visible ? '' : ' is-on'}`} aria-hidden="true">
          <ClosedEyeIcon />
        </span>
        <span className={`auth-eye-btn__face${visible ? ' is-on' : ''}`} aria-hidden="true">
          <OpenEyeIcon />
        </span>
      </button>
    </TextField>
  );
}
