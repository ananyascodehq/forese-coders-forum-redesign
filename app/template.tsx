/**
 * template.tsx re-mounts on every navigation, so this CSS fade runs on each page change.
 * Pure CSS: the server HTML is visible without JavaScript. Reduced motion is handled in globals.css.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="cf-page-in flex flex-1 flex-col">{children}</div>;
}
