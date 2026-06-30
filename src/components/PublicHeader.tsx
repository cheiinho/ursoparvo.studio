"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import NavMobileMenu from "@/components/NavMobileMenu";
import ThemeToggle from "@/components/ThemeToggle";
import { NAV, SITE } from "@/content/site";

const navLinks = [
  { href: "/work", label: NAV.work },
  { href: "/about", label: NAV.about },
  { href: `mailto:${SITE.email}`, label: NAV.contact, external: true },
] as const;

export default function PublicHeader() {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const menuId = useId();

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [menuOpen]);

  useEffect(() => {
    const onScroll = () => {
      if (menuOpen) return;
      const y = window.scrollY;
      const scrollingDown = y > lastScrollY.current;
      const pastThreshold = y > 80;
      setHidden(scrollingDown && pastThreshold && window.innerWidth < 768);
      lastScrollY.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
    <header
      className={`public-header${hidden ? " public-header--hidden" : ""}${menuOpen ? " public-header--menu-open" : ""}`}
    >
      <div className="public-header__nav">
        <div className="site-container public-header__inner">
          <Link
            href="/"
            className="public-header__brand text-display public-nav-link"
            aria-label={`${SITE.name}, início`}
            tabIndex={menuOpen ? -1 : 0}
          >
            <span className="public-header__brand-full">{SITE.name}</span>
            <span className="public-header__brand-short">{SITE.nameShort}</span>
          </Link>

          <nav
            aria-label="Principal"
            className="public-header__links public-header__links--desktop"
          >
            {navLinks.map(({ href, label, ...rest }) =>
              "external" in rest && rest.external ? (
                <a
                  key={href}
                  href={href}
                  className="public-nav-link text-nav"
                >
                  {label}
                </a>
              ) : (
                <Link
                  key={href}
                  href={href}
                  className={`public-nav-link text-nav${isActive(href) ? " is-active" : ""}`}
                  aria-current={isActive(href) ? "page" : undefined}
                >
                  {label}
                </Link>
              ),
            )}
            <span className="public-header__theme">
              <ThemeToggle />
            </span>
          </nav>

          <button
            type="button"
            className="public-header__menu-btn public-control-link text-nav"
            aria-expanded={menuOpen}
            aria-controls={menuId}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? "Fechar" : "Menu"}
          </button>
        </div>
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
