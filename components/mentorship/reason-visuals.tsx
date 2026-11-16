import type { CSSProperties } from "react";
import type { ReasonVisual } from "@/content/why-join";

// Small decorative animations for the "four more reasons" cards. All CSS, all aria-hidden, no data claimed.

/** A leaderboard where the lime bar keeps climbing past the others. */
function Compete() {
  const rows = [
    { rank: "01", width: "94%" },
    { rank: "02", width: "80%" },
    { rank: "03", width: "66%" },
  ];
  return (
    <div className="flex h-full flex-col justify-center gap-3 px-6 pt-8">
      {rows.map((r) => (
        <div key={r.rank} className="flex items-center gap-3 font-mono text-[0.65rem] text-cf-text-muted">
          <span className="w-5">{r.rank}</span>
          <div className="h-2.5 flex-1 rounded-full bg-cf-border/60">
            <div className="h-full rounded-full bg-cf-text-muted/50" style={{ width: r.width }} />
          </div>
        </div>
      ))}
      <div className="flex items-center gap-3 font-mono text-[0.65rem] text-cf-primary">
        <span className="w-5">YOU</span>
        <div className="h-2.5 flex-1 rounded-full bg-cf-border/60">
          <div className="cf-climb h-full rounded-full bg-cf-primary shadow-[0_0_16px_rgba(212,255,58,0.6)]" />
        </div>
        <span aria-hidden="true">↑</span>
      </div>
    </div>
  );
}

/** The four things the programme prepares you for, ticking off one by one. */
function Placement() {
  const steps = ["Academics", "Personal projects", "Competitive programming", "Placements"];
  return (
    <div className="flex h-full flex-col justify-center gap-1.5 px-6 pt-9">
      {steps.map((label, i) => {
        const last = i === steps.length - 1;
        return (
          <div
            key={label}
            className={`cf-tick flex w-fit items-center gap-2 rounded-full border px-3 py-1 font-mono text-[0.7rem] ${
              last
                ? "border-cf-primary bg-cf-primary text-cf-cta-text"
                : "border-cf-border bg-cf-surface text-cf-text-muted"
            }`}
            style={{ "--cf-tick-i": i } as CSSProperties}
          >
            <span aria-hidden="true">{last ? "→" : "✓"}</span>
            {label}
          </div>
        );
      })}
    </div>
  );
}

/** Concentric orbits with dots circling a lime core. */
function Explore() {
  const rings = [
    { size: "4.5rem", dur: "7s", dot: "h-1.5 w-1.5" },
    { size: "7.5rem", dur: "12s", dot: "h-2 w-2" },
    { size: "10.5rem", dur: "19s", dot: "h-1.5 w-1.5" },
  ];
  return (
    <div className="relative grid h-full place-items-center pt-4">
      {rings.map((r, i) => (
        <div
          key={r.size}
          className="cf-orbit absolute rounded-full border border-cf-border"
          style={{ width: r.size, height: r.size, animationDuration: r.dur, animationDelay: `${-i * 3.1}s`, animationDirection: i % 2 ? "reverse" : "normal" }}
        >
          <span className={`absolute -top-1 left-1/2 -translate-x-1/2 rounded-full bg-cf-primary ${r.dot}`} />
        </div>
      ))}
      <span className="h-3 w-3 rounded-full bg-cf-primary shadow-[0_0_24px_6px_rgba(212,255,58,0.45)]" />
    </div>
  );
}

/** A crowd of dots with one lime ring that is you, joining in. */
function Belong() {
  const cols = 14;
  const rows = 4;
  return (
    <div className="grid h-full place-items-center px-4">
      <div className="grid gap-2.5" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
        {Array.from({ length: cols * rows }, (_, i) => {
          const you = i === 3 * cols + 9;
          const warm = (i * 7) % 5 === 0;
          if (you) {
            return (
              <span key={i} className="relative h-3 w-3">
                <span className="absolute inset-0 animate-ping rounded-full bg-cf-primary/60" />
                <span className="absolute inset-0 rounded-full bg-cf-primary shadow-[0_0_14px_rgba(212,255,58,0.8)]" />
              </span>
            );
          }
          return (
            <span
              key={i}
              className={`h-3 w-3 rounded-full ${warm ? "bg-cf-primary/30" : "bg-cf-border"}`}
            />
          );
        })}
      </div>
    </div>
  );
}

const VISUALS: Record<ReasonVisual, () => React.JSX.Element> = {
  compete: Compete,
  placement: Placement,
  explore: Explore,
  belong: Belong,
};

export function ReasonVisualView({ kind }: { kind: ReasonVisual }) {
  const View = VISUALS[kind];
  return <View />;
}
