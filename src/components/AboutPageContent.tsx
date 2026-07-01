import PublicShell from "@/components/PublicShell";
import Reveal from "@/components/Reveal";
import Section from "@/components/Section";
import {
  ABOUT_CLIENTS_LINE,
  BIO_LONG,
  CONTACT,
  SERVICE_PRIMARY,
  SERVICES_SECONDARY,
  SITE,
  TAGLINE,
} from "@/content/site";

export default function AboutPageContent() {
  const services = [
    { label: "Principal", value: SERVICE_PRIMARY.title },
    ...SERVICES_SECONDARY.map((service) => ({
      label: service.title,
      value: service.description,
    })),
  ];

  return (
    <PublicShell>
      <Section>
        <h1 className="sr-only">Sobre</h1>

        <div className="about-grid">
          <div>
            <Reveal>
              <p className="type-corpo measure text-primary">{BIO_LONG[0]}</p>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="measure space-y-6" style={{ marginTop: "var(--space-8)" }}>
                {BIO_LONG.slice(1).map((paragraph) => (
                  <p key={paragraph.slice(0, 40)} className="type-corpo text-primary">
                    {paragraph}
                  </p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.16}>
              <p
                className="type-corpo measure text-secondary"
                style={{ marginTop: "var(--space-16)" }}
              >
                {TAGLINE}
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <p className="type-nota text-secondary" style={{ marginTop: "var(--space-8)" }}>
                {ABOUT_CLIENTS_LINE}
              </p>
            </Reveal>
          </div>

          <aside className="about-grid__aside">
            <Reveal delay={0.12}>
              <div className="about-aside-block">
                <p className="about-aside-block__label type-nota text-secondary">
                  Serviços
                </p>
                <dl>
                  {services.map((item) => (
                    <div key={item.label} className="about-spec">
                      <dt className="type-nota text-secondary">{item.label}</dt>
                      <dd className="type-corpo text-primary">{item.value}</dd>
                    </div>
                  ))}
                </dl>
                <p
                  className="type-corpo text-secondary"
                  style={{ marginTop: "var(--space-6)" }}
                >
                  {SERVICE_PRIMARY.description}
                </p>
                <a
                  href={`mailto:${SITE.email}`}
                  className="text-link type-corpo"
                  style={{ display: "inline-block", marginTop: "var(--space-6)" }}
                  aria-label={`Enviar email para ${SITE.email}`}
                >
                  {CONTACT.ctaLabel}
                </a>
              </div>
            </Reveal>
          </aside>
        </div>
      </Section>
    </PublicShell>
  );
}
