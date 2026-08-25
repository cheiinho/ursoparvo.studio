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
        <div className="studio-essay">
          {dict.studio.essay.map((paragraph) => (
            <p key={paragraph} className="type-corpo measure">
              {paragraph}
            </p>
          ))}
          <ul className="studio-questions measure">
            {dict.studio.questions.map((question) => (
              <li key={question} className="type-corpo">
                {question}
              </li>
            ))}
          </ul>
          {dict.studio.closing.map((paragraph) => (
            <p key={paragraph} className="type-corpo measure">
              {paragraph}
            </p>
          ))}
          <p className="studio-note type-nota text-secondary measure">
            {dict.studio.note}
          </p>
        </div>
      </section>

      <section
        className="site-container site-container--wide studio-section rise"
        style={{ "--stagger": 1 } as React.CSSProperties}
        aria-labelledby="contacto-h"
      >
        <h2 id="contacto-h" className="studio-section__title">
          {dict.studio.invite.title}
        </h2>
        <div className="studio-section__body">
          <MotionLink
            href={PROJECT_PATH[lang]}
            className="form-submit"
            {...press}
          >
            {dict.studio.invite.cta}
          </MotionLink>
        </div>
      </section>
    </>
  );
}
