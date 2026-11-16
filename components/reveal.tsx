import type { CSSProperties, ReactNode } from "react";

/**
 * Fades and lifts its children into view as they scroll in (CSS scroll-driven animation, see globals.css).
 * Server-rendered visible, so there is no blank flash and no JS dependency. Browsers without
 * scroll-driven animations simply show the content. `delay` is in seconds and shifts the animation range.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as: Comp = "div",
  axis = "y",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li";
  axis?: "x" | "y";
}) {
  const style = { "--cf-reveal-delay": `${delay * 100}%` } as CSSProperties;
  return (
    <Comp
      style={style}
      className={`${axis === "x" ? "cf-reveal-x" : "cf-reveal"}${className ? ` ${className}` : ""}`}
    >
      {children}
    </Comp>
  );
}
