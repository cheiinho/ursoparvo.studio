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
        aria-labelledby="metodo-h"
      >
        <h2 id="metodo-h" className="studio-section__title">
          {dict.studio.method.title}
        </h2>
        <div className="studio-section__body">
          <ol className="process-list type-corpo">
            {dict.studio.method.steps.map((step) => (
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
        aria-labelledby="colaboracao-h"
      >
        <h2 id="colaboracao-h" className="studio-section__title">
          {dict.studio.engagement.title}
        </h2>
        <div className="studio-section__body">
          <p className="type-corpo measure">{dict.studio.engagement.intro}</p>
          <ol className="process-list process-list--quiet type-corpo">
            {dict.studio.engagement.steps.map((step) => (
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
        style={{ "--stagger": 4 } as React.CSSProperties}
        aria-labelledby="contacto-h"
      >
        <h2 id="contacto-h" className="studio-section__title">
          {dict.studio.invite.title}
        </h2>
        <div className="studio-section__body">
          <p className="type-corpo measure">{dict.studio.invite.body}</p>
          <p className="type-nota text-secondary measure">{dict.studio.invite.note}</p>
          <MotionLink
            href={PROJECT_PATH[lang]}
            className="form-submit"
            {...press}
          >
            {dict.studio.invite.cta}
          </MotionLink>
          <p className="type-corpo measure">{dict.studio.invite.after}</p>
          <p className="type-nota text-secondary measure">{dict.studio.invite.emailNote}</p>
        </div>
      </section>
    </>
  );
}
