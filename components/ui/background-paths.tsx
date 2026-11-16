"use client";

import { useEffect, useRef } from "react";

const COUNT = 36;

/** One set of flowing curves. `position` (1 or -1) mirrors the set. Durations are fixed per path so server and client markup match. */
function pathsFor(position: 1 | -1) {
  return Array.from({ length: COUNT }, (_, i) => {
    const k = i * 5 * position;
    return {
      id: i,
      d: `M-${380 - k} -${189 + i * 6}C-${380 - k} -${189 + i * 6} -${312 - k} ${216 - i * 6} ${152 - k} ${343 - i * 6}C${616 - k} ${470 - i * 6} ${684 - k} ${875 - i * 6} ${684 - k} ${875 - i * 6}`,
      width: 0.5 + i * 0.03,
      opacity: 0.05 + i * 0.011,
      duration: 22 + ((i * 7) % 11),
      delay: -((i * 3) % 17),
    };
  });
}

const SETS = [pathsFor(1), pathsFor(-1)];

/**
 * Ambient lime curves that drift across the section. Pure CSS animation (see `.cf-path` in globals.css):
 * it pauses while off screen or in a hidden tab and is still under reduced motion.
 */
export function BackgroundPaths({ className = "" }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;
    let inView = false;
    const sync = () => svg.toggleAttribute("data-running", inView && !document.hidden);
    const io = new IntersectionObserver(([e]) => {
      inView = e.isIntersecting;
      sync();
    });
    io.observe(svg);
    document.addEventListener("visibilitychange", sync);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  return (
    <svg
      ref={ref}
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 696 316"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      className={`cf-paths pointer-events-none text-cf-primary ${className}`}
    >
      {SETS.map((set, s) =>
        set.map((p) => (
          <path
            key={`${s}-${p.id}`}
            d={p.d}
            pathLength={1}
            stroke="currentColor"
            strokeWidth={p.width}
            strokeOpacity={p.opacity}
            className="cf-path"
            style={{ animationDuration: `${p.duration}s`, animationDelay: `${p.delay}s` }}
          />
        )),
      )}
    </svg>
  );
}
