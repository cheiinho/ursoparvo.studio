"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  type Ref,
} from "react";

const INSTAGRAM_URL =
  process.env.NEXT_PUBLIC_INSTAGRAM_URL ??
  "https://instagram.com/ursoparvo.studio";

type CursorPosition = {
  left: number;
  width: number;
  opacity: number;
};

const HIDDEN_CURSOR: CursorPosition = { left: 0, width: 0, opacity: 0 };

type NavHeaderProps = {
  tabIndex?: number;
};

function NavHeader({ tabIndex = 0 }: NavHeaderProps) {
  const [position, setPosition] = useState<CursorPosition>(HIDDEN_CURSOR);
  const reduceMotion = useReducedMotion();
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);
  const workTabRef = useRef<HTMLLIElement>(null);
  const aboutTabRef = useRef<HTMLLIElement>(null);

  const isWorkActive =
    pathname === "/work" || pathname.startsWith("/work/");
  const isAboutActive = pathname === "/about";

  const measureTab = useCallback((tab: HTMLLIElement | null) => {
    const container = containerRef.current;
    if (!tab || !container) return HIDDEN_CURSOR;

    const { width, left } = tab.getBoundingClientRect();
    const containerLeft = container.getBoundingClientRect().left;

    return {
      width,
      left: left - containerLeft,
      opacity: 1,
    };
  }, []);

  useEffect(() => {
    if (isWorkActive) {
      setPosition(measureTab(workTabRef.current));
      return;
    }
    if (isAboutActive) {
      setPosition(measureTab(aboutTabRef.current));
      return;
    }
    setPosition(HIDDEN_CURSOR);
  }, [isAboutActive, isWorkActive, measureTab, pathname]);

  const handleMouseLeave = () => {
    if (isWorkActive) {
      setPosition(measureTab(workTabRef.current));
      return;
    }
    if (isAboutActive) {
      setPosition(measureTab(aboutTabRef.current));
      return;
    }
    setPosition(HIDDEN_CURSOR);
  };

  return (
    <div ref={containerRef} className="relative">
      {!reduceMotion && <SlidingCursor position={position} />}

      <ul
        className="relative flex items-center rounded-full border border-ink/15 p-0.5"
        onMouseLeave={handleMouseLeave}
      >
        <NavTab
          ref={workTabRef}
          href="/work"
          setPosition={setPosition}
          active={isWorkActive}
          reduceMotion={!!reduceMotion}
          tabIndex={tabIndex}
        >
          Work
        </NavTab>
        <NavTab
          ref={aboutTabRef}
          href="/about"
          setPosition={setPosition}
          active={isAboutActive}
          reduceMotion={!!reduceMotion}
          tabIndex={tabIndex}
        >
          About
        </NavTab>
        <NavTab
          href={INSTAGRAM_URL}
          external
          setPosition={setPosition}
          reduceMotion={!!reduceMotion}
          tabIndex={tabIndex}
        >
          Instagram
        </NavTab>
      </ul>
    </div>
  );
}

type NavTabProps = {
  children: React.ReactNode;
  href: string;
  setPosition: React.Dispatch<React.SetStateAction<CursorPosition>>;
  external?: boolean;
  active?: boolean;
  reduceMotion: boolean;
  tabIndex?: number;
};

const NavTab = forwardRef(function NavTab(
  {
    children,
    href,
    setPosition,
    external,
    active,
    reduceMotion,
    tabIndex,
  }: NavTabProps,
  ref: Ref<HTMLLIElement>,
) {
  const tabRef = useRef<HTMLLIElement>(null);

  useImperativeHandle(ref, () => tabRef.current as HTMLLIElement);

  const updatePosition = () => {
    const tab = tabRef.current;
    const container = tab?.parentElement?.parentElement;
    if (!tab || !container) return;

    const { width, left } = tab.getBoundingClientRect();
    const containerLeft = container.getBoundingClientRect().left;

    setPosition({
      width,
      left: left - containerLeft,
      opacity: 1,
    });
  };

  const linkClass = [
    "press relative z-10 block px-3 py-1.5 text-sm font-normal transition-colors md:px-4 md:py-2 md:text-base",
    active || reduceMotion
      ? "text-ink"
      : "text-ink/60 hover:text-ink",
    active && reduceMotion ? "rounded-full bg-yellow/30" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <li ref={tabRef} onMouseEnter={updatePosition} className="relative">
      {external ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
          data-cursor-hover
          tabIndex={tabIndex}
        >
          {children}
        </a>
      ) : (
        <Link
          href={href}
          className={linkClass}
          data-cursor-hover
          tabIndex={tabIndex}
          aria-current={active ? "page" : undefined}
        >
          {children}
        </Link>
      )}
    </li>
  );
});

function SlidingCursor({ position }: { position: CursorPosition }) {
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute inset-y-0.5 z-0 rounded-full bg-yellow"
      animate={{
        left: position.left,
        width: position.width,
        opacity: position.opacity,
      }}
      transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
    />
  );
}

export { NavHeader };
export default NavHeader;
