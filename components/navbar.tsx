"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { JOIN_HREF, NAV_LINKS } from "@/lib/nav";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function Navbar() {
  const pathname = usePathname();
  // The menu is open only for the path it was opened on, so it closes on navigation without an effect.
  const [openPath, setOpenPath] = useState<string | null>(null);
  const open = openPath === pathname;
  const reduce = useReducedMotion();
  const toggleRef = useRef<HTMLButtonElement>(null);

  // While the menu is open: move focus into it, make the page behind it inert, close on Escape
  // and hand focus back to the toggle.
  useEffect(() => {
    if (!open) return;
    const toggle = toggleRef.current;
    const behind = [document.getElementById("main"), document.querySelector("footer")];
    behind.forEach((el) => el?.setAttribute("inert", ""));
    document.querySelector<HTMLElement>("#mobile-menu a")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpenPath(null);
      toggle?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      behind.forEach((el) => el?.removeAttribute("inert"));
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-cf-border bg-cf-bg/90 backdrop-blur-md">
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="group flex min-h-11 items-center gap-3">
          <span
            aria-hidden="true"
            className="grid h-8 place-items-center bg-cf-primary px-2 font-heading text-sm font-bold tracking-tight text-cf-bg"
          >
            CF
          </span>
          <span className="font-mono text-xs uppercase tracking-[0.18em] text-cf-text">
            Coders&apos; Forum
            <span className="hidden text-cf-text-muted sm:inline"> / SVCE</span>
          </span>
        </Link>

        <ul className="hidden items-stretch md:flex">
          {NAV_LINKS.map((link, i) => {
            const active = isActive(pathname, link.href);
            return (
              <li key={link.href} className="relative flex">
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`flex min-h-11 items-center gap-2 px-4 font-mono text-xs uppercase tracking-[0.16em] transition-colors ${
                    active ? "text-cf-text" : "text-cf-text-muted hover:text-cf-text"
                  }`}
                >
                  <span className={active ? "text-cf-primary" : "text-cf-text-muted/60"}>
                    0{i + 1}
                  </span>
                  {link.label}
                </Link>
                {active && (
                  <motion.span
                    layoutId="nav-indicator"
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-px h-[3px] bg-cf-primary"
                    transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 36 }}
                  />
                )}
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <Link
            href={JOIN_HREF}
            className="hidden h-10 items-center gap-2 bg-cf-cta px-4 font-mono text-xs font-bold uppercase tracking-[0.14em] text-cf-cta-text transition-transform hover:-translate-y-px md:inline-flex"
          >
            Join
            <span aria-hidden="true">↗</span>
          </Link>

          <button
            ref={toggleRef}
            type="button"
            className="grid min-h-11 min-w-11 cursor-pointer place-items-center border border-cf-border md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpenPath(open ? null : pathname)}
          >
            <span aria-hidden="true" className="font-mono text-sm">
              {open ? "×" : "≡"}
            </span>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="border-t border-cf-border bg-cf-bg md:hidden"
          >
            <ul className="mx-auto flex max-w-6xl flex-col px-6 py-2">
              {NAV_LINKS.map((link, i) => {
                const active = isActive(pathname, link.href);
                return (
                  <li key={link.href} className="border-b border-cf-border">
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className={`flex min-h-16 items-baseline gap-4 font-heading text-4xl font-bold uppercase tracking-tight ${
                        active ? "text-cf-primary" : "text-cf-text"
                      }`}
                    >
                      <span className="font-mono text-xs text-cf-text-muted">0{i + 1}</span>
                      {link.label}
                    </Link>
                  </li>
                );
              })}
              <li className="py-6">
                <Link
                  href={JOIN_HREF}
                  className="flex min-h-12 items-center justify-center bg-cf-cta font-mono text-sm font-bold uppercase tracking-[0.14em] text-cf-cta-text"
                >
                  Join the Forum ↗
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
