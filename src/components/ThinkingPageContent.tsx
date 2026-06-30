import Link from "next/link";
import PublicShell from "@/components/PublicShell";
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
      <div className="site-container project-detail-shell">
        <p className="text-nav opacity-40">Ponto de vista</p>
        <h1 className="project-headline mt-6 not-italic">Sobre permanência.</h1>

        <div className="mx-auto mt-10 max-w-[40rem] space-y-6 text-body opacity-80">
          <p>
            Desenho marcas que não precisam de ser redesenhadas. Não porque sigo
            uma checklist. Porque trabalho com princípios que já eram velhos
            quando a Helvetica era nova.
          </p>
          <p>Proporção. Contraste. Redução. Clareza.</p>
        </div>

        <aside className="about-processo mx-auto mt-16 max-w-[40rem]">
          <p className="about-processo__text">
            Um parvo é sempre um parvo. O nome é o ponto. Sem fingir ser uma
            agência de cinquenta pessoas.
          </p>
        </aside>

        <section className="mx-auto mt-20 max-w-[40rem] space-y-12">
          {POSITIONS.map((item) => (
            <div key={item.title}>
              <h2 className="text-display">{item.title}</h2>
              <p className="text-body mt-4 opacity-70">{item.body}</p>
            </div>
          ))}
        </section>

        <div className="mt-20 text-center">
          <a href={`mailto:${SITE.email}`} className="about-aside__cta">
            {CONTACT.title}
          </a>
        </div>
      </div>
    </PublicShell>
  );
}
