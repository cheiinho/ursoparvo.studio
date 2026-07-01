import PublicShell from "@/components/PublicShell";
import Section from "@/components/Section";
import WorkList from "@/components/WorkList";
import { UI } from "@/content/ui";

export default function WorkPageContent() {
  return (
    <PublicShell>
      <Section>
        <h1 className="sr-only">{UI.work.pageTitle}</h1>
        <WorkList />
      </Section>
    </PublicShell>
  );
}
