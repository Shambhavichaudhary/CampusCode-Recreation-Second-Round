import { useState } from 'react';

/**
 * TextField - one labelled input row: label, small icon on the left, the input,
 * and optional extra content on the right (e.g. the SHOW button) passed as children.
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

/**
 * PasswordField - a TextField with the SHOW / HIDE button.
 * The original script.js changed input.type with document.getElementById; in React we
 * keep a `visible` state instead. Clicking the button flips it, React re-renders,
 * and both the input type and the button word update automatically.
 */
export function PasswordField(props) {
  const [visible, setVisible] = useState(false);

  return (
    <TextField icon="•" {...props} type={visible ? 'text' : 'password'}>
      <button className="show-btn" type="button" onClick={() => setVisible(!visible)}>
        <span className="show-btn__ring"></span>{visible ? 'HIDE' : 'SHOW'}
      </button>
    </TextField>
  );
}
