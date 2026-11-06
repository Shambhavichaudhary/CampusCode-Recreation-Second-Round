/**
 * SvgSprite - a hidden SVG that stores every icon (and the logo mark / avatar) ONCE.
 * Anywhere else we draw an icon with <Icon name="i-grid" /> which points at one of the
 * <symbol>s below. Render <SvgSprite /> once at the top of every Student page.
 * (Original: the <svg class="sprite"> block at the top of Student-Dashboard/index.html)
 */
export default function SvgSprite() {
  return (
    <svg className="sprite" aria-hidden="true" focusable="false">
      <defs>
        <symbol id="i-grid" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="9" rx="1.5" /><rect x="14" y="3" width="7" height="5" rx="1.5" /><rect x="14" y="12" width="7" height="9" rx="1.5" /><rect x="3" y="16" width="7" height="5" rx="1.5" /></symbol>
        <symbol id="i-trophy" viewBox="0 0 24 24"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" /><path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" /><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" /><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" /></symbol>
        <symbol id="i-clock" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></symbol>
        <symbol id="i-sparkles" viewBox="0 0 24 24"><path d="M9.94 14.06 8.5 18.5 7.06 14.06 2.5 12.5l4.56-1.56L8.5 6.5l1.44 4.44 4.56 1.56z" /><path d="M18 3v4" /><path d="M20 5h-4" /><path d="M19 15v3" /><path d="M20.5 16.5h-3" /></symbol>
        <symbol id="i-award" viewBox="0 0 24 24"><circle cx="12" cy="8" r="6" /><path d="M15.48 12.89 17 22l-5-3-5 3 1.52-9.11" /></symbol>
        <symbol id="i-card" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2" /><circle cx="9" cy="11" r="2.2" /><path d="M5.5 16.5a3.6 3.6 0 0 1 7 0" /><path d="M15 9.5h4" /><path d="M15 13h4" /></symbol>
        <symbol id="i-bot" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="10" rx="2" /><circle cx="12" cy="5" r="2" /><path d="M12 7v4" /><path d="M8 16h.01" /><path d="M16 16h.01" /></symbol>
        <symbol id="i-bell" viewBox="0 0 24 24"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></symbol>
        <symbol id="i-user" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="10" r="3" /><path d="M7 20.66V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.66" /></symbol>
        <symbol id="i-refresh" viewBox="0 0 24 24"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" /><path d="M21 3v5h-5" /><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" /><path d="M8 16H3v5" /></symbol>
        <symbol id="i-bolt" viewBox="0 0 24 24"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" /></symbol>
        <symbol id="i-check" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" /></symbol>
        <symbol id="i-users" viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></symbol>

        {/* CampusCode mark (three slanted bars; colours set by .mark-a/b/c in sidebar.css) */}
        <symbol id="mark" viewBox="0 0 37 30">
          <polygon className="mark-a" points="9,0 15,0 6,30 0,30" />
          <polygon className="mark-b" points="21,0 27,0 18,30 12,30" transform="translate(-1 0)" />
          <polygon className="mark-c" points="31,0 37,0 28,30 22,30" transform="translate(-1 0)" />
        </symbol>

        {/* Student avatar */}
        <symbol id="avatar" viewBox="0 0 100 100">
          <rect width="100" height="100" fill="#eef8d2" />
          <path d="M22 100c0-14 12-22 28-22s28 8 28 22z" fill="#7c5cfc" />
          <rect x="42" y="66" width="16" height="14" rx="4" fill="#efc48f" />
          <ellipse cx="50" cy="48" rx="25" ry="24" fill="#f7d6a8" />
          <path d="M24 44c-2-18 10-27 26-27s28 9 25 27c-4-8-10-12-16-13-8 3-22 4-35 13z" fill="#111" />
          <circle cx="41" cy="50" r="2.6" fill="#111" />
          <circle cx="59" cy="50" r="2.6" fill="#111" />
          <circle cx="34" cy="57" r="4.2" fill="#f2a58e" opacity=".75" />
          <circle cx="66" cy="57" r="4.2" fill="#f2a58e" opacity=".75" />
          <path d="M44 61c3 3 9 3 12 0" stroke="#c46a4a" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        </symbol>
      </defs>
    </svg>
  );
}
