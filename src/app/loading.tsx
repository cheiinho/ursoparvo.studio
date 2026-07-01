import { SITE } from "@/content/site";

export default function Loading() {
  return (
    <div
      className="flex min-h-dvh items-center justify-center"
      style={{ padding: "var(--space-6)" }}
    >
      <p className="type-nota text-secondary">A carregar {SITE.name}</p>
    </div>
  );
}
