"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { prefersReducedMotion } from "@/lib/media";

/**
 * Smooth scrolling via Lenis. Skipped entirely when the user prefers reduced motion,
 * so native scrolling is used instead.
 */
export function SmoothScroll() {
  useEffect(() => {
    const reduce = prefersReducedMotion();
    if (reduce) return;

    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    let frame = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return null;
}
