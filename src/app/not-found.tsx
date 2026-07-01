import Link from "next/link";
import PublicShell from "@/components/PublicShell";
import Section from "@/components/Section";

export default function NotFound() {
  return (
    <PublicShell>
      <Section>
        <div
          className="flex flex-col items-start gap-6"
          style={{ minHeight: "50svh", justifyContent: "center" }}
        >
          <p className="type-display">Página não encontrada</p>
          <Link href="/" className="text-link type-corpo">
            Voltar ao início
          </Link>
        </div>
      </Section>
    </PublicShell>
  );
}
