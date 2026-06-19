"use client";

import { useEffect, useRef, type ReactNode } from "react";

type SectionRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "li" | "article";
};

export default function SectionReveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
}: SectionRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transitionDelay = delay > 0 ? `${delay}s` : "";
          el.classList.add("reveal-visible");
          // Clear delay after transition fires so stale inline style doesn't leak
          const clear = () => { el.style.transitionDelay = ""; };
          el.addEventListener("transitionend", clear, { once: true });
          observer.disconnect();
        }
      },
      { threshold: 0, rootMargin: "-80px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <Tag
      ref={(el: HTMLElement | null) => {
        if (ref) ref.current = el;
      }}
      className={`reveal-root ${className}`}
    >
      {children}
    </Tag>
  );
}
