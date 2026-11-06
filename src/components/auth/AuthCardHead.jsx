/**
 * AuthCardHead - top of the white form card: small eyebrow label, "CC 02" code on the
 * right, big title and subtitle. Used by both Register and Login cards.
 */
export default function AuthCardHead({ eyebrow, code, title, titleId, subtitle }) {
  return (
    <div className="register-card__head">
      <p className="register-card__eyebrow">{eyebrow}</p>
      <p className="register-card__code" aria-hidden="true">{code[0]}<br />{code[1]}</p>
      <h2 className="register-card__title" id={titleId}>{title}</h2>
      <p className="register-card__subtitle">{subtitle}</p>
    </div>
  );
}
