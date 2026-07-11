import ContactForm from "@/components/ContactForm";
import RevealTitle from "@/components/RevealTitle";
import type { Dict } from "@/content/dict/types";
import { SITE } from "@/content/site";

type StudioSectionsProps = {
  dict: Dict;
};

export default function StudioSections({ dict }: StudioSectionsProps) {
  return (
    <>
      <section
        className="site-container site-container--wide studio-open rise"
        style={{ "--stagger": 0 } as React.CSSProperties}
        aria-labelledby="estudio-h"
      >
        <RevealTitle
          id="estudio-h"
          text={dict.studio.title}
          className="type-display"
        />
      </section>

      <section
        className="site-container site-container--wide studio-section rise"
        style={{ "--stagger": 1 } as React.CSSProperties}
        aria-labelledby="sobre-h"
      >
        <h2 id="sobre-h" className="studio-section__title">
          {dict.studio.about.title}
        </h2>
        <div className="studio-section__body">
          {dict.studio.about.paragraphs.map((paragraph) => (
            <p key={paragraph} className="type-corpo measure">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <section
        className="site-container site-container--wide studio-section rise"
        style={{ "--stagger": 2 } as React.CSSProperties}
        aria-labelledby="processo-h"
      >
        <h2 id="processo-h" className="studio-section__title">
          {dict.process.title}
        </h2>
        <div className="studio-section__body">
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
        </div>
      </section>

      <section
        className="site-container site-container--wide studio-section rise"
        style={{ "--stagger": 3 } as React.CSSProperties}
        aria-labelledby="checklist-h"
      >
        <h2 id="checklist-h" className="studio-section__title">
          {dict.checklist.title}
        </h2>
        <div className="studio-section__body">
          <p className="type-corpo measure">{dict.checklist.intro}</p>
          <ul className="check-list type-corpo">
            {dict.checklist.items.map((item) => (
              <li key={item.title}>
                <h3 className="type-corpo">{item.title}</h3>
                <p className="type-corpo">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        className="site-container site-container--wide studio-section rise"
        style={{ "--stagger": 4 } as React.CSSProperties}
        aria-labelledby="contacto-h"
      >
        <h2 id="contacto-h" className="studio-section__title">
          {dict.contact.title}
        </h2>
        <div className="studio-section__body">
          <p className="type-corpo measure">{dict.contact.intro}</p>
          <p className="type-nota text-secondary measure">
            {dict.contact.minDeliveryNote}
          </p>
          <ContactForm dict={dict.contact} email={SITE.email} />
        </div>
      </section>
    </>
  );
}
