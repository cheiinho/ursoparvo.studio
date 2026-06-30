import {
  POSITIONING_BODY,
  SERVICE_PRIMARY,
  SERVICES_SECONDARY,
} from "@/content/site";

export default function ManifestoSection() {
  return (
    <section aria-label="Posicionamento e serviços" className="bg-yellow py-[var(--space-lg)] md:py-[var(--space-xl)]">
      <div className="grid-editorial">
        <div className="col-narrow space-y-10">
          <div className="text-body measure space-y-6 text-ink">
            {POSITIONING_BODY.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </div>

          <div className="measure space-y-6">
            <div>
              <h2 className="text-title text-ink">{SERVICE_PRIMARY.title}</h2>
              <p className="text-body mt-4 text-ink">{SERVICE_PRIMARY.description}</p>
            </div>
            {SERVICES_SECONDARY.map((service) => (
              <p key={service.title} className="text-body text-ink">
                <span className="text-ink">{service.title}.</span>{" "}
                {service.description}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
