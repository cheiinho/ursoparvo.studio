import ThemeToggle from "@/components/ThemeToggle";
import { SITE } from "@/content/site";

export default function PublicFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="public-footer">
      <div className="site-container public-footer__inner">
        <p className="type-nota text-secondary">
          © {year} {SITE.nameShort}
        </p>
        <div className="public-footer__links">
          <ThemeToggle />
          <a href={`mailto:${SITE.email}`} className="text-link type-nota text-secondary">
            {SITE.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
