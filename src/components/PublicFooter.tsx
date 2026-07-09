import ThemeToggle from "@/components/ThemeToggle";
import { SITE } from "@/content/site";

export default function PublicFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer type-nota">
      <div className="site-container site-footer__inner">
        <p className="site-footer__item">© {year} {SITE.nameShort}</p>
        <div className="site-footer__links">
          <ThemeToggle className="site-footer__item" />
          <a href={`mailto:${SITE.email}`} className="site-footer__item">
            {SITE.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
