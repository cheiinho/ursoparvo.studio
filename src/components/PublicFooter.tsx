import ThemeToggle from "@/components/ThemeToggle";
import { SITE } from "@/content/site";

export default function PublicFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="public-footer">
      <div className="site-container public-footer__inner">
        <p className="public-footer__item">© {year} {SITE.nameShort}</p>
        <div className="public-footer__links">
          <ThemeToggle className="public-footer__item" />
          <a href={`mailto:${SITE.email}`} className="public-footer__item">
            {SITE.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
