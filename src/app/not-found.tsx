import Link from "next/link";
import PublicShell from "@/components/PublicShell";

export default function NotFound() {
  return (
    <PublicShell>
      <div className="site-container flex min-h-[50svh] flex-col items-center justify-center gap-4 text-center">
        <p className="text-display">Página não encontrada</p>
        <Link href="/" className="text-nav opacity-55 hover:opacity-80">
          Voltar ao início
        </Link>
      </div>
    </PublicShell>
  );
}
