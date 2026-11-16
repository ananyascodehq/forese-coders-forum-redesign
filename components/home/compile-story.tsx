"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { STAGES } from "@/content/stages";
import { GlyphField } from "./glyph-field";

// Each stage types its name first, then its body. `start` is the character offset in the whole script.
const SCRIPT = STAGES.map((s, i) => {
  const start = STAGES.slice(0, i).reduce((n, p) => n + p.name.length + p.body.length, 0);
  return { ...s, start, total: s.name.length + s.body.length };
});
const TOTAL_CHARS = SCRIPT.reduce((n, s) => n + s.total, 0);
const MS_PER_CHAR = 18; // about 5.5 s for the whole script

/** Typed text followed by the untyped remainder, hidden, so the layout never jumps while typing. */
function Typed({ text, typed, caret }: { text: string; typed: number; caret: boolean }) {
  const n = Math.max(0, Math.min(text.length, typed));
  return (
    <>
      {text.slice(0, n)}
      {caret && (
        <span
          aria-hidden="true"
          className="ml-1 inline-block h-[0.9em] w-[0.5em] translate-y-[0.1em] animate-pulse bg-cf-primary"
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
  const inView = useInView(ref, { once: true, amount: 0.35 });

  // Types on its own once the section is on screen, then stays finished.
  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    let start = 0;
    const tick = (t: number) => {
      start ||= t;
      const next = Math.min(TOTAL_CHARS, Math.floor((t - start) / MS_PER_CHAR));
      progress.current = next / TOTAL_CHARS;
      setCount((prev) => (prev === next ? prev : next));
      if (next < TOTAL_CHARS) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView]);

  // The stage currently being typed gets the caret; once everything is typed it stays on the last one.
  const activeIndex = SCRIPT.findIndex((s) => count < s.start + s.total);
  const active = activeIndex === -1 ? SCRIPT.length - 1 : activeIndex;

  return (
    <>
      <section aria-labelledby="compile-title-static" className="mx-auto hidden max-w-6xl px-6 py-24 motion-reduce:block">
        <h2 id="compile-title-static" className="font-mono text-xs uppercase tracking-[0.2em] text-cf-primary-soft">
          The forum compiles
        </h2>
        <ol className="mt-10 grid gap-10 md:grid-cols-2">
          {STAGES.map((s, i) => (
            <li key={s.name}>
              <p className="font-mono text-xs text-cf-primary-soft">0{i + 1} / 04</p>
              <p className="mt-2 font-heading text-5xl font-bold uppercase">{s.name}</p>
              <p className="mt-3 text-cf-text-muted">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>
    <section ref={ref} aria-labelledby="compile-title" className="relative motion-reduce:hidden">
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

      <div className="relative flex min-h-[calc(100svh-4rem)] flex-col overflow-hidden">
        <GlyphField mode="compile" progressRef={progress} className="absolute inset-0 h-full w-full" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-cf-bg/80" />

        <div aria-hidden="true" className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col px-6 py-10">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-cf-text-muted">
            <span className="text-cf-primary">$</span> the-forum --compile
          </p>

          <div className="flex flex-1 flex-col justify-center gap-[clamp(1rem,3.5vh,2.5rem)]">
            {SCRIPT.map((s, i) => {
              const local = count - s.start;
              const bodyTyped = local - s.name.length;
              const isActive = i === active;
              return (
                <div key={s.name} className="grid gap-x-8 gap-y-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:items-baseline">
                  <p className="font-heading text-[clamp(2.5rem,7.5vw,6rem)] font-bold uppercase leading-[0.9] tracking-[-0.04em] text-cf-text">
                    <span className="mr-3 font-mono text-[0.25em] font-normal tracking-normal text-cf-primary-soft">
                      0{i + 1}
                    </span>
                    <Typed text={s.name} typed={local} caret={isActive && bodyTyped <= 0} />
                  </p>
                  <p className="font-mono text-[clamp(0.9rem,1.5vw,1.15rem)] leading-relaxed text-cf-text-muted">
                    <Typed text={s.body} typed={bodyTyped} caret={isActive && bodyTyped > 0} />
                  </p>
                </div>
              );
            })}
          </div>

          <div className="h-px w-full bg-cf-border">
            <div className="h-px origin-left bg-cf-primary" style={{ transform: `scaleX(${count / TOTAL_CHARS})` }} />
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
