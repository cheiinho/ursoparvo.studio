import SectionReveal from "@/components/SectionReveal";
import { SERVICES } from "@/content/site";

export default function ServicesSection() {
  return (
    <section
      aria-label="Serviços"
      className="border-t border-border bg-background py-[var(--space-lg)] md:py-[var(--space-xl)]"
    >
      <div className="grid-editorial">
        <ul className="col-full grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
          {SERVICES.map((service, index) => (
            <SectionReveal as="li" key={service.title} delay={index * 0.06}>
              <h2 className="display text-h2 text-ink">{service.title}</h2>
              <p className="measure mt-4 text-body leading-[1.65] text-ink-muted md:text-lg">
                {service.description}
              </p>
            </SectionReveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
