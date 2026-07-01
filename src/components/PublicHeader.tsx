"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import NavMobileMenu from "@/components/NavMobileMenu";
import ThemeToggle from "@/components/ThemeToggle";
import { NAV, SITE } from "@/content/site";
import { UI } from "@/content/ui";

const navLinks = [
  { href: "/work", label: NAV.work },
  { href: "/about", label: NAV.about },
  { href: `mailto:${SITE.email}`, label: NAV.contact, external: true },
] as const;

export default function PublicHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const isActive = (href: string) =>
    href === "/work"
      ? pathname === "/work" || pathname.startsWith("/work/")
      : pathname === href;

  return (
    <header className="public-header">
      <div className="site-container public-header__inner">
        <Link
          href="/"
          className="public-header__brand type-corpo"
          aria-label={`${SITE.name}, ${UI.nav.home}`}
          tabIndex={menuOpen ? -1 : 0}
        >
          {SITE.nameShort}
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
          <ThemeToggle />
        </nav>

        <button
          type="button"
          className="public-header__menu-btn type-corpo"
          aria-expanded={menuOpen}
          aria-controls={menuId}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? UI.nav.menuClose : UI.nav.menuOpen}
        </button>
      </div>

      <NavMobileMenu
        id={menuId}
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        isActive={isActive}
      />
    </header>
  );
}
