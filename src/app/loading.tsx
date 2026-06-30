import { SITE } from "@/content/site";

export default function Loading() {
  return (
    <div className="flex min-h-dvh items-center justify-center px-6">
      <p className="text-small text-ink/50">A carregar {SITE.name}</p>
    </div>
  );
}
