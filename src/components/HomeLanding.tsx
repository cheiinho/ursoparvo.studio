"use client";

import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import Button from "@/components/Button";
import HomeGallery from "@/components/HomeGallery";
import Reveal from "@/components/Reveal";
import {
  HOME_ABOUT,
  HOME_CONTACT,
  HOME_HERO,
  HOME_PROCESS,
  HOME_SERVICES,
} from "@/content/site";

const Bear3DScene = dynamic(() => import("@/components/bear/Bear3DScene"), {
  ssr: false,
});

export default function HomeLanding() {
  const [bearReady, setBearReady] = useState(false);
  const galleryVelocityRef = useRef(0);

  const primary = HOME_SERVICES.items.find((s) => s.primary);
  const secondary = HOME_SERVICES.items.filter((s) => !s.primary);

  return (
    <div className="home-landing">
      {/* Hero */}
      <div className="home-landing__hero site-container">
        <div className="home-landing__hero-text">
          <Reveal>
            <h1 className="type-display home-landing__title">{HOME_HERO.title}</h1>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="type-corpo text-secondary home-landing__subtitle">
              {HOME_HERO.subtitle}
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="hero__actions">
              <Button href="/work" variant="primary">
                {HOME_HERO.ctaPrimary}
              </Button>
              <Button href="/contacto" variant="secondary">
                {HOME_HERO.ctaSecondary}
              </Button>
            </div>
          </Reveal>
        </div>
        <div className={`home-landing__stage${bearReady ? " is-ready" : ""}`}>
          <Bear3DScene
            className="home-landing__bear"
            onReady={() => setBearReady(true)}
            carouselVelocityRef={galleryVelocityRef}
          />
        </div>
      </div>

      {/* Galeria dos ursos */}
      <section aria-label="Os ursos" className="home-section home-section--gallery">
        <HomeGallery
          onScrollVelocity={(velocity) => {
            galleryVelocityRef.current = velocity;
          }}
        />
      </section>

      {/* O estúdio */}
      <section id="o-estudio" className="home-section site-container">
        <Reveal>
          <p className="type-nota text-secondary home-section__label">{HOME_ABOUT.label}</p>
        </Reveal>
        <Reveal delay={0.05}>
          <div className="type-corpo measure text-primary stack">
            {HOME_ABOUT.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <Button href="/about" variant="tertiary">
            {HOME_ABOUT.cta}
          </Button>
        </Reveal>
      </section>

      {/* Serviços */}
      <section id="servicos" className="home-section site-container">
        <Reveal>
          <p className="type-nota text-secondary home-section__label">{HOME_SERVICES.label}</p>
        </Reveal>
        <div className="services">
          {primary ? (
            <Reveal>
              <div className="service--primary">
                <h2 className="type-title service-card__title">{primary.title}</h2>
                <p className="type-corpo text-secondary service-card__body">{primary.body}</p>
              </div>
            </Reveal>
          ) : null}
          <div className="services__secondary">
            {secondary.map((service, i) => (
              <Reveal key={service.key} delay={0.08 + i * 0.08}>
                <div className="service-card">
                  <h2 className="type-corpo service-card__title">{service.title}</h2>
                  <p className="type-corpo text-secondary service-card__body">{service.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Como trabalhamos */}
      <section id="processo" className="home-section site-container">
        <Reveal>
          <p className="type-nota text-secondary home-section__label">{HOME_PROCESS.label}</p>
        </Reveal>
        <Reveal delay={0.05}>
          <div className="type-corpo measure text-primary stack">
            {HOME_PROCESS.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Tem um projecto? */}
      <section id="contacto" className="home-section home-section--final site-container">
        <Reveal>
          <p className="type-nota text-secondary home-section__label">{HOME_CONTACT.label}</p>
        </Reveal>
        <Reveal delay={0.05}>
          <div className="stack">
            <p className="type-corpo measure text-primary">{HOME_CONTACT.body}</p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <Button href="/contacto" variant="primary">
            {HOME_CONTACT.cta}
          </Button>
        </Reveal>
      </section>
    </div>
  );
}
