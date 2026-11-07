/**
 * Four large 3D brand spheres behind the Login / Register card.
 * Class names are prefixed `auth-orb` so they cannot collide with landing HeroOrbs.
 */
export default function AuthOrbs() {
  return (
    <div className="auth-orbs" aria-hidden="true">
      <span className="auth-orb auth-orb--purple auth-orb--1">
        <span className="auth-orb__sheen"></span>
      </span>
      <span className="auth-orb auth-orb--green auth-orb--2">
        <span className="auth-orb__sheen"></span>
      </span>
      <span className="auth-orb auth-orb--purple auth-orb--3">
        <span className="auth-orb__sheen"></span>
      </span>
      <span className="auth-orb auth-orb--green auth-orb--4">
        <span className="auth-orb__sheen"></span>
      </span>
    </div>
  );
}
