import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import { NAV, SITE } from "@/content/site";

const legalLinks = [
  { href: "/privacy", label: "Privacidade" },
  { href: "/terms", label: "Termos" },
  { href: "/legal", label: "Aviso legal" },
  { href: "/cookies", label: "Cookies" },
] as const;

export default function PublicFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="public-footer">
      <div className="site-container public-footer__inner">
        <p className="public-footer__copyright text-nav">
          © {year} {SITE.nameShort}
        </p>

        <div className="public-footer__right">
          <span className="public-footer__theme">
            <ThemeToggle />
          </span>
          <a
            href={`mailto:${SITE.email}`}
            className="public-footer__email text-nav"
          >
            {SITE.email}
          </a>
          <nav aria-label="Legal" className="public-footer__socials">
            {legalLinks.map(({ href, label }) => (
              <Link key={href} href={href} className="text-nav public-nav-link">
                {label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="public-footer__mobile">
          <a href={`mailto:${SITE.email}`} className="public-footer__mobile-email text-nav">
            {NAV.contact}
          </a>
        </div>
      </div>
    </footer>
  );
}
