"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";
import { NAV, SITE } from "@/content/site";

const navLinks = [
  { href: "/work", label: NAV.work },
  { href: "/about", label: NAV.about },
] as const;

export default function PublicHeader() {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const scrollingDown = y > lastScrollY.current;
      const pastThreshold = y > 80;
      setHidden(scrollingDown && pastThreshold && window.innerWidth < 768);
      lastScrollY.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/work"
      ? pathname === "/work" || pathname.startsWith("/work/")
      : pathname === href;

  return (
    <header
      className={`public-header${hidden ? " public-header--hidden" : ""}`}
    >
      <div className="public-header__nav">
        <div className="site-container public-header__inner">
          <Link
            href="/"
            className="text-display public-nav-link"
            aria-label={`${SITE.name}, início`}
          >
            {SITE.nameShort}
          </Link>

          <div className="public-header__links">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`public-nav-link text-nav${isActive(href) ? " is-active" : ""}`}
                aria-current={isActive(href) ? "page" : undefined}
              >
                {label}
              </Link>
            ))}
            <a
              href={`mailto:${SITE.email}`}
              className={`public-nav-link text-nav${pathname === "/contact" ? " is-active" : ""}`}
            >
              {NAV.contact}
            </a>
            <span className="public-header__theme">
              <ThemeToggle />
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
