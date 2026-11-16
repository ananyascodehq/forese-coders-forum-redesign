/**
 * A slim ticker: a pinned label on the left, phrases looping sideways beside it.
 * Pauses on hover; reduced motion stops it (see the global reduced-motion rule).
 */
export function Ribbon({ items, label }: { items: readonly string[]; label: string }) {
  // Repeat the set so one row is always wider than the screen, then render the row twice for the loop.
  const row = [...items, ...items, ...items];

  const renderRow = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {row.map((text, i) => (
        <li key={`${text}-${i}`} className="flex items-center">
          <span className="whitespace-nowrap font-mono text-[0.8rem] uppercase tracking-[0.24em] text-cf-text/85 md:text-sm">
            {text}
          </span>
          <span aria-hidden="true" className="mx-8 text-[0.55rem] text-cf-primary md:mx-12">
            ◆
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <section
      aria-label={label}
      className="flex items-stretch border-y border-cf-border bg-cf-bg"
    >
      <p
        aria-hidden="true"
        className="relative z-10 flex shrink-0 items-center border-r border-cf-border bg-cf-bg px-5 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-cf-primary md:px-8"
      >
        {label}
      </p>
      <div className="relative min-w-0 flex-1 overflow-hidden py-5 [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)] md:py-6">
        <div className="cf-ribbon-track flex w-max">
          {renderRow(false)}
          {renderRow(true)}
        </div>
      </div>
    </section>
  );
}
