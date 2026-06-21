"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { NavHeader } from "@/components/ui/nav-header";
import NavMobileMenu from "@/components/NavMobileMenu";
import { BEAR_ICON_PX_MD } from "@/constants/bear";

type NavProps = {
  visible: boolean;
};

export default function Nav({ visible }: NavProps) {
  const [pastHero, setPastHero] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
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
    const onScroll = () => setHasScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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

  const onHero =
    visible && hasLanding && !pastHero && !hasScrolled && !menuOpen;
  const showNavBear = visible && !onHero && !menuOpen;
  const headerBg = menuOpen
    ? "border-transparent bg-transparent"
    : onHero
      ? "bg-transparent"
      : "border-b border-border bg-background";
  const interactive = visible && !menuOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[210] transition-[opacity,transform,background-color,border-color] duration-[560ms] ease-[cubic-bezier(0.77,0,0.175,1)] ${headerBg} ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-2 opacity-0"
      } ${menuOpen ? "pointer-events-none" : ""}`}
      aria-hidden={!visible}
    >
      <nav
        aria-label="Main"
        className="relative mx-auto grid h-16 max-w-[1400px] grid-cols-[1fr_auto_1fr] items-center px-6 md:h-20 md:px-10"
      >
        <Link
          href="/"
          className={`press col-start-1 justify-self-start text-base text-ink md:text-lg ${
            menuOpen ? "invisible" : ""
          }`}
          aria-label="UrsoParvo Studio home"
          data-cursor-hover
          tabIndex={interactive ? 0 : -1}
        >
          <span translate="no" className="font-normal">
            UrsoParvo Studio
          </span>
        </Link>

        <Link
          href="/"
          className={`press col-start-2 row-start-1 justify-self-center transition-[opacity,visibility] duration-[560ms] ease-[cubic-bezier(0.77,0,0.175,1)] ${
            showNavBear
              ? "visible opacity-100"
              : "pointer-events-none invisible opacity-0"
          }`}
          aria-label="UrsoParvo Studio home"
          aria-hidden={!showNavBear}
          data-cursor-hover
          tabIndex={showNavBear && interactive ? 0 : -1}
        >
          <Image
            src="/assets/bear-yellow.png"
            alt=""
            width={BEAR_ICON_PX_MD}
            height={BEAR_ICON_PX_MD}
            className="block h-9 w-9 object-contain md:h-11 md:w-11"
            priority
          />
        </Link>

        <div className="col-start-3 hidden items-center justify-end gap-5 xl:flex md:gap-7">
          <NavHeader tabIndex={interactive ? 0 : -1} />
          <a
            href="mailto:hello@ursoparvo.studio"
            data-cursor-hover
            tabIndex={interactive ? 0 : -1}
            className="press link-underline text-sm font-normal text-ink/70 transition-colors duration-200 hover:text-ink md:text-base"
          >
            Get in touch
          </a>
        </div>

        <button
          type="button"
          className={`press relative z-[220] col-start-3 flex size-11 items-center justify-center justify-self-end rounded-full border border-ink/15 bg-white text-ink transition-colors duration-200 xl:hidden ${
            menuOpen ? "pointer-events-auto" : ""
          }`}
          aria-expanded={menuOpen}
          aria-controls={menuId}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
          tabIndex={visible ? 0 : -1}
        >
          {menuOpen ? (
            <X className="size-5" aria-hidden />
          ) : (
            <Menu className="size-5" aria-hidden />
          )}
        </button>
      </nav>

      <NavMobileMenu
        id={menuId}
        open={menuOpen && visible}
        onClose={() => setMenuOpen(false)}
      />
    </header>
  );
}
