import { MotionA, MotionLink, press } from "@/components/ui-motion";
import { SITE } from "@/content/site";

type PublicFooterProps = {
  langHref: string;
  langLabel: string;
  langAria: string;
  langHrefLang: string;
};

export default function PublicFooter({
  langHref,
  langLabel,
  langAria,
  langHrefLang,
}: PublicFooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer type-nota">
      <div className="site-container site-footer__inner">
        <p className="site-footer__item">
          <span className="site-footer__brand">© {year} {SITE.name}</span>
        </p>
        <div className="site-footer__links">
          <MotionLink
            href={langHref}
            className="site-footer__item"
            aria-label={langAria}
            lang={langHrefLang}
            hrefLang={langHrefLang}
            {...press}
          >
            {langLabel}
          </MotionLink>
          <MotionA
            href={`mailto:${SITE.email}`}
            className="site-footer__item"
            {...press}
          >
            {SITE.email}
          </MotionA>
        </div>
      </div>
    </footer>
  );
}
