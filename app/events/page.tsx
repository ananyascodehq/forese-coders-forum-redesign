import { WovenCanvas } from "@/components/events/woven-canvas";
import { Reveal } from "@/components/reveal";
import { AnimatedWords } from "@/components/ui/animated-words";
import { CtaButton } from "@/components/ui/cta";
import { Eyebrow } from "@/components/ui/eyebrow";
import { EVENTS } from "@/content/events";

export const metadata = {
  title: "Events | Coders' Forum",
  description: "Hackathons and technical competitions run by students at the Coders' Forum, SVCE.",
};

export default function EventsPage() {
  return (
    <main className="flex-1">
      <section aria-labelledby="events-title" className="relative isolate overflow-hidden">
        <WovenCanvas className="absolute inset-0 -z-20 h-full w-full" />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(11_11_12/0.7)_0%,rgb(11_11_12/0.2)_60%,transparent_100%)]"
        />
        <div className="mx-auto flex min-h-[calc(100svh-4rem)] max-w-6xl flex-col justify-center px-6 py-20">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-cf-primary-soft">
              <span className="text-cf-primary">$</span> events --upcoming
            </p>
          </Reveal>
          <h1
            id="events-title"
            aria-label="Events"
            className="mt-6 font-heading text-[clamp(4.5rem,18vw,13rem)] font-bold uppercase leading-[0.85] tracking-[-0.05em]"
          >
            <AnimatedWords words={["Events"]} accentFrom={99} />
          </h1>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-cf-text/85">
              Hackathons and technical competitions, run by students for students.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
              <CtaButton href="/#join">Join the Forum</CtaButton>
              <a
                href="#upcoming"
                className="group inline-flex min-h-12 items-center gap-2 font-mono text-sm uppercase tracking-[0.12em] text-cf-text transition-colors hover:text-cf-primary"
              >
                What&apos;s coming
                <span aria-hidden="true" className="transition-transform group-hover:translate-y-0.5">
                  ↓
                </span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section
        id="upcoming"
        aria-labelledby="upcoming-title"
        className="relative isolate scroll-mt-16 overflow-hidden border-t border-cf-border"
      >
        {/* Faint dot grid that fades out toward the edges, plus a soft lime glow behind the cards */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(circle,rgb(212_255_58/0.42)_1.2px,transparent_1.8px)] bg-[length:28px_28px] [mask-image:radial-gradient(ellipse_90%_75%_at_50%_50%,black_35%,transparent_85%)]"
        />
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 -z-10 h-[34rem] w-[min(60rem,120%)] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgb(212_255_58/0.16),transparent_70%)]"
        />
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <Reveal>
            <Eyebrow>On the way</Eyebrow>
            <h2
              id="upcoming-title"
              className="mt-4 font-heading text-[clamp(2.25rem,5vw,4rem)] font-bold uppercase leading-[0.95] tracking-[-0.03em]"
            >
              Upcoming events
            </h2>
          </Reveal>

          <ul className="mt-12 grid gap-4 md:grid-cols-2">
            {EVENTS.map((event, i) => (
              <Reveal
                as="li"
                key={event.name}
                delay={i * 0.1}
                className="group flex flex-col gap-6 rounded-2xl border border-cf-border bg-gradient-to-b from-cf-card-from to-cf-card-to p-7 transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-cf-primary/60 md:p-9"
              >
                <div className="flex items-center justify-between">
                  <p className="inline-flex items-center gap-2 rounded-full border border-cf-primary/30 bg-cf-primary/10 px-3 py-1 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-cf-primary-soft">
                    <span aria-hidden="true" className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cf-primary/70" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cf-primary" />
                    </span>
                    {event.status}
                  </p>
                  <span aria-hidden="true" className="font-mono text-sm text-cf-text-muted">
                    0{i + 1}
                  </span>
                </div>

                <div>
                  <h3 className="font-heading text-[clamp(1.75rem,3vw,2.5rem)] font-bold uppercase leading-[0.98] tracking-[-0.03em]">
                    {event.name}
                  </h3>
                  <p className="mt-4 max-w-md text-base leading-relaxed text-cf-text-muted">{event.body}</p>
                </div>

                {/* Date slot: swap this line for a live countdown once the date is confirmed. */}
                <p className="mt-auto border-t border-cf-border pt-4 font-mono text-xs uppercase tracking-[0.14em] text-cf-text-muted">
                  Date to be announced
                </p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
