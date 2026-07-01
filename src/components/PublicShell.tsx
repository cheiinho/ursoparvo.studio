import PublicFooter from "@/components/PublicFooter";
import PublicHeader from "@/components/PublicHeader";
import SkipLink from "@/components/SkipLink";

type PublicShellProps = {
  children: React.ReactNode;
};

export default function PublicShell({ children }: PublicShellProps) {
  return (
    <div className="public-shell">
      <SkipLink />
      <PublicHeader />
      <main id="conteudo-principal" className="public-main">
        {children}
      </main>
      <PublicFooter />
    </div>
  );
}
