"use client";

import { useEffect, useRef } from "react";

/**
 * Scroll-scrub progress for an element, written to a CSS custom property
 * (`--p`, 0→1) on the element itself. Driving motion from a CSS variable keeps
 * it off the React render path, with no re-renders per scroll frame.
 *
 * `--p` is 0 as the element enters from the bottom of the viewport and 1 as it
 * leaves the top. Bind CSS to it, e.g. `transform: translateY(calc(var(--p) * -40px))`.
 *
 * Honors `prefers-reduced-motion`: leaves `--p` at its resting value (0.5).
 */
export function useScrollProgress<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) {
      el.style.setProperty("--p", "0.5");
      return;
    }

    let frame = 0;
    const update = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const total = r.height + vh;
      const passed = vh - r.top;
      const p = Math.min(1, Math.max(0, passed / total));
      el.style.setProperty("--p", p.toFixed(4));
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return ref;
}
