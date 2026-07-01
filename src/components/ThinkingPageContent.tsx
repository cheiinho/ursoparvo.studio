import PublicShell from "@/components/PublicShell";
import Reveal from "@/components/Reveal";
import Section from "@/components/Section";
import { CONTACT, SITE } from "@/content/site";

const POSITIONS = [
  {
    title: "Sobre tipografia",
    body: "Sans-serifs com história e peso. Não a fonte que toda a gente usou no Dribbble este trimestre.",
  },
  {
    title: "Sobre cor",
    body: "Preto, branco, um acento. Usados da mesma forma sempre. Não um mood board.",
  },
  {
    title: "Sobre processo",
    body: "Questionar antes de desenhar. Qual é a ideia? O que pode sair? O que tem de ficar?",
  },
  {
    title: "Sobre uma boa marca",
    body: "Podia ter sido lançada noutra década e ninguém pestanejava.",
  },
] as const;

export default function ThinkingPageContent() {
  return (
    <PublicShell>
      <Section>
        <Reveal>
          <p className="type-nota text-secondary">Ponto de vista</p>
          <h1 className="type-display measure" style={{ marginTop: "var(--space-4)" }}>
            Sobre permanência.
          </h1>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="measure space-y-6" style={{ marginTop: "var(--space-8)" }}>
            <p className="type-corpo text-secondary">
              Desenho marcas que não precisam de ser redesenhadas. Não porque sigo
              uma checklist. Porque trabalho com princípios que já eram velhos
              quando a Helvetica era nova.
            </p>
            <p className="type-corpo text-secondary">
              Proporção. Contraste. Redução. Clareza.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.16}>
          <p
            className="type-corpo measure text-secondary"
            style={{ marginTop: "var(--space-16)" }}
          >
            Um parvo é sempre um parvo. O nome é o ponto. Sem fingir ser uma
            agência de cinquenta pessoas.
          </p>
        </Reveal>

        <div className="measure space-y-12" style={{ marginTop: "var(--space-24)" }}>
          {POSITIONS.map((item, index) => (
            <Reveal key={item.title} delay={0.08 * (index + 1)}>
              <div>
                <h2 className="type-display">{item.title}</h2>
                <p className="type-corpo text-secondary" style={{ marginTop: "var(--space-4)" }}>
                  {item.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.4}>
          <a
            href={`mailto:${SITE.email}`}
            className="text-link type-corpo"
            style={{ display: "inline-block", marginTop: "var(--space-24)" }}
          >
            {CONTACT.title}
          </a>
        </Reveal>
      </Section>
    </PublicShell>
  );
}
