"use client";

import { useEffect, useState } from "react";
import { prefersReducedMotion } from "@/lib/media";
import { ICONS } from "./topic-icons";
import { TOPICS } from "./topics";

const TYPE_DELAY_MS = 260; // let the panel finish opening first
const MS_PER_CHAR = 24;

/**
 * Types the snippet out when mounted. Mount it with a key that changes on open, so every
 * open replays the typing. The untyped remainder is kept (invisible) so the panel never changes height.
 */
function TypedSnippet({ lines }: { lines: readonly string[] }) {
  const text = lines.join("\n");
  const [n, setN] = useState(0);

  useEffect(() => {
    let raf = 0;
    if (prefersReducedMotion()) {
      raf = requestAnimationFrame(() => setN(text.length));
      return () => cancelAnimationFrame(raf);
    }
    let start = 0;
    const tick = (t: number) => {
      start ||= t;
      const next = Math.max(0, Math.min(text.length, Math.floor((t - start - TYPE_DELAY_MS) / MS_PER_CHAR)));
      setN((prev) => (prev === next ? prev : next));
      if (next < text.length) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [text]);

  return (
    <>
      {text.slice(0, n)}
      {n < text.length && (
        <span aria-hidden="true" className="inline-block h-[1em] w-[0.5em] translate-y-[0.15em] animate-pulse bg-cf-primary" />
      )}
      <span className="opacity-0">{text.slice(n)}</span>
    </>
  );
}

/**
 * Four panels, one open at a time. Desktop: a row where the open panel grows and the others
 * collapse to a vertical label (hover, focus or click to open). Phones: a stacked accordion.
 */
export function TopicPanels() {
  const [open, setOpen] = useState(0);

  return (
    <ul className="flex flex-col gap-3 md:h-[34rem] md:flex-row md:gap-3">
      {TOPICS.map((t, i) => {
        const active = open === i;
        const Watermark = ICONS[t.key][0].Icon;
        return (
          <li
            key={t.key}
            onPointerEnter={(e) => {
              if (e.pointerType === "mouse") setOpen(i);
            }}
            style={{ ["--g" as string]: active ? 6 : 1 }}
            className={`relative overflow-hidden rounded-2xl border transition-[flex-grow,border-color,background-color,opacity,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:min-w-0 md:basis-0 md:[flex-grow:var(--g)] ${
              active
                ? "border-cf-primary/60 bg-gradient-to-br from-cf-card-from to-cf-card-to shadow-[inset_4px_0_0_var(--cf-primary),0_0_48px_-14px_rgba(212,255,58,0.4)] md:shadow-none"
                : "border-cf-border bg-cf-surface/60 hover:border-cf-text-muted/50 max-md:opacity-70"
            }`}
          >
            {/* Phones: a big faint icon behind the row, so each closed row has its own look. */}
            <Watermark
              aria-hidden="true"
              strokeWidth={0.8}
              className={`pointer-events-none absolute -right-3 top-3 h-28 w-28 -rotate-12 transition-colors duration-500 md:hidden ${
                active ? "text-cf-primary/[0.14]" : "text-cf-primary/[0.06]"
              }`}
            />

            {/* Header button. On phones it is the accordion row; on desktop it is the vertical label of a closed panel. */}
            <button
              type="button"
              aria-expanded={active}
              aria-controls={`topic-${t.key}`}
              onClick={() => setOpen(i)}
              className={`relative flex w-full cursor-pointer flex-wrap items-center justify-between gap-x-4 gap-y-1 p-5 md:flex-nowrap text-left md:absolute md:inset-0 md:flex-col md:justify-between md:p-6 md:text-center ${
                active ? "md:pointer-events-none md:opacity-0" : "md:opacity-100"
              } transition-opacity duration-300`}
            >
              <span className="font-heading text-3xl font-bold leading-none tracking-tight text-cf-primary-soft/50 md:font-mono md:text-xs md:font-normal md:tracking-normal md:text-cf-primary-soft">
                0{i + 1}
              </span>
              <span className="flex-1 font-heading text-xl font-semibold uppercase tracking-[-0.01em] text-cf-text md:flex-none md:text-2xl md:[text-orientation:mixed] md:[transform:rotate(180deg)] md:[writing-mode:vertical-rl]">
                {t.name}
              </span>
              <span aria-hidden="true" className="font-mono text-lg text-cf-text-muted md:hidden">
                {active ? "−" : "+"}
              </span>
              <span aria-hidden="true" className="hidden font-mono text-lg text-cf-primary md:block">
                +
              </span>
              {/* Phones: a one-line peek at the code inside, hidden once the panel is open. */}
              {!active && (
                <span
                  aria-hidden="true"
                  className="order-last w-full truncate pl-[calc(1.875rem+1rem)] font-mono text-xs text-cf-primary-soft/60 md:hidden"
                >
                  {t.snippet[0]}
                </span>
              )}
            </button>

            {/* Body. Phones: height animates through grid rows. Desktop: fixed width inside the panel so text never reflows while it grows. */}
            <div
              id={`topic-${t.key}`}
              role="region"
              aria-label={t.name}
              inert={!active}
              className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:absolute md:inset-0 md:block md:transition-none ${
                active ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div
                className={`overflow-hidden md:h-full md:w-[min(44rem,100%)] md:overflow-visible md:transition-opacity md:duration-300 ${
                  active ? "md:opacity-100 md:delay-200" : "md:pointer-events-none md:opacity-0"
                }`}
              >
                <div className="relative flex h-full flex-col justify-between gap-8 px-5 pb-6 md:p-10">
                  <Watermark
                    aria-hidden="true"
                    strokeWidth={0.7}
                    className="pointer-events-none absolute -right-6 -top-6 hidden h-56 w-56 text-cf-primary/[0.07] md:block"
                  />

                  <div className="relative">
                    <p className="hidden font-mono text-xs uppercase tracking-[0.2em] text-cf-primary md:block">
                      0{i + 1} / 0{TOPICS.length}
                    </p>
                    {/* The accordion header already shows the name on phones, so the big title is desktop only. */}
                    <h3 className="font-heading text-[clamp(2.25rem,5.2vw,4.5rem)] font-bold uppercase leading-[0.92] tracking-[-0.035em] text-cf-text max-md:sr-only md:mt-4">
                      {t.name}
                    </h3>
                    <p className="max-w-md text-base leading-[1.75] text-cf-text-muted md:mt-5">{t.body}</p>
                    <p className="mt-5 font-mono text-xs uppercase leading-relaxed tracking-[0.12em] text-cf-text/70">
                      {t.tags.join("  /  ")}
                    </p>
                  </div>

                  <pre
                    aria-hidden="true"
                    className="relative max-w-md overflow-hidden rounded-lg border border-cf-border bg-cf-bg/80 p-4 font-mono text-[0.8rem] leading-7 text-cf-primary-soft"
                  >
                    <TypedSnippet key={active ? "open" : "closed"} lines={t.snippet} />
                  </pre>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
