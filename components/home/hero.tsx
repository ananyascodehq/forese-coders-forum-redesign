import { GlyphField } from "./glyph-field";
import { CtaButton, OutlineLink } from "@/components/ui/cta";
import { COLLEGE } from "@/lib/site";

export function Hero() {
  return (
    <section
      aria-label="Introduction"
      className="relative h-[calc(100svh-4rem)] min-h-[560px] overflow-hidden"
    >
      <h1 className="sr-only">Coders&apos; Forum: Build. Learn. Compete. Together.</h1>

      <GlyphField mode="wordmark" className="absolute inset-0 h-full w-full" />

      <div className="pointer-events-none relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-between px-6 py-8">
        <div className="flex flex-wrap justify-between gap-3 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-cf-text-muted">
          <span>SVCE / Technical community</span>
          <span className="hidden sm:inline">Scroll to compile</span>
        </div>

        <div className="flex flex-col gap-8">
        <p
          aria-hidden="true"
          className="text-center font-heading text-[clamp(1.25rem,3.4vw,2.5rem)] font-bold uppercase tracking-[0.08em] text-cf-text"
        >
          Build. Learn. Compete. <span className="text-cf-primary">Together.</span>
        </p>

        <div className="pointer-events-auto flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <p className="max-w-sm text-base leading-relaxed text-cf-text/80">
            Hackathons, peer learning, mentorship and emerging tech, run by
            students for students at {COLLEGE}.
          </p>
          <div className="flex flex-wrap gap-3">
            <CtaButton href="/#join">Join the Forum</CtaButton>
            <OutlineLink href="/events">Events</OutlineLink>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
