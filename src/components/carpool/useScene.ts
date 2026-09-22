"use client";

import { useCallback, useEffect, useRef, useState, type RefObject } from "react";

/** True once the element has entered the viewport. Uses IntersectionObserver only. */
export function useInView<T extends Element>(
  ref: RefObject<T | null>,
  rootMargin = "0px 0px -20% 0px",
) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      // No observer support: reveal on the next frame so nothing stays hidden.
      const frame = requestAnimationFrame(() => setInView(true));
      return () => cancelAnimationFrame(frame);
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold: 0.2 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [ref, rootMargin]);

  return inView;
}

const DESKTOP = "(min-width: 900px)";

/**
 * Scroll-driven stepper. Each step registers a sentinel; the one crossing the
 * active band of the viewport becomes current. Buttons scroll the sentinel into
 * the band so scroll position stays the single source of truth.
 */
export function useScrollSteps(count: number) {
  const [step, setStep] = useState(0);
  const sentinels = useRef<(HTMLElement | null)[]>([]);

  const register = useCallback(
    (index: number) => (node: HTMLElement | null) => {
      sentinels.current[index] = node;
    },
    [],
  );

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const nodes = sentinels.current.slice(0, count).filter(Boolean) as HTMLElement[];
    if (nodes.length === 0) return;

    let observer: IntersectionObserver | null = null;
    const media = window.matchMedia(DESKTOP);

    const connect = () => {
      observer?.disconnect();
      // Desktop: the band sits in the middle of the viewport, beside the sticky stage.
      // Mobile: the stage is pinned above, so the band lives in the lower part.
      const rootMargin = media.matches ? "-45% 0px -45% 0px" : "-58% 0px -12% 0px";
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            const index = nodes.indexOf(entry.target as HTMLElement);
            if (index >= 0) setStep(index);
          }
        },
        { rootMargin, threshold: 0 },
      );
      nodes.forEach((node) => observer?.observe(node));
    };

    connect();
    media.addEventListener("change", connect);
    return () => {
      media.removeEventListener("change", connect);
      observer?.disconnect();
    };
  }, [count]);

  const goTo = useCallback((index: number) => {
    const node = sentinels.current[index];
    setStep(index);
    if (!node) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const desktop = window.matchMedia(DESKTOP).matches;
    node.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      block: desktop ? "center" : "end",
    });
  }, []);

  return { step, goTo, register };
}
