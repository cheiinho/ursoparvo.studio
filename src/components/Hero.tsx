"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useState, type RefObject } from "react";

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
};

const heroWordClass =
  "font-display text-[clamp(4.15rem,16.5vw,24rem)] font-normal leading-[0.95] tracking-[-0.03em] text-yellow md:text-[clamp(7.25rem,20vw,24rem)] md:leading-[0.9] md:whitespace-nowrap";

const heroFlankClass =
  "absolute top-[44%] hidden w-[44%] -translate-y-[calc(50%-0.6rem)] md:block md:w-[45%] md:top-[46%] md:-translate-y-[calc(50%-1.25vh)]";

export default function Hero({ onReady, carouselVelocityRef }: HeroProps) {
  const [waveTick, setWaveTick] = useState(0);

  return (
    <section
      id="hero"
      className="relative h-[72dvh] min-h-[520px] w-full overflow-x-hidden pt-[5vh]"
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 select-none overflow-visible"
        aria-hidden="true"
      >
        <div className="absolute inset-0 flex flex-col items-center justify-between py-[6vh] text-center md:hidden">
          <p className={heroWordClass}>hello</p>
          <p className={heroWordClass}>there</p>
        </div>
        <p
          className={`${heroFlankClass} left-[4%] pr-[3%] text-right md:left-[5%] md:pr-[4%] ${heroWordClass}`}
        >
          hello
        </p>
        <p
          className={`${heroFlankClass} right-[4%] pl-[3%] text-left md:right-[5%] md:pl-[4%] ${heroWordClass}`}
        >
          there
        </p>
      </div>
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <Bear3DScene
          waveTick={waveTick}
          onReady={onReady}
          carouselVelocityRef={carouselVelocityRef}
        />
      </div>
      <div className="absolute inset-x-0 bottom-[14%] z-30 flex justify-center">
        <button
          type="button"
          onClick={() => setWaveTick((n) => n + 1)}
          className="press rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs tracking-[0.12em] uppercase backdrop-blur-sm transition-colors duration-200 hover:border-white hover:bg-white hover:text-ink"
        >
          Wave
        </button>
      </div>
      <div
        className="pointer-events-none absolute inset-x-0 bottom-5 z-30 hidden flex-col items-center gap-2 text-ink/45 md:flex"
        aria-hidden="true"
      >
        <span className="tech text-[0.625rem] tracking-[0.2em]">SCROLL</span>
        <span className="hero-scroll-line h-8 w-px bg-ink/30" />
      </div>
    </section>
  );
}
