"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { NavHeader } from "@/components/ui/nav-header";
import NavMobileMenu from "@/components/NavMobileMenu";
import { NAV, SITE } from "@/content/site";

export default function Nav() {
  const [pastHero, setPastHero] = useState(false);
  const [hasLanding, setHasLanding] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();
  const pathname = usePathname();

  useEffect(() => {
    const landing = document.getElementById("landing");
    if (!landing) return;

    setHasLanding(true);

    const observer = new IntersectionObserver(
      ([entry]) => setPastHero(!entry.isIntersecting),
      { threshold: 0, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(landing);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const isHome = pathname === "/";
  const onHero = isHome && hasLanding && !pastHero && !menuOpen;
  const headerBg = menuOpen
    ? "bg-transparent"
    : onHero
      ? "bg-transparent"
      : "bg-background";
  const interactive = !menuOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[210] transition-[background-color] duration-[560ms] ease-[cubic-bezier(0.77,0,0.175,1)] ${headerBg} ${
        menuOpen ? "pointer-events-none" : ""
      }`}
    >
      <nav
        aria-label="Main"
        className="relative mx-auto flex h-14 max-w-[1400px] items-center justify-between px-5 md:h-20 md:px-10"
      >
        <Link
          href="/"
          className={`press text-body text-ink ${menuOpen ? "invisible" : ""}`}
          aria-label={`${SITE.name}, início`}
          tabIndex={interactive ? 0 : -1}
        >
          <span translate="no" className="font-normal">
            <span className="sm:hidden">{SITE.nameShort}</span>
            <span className="hidden sm:inline">{SITE.name}</span>
          </span>
        </Link>

        <div className="hidden items-center gap-5 xl:flex md:gap-7">
          <NavHeader tabIndex={interactive ? 0 : -1} />
          <a
            href={`mailto:${SITE.email}`}
            tabIndex={interactive ? 0 : -1}
            className="press text-body text-ink/70 transition-colors duration-200 hover:text-ink"
          >
            {NAV.contact}
          </a>
        </div>

        <button
          type="button"
          className={`press text-body relative z-[220] text-ink transition-colors duration-200 hover:text-ink/70 xl:hidden ${
            menuOpen ? "pointer-events-auto" : ""
          }`}
          aria-expanded={menuOpen}
          aria-controls={menuId}
          onClick={() => setMenuOpen((open) => !open)}
          tabIndex={0}
        >
          {menuOpen ? "Fechar" : "Menu"}
        </button>
      </nav>

      <NavMobileMenu
        id={menuId}
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
      />
    </header>
  );
}
