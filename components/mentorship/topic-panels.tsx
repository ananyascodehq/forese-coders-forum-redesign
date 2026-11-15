"use client";

import { useState } from "react";
import { ICONS } from "./topic-icons";
import { TOPICS } from "./topics";

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
            className={`relative overflow-hidden rounded-2xl border transition-[flex-grow,border-color,background-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:min-w-0 md:basis-0 md:[flex-grow:var(--g)] ${
              active
                ? "border-[var(--cf-primary)]/60 bg-gradient-to-br from-[#1E1E22] to-[#121214]"
                : "border-[var(--cf-border)] bg-[var(--cf-surface)]/60 hover:border-[var(--cf-text-muted)]/50"
            }`}
          >
            {/* Header button. On phones it is the accordion row; on desktop it is the vertical label of a closed panel. */}
            <button
              type="button"
              aria-expanded={active}
              aria-controls={`topic-${t.key}`}
              onClick={() => setOpen(i)}
              onFocus={() => setOpen(i)}
              className={`flex w-full cursor-pointer items-center justify-between gap-4 p-5 text-left md:absolute md:inset-0 md:flex-col md:justify-between md:p-6 md:text-center ${
                active ? "md:pointer-events-none md:opacity-0" : "md:opacity-100"
              } transition-opacity duration-300`}
            >
              <span className="font-mono text-xs text-[var(--cf-primary-soft)]">0{i + 1}</span>
              <span className="flex-1 font-heading text-xl font-semibold uppercase tracking-[-0.01em] text-[var(--cf-text)] md:flex-none md:text-2xl md:[text-orientation:mixed] md:[transform:rotate(180deg)] md:[writing-mode:vertical-rl]">
                {t.name}
              </span>
              <span aria-hidden="true" className="font-mono text-lg text-[var(--cf-text-muted)] md:hidden">
                {active ? "−" : "+"}
              </span>
              <span aria-hidden="true" className="hidden font-mono text-lg text-[var(--cf-primary)] md:block">
                +
              </span>
            </button>

            {/* Body. Phones: height animates through grid rows. Desktop: fixed width inside the panel so text never reflows while it grows. */}
            <div
              id={`topic-${t.key}`}
              role="region"
              aria-label={t.name}
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
                    className="pointer-events-none absolute -right-6 -top-6 hidden h-56 w-56 text-[var(--cf-primary)]/[0.07] md:block"
                  />

                  <div className="relative">
                    <p className="hidden font-mono text-xs uppercase tracking-[0.2em] text-[var(--cf-primary)] md:block">
                      0{i + 1} / 0{TOPICS.length}
                    </p>
                    {/* The accordion header already shows the name on phones, so the big title is desktop only. */}
                    <h3 className="font-heading text-[clamp(2.25rem,5.2vw,4.5rem)] font-bold uppercase leading-[0.92] tracking-[-0.035em] text-[var(--cf-text)] max-md:sr-only md:mt-4">
                      {t.name}
                    </h3>
                    <p className="max-w-md text-base leading-[1.75] text-[var(--cf-text-muted)] md:mt-5">{t.body}</p>
                    <p className="mt-5 font-mono text-xs uppercase leading-relaxed tracking-[0.12em] text-[var(--cf-text)]/70">
                      {t.tags.join("  /  ")}
                    </p>
                  </div>

                  <pre
                    aria-hidden="true"
                    className="relative max-w-md overflow-hidden rounded-lg border border-[var(--cf-border)] bg-[var(--cf-bg)]/80 p-4 font-mono text-[0.8rem] leading-7 text-[var(--cf-primary-soft)]"
                  >
                    {t.snippet.join("\n")}
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
