import ContactForm from "@/components/ContactForm";
import PublicShell from "@/components/PublicShell";
import { CHECKLIST, CONTACT, PROCESS } from "@/content/home";
import { SITE, TAGLINE } from "@/content/site";

export default function HomePage() {
  return (
    <PublicShell>
      <section
        className="site-container hero-block rise"
        style={{ "--stagger": 0 } as React.CSSProperties}
        aria-labelledby="hero-h"
      >
        <h1 id="hero-h" className="type-display">
          {SITE.nameShort}
        </h1>
        <p className="type-corpo text-secondary measure">{TAGLINE}</p>
      </section>

      <section
        className="site-container section-block rise"
        style={{ "--stagger": 1 } as React.CSSProperties}
        aria-labelledby="processo-h"
      >
        <h2 id="processo-h" className="type-corpo section-block__title">
          {PROCESS.title}
        </h2>
        <ol className="process-list type-corpo">
          {PROCESS.steps.map((step) => (
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
          {CHECKLIST.title}
        </h2>
        <p className="type-corpo measure">{CHECKLIST.intro}</p>
        <ul className="check-list type-corpo">
          {CHECKLIST.items.map((item) => (
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
          {CONTACT.title}
        </h2>
        <p className="type-corpo measure">{CONTACT.intro}</p>
        <ContactForm />
        <p className="type-nota text-secondary">
          {CONTACT.directPrefix}{" "}
          <a href={`mailto:${SITE.email}`} className="text-link">
            {SITE.email}
          </a>
        </p>
      </section>
    </PublicShell>
  );
}
