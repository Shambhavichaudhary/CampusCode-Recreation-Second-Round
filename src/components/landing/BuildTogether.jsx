import { useCallback, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import usePageStyles from '../../hooks/usePageStyles.js';
// Vite copies this file into the build and gives us its URL. (Unchanged source.)
import showcaseVideo from '../../assets/CampusCode_Showcase.mp4';
// Scoped stylesheet: every class starts with "btx-" so nothing leaks to other sections.
import buildTogetherCss from '../../styles/pages/build-together.css?inline';

const EASE = [0.22, 0.61, 0.36, 1];

/** Splits a word into letters so the heading can reveal with a slight stagger. */
function Letters({ text, reduce, baseDelay }) {
  return text.split('').map((char, i) => (
    <motion.span
      key={`${char}-${i}`}
      className="btx-letter"
      aria-hidden="true"
      variants={{
        hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 36 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: reduce ? 0.01 : 0.7, ease: EASE, delay: baseDelay + i * 0.035 },
        },
      }}
    >
      {char}
    </motion.span>
  ));
}

/** The three floating labels around the video (the content is a real sequence, so numbered). */
const PILLS = [
  {
    key: 'build',
    no: '01',
    title: 'BUILD',
    text: 'Turn ideas into prototypes',
    side: 'left',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" />
      </svg>
    ),
  },
  {
    key: 'compete',
    no: '02',
    title: 'COMPETE',
    text: 'Showcase your skills',
    side: 'left',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="9" cy="8" r="3" />
        <circle cx="17" cy="9" r="2.4" />
        <path d="M3 19c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5M15.5 14c3 0 5.5 1.7 5.5 4.5" />
      </svg>
    ),
  },
  {
    key: 'ship',
    no: '03',
    title: 'SHIP',
    text: 'Launch real solutions',
    side: 'right',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M14.5 3.5c3.500-.4 6 0 6 0s.4 2.500 0 6l-6.500 6.500-5.500-5.500 6-7z" />
        <path d="M8 10.500l-3.500.8L3 13.500l4 .5M13.500 16l-.8 3.500L10.500 21l-.5-4" />
        <circle cx="15.500" cy="8.500" r="1.300" />
      </svg>
    ),
  },
];

