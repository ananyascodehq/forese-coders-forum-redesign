import { GlyphField } from "./glyph-field";
import { MagneticLink } from "@/components/magnetic-link";
import Link from "next/link";

export function Hero() {
  return (
    <section
      aria-label="Introduction"
      className="relative h-[calc(100svh-4rem)] min-h-[560px] overflow-hidden"
    >
      <h1 className="sr-only">Coders&apos; Forum: Build. Learn. Compete. Together.</h1>

      <GlyphField mode="wordmark" className="absolute inset-0 h-full w-full" />

      <div className="pointer-events-none relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-between px-6 py-8">
        <div className="flex flex-wrap justify-between gap-3 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-[var(--cf-text-muted)]">
          <span>SVCE / Technical community</span>
          <span className="hidden sm:inline">Scroll to compile</span>
        </div>

        <div className="flex flex-col gap-8">
        <p
          aria-hidden="true"
          className="text-center font-heading text-[clamp(1.25rem,3.4vw,2.5rem)] font-bold uppercase tracking-[0.08em] text-[var(--cf-text)]"
        >
          Build. Learn. Compete. <span className="text-[var(--cf-primary)]">Together.</span>
        </p>

        <div className="pointer-events-auto flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <p className="max-w-sm text-base leading-relaxed text-[var(--cf-text)]/80">
            Hackathons, peer learning, mentorship and emerging tech, run by
            students for students at Sri Venkateswara College of Engineering.
          </p>
          <div className="flex flex-wrap gap-3">
            <MagneticLink
              href="/#join"
              className="inline-flex min-h-12 cursor-pointer items-center bg-[var(--cf-cta)] px-7 font-mono text-sm font-bold uppercase tracking-[0.12em] text-[var(--cf-cta-text)]"
            >
              Join the Forum
            </MagneticLink>
            <Link
              href="/events"
              className="inline-flex min-h-12 cursor-pointer items-center border border-[var(--cf-text)]/30 px-7 font-mono text-sm font-bold uppercase tracking-[0.12em] text-[var(--cf-text)] transition-colors hover:border-[var(--cf-primary)] hover:text-[var(--cf-primary)]"
            >
              Events
            </Link>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
