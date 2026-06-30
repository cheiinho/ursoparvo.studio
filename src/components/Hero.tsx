"use client";

import Link from "next/link";
import { HERO, SITE } from "@/content/site";

type HeroProps = {
  galleryOverlap?: boolean;
  hasPublishedWork?: boolean;
};

export default function Hero({
  galleryOverlap = false,
  hasPublishedWork = false,
}: HeroProps) {
  return (
    <section
      id="hero"
      className={`relative z-10 flex w-full flex-col justify-center px-6 py-16 md:min-h-[68dvh] md:px-10 md:py-20 ${
        galleryOverlap ? "min-h-[56svh] pb-8 md:pb-12" : "min-h-[calc(100svh-3.5rem)]"
      }`}
    >
      <h1 className="hero-rise text-title max-w-[18ch] text-ink">{HERO.tagline}</h1>
      <p className="sr-only">
        {SITE.name}. {HERO.subtitle}
      </p>
      <p className="hero-rise hero-rise--2 text-body measure mt-6 max-w-xl text-ink/60 md:mt-8">
        {HERO.subtitle}
      </p>
      <div className="hero-rise hero-rise--3 mt-8 flex flex-col gap-3 sm:flex-row sm:items-center md:mt-10">
        {hasPublishedWork ? (
          <Link href={HERO.ctaWork.href} className="press btn">
            {HERO.ctaWork.label}
          </Link>
        ) : null}
        <a href={HERO.ctaContact.href} className="press btn">
          {HERO.ctaContact.label}
        </a>
        <Link href={HERO.ctaAbout.href} className="press btn btn-plain">
          {HERO.ctaAbout.label}
        </Link>
      </div>
    </section>
  );
}
