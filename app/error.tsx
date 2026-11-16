"use client";

export default function Error({ retry }: { error: Error & { digest?: string }; retry: () => void }) {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-24 text-center">
      <h1 className="text-4xl font-bold sm:text-5xl">Something went wrong</h1>
      <p className="text-cf-text-muted">An unexpected error occurred. You can try again.</p>
      <button
        type="button"
        onClick={() => retry()}
        className="inline-flex min-h-12 cursor-pointer items-center bg-cf-cta px-7 font-mono text-sm font-bold uppercase tracking-[0.12em] text-cf-cta-text"
      >
        Try again
      </button>
    </main>
  );
}
