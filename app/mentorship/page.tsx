import { CtaButton } from "@/components/ui/cta";
import { Eyebrow } from "@/components/ui/eyebrow";
import { WhyJoin } from "@/components/mentorship/why-join";
import { TopicSphere } from "@/components/mentorship/topic-sphere";
import { TopicPanels } from "@/components/mentorship/topic-panels";
import { Reveal } from "@/components/reveal";
import { Ribbon } from "@/components/ribbon";

export const metadata = {
  title: "Mentorship | Coders' Forum",
  description:
    "Student Mentors guide you through Data Structures, Algorithms, Java and Machine Learning, bridging classroom theory and practical application.",
};

const OUTCOMES = ["Academics", "Personal projects", "Competitive programming", "Upcoming placements"];

export default function MentorshipPage() {
  return (
    <main className="flex-1">
      {/* Hero: giant title across the top, content on the left, sphere on the right. */}
      <section aria-labelledby="mentorship-title" className="overflow-x-clip">
        <div className="mx-auto max-w-6xl px-6 pb-14 pt-14 md:pb-16 md:pt-20 lg:grid lg:grid-cols-[1fr_minmax(0,29rem)] lg:grid-rows-[auto_1fr] lg:gap-x-10">
          {/* Title spans both columns and sits above the sphere; it ignores the pointer so cards underneath stay hoverable. */}
          <Reveal className="pointer-events-none relative z-10 lg:col-span-2 lg:col-start-1 lg:row-start-1">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-cf-primary-soft">
              <span className="text-cf-primary">$</span> mentorship --curriculum
            </p>
            <h1
              id="mentorship-title"
              className="mt-5 font-heading text-[clamp(2.25rem,13vw,3.75rem)] font-bold uppercase leading-[0.88] tracking-[-0.045em] md:text-[clamp(4rem,12.5vw,11.5rem)]"
            >
              Mentorship
            </h1>
          </Reveal>

          {/* Sphere comes before the text in the DOM so phones read title, sphere, text. */}
          <div className="relative z-0 mt-6 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:mt-0 lg:pt-40">
            <TopicSphere />
          </div>

          <Reveal delay={0.1} className="mt-10 lg:col-start-1 lg:row-start-2 lg:mt-8 lg:self-start">
            <div aria-hidden="true" className="h-px w-16 bg-cf-primary" />
            <p className="mt-6 font-heading text-[clamp(1.5rem,2.6vw,2.25rem)] font-semibold leading-[1.1] tracking-[-0.02em]">
              Classroom theory, <span className="text-cf-primary">meet real code.</span>
            </p>
            <p className="mt-5 max-w-lg text-base leading-[1.75] text-cf-text-muted md:text-[1.05rem]">
              Our Student Mentors will guide participants through essential programming concepts. This curriculum is
              designed to bridge the gap between classroom theory and practical application, equipping you with the exact
              skills required for academics, personal projects, competitive programming, and upcoming placements.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
              <CtaButton href="/#join">Join the Forum</CtaButton>
              <a
                href="#topics"
                className="group inline-flex min-h-12 items-center gap-2 font-mono text-sm uppercase tracking-[0.12em] text-cf-text transition-colors hover:text-cf-primary"
              >
                See the topics
                <span aria-hidden="true" className="transition-transform group-hover:translate-y-0.5">↓</span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <Ribbon items={OUTCOMES} label="Built for" />

      {/* Topics we cover */}
      <section id="topics" aria-labelledby="topics-title" className="scroll-mt-16 border-t border-cf-border">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <Reveal className="mb-8 flex flex-wrap items-end justify-between gap-4 md:mb-12">
            <div>
              <Eyebrow>Topics we cover / 04</Eyebrow>
              <h2
                id="topics-title"
                className="mt-4 font-heading text-[clamp(2.25rem,5vw,4rem)] font-bold uppercase leading-[0.95] tracking-[-0.03em]"
              >
                What we teach
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-cf-text-muted">
              Hover a panel to open it. On a phone, tap.
            </p>
          </Reveal>
          <TopicPanels />
        </div>
      </section>

      <WhyJoin />

      {/* CTA */}
      <section id="join-final" aria-labelledby="mentor-cta-title" className="scroll-mt-16 border-t border-cf-border">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-10 px-6 py-20 md:py-28">
          <Reveal>
            <h2
              id="mentor-cta-title"
              className="font-heading text-[clamp(3rem,10vw,8.5rem)] font-bold uppercase leading-[0.86] tracking-[-0.04em]"
            >
              Merge into
              <br />
              <span className="text-cf-primary">the forum.</span>
            </h2>
          </Reveal>
          <CtaButton href="/#join" size="lg">
            Join the Forum
          </CtaButton>
        </div>
      </section>
    </main>
  );
}
