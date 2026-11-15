/**
 * A slow, full-bleed ribbon of phrases that loops sideways. Alternating items are outlined for a quieter rhythm.
 * Pauses on hover; reduced motion stops it (see the global reduced-motion rule).
 */
export function Ribbon({ items, label }: { items: readonly string[]; label: string }) {
  // Repeat the set so one row is always wider than the screen, then render the row twice for the loop.
  const row = [...items, ...items];

  const renderRow = (hidden: boolean) => (
    <ul
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center"
    >
      {row.map((text, i) => (
        <li key={`${text}-${i}`} className="flex items-center">
          <span
            className={`whitespace-nowrap font-heading text-[clamp(1.5rem,3.2vw,2.75rem)] font-semibold uppercase leading-none tracking-[0.04em] ${
              i % 2 === 0
                ? "text-[var(--cf-text)]"
                : "text-transparent [-webkit-text-stroke:1px_var(--cf-text-muted)]"
            }`}
          >
            {text}
          </span>
          <span aria-hidden="true" className="mx-8 text-[var(--cf-primary)] md:mx-12">
            ✦
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <section
      aria-label={label}
      className="relative overflow-hidden border-y border-[var(--cf-border)] py-6 md:py-8 [mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)]"
    >
      <div className="flex w-max animate-[cf-ribbon_50s_linear_infinite] hover:[animation-play-state:paused]">
        {renderRow(false)}
        {renderRow(true)}
      </div>
    </section>
  );
}
