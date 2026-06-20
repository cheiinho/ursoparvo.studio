"use client";

import { useEffect, useRef, type ReactNode } from "react";

type RevealVariant = "rise" | "mask" | "stagger";

type SectionRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** rise = fade up (default) · mask = clip wipe · stagger = children in sequence */
  variant?: RevealVariant;
  as?:
    | "div"
    | "section"
    | "li"
    | "article"
    | "ul"
    | "ol"
    | "h2"
    | "p"
    | "span"
    | "header"
    | "footer";
};

export default function SectionReveal({
  children,
  className = "",
  delay = 0,
  variant = "rise",
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
          const clear = () => {
            el.style.transitionDelay = "";
          };
          el.addEventListener("transitionend", clear, { once: true });
          observer.disconnect();
        }
      },
      { threshold: 0, rootMargin: "-80px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  const variantClass = variant === "rise" ? "" : ` reveal-${variant}`;

  return (
    <Tag
      ref={(el: HTMLElement | null) => {
        if (ref) ref.current = el;
      }}
      className={`reveal-root${variantClass} ${className}`}
    >
      {children}
    </Tag>
  );
}
