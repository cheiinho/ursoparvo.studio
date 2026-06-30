import Link from "next/link";
import { SITE } from "@/content/site";

const INSTAGRAM_URL =
  process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "https://instagram.com/ursoparvo.studio";

const legalLinks = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/legal", label: "Legal Notice" },
  { href: "/cookies", label: "Cookie Policy" },
] as const;

type FooterProps = {
  className?: string;
};

export default function Footer({ className = "" }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer
      className={`bg-transparent px-6 py-10 md:px-10 md:py-12 ${className}`}
    >
      <div className="mx-auto flex max-w-[1400px] flex-col items-center gap-5 text-center">
        <p className="tech normal-case text-ink/35">
          Desenhado e construído em Coimbra, Portugal
        </p>

        <p className="text-sm text-ink/60">
          © {year} {SITE.name}. Todos os direitos reservados.
        </p>

        <nav aria-label="Footer links">
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <li>
              <Link
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="press text-sm text-ink/60 transition-colors duration-200 hover:text-ink"
                data-cursor-hover
              >
                Instagram
              </Link>
            </li>
            {legalLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="press text-sm text-ink/60 transition-colors duration-200 hover:text-ink"
                  data-cursor-hover
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
