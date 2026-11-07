import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * OrbitalOrb - the right-hand visual of the "What is CampusCode?" section.
 *
 * Layers, back to front:
 *   1. concentric background rings (static SVG, fades in once)
 *   2. ground shadow
 *   3. BACK canvas   - the half of every ring / particle that is behind the sphere
 *   4. sphere        - plain CSS (gradients + inset shadows) with the "CC" text
 *   5. FRONT canvas  - the half of every ring / particle that is in front of the sphere
 *
 * The rings are real 3D circles that are rotated, projected with a light perspective and
 * split into a back half and a front half. That split is what makes them pass behind and in
 * front of the sphere correctly. Everything is drawn in one requestAnimationFrame loop that
 * only runs while the visual is on screen. With reduced motion a single still frame is drawn.
 *
 * Styles: styles/pages/about-section.css (all classes start with "cc-orb").
 */

/* ---------- scene description (ring radii and particle sizes are fractions of the stage size S;
   the sphere itself is sized in CSS: about-section.css, .cc-orb__sphere = 52% of the stage) ---------- */

// tilt = angle the ring plane is leaned back (ellipse height = cos(tilt) * width)
// roll = in-plane rotation at t=0 (degrees), rollSpeed = degrees / second (sign = direction)
// wobble = slow breathing of the tilt (degrees)
const RINGS = [
  { r: 0.46, tilt: 70.5, roll: 7, rollSpeed: 2.1, wobble: 4, wobbleSpeed: 0.31, width: 1.35, shade: 0 },
  { r: 0.46, tilt: 71, roll: -36, rollSpeed: -2.9, wobble: 4, wobbleSpeed: 0.24, width: 1.35, shade: 0 },
  { r: 0.39, tilt: 66, roll: 62, rollSpeed: 1.5, wobble: 5, wobbleSpeed: 0.19, width: 1, shade: 1 },
];

// ring = index in RINGS, angle0 = start angle (rad), speed = rad / second (sign = direction)
const PARTICLES = [
  { ring: 0, angle0: 3.5, speed: 0.3, size: 0.021, shade: 0 },
  { ring: 0, angle0: 0.25, speed: -0.21, size: 0.017, shade: 0 },
  { ring: 1, angle0: 5.35, speed: 0.24, size: 0.022, shade: 0 },
  { ring: 1, angle0: 2.2, speed: -0.17, size: 0.018, shade: 0 },
  { ring: 2, angle0: 1.1, speed: 0.36, size: 0.014, shade: 1 },
];

const SEGMENTS = 120; // polyline segments per ring
const DEG = Math.PI / 180;
const FOCAL = 3.2; // perspective distance (in stage sizes) - higher = flatter
const ALPHA_STEPS = 6; // ring opacity is grouped into steps so each run is one clean path

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

/** Turns a point on a ring into a screen point (px relative to stage centre) + depth. */
function project(ring, angle, t, cam, S) {
  const R = ring.r * S;
  const tilt = (ring.tilt + Math.sin(t * ring.wobbleSpeed) * ring.wobble) * DEG;
  const roll = (ring.roll + t * ring.rollSpeed) * DEG;

  // point on the circle, then lean the plane back around the X axis
  const cx = R * Math.cos(angle);
  const cy = R * Math.sin(angle);
  let x = cx;
  let y = cy * Math.cos(tilt);
  let z = cy * Math.sin(tilt);

  // in-plane rotation (around the viewing axis)
  const cr = Math.cos(roll);
  const sr = Math.sin(roll);
  const rx = x * cr - y * sr;
  const ry = x * sr + y * cr;
  x = rx;
  y = ry;

  // camera sway that follows the pointer (rotate around Y, then X)
  const cyw = Math.cos(cam.yaw);
  const syw = Math.sin(cam.yaw);
  const x2 = x * cyw + z * syw;
  const z2 = -x * syw + z * cyw;
  const cp = Math.cos(cam.pitch);
  const sp = Math.sin(cam.pitch);
  const y3 = y * cp - z2 * sp;
  const z3 = y * sp + z2 * cp;

  const scale = 1 / (1 - z3 / (FOCAL * S));
  return { x: x2 * scale, y: y3 * scale, z: z3, scale };
}

