import PublicShell from "@/components/PublicShell";
import WorkList from "@/components/WorkList";

export default function WorkPageContent() {
  return (
    <PublicShell>
      <div className="site-container flex min-h-full flex-col">
        <h1 className="sr-only">Trabalho</h1>
        <div className="page-top-spacer" aria-live="polite">
          <WorkList />
        </div>
      </div>
    </PublicShell>
  );
}
