import Link from "next/link";
import { SITE } from "@/content/site";

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
        <p className="type-nota text-secondary">
          © {year} {SITE.nameShort}
        </p>

        <nav aria-label="Legal" className="public-footer__legal">
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
