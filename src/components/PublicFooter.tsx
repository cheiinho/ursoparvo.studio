import ThemeToggle from "@/components/ThemeToggle";
import { MotionA, press } from "@/components/ui-motion";
import type { ThemeDict } from "@/content/dict/types";
import { SITE } from "@/content/site";

type PublicFooterProps = {
  theme: ThemeDict;
};

export default function PublicFooter({ theme }: PublicFooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer type-nota">
      <div className="site-container site-footer__inner">
        <p className="site-footer__item">© {year} {SITE.nameShort}</p>
        <div className="site-footer__links">
          <ThemeToggle labels={theme} className="site-footer__item" />
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
