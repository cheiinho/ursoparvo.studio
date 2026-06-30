import PublicFooter from "@/components/PublicFooter";
import PublicHeader from "@/components/PublicHeader";

type PublicShellProps = {
  children: React.ReactNode;
  home?: boolean;
};

export default function PublicShell({ children, home = false }: PublicShellProps) {
  return (
    <div className="public-shell">
      <PublicHeader />
      <main className={`public-main${home ? " public-main--home" : ""}`}>
        {children}
      </main>
      <PublicFooter />
    </div>
  );
}
