import SectionReveal from "@/components/SectionReveal";
import {
  SERVICE_PRIMARY,
  SERVICES_SECONDARY,
} from "@/content/site";

export default function ServicesSection() {
  return (
    <section
      aria-label="Serviços"
      className="bg-background py-[var(--space-lg)] md:py-[var(--space-xl)]"
    >
      <div className="grid-editorial">
        <SectionReveal className="col-wide">
          <h2 className="text-title text-ink">{SERVICE_PRIMARY.title}</h2>
          <p className="text-body measure mt-5 max-w-2xl text-ink">
            {SERVICE_PRIMARY.description}
          </p>
        </SectionReveal>

        <ul className="col-full mt-12 grid grid-cols-1 gap-8 md:mt-16 md:grid-cols-2 md:gap-10">
          {SERVICES_SECONDARY.map((service, index) => (
            <SectionReveal as="li" key={service.title} delay={index * 0.06}>
              <h3 className="text-title text-ink">{service.title}</h3>
              <p className="text-body measure mt-3 text-ink-muted">
                {service.description}
              </p>
            </SectionReveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
