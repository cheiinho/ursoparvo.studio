import { UI } from "@/content/ui";

export default function Loading() {
  return (
    <div
      className="flex min-h-dvh items-center justify-center"
      style={{ padding: "var(--space-6)" }}
      aria-live="polite"
    >
      <p className="type-nota text-secondary sr-only">{UI.states.loading}</p>
    </div>
  );
}
