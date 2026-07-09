import Image from "next/image";
import Link from "next/link";
import PublicFooter from "@/components/PublicFooter";
import SkipLink from "@/components/SkipLink";
import { BEAR_LOGO } from "@/constants/bear";
import type { HeaderDict, ThemeDict } from "@/content/dict/types";
import { HOME_PATH, STUDIO_PATH, type Lang } from "@/lib/i18n";

type PublicShellProps = {
  lang: Lang;
  header: HeaderDict;
  skipLink: string;
  theme: ThemeDict;
  /** Path to the same page in the other language, for the toggle. */
  langHref: string;
  children: React.ReactNode;
};

export default function PublicShell({
  lang,
  header,
  skipLink,
  theme,
  langHref,
  children,
}: PublicShellProps) {
  return (
    <div className="shell">
      <SkipLink label={skipLink} />
      <header className="site-header">
        <div className="site-container site-container--wide site-header__inner">
          <Link
            href={HOME_PATH[lang]}
            className="site-header__home"
            aria-label={header.homeAria}
          >
            <Image
              src={BEAR_LOGO.src}
              alt={header.logoAlt}
              width={BEAR_LOGO.width}
              height={BEAR_LOGO.height}
              className="site-header__logo"
              priority
            />
          </Link>
          <nav className="site-header__nav">
            <Link href={STUDIO_PATH[lang]} className="nav-link type-corpo">
              {header.studioLabel}
            </Link>
            <Link
              href={langHref}
              className="nav-link type-corpo"
              aria-label={header.langAria}
              lang={header.langHrefLang}
              hrefLang={header.langHrefLang}
            >
              {header.langLabel}
            </Link>
          </nav>
        </div>
      </header>
      <main id="conteudo-principal" className="shell-main">
        {children}
      </main>
      <PublicFooter theme={theme} />
    </div>
  );
}
