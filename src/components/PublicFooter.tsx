import Link from "next/link";
import { SITE } from "@/content/site";
import { UI } from "@/content/ui";

const legalLinks = [
  { href: "/privacy", label: UI.legal.privacyTitle },
  { href: "/terms", label: UI.legal.termsTitle },
  { href: "/legal", label: UI.legal.noticeTitle },
  { href: "/cookies", label: UI.legal.cookiesTitle },
] as const;

export default function PublicFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="public-footer">
      <div className="site-container public-footer__inner">
        <p className="type-nota text-secondary">
          © {year} {SITE.nameShort}
        </p>

        <nav aria-label={UI.nav.ariaLegal} className="public-footer__legal">
          {legalLinks.map(({ href, label }) => (
            <Link key={href} href={href} className="text-link type-nota text-secondary">
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
