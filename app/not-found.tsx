import { CtaButton } from "@/components/ui/cta";

export const metadata = { title: "Not found | Coders' Forum" };

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-24 text-center">
      <p className="font-mono text-sm text-cf-primary-soft">404</p>
      <h1 className="text-4xl font-bold sm:text-5xl">Page not found</h1>
      <p className="text-cf-text-muted">That page does not exist or has moved.</p>
      <CtaButton href="/">Back home</CtaButton>
    </main>
  );
}
