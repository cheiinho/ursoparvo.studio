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
          if (delay > 0) el.style.transitionDelay = `${delay}s`;
          el.classList.add("reveal-visible");
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
      ref={ref as React.Ref<never>}
      className={`reveal-root ${className}`}
    >
      {children}
    </Tag>
  );
}
