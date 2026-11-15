"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

type Props = ComponentProps<typeof Link>;

/**
 * A link that drifts slightly toward the pointer. Use on one focal CTA per screen.
 * The transform sits on a wrapper so the link keeps its normal semantics.
 */
export function MagneticLink({ className, children, ...rest }: Props) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 20, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 250, damping: 20, mass: 0.4 });

  return (
    <motion.div
      style={{ x: sx, y: sy }}
      className="inline-flex"
      onPointerMove={(e) => {
        if (reduce || e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * 0.25);
        y.set((e.clientY - (r.top + r.height / 2)) * 0.25);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      <Link {...rest} className={className}>
        {children}
      </Link>
    </motion.div>
  );
}
