import SectionReveal from "@/components/SectionReveal";
import {
  SERVICE_PRIMARY,
  SERVICES_SECONDARY,
} from "@/content/site";

export default function ServicesSection() {
  return (
    <section
      aria-label="Serviços"
      className="border-t border-border bg-background py-[var(--space-lg)] md:py-[var(--space-xl)]"
    >
      <div className="studio-ruler" aria-hidden />
      <div className="grid-editorial pt-[var(--space-lg)] md:pt-[var(--space-xl)]">
        <SectionReveal className="col-wide">
          <h2 className="display text-h1 text-ink">{SERVICE_PRIMARY.title}</h2>
          <p className="measure mt-5 max-w-2xl text-body leading-[1.65] text-ink md:text-lg">
            {SERVICE_PRIMARY.description}
          </p>
        </SectionReveal>

        <ul className="col-full mt-12 grid grid-cols-1 gap-8 border-t border-border pt-10 md:mt-16 md:grid-cols-2 md:gap-10 md:pt-12">
          {SERVICES_SECONDARY.map((service, index) => (
            <SectionReveal as="li" key={service.title} delay={index * 0.06}>
              <h3 className="display text-h2 text-ink/90">{service.title}</h3>
              <p className="measure mt-3 text-body leading-[1.65] text-ink-muted">
                {service.description}
              </p>
            </SectionReveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
