"use client";

import { useState } from "react";
import { JOIN_IF, JOIN_IF_THRESHOLD } from "@/content/why-join";

/** Tick the lines that sound like you. Enough ticks and the list tells you that you belong. */
export function JoinChecklist() {
  const [checked, setChecked] = useState<ReadonlySet<number>>(new Set());
  const count = checked.size;
  const unlocked = count >= JOIN_IF_THRESHOLD;

  const toggle = (i: number) =>
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <div>
      <ul className="border-t border-cf-border">
        {JOIN_IF.map((line, i) => (
          <li key={line} className="border-b border-cf-border">
            <label className="flex cursor-pointer items-start gap-5 py-5">
              <input
                type="checkbox"
                className="peer sr-only"
                checked={checked.has(i)}
                onChange={() => toggle(i)}
              />
              <span aria-hidden="true" className="font-mono text-cf-text-muted peer-checked:hidden">
                [ ]
              </span>
              <span aria-hidden="true" className="hidden font-mono text-cf-primary peer-checked:inline">
                [x]
              </span>
              <span className="text-lg text-cf-text-muted transition-colors peer-checked:text-cf-text peer-focus-visible:underline">
                {line}
              </span>
            </label>
          </li>
        ))}
      </ul>

      <div
        aria-live="polite"
        className={`mt-8 flex flex-wrap items-center justify-between gap-4 border px-5 py-4 font-mono text-sm transition-all duration-500 ${
          unlocked
            ? "border-cf-primary bg-cf-primary/10 text-cf-text shadow-[0_0_48px_-12px_rgba(212,255,58,0.45)]"
            : "border-cf-border text-cf-text-muted"
        }`}
      >
        <span>
          {unlocked ? (
            <>
              <span className="text-cf-primary">$</span> you&apos;re one of us.
            </>
          ) : (
            `${count} / ${JOIN_IF.length} ticked. Tick ${JOIN_IF_THRESHOLD} to find out.`
          )}
        </span>
        {unlocked && (
          <a
            href="#join-final"
            className="inline-flex min-h-11 items-center uppercase tracking-[0.12em] text-cf-primary underline-offset-4 hover:underline"
          >
            Join below ↓
          </a>
        )}
      </div>
    </div>
  );
}
