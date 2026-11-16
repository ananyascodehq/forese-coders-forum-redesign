import Link from "next/link";
import { JOIN_HREF, NAV_LINKS } from "@/lib/nav";
import { COLLEGE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-cf-border bg-cf-bg-elevated">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-3">
        <div>
          <p className="font-heading text-lg font-bold">Coders&apos; Forum</p>
          <p className="mt-3 max-w-xs text-sm text-cf-text-muted">
            The technical student community at {COLLEGE} (SVCE).
          </p>
        </div>

        <nav aria-label="Footer">
          <p className="text-sm font-semibold uppercase tracking-wider text-cf-text">
            Explore
          </p>
          <ul className="mt-3 flex flex-col">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex min-h-9 items-center text-sm text-cf-text-muted transition-colors hover:text-cf-text"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={JOIN_HREF}
                className="inline-flex min-h-9 items-center text-sm text-cf-text-muted transition-colors hover:text-cf-text"
              >
                Join
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-cf-text">
            Contact
          </p>
          {/* Placeholder: replace with the real email and social links. */}
          <p className="mt-3 text-sm text-cf-text-muted">
            Email: <span className="text-cf-text">TBD</span>
          </p>
        </div>
      </div>
      <div className="border-t border-cf-border">
        <p className="mx-auto max-w-6xl px-6 py-5 text-xs text-cf-text-muted">
          Coders&apos; Forum, SVCE. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
