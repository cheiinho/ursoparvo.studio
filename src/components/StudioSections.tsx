import ContactForm from "@/components/ContactForm";
import type { Dict } from "@/content/dict/types";
import { SITE } from "@/content/site";

type StudioSectionsProps = {
  dict: Dict;
};

export default function StudioSections({ dict }: StudioSectionsProps) {
  return (
    <>
      <section
        className="site-container hero-block rise"
        style={{ "--stagger": 0 } as React.CSSProperties}
        aria-labelledby="estudio-h"
      >
        <h1 id="estudio-h" className="type-display">
          {dict.studio.tagline}
        </h1>
        <p className="type-corpo text-secondary measure">{dict.studio.intro}</p>
      </section>

      <section
        className="site-container section-block rise"
        style={{ "--stagger": 1 } as React.CSSProperties}
        aria-labelledby="processo-h"
      >
        <h2 id="processo-h" className="type-corpo section-block__title">
          {dict.process.title}
        </h2>
        <ol className="process-list type-corpo">
          {dict.process.steps.map((step) => (
            <li key={step.title}>
              <div>
                <h3 className="type-corpo">{step.title}</h3>
                <p className="type-corpo">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section
        className="site-container section-block rise"
        style={{ "--stagger": 2 } as React.CSSProperties}
        aria-labelledby="checklist-h"
      >
        <h2 id="checklist-h" className="type-corpo section-block__title">
          {dict.checklist.title}
        </h2>
        <p className="type-corpo measure">{dict.checklist.intro}</p>
        <ul className="check-list type-corpo">
          {dict.checklist.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section
        className="site-container section-block rise"
        style={{ "--stagger": 3 } as React.CSSProperties}
        aria-labelledby="contacto-h"
      >
        <h2 id="contacto-h" className="type-corpo section-block__title">
          {dict.contact.title}
        </h2>
        <p className="type-corpo measure">{dict.contact.intro}</p>
        <ContactForm dict={dict.contact} email={SITE.email} />
        <p className="type-nota text-secondary">
          {dict.contact.directPrefix}{" "}
          <a href={`mailto:${SITE.email}`} className="text-link">
            {SITE.email}
          </a>
        </p>
      </section>
    </>
  );
}
