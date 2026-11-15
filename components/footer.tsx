import Link from "next/link";
import { JOIN_HREF, NAV_LINKS } from "@/lib/nav";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-[var(--cf-border)] bg-[var(--cf-bg-elevated)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-3">
        <div>
          <p className="font-heading text-lg font-bold">Coders&apos; Forum</p>
          <p className="mt-3 max-w-xs text-sm text-[var(--cf-text-muted)]">
            The technical student community at Sri Venkateswara College of
            Engineering (SVCE).
          </p>
        </div>

        <nav aria-label="Footer">
          <p className="text-sm font-semibold uppercase tracking-wider text-[var(--cf-text)]">
            Explore
          </p>
          <ul className="mt-3 flex flex-col">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex min-h-9 items-center text-sm text-[var(--cf-text-muted)] transition-colors hover:text-[var(--cf-text)]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={JOIN_HREF}
                className="inline-flex min-h-9 items-center text-sm text-[var(--cf-text-muted)] transition-colors hover:text-[var(--cf-text)]"
              >
                Join
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-[var(--cf-text)]">
            Contact
          </p>
          {/* Placeholder: replace with the real email and social links. */}
          <p className="mt-3 text-sm text-[var(--cf-text-muted)]">
            Email: <span className="text-[var(--cf-text)]">TBD</span>
          </p>
        </div>
      </div>
      <div className="border-t border-[var(--cf-border)]">
        <p className="mx-auto max-w-6xl px-6 py-5 text-xs text-[var(--cf-text-muted)]">
          Coders&apos; Forum, SVCE. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
