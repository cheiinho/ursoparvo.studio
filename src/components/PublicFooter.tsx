import ThemeToggle from "@/components/ThemeToggle";
import { SITE } from "@/content/site";

export default function PublicFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="public-footer type-nota">
      <div className="site-container public-footer__inner">
        <p className="text-secondary">
          © {year} {SITE.nameShort}
        </p>
        <div className="public-footer__links">
          <ThemeToggle />
          <a href={`mailto:${SITE.email}`} className="text-link text-secondary">
            {SITE.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
