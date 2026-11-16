import type { ReactNode } from "react";

/** Small uppercase mono label that sits above a heading. */
export function Eyebrow({
  children,
  tone = "soft",
  className = "",
}: {
  children: ReactNode;
  tone?: "soft" | "muted";
  className?: string;
}) {
  const color = tone === "soft" ? "text-cf-primary-soft" : "text-cf-text-muted";
  return (
    <p className={`font-mono text-xs uppercase tracking-[0.2em] ${color} ${className}`}>{children}</p>
  );
}
