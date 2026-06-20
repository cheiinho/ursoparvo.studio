"use client";

import dynamic from "next/dynamic";
import Image from "next/image";

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
};

const heroWordClass =
  "font-display text-[clamp(4.15rem,16.5vw,24rem)] font-normal leading-[0.95] tracking-[-0.03em] text-ink md:text-[clamp(7.25rem,20vw,24rem)] md:leading-[0.9] md:whitespace-nowrap";

const heroFlankClass =
  "absolute top-[44%] hidden w-[44%] -translate-y-[calc(50%-0.6rem)] md:block md:w-[45%] md:top-[46%] md:-translate-y-[calc(50%-1.25vh)]";

export default function Hero({ onReady }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative h-[72dvh] min-h-[520px] w-full overflow-x-hidden pt-[5vh]"
    >
      <h1 className="sr-only">
        UrsoParvo — independent design studio. Brand identity, art direction and
        digital experience.
      </h1>
      <div
        className="pointer-events-none absolute inset-0 z-0 select-none overflow-visible"
        aria-hidden="true"
      >
        <div className="absolute inset-0 flex flex-col items-center justify-between pt-[6vh] pb-[20vh] text-center md:hidden">
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
        <Bear3DScene onReady={onReady} />
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-6 z-30 flex flex-col items-center gap-5 px-6 text-center">
        <p className="max-w-[34ch] font-display text-[clamp(1.05rem,2.6vw,1.6rem)] leading-snug text-ink/55">
          Brands built to outlast trends.
        </p>
        <p className="tech normal-case !text-[0.6875rem] text-ink/40">
          Solo practice · Coimbra · 2026
        </p>
        <span
          className="hero-scroll-line h-8 w-px bg-ink/25"
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
