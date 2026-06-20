"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { BEAR_ICON_PX_MD } from "@/constants/bear";

const INSTAGRAM_URL =
  process.env.NEXT_PUBLIC_INSTAGRAM_URL ??
  "https://instagram.com/ursoparvo.studio";

export const NAV_MOBILE_LINKS = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: INSTAGRAM_URL, label: "Instagram", external: true },
  {
    href: "mailto:hello@ursoparvo.studio",
    label: "Get in touch",
    external: true,
  },
] as const;

const linkClass =
  "press font-display text-[clamp(2.85rem,12vw,5.75rem)] leading-[0.92] tracking-[-0.03em] text-white transition-colors duration-200 hover:text-yellow";

type NavMobileMenuProps = {
  id: string;
  open: boolean;
  onClose: () => void;
};

export default function NavMobileMenu({
  id,
  open,
  onClose,
}: NavMobileMenuProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div
      id={id}
      className={`fixed inset-0 z-[200] flex h-dvh max-h-dvh w-full flex-col overflow-hidden overscroll-none bg-electric-blue transition-[opacity,visibility] duration-[560ms] ease-[cubic-bezier(0.77,0,0.175,1)] xl:hidden ${
        open
          ? "visible opacity-100"
          : "pointer-events-none invisible opacity-0"
      }`}
      style={{
        paddingTop: "env(safe-area-inset-top)",
        paddingBottom: "env(safe-area-inset-bottom)",
        paddingLeft: "env(safe-area-inset-left)",
        paddingRight: "env(safe-area-inset-right)",
      }}
      aria-hidden={!open}
    >
      <div
        className="relative shrink-0 px-6 pt-6 transition-[transform,opacity] duration-[560ms] ease-[cubic-bezier(0.77,0,0.175,1)] md:px-10 md:pt-8"
        style={{
          transitionDelay: open ? "40ms" : "0ms",
          transform: open ? "translateY(0)" : "translateY(-0.75rem)",
          opacity: open ? 1 : 0,
        }}
      >
        <Link
          href="/"
          className="press inline-flex items-center"
          onClick={onClose}
          aria-label="UrsoParvo Studio home"
          tabIndex={open ? 0 : -1}
        >
          <Image
            src="/assets/bear-yellow.png"
            alt=""
            width={BEAR_ICON_PX_MD}
            height={BEAR_ICON_PX_MD}
            className="block h-11 w-11 object-contain md:h-14 md:w-14"
            priority
          />
        </Link>
      </div>

      <nav
        aria-label="Mobile"
        className="relative flex min-h-0 flex-1 flex-col justify-center px-6 md:px-10"
      >
        <ul className="flex flex-col gap-1 md:gap-2">
          {NAV_MOBILE_LINKS.map((link, index) => (
            <li
              key={link.href}
              className="border-t border-white/15 first:border-t-0 transition-[transform,opacity] duration-[560ms] ease-[cubic-bezier(0.77,0,0.175,1)]"
              style={{
                transitionDelay: open ? `${80 + index * 55}ms` : "0ms",
                transform: open ? "translateY(0)" : "translateY(1.25rem)",
                opacity: open ? 1 : 0,
              }}
            >
              {"external" in link && link.external ? (
                <a
                  href={link.href}
                  target={
                    link.href.startsWith("mailto:") ? undefined : "_blank"
                  }
                  rel={
                    link.href.startsWith("mailto:")
                      ? undefined
                      : "noopener noreferrer"
                  }
                  className="block py-3 md:py-4"
                  onClick={onClose}
                  tabIndex={open ? 0 : -1}
                >
                  <span className={linkClass}>{link.label}</span>
                </a>
              ) : (
                <Link
                  href={link.href}
                  className="block py-3 md:py-4"
                  onClick={onClose}
                  tabIndex={open ? 0 : -1}
                >
                  <span className={linkClass}>{link.label}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <div
        className="relative shrink-0 px-6 pb-8 transition-[transform,opacity] duration-[560ms] ease-[cubic-bezier(0.77,0,0.175,1)] md:px-10 md:pb-10"
        style={{
          transitionDelay: open ? "320ms" : "0ms",
          transform: open ? "translateY(0)" : "translateY(0.75rem)",
          opacity: open ? 1 : 0,
        }}
      >
        <p className="tech !text-yellow">Solo design practice</p>
        <a
          href="mailto:hello@ursoparvo.studio"
          className="press mt-2 inline-block text-sm !text-white transition-colors duration-200 hover:text-yellow md:text-base"
          onClick={onClose}
          tabIndex={open ? 0 : -1}
        >
          hello@ursoparvo.studio
        </a>
      </div>
    </div>,
    document.body,
  );
}
