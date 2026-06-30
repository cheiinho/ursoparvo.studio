import Link from "next/link";
import { SITE, WORK_EMPTY } from "@/content/site";

const INSTAGRAM_URL =
  process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "https://instagram.com/ursoparvo.studio";

const legalLinks = [
  { href: "/privacy", label: "Privacidade" },
  { href: "/terms", label: "Termos" },
  { href: "/legal", label: "Aviso legal" },
  { href: "/cookies", label: "Cookies" },
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
      <div className="mx-auto flex max-w-[1400px] flex-col items-center gap-4 text-center">
        <p className="text-small text-ink/60">
          © {year} {SITE.name}
        </p>

        <nav aria-label="Links do rodapé">
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <li>
              <Link
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="press text-small text-ink/60 transition-colors duration-200 hover:text-ink"
              >
                Instagram
              </Link>
            </li>
            {legalLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="press text-small text-ink/60 transition-colors duration-200 hover:text-ink"
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
