import Link from "next/link";
import type { ComponentProps } from "react";
import { MagneticLink } from "@/components/magnetic-link";

const BASE =
  "inline-flex cursor-pointer items-center font-mono font-bold uppercase tracking-[0.12em]";

const SIZES = {
  md: "min-h-12 px-7 text-sm",
  lg: "min-h-14 px-10 text-base",
} as const;

type Props = ComponentProps<typeof Link> & { size?: keyof typeof SIZES };

/** Primary call to action: acid-lime fill that drifts toward the pointer. One per screen. */
export function CtaButton({ size = "md", className = "", ...rest }: Props) {
  return (
    <MagneticLink
      {...rest}
      className={`${BASE} ${SIZES[size]} bg-cf-cta text-cf-cta-text ${className}`}
    />
  );
}

/** Secondary call to action: outlined, turns lime on hover. */
export function OutlineLink({ size = "md", className = "", ...rest }: Props) {
  return (
    <Link
      {...rest}
      className={`${BASE} ${SIZES[size]} border border-cf-text/30 text-cf-text transition-colors hover:border-cf-primary hover:text-cf-primary ${className}`}
    />
  );
}
