export default function FeaturePage({ kicker, title, description, children, className = '' }) {
  return (
    <main className={`content sd-content sd-feature ${className}`.trim()}>
      <header className="sd-feature__head">
        {kicker ? <p className="sd-feature__kicker">{kicker}</p> : null}
        <h2 className="sd-feature__title">{title}</h2>
        {description ? <p className="sd-feature__lead">{description}</p> : null}
      </header>
      {children}
    </main>
  );
}
