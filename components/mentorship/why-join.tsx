import { Reveal } from "@/components/reveal";

// Every line comes from what the club does. No member counts, dates or results are claimed.
const DIFF = [
  { kind: "remove", text: "learning alone" },
  { kind: "remove", text: "tutorials you never finish" },
  { kind: "remove", text: "theory with nowhere to go" },
  { kind: "add", text: "students teaching students" },
  { kind: "add", text: "hackathons and real projects" },
  { kind: "add", text: "mentors a few steps ahead" },
] as const;

const REASONS = [
  {
    title: "Learn faster",
    body: "Peer-to-peer sessions where the person explaining it figured it out last week, so they remember how it felt.",
  },
  {
    title: "Build real things",
    body: "Hackathons and project work. Ship something instead of only studying it.",
  },
  {
    title: "Compete",
    body: "Technical competitions that put your problem solving on the line, and sharpen it.",
  },
  {
    title: "Get mentored",
    body: "Student Mentors guide you through Data Structures, Algorithms, Java and Machine Learning.",
  },
  {
    title: "Be placement-ready",
    body: "Skills for academics, personal projects, competitive programming and upcoming placements.",
  },
  {
    title: "Belong",
    body: "Run by students, for students, at Sri Venkateswara College of Engineering. Build skills together.",
  },
];

const JOIN_IF = [
  "You want to understand it, not just memorise it.",
  "You would rather build the thing than watch a video about it.",
  "You want someone a few steps ahead to ask.",
  "You work better with a team and a deadline.",
  "You are curious about emerging technology.",
];

export function WhyJoin() {
  return (
    <>
      {/* Heading plus a diff of what changes */}
      <section aria-labelledby="why-title" className="border-t border-[var(--cf-border)]">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="grid gap-14 lg:grid-cols-[1.15fr_1fr] lg:items-center">
            <Reveal>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--cf-primary-soft)]">
                <span className="text-[var(--cf-primary)]">$</span> git diff --you
              </p>
              <h2
                id="why-title"
                className="mt-6 font-heading text-[clamp(3.5rem,12vw,10rem)] font-bold uppercase leading-[0.82] tracking-[-0.05em]"
              >
                Why
                <br />
                <span className="text-[var(--cf-primary)]">join?</span>
              </h2>
              <p className="mt-8 max-w-md text-lg leading-relaxed text-[var(--cf-text)]/85">
                Because the fastest way to get good at this is to do it with other people who are getting good too.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div
                role="img"
                aria-label="A code diff. Removed: learning alone, tutorials you never finish, theory with nowhere to go. Added: students teaching students, hackathons and real projects, mentors a few steps ahead."
                className="border border-[var(--cf-border)] bg-[var(--cf-bg-elevated)] font-mono text-sm shadow-[0_0_80px_-20px_rgba(212,255,58,0.25)] md:text-base"
              >
                <div className="flex items-center justify-between border-b border-[var(--cf-border)] px-5 py-3 text-xs text-[var(--cf-text-muted)]">
                  <span>you.diff</span>
                  <span>
                    <span className="text-[#FF7A7A]">-3</span> <span className="text-[var(--cf-primary)]">+3</span>
                  </span>
                </div>
                <ul aria-hidden="true" className="py-3">
                  {DIFF.map((line) => (
                    <li
                      key={line.text}
                      className={`flex gap-4 px-5 py-2 ${
                        line.kind === "add"
                          ? "bg-[var(--cf-primary)]/10 text-[var(--cf-text)]"
                          : "bg-[#FF7A7A]/5 text-[var(--cf-text-muted)] line-through decoration-[#FF7A7A]/60"
                      }`}
                    >
                      <span className={line.kind === "add" ? "text-[var(--cf-primary)]" : "text-[#FF7A7A]"}>
                        {line.kind === "add" ? "+" : "-"}
                      </span>
                      <span>{line.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Reasons: full-width rows that flip to lime on hover */}
      <section aria-labelledby="reasons-title" className="border-t border-[var(--cf-border)]">
        <div className="mx-auto max-w-6xl px-6 pt-10">
          <h3 id="reasons-title" className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--cf-text-muted)]">
            Six reasons
          </h3>
        </div>
        <ol className="mt-6">
          {REASONS.map((r, i) => (
            <Reveal
              as="li"
              key={r.title}
              className="group border-t border-[var(--cf-border)] transition-colors duration-300 last:border-b hover:bg-[var(--cf-primary)]"
            >
              <div className="mx-auto grid max-w-6xl items-baseline gap-x-8 gap-y-3 px-6 py-8 md:grid-cols-[5rem_1.3fr_1fr] md:py-11">
                <p className="font-mono text-sm text-[var(--cf-primary-soft)] transition-colors group-hover:text-[var(--cf-bg)]">
                  0{i + 1}
                </p>
                <p className="font-heading text-[clamp(2.25rem,6.5vw,5.5rem)] font-bold uppercase leading-[0.9] tracking-[-0.04em] transition-transform duration-300 group-hover:translate-x-2 group-hover:text-[var(--cf-bg)]">
                  {r.title}
                </p>
                <p className="max-w-sm text-base leading-relaxed text-[var(--cf-text-muted)] transition-colors group-hover:text-[var(--cf-bg)]">
                  {r.body}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* Join if... */}
      <section aria-labelledby="joinif-title" className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="grid gap-12 md:grid-cols-[1fr_1.3fr] md:items-start">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--cf-primary-soft)]">Quick check</p>
            <h3
              id="joinif-title"
              className="mt-4 font-heading text-[clamp(2.5rem,6vw,4.75rem)] font-bold uppercase leading-[0.92] tracking-[-0.03em]"
            >
              Join if
              <br />
              <span className="text-[var(--cf-primary)]">this is you.</span>
            </h3>
          </Reveal>
          <ul className="border-t border-[var(--cf-border)]">
            {JOIN_IF.map((line, i) => (
              <Reveal as="li" key={line} delay={i * 0.07} className="flex gap-5 border-b border-[var(--cf-border)] py-5">
                <span aria-hidden="true" className="font-mono text-[var(--cf-primary)]">
                  [x]
                </span>
                <span className="text-lg text-[var(--cf-text)]">{line}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
