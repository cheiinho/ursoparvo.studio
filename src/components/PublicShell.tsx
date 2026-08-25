import Image from "next/image";
import PublicFooter from "@/components/PublicFooter";
import SkipLink from "@/components/SkipLink";
import ThemeToggle from "@/components/ThemeToggle";
import { MotionLink, press } from "@/components/ui-motion";
import { BEAR_LOGO } from "@/constants/bear";
import type { HeaderDict, ThemeDict } from "@/content/dict/types";
import { HOME_PATH, STUDIO_PATH, type Lang } from "@/lib/i18n";

type PublicShellProps = {
  lang: Lang;
  header: HeaderDict;
  skipLink: string;
  theme: ThemeDict;
  /** Path to the same page in the other language, for the footer toggle. */
  langHref: string;
  /** When true, the + control becomes a close cross back to home. */
  studioOpen?: boolean;
  children: React.ReactNode;
};

export default function PublicShell({
  lang,
  header,
  skipLink,
  theme,
  langHref,
  studioOpen = false,
  children,
}: PublicShellProps) {
  return (
    <div className="shell">
      <SkipLink label={skipLink} />
      <header className="site-header">
        <div className="site-container site-container--wide site-header__inner">
          <MotionLink
            href={HOME_PATH[lang]}
            className="site-header__home"
            aria-label={header.homeAria}
            {...press}
          >
            <Image
              src={BEAR_LOGO.src}
              alt={header.logoAlt}
              width={BEAR_LOGO.width}
              height={BEAR_LOGO.height}
              className="site-header__logo"
              priority
            />
          </MotionLink>
          <nav className="site-header__nav">
            <ThemeToggle labels={theme} />
            <MotionLink
              href={studioOpen ? HOME_PATH[lang] : STUDIO_PATH[lang]}
              className="theme-link"
              aria-label={studioOpen ? header.homeAria : header.studioLabel}
              aria-expanded={studioOpen}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              <span
                className={studioOpen ? "nav-plus nav-plus--close" : "nav-plus"}
                aria-hidden="true"
              />
            </MotionLink>
          </nav>
        </div>
      </header>
      <main id="conteudo-principal" className="shell-main">
        {children}
      </main>
      <PublicFooter
        langHref={langHref}
        langLabel={header.langLabel}
        langAria={header.langAria}
        langHrefLang={header.langHrefLang}
      />
    </div>
  );
}
