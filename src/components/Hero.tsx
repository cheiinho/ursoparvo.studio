import Link from "next/link";
import { HERO, SITE } from "@/content/site";

type HeroProps = {
  galleryOverlap?: boolean;
};

export default function Hero({ galleryOverlap = false }: HeroProps) {
  return (
    <section
      id="hero"
      className={`relative z-10 flex w-full flex-col justify-center px-6 py-16 md:min-h-[72dvh] md:px-10 md:py-24 ${
        galleryOverlap ? "min-h-[60svh] pb-8 md:pb-12" : "min-h-[calc(100svh-3.5rem)]"
      }`}
    >
      <h1 className="display max-w-[14ch] text-hero leading-[0.92] text-ink">
        {HERO.tagline}
      </h1>
      <p className="sr-only">
        {SITE.name}. {HERO.subtitle}
      </p>
      <p className="measure mt-6 max-w-xl text-body leading-[1.65] text-ink/60 md:mt-8 md:text-lg">
        {HERO.subtitle}
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center md:mt-10">
        <Link
          href={HERO.ctaPrimary.href}
          className="press inline-flex min-h-10 items-center justify-center rounded-full bg-primary px-5 py-2 text-sm text-primary-foreground md:px-6 md:text-base"
        >
          {HERO.ctaPrimary.label}
        </Link>
        <a
          href={HERO.ctaSecondary.href}
          className="press inline-flex min-h-10 items-center justify-center px-2 py-2 text-sm text-ink/70 transition-colors hover:text-ink md:text-base"
        >
          {HERO.ctaSecondary.label}
        </a>
      </div>
    </section>
  );
}
