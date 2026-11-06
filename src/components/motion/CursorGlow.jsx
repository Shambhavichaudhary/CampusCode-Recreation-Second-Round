import { useEffect, useRef } from 'react';

/**
 * CursorGlow - a soft light-purple radial glow that follows the mouse.
 *
 * HOW IT STAYS FAST
 *  - Position lives in refs, never in React state -> zero re-renders while the mouse moves.
 *  - A requestAnimationFrame loop eases the glow toward the pointer (lerp), which gives the
 *    fluid "trailing" feel. The loop sleeps as soon as the glow has caught up, so an idle
 *    mouse costs nothing.
 *  - Only `transform` and `opacity` are changed (GPU friendly, no layout work).
 *
 * HOW IT STAYS HARMLESS
 *  - `pointer-events: none` (see animations.css) -> clicks, hovers, text selection and form
 *    inputs behave exactly as before.
 *  - Skipped on touch-only devices and eased 1:1 (no trailing) for prefers-reduced-motion.
 *
 * Mounted ONCE in App.jsx (outside the routed page), so it is identical on every page.
 */
const GLOW_SIZE = 460;     // must match .cursor-glow width/height in animations.css
const FOLLOW_SPEED = 0.16; // 0..1 - higher = tighter follow, lower = floatier

export default function CursorGlow() {
  const glowRef = useRef(null);

  useEffect(() => {
    // No hover-capable mouse (phones/tablets) -> nothing to follow.
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined;

    const glow = glowRef.current;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const speed = reduceMotion ? 1 : FOLLOW_SPEED;

    const target = { x: 0, y: 0 };   // where the pointer is
    const current = { x: 0, y: 0 };  // where the glow is drawn
    const state = { frameId: null, started: false };   // mutable loop state (not React state)

    const draw = () => {
      current.x += (target.x - current.x) * speed;
      current.y += (target.y - current.y) * speed;
      glow.style.transform =
        `translate3d(${current.x - GLOW_SIZE / 2}px, ${current.y - GLOW_SIZE / 2}px, 0)`;

      // Keep animating until the glow has (almost) reached the pointer, then sleep.
      const settled = Math.abs(target.x - current.x) < 0.3 && Math.abs(target.y - current.y) < 0.3;
      state.frameId = settled ? null : requestAnimationFrame(draw);
    };

    const onPointerMove = (event) => {
      if (event.pointerType === 'touch') return;
      target.x = event.clientX;
      target.y = event.clientY;

      if (!state.started) {
        // First move: jump straight to the pointer, then fade in (no sweep from 0,0).
        state.started = true;
        current.x = target.x;
        current.y = target.y;
        glow.classList.add('cursor-glow--visible');
      }
      if (state.frameId === null) state.frameId = requestAnimationFrame(draw);
    };

    const hide = () => glow.classList.remove('cursor-glow--visible');
    const show = () => state.started && glow.classList.add('cursor-glow--visible');

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', hide);
    document.documentElement.addEventListener('mouseenter', show);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      document.documentElement.removeEventListener('mouseleave', hide);
      document.documentElement.removeEventListener('mouseenter', show);
      if (state.frameId !== null) cancelAnimationFrame(state.frameId);
    };
  }, []);

  return <div ref={glowRef} className="cursor-glow" aria-hidden="true" />;
}
