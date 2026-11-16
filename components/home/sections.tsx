import { CtaButton, OutlineLink } from "@/components/ui/cta";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/reveal";
import { BUILD_LOG } from "@/content/build-log";

export function BuildLog() {
  return (
    <section aria-labelledby="log-title" className="mx-auto max-w-6xl px-6 py-20 md:py-24">
      <div className="grid gap-12 md:grid-cols-[1fr_1.4fr] md:items-start">
        <div>
          <Eyebrow>Build log</Eyebrow>
          <h2 id="log-title" className="mt-4 font-heading text-[clamp(2.5rem,6vw,4.5rem)] font-bold uppercase leading-[0.92] tracking-[-0.03em]">
            What we run, right now
          </h2>
        </div>

        <ul className="border-t border-cf-border">
          {BUILD_LOG.map((item, i) => (
            <Reveal
              as="li"
              axis="x"
              key={item.file}
              delay={i * 0.08}
              className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-1 border-b border-cf-border py-6 sm:grid-cols-[14rem_1fr_auto] sm:items-baseline"
            >
              <span className="font-mono text-sm text-cf-primary-soft">{item.file}</span>
              <span className="text-lg text-cf-text">{item.line}</span>
              <span className="col-span-2 font-mono text-xs uppercase tracking-wider text-cf-text-muted sm:col-span-1">
                [{item.status}]
              </span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function MentorTeaser() {
  return (
    <section aria-labelledby="mentor-title" className="mx-auto max-w-6xl px-6 pb-20 md:pb-24">
      <div className="flex flex-col gap-8 rounded-3xl border border-cf-border bg-cf-surface/40 p-8 md:flex-row md:items-end md:justify-between md:p-14">
        <div className="max-w-xl">
          <Eyebrow tone="muted">Mentorship</Eyebrow>
          <h2 id="mentor-title" className="mt-4 font-heading text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-[1.02] tracking-tight">
            Find the person who has already made your mistakes.
          </h2>
          <p className="mt-4 text-cf-text-muted">
            Technical mentorship from people a few steps ahead, for students who want to learn faster.
          </p>
        </div>
        <OutlineLink href="/mentorship" className="shrink-0">
          How mentorship works
        </OutlineLink>
      </div>
    </section>
  );
}

export function JoinCta() {
  return (
    <section id="join" aria-labelledby="join-title" className="relative overflow-hidden border-t border-cf-border">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-10 px-6 py-20 md:py-24">
        <h2 id="join-title" className="font-heading text-[clamp(3rem,10vw,8.5rem)] font-bold uppercase leading-[0.86] tracking-[-0.04em]">
          Join the
          <br />
          <span className="text-cf-primary-soft">forum.</span>
        </h2>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <CtaButton href="#join" size="lg">
            Join the Forum
          </CtaButton>
          {/* Placeholder until the real registration link is supplied. */}
          <p className="font-mono text-xs text-cf-text-muted">
            Registration link: to be added
          </p>
        </div>
      </div>
    </section>
  );
}
