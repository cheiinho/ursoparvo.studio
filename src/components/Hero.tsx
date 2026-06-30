"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, type RefObject } from "react";
import { HERO, SITE } from "@/content/site";

const Bear3DScene = dynamic(() => import("@/components/bear/Bear3DScene"), {
  ssr: false,
  loading: () => (
    <div
      className="flex h-full w-full items-center justify-center"
      aria-hidden
    >
      <Image
        src="/assets/bear-yellow.png"
        alt=""
        width={160}
        height={160}
        className="h-32 w-32 animate-pulse opacity-50 md:h-[120px] md:w-[120px]"
      />
    </div>
  ),
});

type HeroProps = {
  onReady?: () => void;
  carouselVelocityRef?: RefObject<number>;
  galleryOverlap?: boolean;
};

const heroWordClass =
  "display text-[clamp(7.5rem,21vw,26rem)] leading-[0.88] tracking-[-0.04em] text-ink whitespace-nowrap";

const heroFlankClass =
  "absolute top-[46%] w-[45%] -translate-y-[calc(50%-1.25vh)]";

export default function Hero({
  onReady,
  carouselVelocityRef,
  galleryOverlap = false,
}: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!fine || reduced) return;

    let frame = 0;
    let hx = 0;
    let hy = 0;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      hx = ((e.clientX - r.left) / r.width) * 2 - 1;
      hy = ((e.clientY - r.top) / r.height) * 2 - 1;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        el.style.setProperty("--hx", `${(hx * 18).toFixed(2)}px`);
        el.style.setProperty("--hy", `${(hy * 10).toFixed(2)}px`);
      });
    };
    el.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      el.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className={`relative z-10 grid h-[calc(100svh-3.5rem)] w-full grid-rows-[1fr_auto] px-4 pt-0 md:block md:h-[72dvh] md:min-h-[520px] md:overflow-hidden md:px-0 md:pt-[5vh] ${
        galleryOverlap ? "pb-20 md:pb-0" : "pb-4 md:pb-0"
      }`}
    >
      <h1 className="sr-only">
        {SITE.name}. {HERO.tagline} {HERO.subtitle}
      </h1>

      <div
        className="hero-parallax-words pointer-events-none absolute inset-0 z-0 hidden select-none overflow-visible md:block"
        aria-hidden="true"
      >
        <p
          className={`${heroFlankClass} left-[5%] pr-[4%] text-right ${heroWordClass}`}
        >
          hello
        </p>
        <p
          className={`${heroFlankClass} right-[5%] pl-[4%] text-left ${heroWordClass}`}
        >
          there
        </p>
      </div>

      <div className="hero-bear-stage relative z-10 min-h-0 w-full pt-14 md:absolute md:inset-0 md:pt-0">
        <Bear3DScene onReady={onReady} carouselVelocityRef={carouselVelocityRef} />
      </div>

      <div
        className={`relative z-30 shrink-0 px-6 pt-3 pb-2 text-center md:absolute md:inset-x-0 md:max-w-none md:px-6 md:pt-0 md:pb-0 ${
          galleryOverlap
            ? "md:bottom-[calc(16vh+3.5rem)]"
            : "md:bottom-6"
        }`}
      >
        <p className="display mx-auto max-w-[28ch] text-[clamp(1rem,2.8vw,1.75rem)] leading-snug tracking-[-0.02em] text-ink md:max-w-[32ch]">
          {HERO.tagline}
        </p>
        <p className="mx-auto mt-3 max-w-[38ch] text-[0.9rem] leading-snug text-ink/55 md:max-w-[44ch] md:text-base">
          {HERO.subtitle}
        </p>
        <div className="pointer-events-auto mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row md:mt-6">
          <Link
            href={HERO.ctaPrimary.href}
            className="press inline-flex min-h-10 items-center justify-center rounded-full bg-primary px-5 py-2 text-sm text-primary-foreground md:px-6 md:text-base"
            data-cursor-hover
          >
            {HERO.ctaPrimary.label}
          </Link>
          <a
            href={HERO.ctaSecondary.href}
            className="press inline-flex min-h-10 items-center justify-center px-2 py-2 text-sm text-ink/70 transition-colors hover:text-ink md:text-base"
            data-cursor-hover
          >
            {HERO.ctaSecondary.label}
          </a>
        </div>
      </div>
    </section>
  );
}
