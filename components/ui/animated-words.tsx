import type { CSSProperties } from "react";

/**
 * Splits words into per-letter spans that animate in one after another (see .cf-letter in globals.css).
 * Words from `accentFrom` onward are lime. Put the readable text in an aria-label on the heading.
 */
export function AnimatedWords({ words, accentFrom }: { words: string[]; accentFrom: number }) {
  let index = 0;
  return (
    <span aria-hidden="true">
      {words.map((word, w) => (
        <span
          key={word}
          className={`inline-block ${w >= accentFrom ? "text-cf-primary" : ""} ${w > 0 ? "ml-[0.25em]" : ""}`}
        >
          {word.split("").map((ch, c) => (
            <span key={c} className="cf-letter inline-block" style={{ "--i": index++ } as CSSProperties}>
              {ch}
            </span>
          ))}
        </span>
      ))}
    </span>
  );
}
