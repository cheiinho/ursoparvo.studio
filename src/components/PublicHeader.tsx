"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BEAR_LOGO } from "@/constants/bear";
import { NAV, SITE } from "@/content/site";
import { UI } from "@/content/ui";
import { useHeaderScrollProgress } from "@/lib/useHeaderScrolled";

const navLinks = [
  { href: "/work", label: NAV.work },
  { href: `mailto:${SITE.email}`, label: NAV.contact, external: true },
] as const;

export default function PublicHeader() {
  const pathname = usePathname();
  const { ref: headerRef } = useHeaderScrollProgress();

  const isActive = (href: string) =>
    href === "/work"
      ? pathname === "/work" || pathname.startsWith("/work/")
      : pathname === href;

  return (
    <header ref={headerRef} className="public-header">
      <div className="public-header__wrap">
        <div className="public-header__bar">
          <div className="public-header__inner">
            <Link
              href="/"
              className="public-header__logo"
              aria-label={`${SITE.name}, ${UI.nav.home}`}
            >
              <Image
                src={BEAR_LOGO.src}
                alt=""
                width={BEAR_LOGO.width}
                height={BEAR_LOGO.height}
                className="public-header__logo-img"
                priority
              />
            </Link>

            <nav aria-label={UI.nav.ariaMain} className="public-header__nav">
              {navLinks.map(({ href, label, ...rest }) =>
                "external" in rest && rest.external ? (
                  <a key={href} href={href} className="nav-link type-corpo">
                    {label}
                  </a>
                ) : (
                  <Link
                    key={href}
                    href={href}
                    className={`nav-link type-corpo${isActive(href) ? " is-active" : ""}`}
                    aria-current={isActive(href) ? "page" : undefined}
                  >
                    {label}
                  </Link>
                ),
              )}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
