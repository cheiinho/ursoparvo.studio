"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import HomeGallery from "@/components/HomeGallery";
import { HOME_HERO, TAGLINE } from "@/content/site";

const Bear3DScene = dynamic(() => import("@/components/bear/Bear3DScene"), {
  ssr: false,
});

export default function HomeLanding() {
  const [bearReady, setBearReady] = useState(false);
  const galleryVelocityRef = useRef(0);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    let frame = 0;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const hx = ((e.clientX - r.left) / r.width) * 2 - 1;
      const hy = ((e.clientY - r.top) / r.height) * 2 - 1;
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

  const [wordLeft, wordRight] = HOME_HERO.wordmark;

  return (
    <div className="home-landing">
      <section ref={heroRef} className="home-hero">
        <h1 className="sr-only">{TAGLINE}</h1>

        <div className="home-hero__words" aria-hidden="true">
          <p className="home-hero__word home-hero__word--left">{wordLeft}</p>
          <p className="home-hero__word home-hero__word--right">{wordRight}</p>
        </div>

        <div className={`home-hero__stage${bearReady ? " is-ready" : ""}`}>
          <Bear3DScene
            className="home-hero__bear"
            onReady={() => setBearReady(true)}
            carouselVelocityRef={galleryVelocityRef}
          />
        </div>

        <div className="home-hero__foot">
          <p className="type-corpo text-secondary home-hero__subline">
            {HOME_HERO.subtitle}
          </p>
          <span className="home-hero__scroll-line" aria-hidden="true" />
        </div>
      </section>

      <section aria-label="Os ursos" className="home-gallery-section">
        <HomeGallery
          onScrollVelocity={(velocity) => {
            galleryVelocityRef.current = velocity;
          }}
        />
      </section>
    </div>
  );
}