/** BuildTogether - "BUILD TOGETHER." heading with the viewport-autoplaying showcase video. */
export default function BuildTogether() {
  usePageStyles([buildTogetherCss]);

  const reduce = useReducedMotion();
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const frameRef = useRef(null);
  const programmaticPause = useRef(false);
  const userPaused = useRef(false);

  // Scroll-triggered reveal: runs once, when the section starts to appear.
  const revealed = useInView(sectionRef, { once: true, amount: 0.2 });
  const state = revealed ? 'show' : 'hidden';

  /* ---------- VIDEO: play when visible, pause when not ---------- */
  const playVideo = useCallback(() => {
    const video = videoRef.current;
    if (!video || userPaused.current) return;
    video.muted = true; // autoplay policies require a muted video
    const attempt = video.play();
    if (attempt !== undefined) {
      attempt.catch((error) => {
        // AbortError: play() interrupted by pause() while scrolling - expected.
        // NotAllowedError: browser blocked autoplay - the native controls stay available.
        if (error?.name !== 'AbortError' && error?.name !== 'NotAllowedError') {
          console.warn('Build Together video could not start:', error);
        }
      });
    }
  }, []);

  const pauseVideo = useCallback(() => {
    const video = videoRef.current;
    if (!video || video.paused) return;
    programmaticPause.current = true;
    video.pause();
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) playVideo();
        else pauseVideo();
      },
      { threshold: 0.2 },
    );
    observer.observe(section);

    // Do not keep decoding video in a background tab.
    const onVisibility = () => {
      if (document.hidden) {
        pauseVideo();
        return;
      }
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const visible = Math.min(rect.bottom, vh) - Math.max(rect.top, 0);
      if (visible > Math.min(rect.height, vh) * 0.2) playVideo();
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [playVideo, pauseVideo]);

  // If the visitor pauses the video themselves, scrolling must not restart it.
  const handlePause = () => {
    if (programmaticPause.current) programmaticPause.current = false;
    else userPaused.current = true;
  };
  const handlePlay = () => {
    userPaused.current = false;
  };

  /* ---------- FRAME: restrained 3D tilt (mouse only) ---------- */
  const rotateX = useSpring(useMotionValue(0), { stiffness: 120, damping: 20, mass: 0.6 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 120, damping: 20, mass: 0.6 });

  const handleMove = (event) => {
    if (reduce || event.pointerType !== 'mouse' || !frameRef.current) return;
    const rect = frameRef.current.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(x * 5);
    rotateX.set(-y * 4);
  };
  const handleLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  const fade = (delay = 0, y = 18) => ({
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y },
    show: { opacity: 1, y: 0, transition: { duration: reduce ? 0.01 : 0.8, ease: EASE, delay } },
  });

  return (
    <section
      ref={sectionRef}
      className="build-together-section btx"
      id="build-together"
      aria-labelledby="btx-title"
    >
      {/* Soft background swooshes (decorative) */}
      <svg className="btx-swoosh btx-swoosh--left" viewBox="0 0 400 600" aria-hidden="true">
        <path d="M-20 600 C 40 420 160 330 400 250 L 400 330 C 200 410 110 480 80 600 Z" />
      </svg>
      <svg className="btx-swoosh btx-swoosh--right" viewBox="0 0 400 600" aria-hidden="true">
        <path d="M420 0 C 380 120 260 230 0 300 L 0 360 C 280 290 400 190 440 80 Z" />
      </svg>

      <motion.div className="btx-meta" initial="hidden" animate={state} variants={fade(0, 8)}>
        <span>02 — EXPERIENCE</span>
        <span>00 / 06</span>
      </motion.div>

      <motion.p className="btx-eyebrow" initial="hidden" animate={state} variants={fade(0.05, 8)}>
        <span className="btx-eyebrow__rule" aria-hidden="true" />
        THE CAMPUSCODE EXPERIENCE
        <span className="btx-eyebrow__rule" aria-hidden="true" />
      </motion.p>

      {/* ---------- HEADING ---------- */}
      <motion.h2
        id="btx-title"
        className="btx-title"
        aria-label="Build together."
        initial="hidden"
        animate={state}
      >
        <svg className="btx-orbit" viewBox="0 0 760 300" aria-hidden="true">
          <motion.ellipse
            cx="380"
            cy="150"
            rx="352"
            ry="84"
            transform="rotate(-5 380 150)"
            initial={{ pathLength: reduce ? 1 : 0 }}
            animate={revealed ? { pathLength: 1 } : {}}
            transition={{ duration: reduce ? 0.01 : 1.6, ease: EASE, delay: 0.5 }}
          />
          <motion.path
            className="btx-orbit__star"
            d="M640 8 C 644 28 650 34 672 38 C 650 42 644 48 640 68 C 636 48 630 42 608 38 C 630 34 636 28 640 8 Z"
            initial={{ opacity: 0, scale: reduce ? 1 : 0.4 }}
            animate={revealed ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: reduce ? 0.01 : 0.7, ease: EASE, delay: 1.1 }}
            style={{ transformOrigin: '640px 38px', transformBox: 'view-box' }}
          />
        </svg>
        <span className="btx-line btx-line--build">
          <Letters text="BUILD" reduce={reduce} baseDelay={0.1} />
        </span>
        <span className="btx-line btx-line--together">
          <Letters text="TOGETHER" reduce={reduce} baseDelay={0.3} />
          <Letters text="." reduce={reduce} baseDelay={0.65} />
        </span>
      </motion.h2>

      {/* ---------- VIDEO SHOWCASE ---------- */}
      <div className="btx-stage">
        <motion.div
          className="btx-stage__enter"
          initial="hidden"
          animate={state}
          variants={{
            hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 48, scale: 0.97 },
            show: {
              opacity: 1,
              y: 0,
              scale: 1,
              transition: { duration: reduce ? 0.01 : 1, ease: EASE, delay: 0.55 },
            },
          }}
        >
          <motion.div
            ref={frameRef}
            className="btx-tilt"
            style={reduce ? undefined : { rotateX, rotateY }}
            whileHover={reduce ? undefined : { scale: 1.012 }}
            transition={{ duration: 0.5, ease: EASE }}
            onPointerMove={handleMove}
            onPointerLeave={handleLeave}
          >
            <span className="btx-plate btx-plate--back" aria-hidden="true" />
            <span className="btx-plate btx-plate--mid" aria-hidden="true" />

            <div className="btx-frame">
              {/* Same video, same source. Playback is driven by the IntersectionObserver above. */}
              <video
                ref={videoRef}
                className="btx-video"
                muted
                loop
                playsInline
                controls
                controlsList="nodownload"
                preload="auto"
                onPause={handlePause}
                onPlay={handlePlay}
              >
                <source src={showcaseVideo} type="video/mp4" />
                Your browser does not support HTML video.
              </video>

              <span className="btx-chip btx-chip--left">
                <i className="btx-chip__dot" aria-hidden="true" />
                CAMPUSCODE ORIGINAL
              </span>
              <span className="btx-chip btx-chip--right">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="12" cy="12" r="1.800" />
                  <path d="M7.800 7.800a6 6 0 0 0 0 8.400M16.200 7.800a6 6 0 0 1 0 8.400M4.900 4.900a10 10 0 0 0 0 14.200M19.100 4.900a10 10 0 0 1 0 14.200" />
                </svg>
                LIVE PREVIEW
              </span>
            </div>

            <svg className="btx-spark" viewBox="0 0 100 100" aria-hidden="true">
              <defs>
                <linearGradient id="btxSparkA" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#ffffff" />
                  <stop offset="0.5" stopColor="#8d8d8d" />
                  <stop offset="1" stopColor="#1a1a1a" />
                </linearGradient>
              </defs>
              <path
                d="M50 2 C 55 34 66 45 98 50 C 66 55 55 66 50 98 C 45 66 34 55 2 50 C 34 45 45 34 50 2 Z"
                fill="url(#btxSparkA)"
              />
            </svg>
          </motion.div>
        </motion.div>

        {/* Floating labels sit outside the tilt layer so they stay steady while the frame moves */}
        {PILLS.map((pill, index) => (
          <motion.div
            key={pill.key}
            className={`btx-pillwrap btx-pillwrap--${pill.key}`}
            initial="hidden"
            animate={state}
            variants={fade(1 + index * 0.14, 14)}
          >
            <div className="btx-pill" style={{ '--float-delay': `${index * -1.8}s` }}>
              <span className="btx-pill__icon">{pill.icon}</span>
              <span className="btx-pill__copy">
                <strong>
                  <em>{pill.no}</em> {pill.title}
                </strong>
                <small>{pill.text}</small>
              </span>
            </div>
            <svg className="btx-link" viewBox="0 0 80 60" aria-hidden="true">
              <path d={pill.side === 'left' ? 'M2 0 C 6 34 30 44 70 42' : 'M78 0 C 74 34 50 44 10 42'} />
              <circle cx={pill.side === 'left' ? 70 : 10} cy="42" r="4.500" />
            </svg>
          </motion.div>
        ))}
      </div>

      {/* ---------- FOOT ---------- */}
      <motion.div className="btx-foot" initial="hidden" animate={state} variants={fade(1.1, 14)}>
        <p className="btx-tagline">
          <span>DON’T JUST PARTICIPATE.</span> <span>CREATE SOMETHING.</span>
        </p>
        <Link to="/register" className="btx-cta">
          BUILD WITH CAMPUSCODE
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M7 17L17 7M8 7h9v9" />
          </svg>
        </Link>
      </motion.div>
    </section>
  );
}
