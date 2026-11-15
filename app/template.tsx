"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * template.tsx re-mounts on every navigation, so this fade runs on each page change.
 * Only opacity and transform are animated.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className="flex flex-1 flex-col"
      initial={reduce ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
