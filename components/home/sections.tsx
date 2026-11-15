"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { MagneticLink } from "@/components/magnetic-link";

// Activities come from the club brief. No counts or dates are invented here.
const LOG = [
  { file: "hackathons.log", line: "Hackathons and technical competitions", status: "active" },
  { file: "peer-learning.log", line: "Students teaching students", status: "active" },
  { file: "mentorship.log", line: "Technical mentorship", status: "active" },
  { file: "emerging-tech.log", line: "Exploring software and emerging technology", status: "active" },
  { file: "collaboration.log", line: "Building skills together", status: "active" },
];

export function BuildLog() {
  const reduce = useReducedMotion();

  return (
    <section aria-labelledby="log-title" className="mx-auto max-w-6xl px-6 py-20 md:py-24">
      <div className="grid gap-12 md:grid-cols-[1fr_1.4fr] md:items-start">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--cf-primary-soft)]">
            Build log
          </p>
          <h2 id="log-title" className="mt-4 font-heading text-[clamp(2.5rem,6vw,4.5rem)] font-bold uppercase leading-[0.92] tracking-[-0.03em]">
            What we run, right now
          </h2>
        </div>

        <ul className="border-t border-[var(--cf-border)]">
          {LOG.map((item, i) => (
            <motion.li
              key={item.file}
              initial={reduce ? false : { opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-1 border-b border-[var(--cf-border)] py-6 sm:grid-cols-[14rem_1fr_auto] sm:items-baseline"
            >
              <span className="font-mono text-sm text-[var(--cf-primary-soft)]">{item.file}</span>
              <span className="text-lg text-[var(--cf-text)]">{item.line}</span>
              <span className="col-span-2 font-mono text-xs uppercase tracking-wider text-[var(--cf-text-muted)] sm:col-span-1">
                [{item.status}]
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function MentorTeaser() {
  return (
    <section aria-labelledby="mentor-title" className="mx-auto max-w-6xl px-6 pb-20 md:pb-24">
      <div className="flex flex-col gap-8 rounded-3xl border border-[var(--cf-border)] bg-[var(--cf-surface)]/40 p-8 md:flex-row md:items-end md:justify-between md:p-14">
        <div className="max-w-xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--cf-text-muted)]">
            Mentorship
          </p>
          <h2 id="mentor-title" className="mt-4 font-heading text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-[1.02] tracking-tight">
            Find the person who has already made your mistakes.
          </h2>
          <p className="mt-4 text-[var(--cf-text-muted)]">
            Technical mentorship from people a few steps ahead, for students who want to learn faster.
          </p>
        </div>
        <Link
          href="/mentorship"
          className="inline-flex min-h-12 shrink-0 cursor-pointer items-center border border-[var(--cf-text)]/30 px-7 font-mono text-sm font-bold uppercase tracking-[0.12em] text-[var(--cf-text)] transition-colors hover:border-[var(--cf-primary)] hover:text-[var(--cf-primary)]"
        >
          How mentorship works
        </Link>
      </div>
    </section>
  );
}

export function JoinCta() {
  return (
    <section id="join" aria-labelledby="join-title" className="relative overflow-hidden border-t border-[var(--cf-border)]">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-10 px-6 py-20 md:py-24">
        <h2 id="join-title" className="font-heading text-[clamp(3rem,10vw,8.5rem)] font-bold uppercase leading-[0.86] tracking-[-0.04em]">
          Join the
          <br />
          <span className="text-[var(--cf-primary-soft)]">forum.</span>
        </h2>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <MagneticLink
            href="#join"
            className="inline-flex min-h-14 cursor-pointer items-center bg-[var(--cf-cta)] px-10 font-mono text-base font-bold uppercase tracking-[0.12em] text-[var(--cf-cta-text)]"
          >
            Join the Forum
          </MagneticLink>
          {/* Placeholder until the real registration link is supplied. */}
          <p className="font-mono text-xs text-[var(--cf-text-muted)]">
            Registration link: to be added
          </p>
        </div>
      </div>
    </section>
  );
}
