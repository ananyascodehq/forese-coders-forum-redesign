import { Reveal } from "@/components/reveal";
import { AnimatedWords } from "@/components/ui/animated-words";
import { BackgroundPaths } from "@/components/ui/background-paths";
import { Eyebrow } from "@/components/ui/eyebrow";
import { BEFORE_AFTER, REASONS } from "@/content/why-join";
import { JoinChecklist } from "./join-checklist";
import { ReasonVisualView } from "./reason-visuals";

export function WhyJoin() {
  return (
    <>
      {/* 1. Hero: just the question, over flowing paths */}
      <section aria-labelledby="why-title" className="relative isolate overflow-hidden border-t border-cf-border">
        <BackgroundPaths className="absolute inset-0 -z-20 h-full w-full" />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--cf-bg)_78%)]"
        />
        <div className="mx-auto flex min-h-[70svh] max-w-6xl flex-col items-center justify-center px-6 py-24 text-center">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-cf-primary-soft">
              <span className="text-cf-primary">$</span> git diff --you
            </p>
          </Reveal>
          <h2
            id="why-title"
            aria-label="Why join?"
            className="mt-6 font-heading text-[clamp(4rem,17vw,12rem)] font-bold uppercase leading-[0.85] tracking-[-0.05em]"
          >
            <AnimatedWords words={["Why", "join?"]} accentFrom={1} />
          </h2>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-8 max-w-lg text-lg leading-relaxed text-cf-text/85">
              Because the fastest way to get good at this is to do it with other people who are getting good too.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 2. Before / after: each pair crosses out the old way as the new one arrives while you scroll */}
      <section aria-labelledby="change-title" className="border-t border-cf-border">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <Eyebrow>What changes</Eyebrow>
          <h3 id="change-title" className="sr-only">
            Before and after joining
          </h3>
          <ul className="mt-10">
            {BEFORE_AFTER.map((pair, i) => (
              <li
                key={pair.before}
                className="grid items-baseline gap-x-8 gap-y-2 border-t border-cf-border py-9 last:border-b md:grid-cols-[1fr_auto_1.15fr] md:py-14"
              >
                <p className="font-heading text-[clamp(1.5rem,3.4vw,2.75rem)] font-semibold uppercase leading-[1.05] tracking-[-0.02em] text-cf-text-muted">
                  <span className="sr-only">Before: </span>
                  <span className="cf-strike">{pair.before}</span>
                </p>
                <span aria-hidden="true" className="font-mono text-2xl text-cf-primary max-md:rotate-90 max-md:justify-self-start">
                  →
                </span>
                <p className="cf-after font-heading text-[clamp(1.75rem,4.2vw,3.5rem)] font-bold uppercase leading-[1] tracking-[-0.03em] text-cf-primary">
                  <span className="sr-only">After: </span>
                  {pair.after}
                  <span aria-hidden="true" className="ml-3 font-mono text-sm font-normal text-cf-text-muted">
                    0{i + 1}
                  </span>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3. Four more reasons, as cards */}
      <section aria-labelledby="reasons-title" className="border-t border-cf-border">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <Reveal>
            <Eyebrow tone="muted">And also</Eyebrow>
            <h3
              id="reasons-title"
              className="mt-4 font-heading text-[clamp(2.25rem,5vw,4rem)] font-bold uppercase leading-[0.95] tracking-[-0.03em]"
            >
              Four more reasons
            </h3>
          </Reveal>
          {/* Bento: two wide cards and two narrow ones, each with its own small animation */}
          <ul className="mt-12 grid gap-4 md:grid-cols-12">
            {REASONS.map((r, i) => (
              <Reveal
                as="li"
                key={r.title}
                delay={(i % 2) * 0.1}
                className={`group flex flex-col overflow-hidden rounded-2xl border border-cf-border bg-gradient-to-b from-cf-card-from to-cf-card-to p-3 transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-cf-primary/60 ${
                  i === 0 || i === 3 ? "md:col-span-7" : "md:col-span-5"
                }`}
              >
                <div className="relative h-48 overflow-hidden rounded-xl border border-cf-border/70 bg-cf-bg/70">
                  <div aria-hidden="true" className="h-full">
                    <ReasonVisualView kind={r.visual} />
                  </div>
                  <p className="absolute left-3 top-3 inline-flex items-center gap-2 rounded-full border border-cf-primary/30 bg-cf-bg/80 px-3 py-1 font-mono text-[0.65rem] text-cf-primary-soft backdrop-blur-sm">
                    <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-cf-primary" />
                    {r.cmd}
                  </p>
                </div>
                <div className="px-3 pb-3 pt-6 md:px-4">
                  <p className="font-heading text-[clamp(1.75rem,3vw,2.5rem)] font-bold uppercase leading-[0.95] tracking-[-0.03em]">
                    {r.title}
                  </p>
                  <p className="mt-3 max-w-md text-base leading-relaxed text-cf-text-muted">{r.body}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* 4. Interactive quick check */}
      <section aria-labelledby="joinif-title" className="border-t border-cf-border">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-[1fr_1.3fr] md:items-start md:py-28">
          <Reveal>
            <Eyebrow>Quick check</Eyebrow>
            <h3
              id="joinif-title"
              className="mt-4 font-heading text-[clamp(2.5rem,6vw,4.75rem)] font-bold uppercase leading-[0.92] tracking-[-0.03em]"
            >
              Tick what
              <br />
              <span className="text-cf-primary">sounds like you.</span>
            </h3>
          </Reveal>
          <JoinChecklist />
        </div>
      </section>
    </>
  );
}