/** Glossy little sphere: soft highlight, dark body. */
function drawParticle(ctx, px, py, radius, shade) {
  const g = ctx.createRadialGradient(
    px - radius * 0.38,
    py - radius * 0.42,
    radius * 0.06,
    px,
    py,
    radius,
  );
  if (shade === 0) {
    g.addColorStop(0, '#8d8d8d');
    g.addColorStop(0.22, '#3a3a3a');
    g.addColorStop(0.6, '#0e0e0e');
    g.addColorStop(1, '#000');
  } else {
    g.addColorStop(0, '#d2d2d2');
    g.addColorStop(0.25, '#8a8a8a');
    g.addColorStop(0.65, '#4a4a4a');
    g.addColorStop(1, '#2a2a2a');
  }
  ctx.beginPath();
  ctx.arc(px, py, radius, 0, Math.PI * 2);
  ctx.fillStyle = g;
  ctx.fill();
}

/** Draws every ring as a few long runs of constant opacity, front runs on `front`, back runs on `back`. */
function drawRing(ring, t, cam, S, back, front) {
  const R = ring.r * S;
  const colour = ring.shade === 0 ? '0,0,0' : '70,70,70';

  let run = null; // { ctx, step, points: [] }
  let prev = null;

  const flush = () => {
    if (!run || run.points.length < 2) return;
    const { ctx, step, points, half } = run;
    const depthAlpha = 0.5 + (0.5 * step) / (ALPHA_STEPS - 1);
    ctx.beginPath();
    ctx.moveTo(points[0][0], points[0][1]);
    for (let i = 1; i < points.length; i += 1) ctx.lineTo(points[i][0], points[i][1]);
    ctx.strokeStyle = `rgba(${colour},${(depthAlpha * (half === 'front' ? 1 : 0.9)).toFixed(3)})`;
    ctx.lineWidth = ring.width;
    ctx.stroke();
  };

  for (let i = 0; i <= SEGMENTS; i += 1) {
    const p = project(ring, (i / SEGMENTS) * Math.PI * 2, t, cam, S);
    const isFront = p.z > 0;
    const depth01 = clamp((p.z / R + 1) / 2, 0, 1);
    const step = Math.round(depth01 * (ALPHA_STEPS - 1));
    const half = isFront ? 'front' : 'back';

    if (!run || run.half !== half || run.step !== step) {
      flush();
      run = { ctx: isFront ? front : back, half, step, points: [] };
      if (prev) run.points.push(prev); // start at the previous point so runs join up
    }
    run.points.push([p.x, p.y]);
    prev = [p.x, p.y];
  }
  flush();
}

