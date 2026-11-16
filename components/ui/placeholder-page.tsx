/** Temporary page body for sections that are not built yet. */
export function PlaceholderPage({ title, note }: { title: string; note: string }) {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-24">
      <h1 className="text-4xl font-bold sm:text-5xl">{title}</h1>
      <p className="mt-4 text-cf-text-muted">{note}</p>
    </main>
  );
}
