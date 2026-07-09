import Link from "next/link";
import PublicShell from "@/components/PublicShell";
import { getDict } from "@/content/dict";
import { HOME_PATH } from "@/lib/i18n";

// not-found.js receives no props, so this page stacks both languages.
export default function NotFound() {
  const pt = getDict("pt");
  const en = getDict("en");

  return (
    <PublicShell
      lang="pt"
      header={pt.header}
      skipLink={pt.skipLink}
      theme={pt.theme}
      langHref={HOME_PATH.en}
    >
      <div className="site-container hero-block">
        <p className="type-display">{pt.notFound.heading}</p>
        <Link href={HOME_PATH.pt} className="text-link type-corpo">
          {pt.notFound.action}
        </Link>
        <p className="type-nota text-secondary" lang="en">
          {en.notFound.heading}{" "}
          <Link href={HOME_PATH.en} className="text-link">
            {en.notFound.action}
          </Link>
        </p>
      </div>
    </PublicShell>
  );
}
