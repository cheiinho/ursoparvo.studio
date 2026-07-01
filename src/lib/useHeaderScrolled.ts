"use client";

import { useEffect, useRef, useState } from "react";

const SCROLL_RANGE = 100;

export function useHeaderScrollProgress() {
  const ref = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const update = () => {
      const progress = reduced
        ? window.scrollY > 24
          ? 1
          : 0
        : Math.min(1, Math.max(0, window.scrollY / SCROLL_RANGE));

      el.style.setProperty("--header-p", progress.toFixed(4));
      setScrolled(progress > 0.85);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return { ref, scrolled };
}
