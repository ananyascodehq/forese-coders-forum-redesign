/** Client-only media query helpers. Call from effects or event handlers, never during render. */
export const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const hasFinePointer = () => window.matchMedia("(pointer: fine)").matches;
