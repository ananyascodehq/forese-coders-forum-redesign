"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { GlyphField } from "./glyph-field";

const STAGES = [
  {
    name: "Learn",
    body: "Peer-to-peer sessions where students teach what they just figured out.",
  },
  {
    name: "Build",
    body: "Hackathons and project work. Make something real, and make it fast.",
  },
  {
    name: "Compete",
    body: "Technical competitions that put your problem solving on the line.",
  },
  {
    name: "Mentor",
    body: "Experienced students pair with newcomers and stay with them through the work.",
  },
];

// Each stage types its name first, then its body. `start` is the character offset in the whole script.
const SCRIPT = STAGES.map((s, i) => {
  const start = STAGES.slice(0, i).reduce((n, p) => n + p.name.length + p.body.length, 0);
  return { ...s, start, total: s.name.length + s.body.length };
});
const TOTAL_CHARS = SCRIPT.reduce((n, s) => n + s.total, 0);

/** Typed text followed by the untyped remainder, hidden, so the layout never jumps while typing. */
function Typed({ text, typed, caret }: { text: string; typed: number; caret: boolean }) {
  const n = Math.max(0, Math.min(text.length, typed));
  return (
    <>
      {text.slice(0, n)}
      {caret && (
        <span
          aria-hidden="true"
          className="ml-1 inline-block h-[0.9em] w-[0.5em] translate-y-[0.1em] animate-pulse bg-[var(--cf-primary)]"
        />
      )}
      <span className="opacity-0">{text.slice(n)}</span>
    </>
  );
}

export function CompileStory() {
  const ref = useRef<HTMLElement>(null);
  const progress = useRef(0);
  const [count, setCount] = useState(0);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    progress.current = v;
    // Finish typing at ~90% so the last line rests on screen before the section unpins.
    const next = Math.round(Math.min(1, v / 0.9) * TOTAL_CHARS);
    setCount((prev) => (prev === next ? prev : next));
  });

  if (reduce) {
    return (
      <section aria-labelledby="compile-title" className="mx-auto max-w-6xl px-6 py-24">
        <h2 id="compile-title" className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--cf-primary-soft)]">
          The forum compiles
        </h2>
        <ol className="mt-10 grid gap-10 md:grid-cols-2">
          {STAGES.map((s, i) => (
            <li key={s.name}>
              <p className="font-mono text-xs text-[var(--cf-primary-soft)]">0{i + 1} / 04</p>
              <p className="mt-2 font-heading text-5xl font-bold uppercase">{s.name}</p>
              <p className="mt-3 text-[var(--cf-text-muted)]">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>
    );
  }

  // The stage currently being typed gets the caret; once everything is typed it stays on the last one.
  const activeIndex = SCRIPT.findIndex((s) => count < s.start + s.total);
  const active = activeIndex === -1 ? SCRIPT.length - 1 : activeIndex;

  return (
    <section ref={ref} aria-labelledby="compile-title" className="relative h-[240svh]">
      <h2 id="compile-title" className="sr-only">
        How the forum works
      </h2>
      {/* Screen readers get the full text at once; the typing below is visual only. */}
      <ol className="sr-only">
        {STAGES.map((s) => (
          <li key={s.name}>
            {s.name}. {s.body}
          </li>
        ))}
      </ol>

      <div className="sticky top-16 flex h-[calc(100svh-4rem)] flex-col overflow-hidden">
        <GlyphField mode="compile" progressRef={progress} className="absolute inset-0 h-full w-full" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[var(--cf-bg)]/80" />

        <div aria-hidden="true" className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col px-6 py-10">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--cf-text-muted)]">
            <span className="text-[var(--cf-primary)]">$</span> the-forum --compile
          </p>

          <div className="flex flex-1 flex-col justify-center gap-[clamp(1rem,3.5vh,2.5rem)]">
            {SCRIPT.map((s, i) => {
              const local = count - s.start;
              const bodyTyped = local - s.name.length;
              const isActive = i === active;
              return (
                <div key={s.name} className="grid gap-x-8 gap-y-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:items-baseline">
                  <p className="font-heading text-[clamp(2.5rem,7.5vw,6rem)] font-bold uppercase leading-[0.9] tracking-[-0.04em] text-[var(--cf-text)]">
                    <span className="mr-3 font-mono text-[0.25em] font-normal tracking-normal text-[var(--cf-primary-soft)]">
                      0{i + 1}
                    </span>
                    <Typed text={s.name} typed={local} caret={isActive && bodyTyped <= 0} />
                  </p>
                  <p className="font-mono text-[clamp(0.9rem,1.5vw,1.15rem)] leading-relaxed text-[var(--cf-text-muted)]">
                    <Typed text={s.body} typed={bodyTyped} caret={isActive && bodyTyped > 0} />
                  </p>
                </div>
              );
            })}
          </div>

          <div className="h-px w-full bg-[var(--cf-border)]">
            <motion.div className="h-px origin-left bg-[var(--cf-primary)]" style={{ scaleX: scrollYProgress }} />
          </div>
        </div>
      </div>
    </section>
  );
}
