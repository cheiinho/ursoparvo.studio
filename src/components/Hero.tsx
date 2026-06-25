"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef, type RefObject } from "react";

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
        width={120}
        height={120}
        className="animate-pulse opacity-50"
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
      className={`relative z-10 flex min-h-[min(68dvh,560px)] w-full flex-col items-center overflow-hidden px-6 pt-[4.5rem] md:block md:h-[72dvh] md:min-h-[520px] md:px-0 md:pt-[5vh] md:pb-0 ${
        galleryOverlap ? "pb-28" : "pb-24"
      }`}
    >
      <h1 className="sr-only">
        UrsoParvo — independent design studio. Brand identity, art direction and
        digital experience.
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

      <div className="relative z-10 flex h-[min(42dvh,320px)] w-full max-w-[min(78vw,280px)] flex-1 items-center justify-center md:absolute md:inset-0 md:h-full md:max-w-none">
        <Bear3DScene onReady={onReady} carouselVelocityRef={carouselVelocityRef} />
      </div>

      <div
        className={`pointer-events-none relative z-30 flex w-full max-w-[22ch] flex-col items-center gap-3 text-center md:absolute md:inset-x-0 md:max-w-none md:gap-4 md:px-6 ${
          galleryOverlap
            ? "md:bottom-[calc(16vh+3.5rem)]"
            : "md:bottom-6"
        }`}
      >
        <p className="text-[1.05rem] leading-snug tracking-[-0.02em] text-ink/55 md:max-w-[36ch] md:text-[clamp(1.1rem,2.8vw,1.75rem)]">
          Brands built to outlast trends.
        </p>
        <span
          className="hero-scroll-line hidden h-8 w-px bg-ink/25 md:block"
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
