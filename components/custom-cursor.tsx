"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Precise dot plus a lagging ring. Only shown on fine pointers, hidden under reduced motion.
 * The native cursor is hidden only while this is active (class on <html>).
 */
export function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 380, damping: 30, mass: 0.4 });
  const ry = useSpring(y, { stiffness: 380, damping: 30, mass: 0.4 });
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    const root = document.documentElement;
    root.classList.add("has-custom-cursor");

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as HTMLElement | null;
      setHover(!!t?.closest("a, button, [data-cursor]"));
    };
    window.addEventListener("pointermove", move, { passive: true });

    return () => {
      window.removeEventListener("pointermove", move);
      root.classList.remove("has-custom-cursor");
    };
  }, [x, y]);

  return (
    <>
      <motion.div
        aria-hidden="true"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-2 w-2 bg-[var(--cf-primary)] pointer-fine:block motion-reduce:hidden"
      />
      <motion.div
        aria-hidden="true"
        style={{ x: rx, y: ry, translateX: "-50%", translateY: "-50%" }}
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden pointer-fine:block motion-reduce:hidden"
      >
        <motion.div
          animate={{
            width: hover ? 64 : 34,
            height: hover ? 64 : 34,
            backgroundColor: hover ? "rgba(212,255,58,0.14)" : "rgba(212,255,58,0)",
            borderColor: hover ? "rgba(212,255,58,1)" : "rgba(212,255,58,0.6)",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 26 }}
          className="border"
        />
      </motion.div>
    </>
  );
}