export default function OrbitalOrb() {
  const reduceMotion = useReducedMotion();
  const stageRef = useRef(null);
  const backRef = useRef(null);
  const frontRef = useRef(null);

  useEffect(() => {
    const stage = stageRef.current;
    const backCanvas = backRef.current;
    const frontCanvas = frontRef.current;
    if (!stage || !backCanvas || !frontCanvas) return undefined;

    const back = backCanvas.getContext('2d');
    const front = frontCanvas.getContext('2d');
    if (!back || !front) return undefined;

    let S = 0; // stage size in CSS px
    let rafId = 0;
    let running = false;
    let last = 0;
    let t = 0; // animation clock in seconds (only advances while visible)

    // pointer-driven camera sway, eased towards its target
    const cam = { yaw: 0, pitch: 0 };
    const target = { yaw: 0, pitch: 0 };
    const light = { x: 0, y: 0 };

    const resize = () => {
      const rect = stage.getBoundingClientRect();
      S = rect.width;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      [backCanvas, frontCanvas].forEach((c) => {
        c.width = Math.round(S * dpr);
        c.height = Math.round(S * dpr);
      });
      [back, front].forEach((ctx) => {
        ctx.setTransform(dpr, 0, 0, dpr, S * dpr * 0.5, S * dpr * 0.5); // origin = stage centre
        ctx.lineCap = 'butt';
        ctx.lineJoin = 'round';
      });
    };

    const render = () => {
      if (!S) return;
      back.clearRect(-S / 2, -S / 2, S, S);
      front.clearRect(-S / 2, -S / 2, S, S);

      RINGS.forEach((ring) => drawRing(ring, t, cam, S, back, front));

      PARTICLES.forEach((pt) => {
        const ring = RINGS[pt.ring];
        const p = project(ring, pt.angle0 + t * pt.speed, t, cam, S);
        const radius = pt.size * S * p.scale;
        const ctx = p.z > 0 ? front : back;
        drawParticle(ctx, p.x, p.y, radius, pt.shade);
      });
    };

    const tick = (now) => {
      if (!running) return;
      const dt = Math.min((now - last) / 1000, 0.05); // clamp so a stalled tab never makes a jump
      last = now;
      t += dt;

      // ease camera and light towards the pointer target
      const k = 1 - Math.exp(-dt * 3.2);
      cam.yaw += (target.yaw - cam.yaw) * k;
      cam.pitch += (target.pitch - cam.pitch) * k;
      light.x += (cam.yaw * 28 - light.x) * k; // highlight leans towards the pointer
      light.y += (-cam.pitch * 28 - light.y) * k;
      stage.style.setProperty('--orb-light-x', `${light.x.toFixed(2)}%`);
      stage.style.setProperty('--orb-light-y', `${light.y.toFixed(2)}%`);

      render();
      rafId = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running || reduceMotion) return;
      running = true;
      last = performance.now();
      rafId = requestAnimationFrame(tick);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(rafId);
    };

    resize();
    render(); // first frame (also the only frame when motion is reduced)

    const resizeObserver = new ResizeObserver(() => {
      resize();
      render();
    });
    resizeObserver.observe(stage);

    // only animate while the visual is actually on screen
    const visibility = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0.05 },
    );
    visibility.observe(stage);

    // pointer sway: listen on the section so the whole area reacts, never blocks clicks
    const section = stage.closest('section') || stage;
    const onPointerMove = (e) => {
      if (e.pointerType === 'touch') return;
      const rect = stage.getBoundingClientRect();
      const nx = clamp(((e.clientX - (rect.left + rect.width / 2)) / window.innerWidth) * 2, -1, 1);
      const ny = clamp(((e.clientY - (rect.top + rect.height / 2)) / window.innerHeight) * 2, -1, 1);
      target.yaw = nx * 0.16;
      target.pitch = -ny * 0.12;
    };
    const onPointerLeave = () => {
      target.yaw = 0;
      target.pitch = 0;
    };
    if (!reduceMotion) {
      section.addEventListener('pointermove', onPointerMove, { passive: true });
      section.addEventListener('pointerleave', onPointerLeave, { passive: true });
    }

    return () => {
      stop();
      resizeObserver.disconnect();
      visibility.disconnect();
      section.removeEventListener('pointermove', onPointerMove);
      section.removeEventListener('pointerleave', onPointerLeave);
    };
  }, [reduceMotion]);

  // 15 faint circles; the CSS mask fades the outer ones away
  const backgroundRings = Array.from({ length: 15 }, (_, i) => 175 + i * 21);

  return (
    <div className="cc-orb" ref={stageRef} aria-hidden="true">
      {/* 1. concentric background rings */}
      <motion.svg
        className="cc-orb__halo"
        viewBox="0 0 1000 1000"
        initial={reduceMotion ? false : { opacity: 0, scale: 0.92 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.8, ease: [0.22, 0.61, 0.36, 1] }}
      >
        {backgroundRings.map((r) => (
          <circle key={r} cx="500" cy="500" r={r} />
        ))}
      </motion.svg>

      {/* 2. ground shadow */}
      <span className="cc-orb__shadow" />

      {/* 3-5. floating group: back canvas, sphere, front canvas */}
      <div className="cc-orb__float">
        <canvas className="cc-orb__canvas" ref={backRef} />
        <div className="cc-orb__sphere">
          <span className="cc-orb__logo">CC</span>
        </div>
        <canvas className="cc-orb__canvas" ref={frontRef} />
      </div>
    </div>
  );
}
