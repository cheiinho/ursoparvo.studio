/**
 * Flat white backdrop. Keeps the bear and work as the focus without warm tint.
 */
export function SiteBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 bg-white"
    />
  );
}
