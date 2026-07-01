import PublicShell from "@/components/PublicShell";
import Section from "@/components/Section";
import WorkList from "@/components/WorkList";

export default function WorkPageContent() {
  return (
    <PublicShell>
      <Section>
        <h1 className="sr-only">Trabalho</h1>
        <WorkList />
      </Section>
    </PublicShell>
  );
}
