"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { prefersReducedMotion } from "@/lib/media";

/**
 * Smooth scrolling via Lenis, kept in sync with the page height. Skipped entirely when the user prefers reduced motion,
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

    // Lenis only re-measures when <html> resizes, and <html> is height: 100%, so it never notices
    // the page growing (fonts, hydration, images). A stale, shorter limit stops scrolling partway down.
    // Re-measure whenever the body changes size and once fonts have loaded.
    const ro = new ResizeObserver(() => lenis.resize());
    ro.observe(document.body);
    void document.fonts.ready.then(() => lenis.resize());

    return () => {
      ro.disconnect();
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return null;
}
