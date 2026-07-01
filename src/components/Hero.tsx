"use client";

import Link from "next/link";
import Button from "@/components/Button";
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
      <h1 className="type-display measure">{HERO.tagline}</h1>
      <p className="sr-only">
        {SITE.name}. {HERO.signature}
      </p>
      <p className="type-corpo measure text-secondary" style={{ marginTop: "var(--space-6)" }}>
        {HERO.signature}
      </p>
      <div
        className="flex flex-col items-start gap-3 sm:flex-row sm:items-center"
        style={{ marginTop: "var(--space-8)" }}
      >
        {hasPublishedWork ? (
          <Button href={HERO.ctaWork.href}>{HERO.ctaWork.label}</Button>
        ) : null}
        <Button href={HERO.ctaContact.href}>{HERO.ctaContact.label}</Button>
        <Button href="/about" variant="secondary">
          Sobre
        </Button>
      </div>
    </section>
  );
}
