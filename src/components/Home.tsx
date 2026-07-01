import HomeLanding from "@/components/HomeLanding";
import PublicShell from "@/components/PublicShell";
import WorkIndex from "@/components/WorkIndex";
import { hasPublishedWork } from "@/data/projects";

export default function Home() {
  if (hasPublishedWork()) {
    return (
      <PublicShell>
        <WorkIndex />
      </PublicShell>
    );
  }

  return (
    <PublicShell>
      <HomeLanding />
    </PublicShell>
  );
}
