"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BEAR_LOGO } from "@/constants/bear";
import { NAV, SITE } from "@/content/site";
import { UI } from "@/content/ui";
import { useHeaderScrollProgress } from "@/lib/useHeaderScrolled";

export default function PublicHeader() {
  const pathname = usePathname();
  const { ref: headerRef } = useHeaderScrollProgress();

  const workActive = pathname === "/work" || pathname.startsWith("/work/");
  const aboutActive = pathname === "/about";
  const contactoActive = pathname === "/contacto";

  return (
    <header ref={headerRef} className="public-header">
      <div className="public-header__wrap">
        <div className="public-header__bar">
          <div className="public-header__inner">
            <nav aria-label={UI.nav.ariaMain} className="public-header__side public-header__side--left">
              <Link
                href="/work"
                className={`nav-link type-corpo${workActive ? " is-active" : ""}`}
                aria-current={workActive ? "page" : undefined}
              >
                {NAV.work}
              </Link>
              <Link
                href="/about"
                className={`nav-link type-corpo${aboutActive ? " is-active" : ""}`}
                aria-current={aboutActive ? "page" : undefined}
              >
                {NAV.about}
              </Link>
            </nav>

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

            <nav aria-label={UI.nav.ariaContact} className="public-header__side public-header__side--right">
              <Link
                href="/contacto"
                className={`nav-link type-corpo${contactoActive ? " is-active" : ""}`}
                aria-current={contactoActive ? "page" : undefined}
              >
                {NAV.contact}
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
