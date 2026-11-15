"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
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

function StageCopy({
  index,
  name,
  body,
  progress,
}: {
  index: number;
  name: string;
  body: string;
  progress: MotionValue<number>;
}) {
  const n = STAGES.length;
  // Keep every scroll offset inside 0..1 and non-decreasing (required for scroll-linked WAAPI).
  const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
  const start = index / n;
  const end = (index + 1) / n;
  const a = clamp01(start - 0.01);
  const b = clamp01(start + 0.03);
  const c = clamp01(end - 0.03);
  const d = clamp01(end + 0.01);
  const opacity = useTransform(progress, [a, b, c, d], [0, 1, 1, 0]);
  const y = useTransform(progress, [a, b], [28, 0]);

  return (
    <motion.div style={{ opacity, y }} className="absolute inset-0 flex flex-col justify-center">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--cf-primary-soft)]">
        0{index + 1} / 0{n}
      </p>
      <p className="mt-4 font-heading text-[clamp(3.5rem,12vw,9.5rem)] font-bold uppercase leading-[0.88] tracking-[-0.04em] text-[var(--cf-text)]">
        {name}
      </p>
      <p className="mt-6 max-w-md text-lg leading-relaxed text-[var(--cf-text-muted)]">{body}</p>
    </motion.div>
  );
}

export function CompileStory() {
  const ref = useRef<HTMLElement>(null);
  const progress = useRef(0);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    progress.current = v;
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

  return (
    <section ref={ref} aria-labelledby="compile-title" className="relative h-[260svh]">
      <h2 id="compile-title" className="sr-only">
        How the forum works
      </h2>
      <div className="sticky top-16 flex h-[calc(100svh-4rem)] flex-col overflow-hidden">
        <GlyphField mode="compile" progressRef={progress} className="absolute inset-0 h-full w-full" />

        {/* Soft scrim so the copy stays readable over the field. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[var(--cf-bg)] via-[var(--cf-bg)]/70 to-transparent"
        />

        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col px-6 py-10">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--cf-text-muted)]">
            The forum compiles
          </p>

          <div className="relative flex-1">
            {STAGES.map((s, i) => (
              <StageCopy key={s.name} index={i} name={s.name} body={s.body} progress={scrollYProgress} />
            ))}
          </div>

          <div className="h-px w-full bg-[var(--cf-border)]">
            <motion.div
              className="h-px origin-left bg-[var(--cf-primary)]"
              style={{ scaleX: scrollYProgress }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
