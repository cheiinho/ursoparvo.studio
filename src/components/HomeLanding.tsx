"use client";

import Bear3DScene from "@/components/bear/Bear3DScene";
import Button from "@/components/Button";
import Reveal from "@/components/Reveal";
import {
  HOME_ABOUT,
  HOME_CONTACT,
  HOME_HERO,
  HOME_PROCESS,
  HOME_SERVICES,
} from "@/content/site";

export default function HomeLanding() {
  return (
    <div className="home-landing">
      {/* Hero */}
      <div className="home-landing__hero site-container">
        <div className="home-landing__hero-text">
          <Reveal>
            <h1 className="type-display home-landing__title">{HOME_HERO.title}</h1>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="type-corpo text-secondary" style={{ margin: 0 }}>
              {HOME_HERO.subtitle}
            </p>
          </Reveal>
          <Reveal delay={0.12}>
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
        <div className="home-landing__stage">
          <Bear3DScene className="home-landing__bear" />
        </div>
      </div>

      {/* O estúdio */}
      <section id="o-estudio" className="home-section site-container">
        <Reveal>
          <p className="type-nota text-secondary home-section__label">{HOME_ABOUT.label}</p>
        </Reveal>
        <Reveal delay={0.05}>
          <div
            className="type-corpo measure text-primary"
            style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}
          >
            {HOME_ABOUT.body.map((p, i) => (
              <p key={i} style={{ margin: 0 }}>
                {p}
              </p>
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
        <div className="services-grid">
          {HOME_SERVICES.items.map((service, i) => (
            <Reveal key={service.key} delay={i * 0.08}>
              <div
                className={`service-card${service.primary ? " service-card--primary" : ""}`}
              >
                <h2 className="type-corpo service-card__title">{service.title}</h2>
                <p className="type-corpo text-secondary service-card__body">{service.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Como trabalhamos */}
      <section id="processo" className="home-section site-container">
        <Reveal>
          <p className="type-nota text-secondary home-section__label">{HOME_PROCESS.label}</p>
        </Reveal>
        <Reveal delay={0.05}>
          <div
            className="type-corpo measure text-primary"
            style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}
          >
            {HOME_PROCESS.body.map((p, i) => (
              <p key={i} style={{ margin: 0 }}>
                {p}
              </p>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Tem um projecto? */}
      <section id="contacto" className="home-section site-container" style={{ paddingBottom: "var(--space-16)" }}>
        <Reveal>
          <p className="type-nota text-secondary home-section__label">{HOME_CONTACT.label}</p>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="type-corpo measure text-primary" style={{ margin: 0 }}>
            {HOME_CONTACT.body}
          </p>
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
