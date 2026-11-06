// The three hackathon categories (same markup, different text).
const CATEGORIES = [
  { number: '01', title: 'AI INNOVATION', text: "Build intelligent solutions for tomorrow's real-world challenges.", tag: 'AI / ML' },
  { number: '02', title: 'FUTURE WEB', text: 'Design and shape the next generation of digital experiences.', tag: 'WEB / 3.0' },
  { number: '03', title: 'CAMPUS TECH', text: 'Create technology that makes student life better.', tag: 'INNOVATION' },
];

/** ArenaItem - one clickable row; its arrow moves on hover (CSS). */
function ArenaItem({ number, title, text, tag }) {
  const handlePointerMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();

    e.currentTarget.style.setProperty(
      "--mouse-x",
      `${e.clientX - rect.left}px`
    );

    e.currentTarget.style.setProperty(
      "--mouse-y",
      `${e.clientY - rect.top}px`
    );
  };

  return (
    <a
      href="#"
      className="arena-item"
      onPointerMove={handlePointerMove}
    >
      <span className="arena-item-number">{number}</span>
      <h3>{title}</h3>
      <p>{text}</p>
      <span className="arena-tag">{tag}</span>
      <span className="arena-arrow">↗</span>
    </a>
  );
}

/** ArenaSection - section 04 "ENTER THE ARENA" with the list of categories. */
export default function ArenaSection() {
  return (
    <section className="arena-section" id="arena">
      <div className="arena-header">
        <div className="arena-heading">
          <span className="arena-section-number">04 /</span>
          <h2>ENTER THE ARENA</h2>
        </div>
        <a href="#" className="arena-view-all">
          VIEW ALL <span>↗</span>
        </a>
      </div>

      <div className="arena-list">
        {CATEGORIES.map((item) => (
          <ArenaItem key={item.number} {...item} />
        ))}
      </div>
    </section>
  );
}
