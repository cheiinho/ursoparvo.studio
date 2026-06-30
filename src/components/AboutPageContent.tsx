import PublicShell from "@/components/PublicShell";
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
      <div className="site-container">
        <h1 className="sr-only">Sobre</h1>
        <div className="page-top-spacer" style={{ paddingBottom: 24 }} />

        <div className="about-layout">
          <div className="about-layout__main">
            <p className="about-lede">{BIO_LONG[0]}</p>
            <div className="mt-10 space-y-6">
              {BIO_LONG.slice(1).map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className="text-body">
                  {paragraph}
                </p>
              ))}
            </div>
            <aside className="about-processo">
              <p className="about-processo__text">{TAGLINE}</p>
            </aside>
            <p className="text-nav mt-12 opacity-40">{ABOUT_CLIENTS_LINE}</p>
          </div>

          <aside className="about-layout__aside">
            <div className="about-aside">
              <p className="about-aside__heading">Serviços</p>
              <dl className="about-aside__specs">
                {services.map((item) => (
                  <div key={item.label} className="about-aside__spec">
                    <dt className="about-aside__label">{item.label}</dt>
                    <dd className="about-aside__value">{item.value}</dd>
                  </div>
                ))}
              </dl>
              <p className="about-aside__note">{SERVICE_PRIMARY.description}</p>
              <a
                href={`mailto:${SITE.email}`}
                className="about-aside__cta"
                aria-label={`Enviar email — ${SITE.email}`}
              >
                {CONTACT.ctaLabel}
              </a>
            </div>
          </aside>
        </div>
      </div>
    </PublicShell>
  );
}
