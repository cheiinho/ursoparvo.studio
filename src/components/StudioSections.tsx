import RevealTitle from "@/components/RevealTitle";
import { MotionLink, press } from "@/components/ui-motion";
import type { Dict } from "@/content/dict/types";
import { PROJECT_PATH, type Lang } from "@/lib/i18n";

type StudioSectionsProps = {
  dict: Dict;
  lang: Lang;
};

export default function StudioSections({ dict, lang }: StudioSectionsProps) {
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
          <MotionLink
            href={PROJECT_PATH[lang]}
            className="form-submit"
            {...press}
          >
            {dict.contact.flowCta}
          </MotionLink>
          <p className="type-nota text-secondary measure">{dict.contact.flowNote}</p>
        </div>
      </section>
    </>
  );
}
