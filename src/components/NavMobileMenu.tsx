"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import ThemeToggle from "@/components/ThemeToggle";
import { NAV, SITE } from "@/content/site";

const navLinks = [
  { href: "/work", label: NAV.work },
  { href: "/about", label: NAV.about },
  {
    href: `mailto:${SITE.email}`,
    label: NAV.contact,
    external: true,
  },
] as const;

type NavMobileMenuProps = {
  id: string;
  open: boolean;
  onClose: () => void;
  isActive: (href: string) => boolean;
};

export default function NavMobileMenu({
  id,
  open,
  onClose,
  isActive,
}: NavMobileMenuProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div
      id={id}
      className={`mobile-menu${open ? " is-open" : ""}`}
      aria-hidden={!open}
    >
      <nav aria-label="Mobile" className="mobile-menu__nav">
        <ul className="mobile-menu__list">
          {navLinks.map(({ href, label, ...rest }) => (
            <li key={href}>
              {"external" in rest && rest.external ? (
                <a
                  href={href}
                  className="mobile-menu__link type-display"
                  onClick={onClose}
                  tabIndex={open ? 0 : -1}
                >
                  {label}
                </a>
              ) : (
                <Link
                  href={href}
                  className={`mobile-menu__link type-display${isActive(href) ? " is-active" : ""}`}
                  onClick={onClose}
                  tabIndex={open ? 0 : -1}
                  aria-current={isActive(href) ? "page" : undefined}
                >
                  {label}
                </Link>
              )}
            </li>
          ))}
        </ul>

        <div className="mobile-menu__footer">
          <ThemeToggle />
          <a
            href={`mailto:${SITE.email}`}
            className="text-link type-corpo"
            onClick={onClose}
            tabIndex={open ? 0 : -1}
          >
            {SITE.email}
          </a>
        </div>
      </nav>
    </div>,
    document.body,
  );
}
