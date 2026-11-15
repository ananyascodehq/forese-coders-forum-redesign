import { MagneticLink } from "@/components/magnetic-link";
import { WhyJoin } from "@/components/mentorship/why-join";
import { TopicSphere } from "@/components/mentorship/topic-sphere";
import { TOPICS } from "@/components/mentorship/topics";
import { Reveal } from "@/components/reveal";

export const metadata = {
  title: "Mentorship | Coders' Forum",
  description:
    "Student Mentors guide you through Data Structures, Algorithms, Java and Machine Learning, bridging classroom theory and practical application.",
};

const OUTCOMES = ["Academics", "Personal projects", "Competitive programming", "Upcoming placements"];

export default function MentorshipPage() {
  return (
    <main className="flex-1">
      {/* Intro */}
      <section aria-labelledby="mentorship-title" className="mx-auto max-w-6xl px-6 pb-16 pt-20 md:pb-20 md:pt-28">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--cf-primary-soft)]">
            <span className="text-[var(--cf-primary)]">$</span> mentorship --curriculum
          </p>
          <h1
            id="mentorship-title"
            className="mt-6 font-heading text-[clamp(3rem,9.5vw,8rem)] font-bold uppercase leading-[0.88] tracking-[-0.04em]"
          >
            Classroom
            <br />
            theory,
            <br />
            <span className="text-[var(--cf-primary)]">meet real code.</span>
          </h1>
        </Reveal>

        <Reveal delay={0.1} className="mt-10 grid gap-10 md:grid-cols-[1.3fr_1fr] md:items-end">
          <p className="max-w-2xl text-lg leading-relaxed text-[var(--cf-text)]/85 md:text-xl">
            Our Student Mentors will guide participants through essential programming concepts. This curriculum is
            designed to bridge the gap between classroom theory and practical application, equipping you with the exact
            skills required for academics, personal projects, competitive programming, and upcoming placements.
          </p>
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--cf-text-muted)]">Built for</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {OUTCOMES.map((o) => (
                <li
                  key={o}
                  className="border border-[var(--cf-primary)]/40 px-3 py-1.5 font-mono text-xs uppercase tracking-[0.1em] text-[var(--cf-primary-soft)]"
                >
                  {o}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>

      {/* Gallery sphere */}
      <section aria-labelledby="sphere-title" className="overflow-x-clip border-t border-[var(--cf-border)]">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <Reveal className="mb-6 text-center md:mb-10">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--cf-primary-soft)]">What you will learn</p>
            <h2
              id="sphere-title"
              className="mt-4 font-heading text-[clamp(2.5rem,6vw,4.75rem)] font-bold uppercase leading-[0.92] tracking-[-0.03em]"
            >
              Four topics. <span className="text-[var(--cf-primary)]">One sphere.</span>
            </h2>
          </Reveal>
          <TopicSphere />
        </div>
      </section>

      {/* Topics */}
      <section aria-labelledby="topics-title" className="border-t border-[var(--cf-border)]">
        <div className="mx-auto max-w-6xl px-6 pt-10">
          <h2 id="topics-title" className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--cf-text-muted)]">
            Topics we cover / 04 topics
          </h2>
        </div>

        <ol className="mt-6">
          {TOPICS.map((t, i) => (
            <Reveal as="li" key={t.name} className="group border-t border-[var(--cf-border)] last:border-b">
              <div className="transition-colors duration-300 hover:bg-[var(--cf-surface)]">
                <div className="mx-auto grid max-w-6xl gap-x-10 gap-y-6 px-6 py-10 md:grid-cols-[4rem_1.2fr_1fr] md:py-14">
                  <p className="font-mono text-sm text-[var(--cf-primary-soft)]">0{i + 1}</p>

                  <div>
                    <h3 className="font-heading text-[clamp(2.25rem,6vw,4.75rem)] font-bold uppercase leading-[0.92] tracking-[-0.03em] transition-colors duration-300 group-hover:text-[var(--cf-primary)]">
                      {t.name}
                    </h3>
                    <p className="mt-5 max-w-lg text-base leading-relaxed text-[var(--cf-text-muted)] md:text-lg">
                      {t.body}
                    </p>
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {t.tags.map((topic) => (
                        <li
                          key={topic}
                          className="border border-[var(--cf-border)] px-2.5 py-1 font-mono text-[0.7rem] uppercase tracking-[0.1em] text-[var(--cf-text-muted)] transition-colors group-hover:border-[var(--cf-primary)]/50 group-hover:text-[var(--cf-text)]"
                        >
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <pre
                    aria-hidden="true"
                    className="hidden self-center overflow-hidden border border-[var(--cf-border)] bg-[var(--cf-bg)] p-5 font-mono text-[0.8rem] leading-7 text-[var(--cf-text-muted)]/70 transition-colors duration-300 group-hover:border-[var(--cf-primary)]/50 group-hover:text-[var(--cf-primary-soft)] md:block"
                  >
                    {t.snippet.join("\n")}
                  </pre>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </section>

      <WhyJoin />

      {/* CTA */}
      <section aria-labelledby="mentor-cta-title" className="border-t border-[var(--cf-border)]">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-10 px-6 py-20 md:py-28">
          <Reveal>
            <h2
              id="mentor-cta-title"
              className="font-heading text-[clamp(3rem,10vw,8.5rem)] font-bold uppercase leading-[0.86] tracking-[-0.04em]"
            >
              Merge into
              <br />
              <span className="text-[var(--cf-primary)]">the forum.</span>
            </h2>
          </Reveal>
          <MagneticLink
            href="/#join"
            className="inline-flex min-h-14 cursor-pointer items-center bg-[var(--cf-cta)] px-10 font-mono text-base font-bold uppercase tracking-[0.12em] text-[var(--cf-cta-text)]"
          >
            Join the Forum
          </MagneticLink>
        </div>
      </section>
    </main>
  );
}
