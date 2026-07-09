import Link from "next/link";
import PublicShell from "@/components/PublicShell";
import { UI } from "@/content/ui";

export default function NotFound() {
  return (
    <PublicShell>
      <div className="site-container hero-block">
        <p className="type-display">{UI.notFound.heading}</p>
        <Link href="/" className="text-link type-corpo">
          {UI.notFound.action}
        </Link>
      </div>
    </PublicShell>
  );
}
