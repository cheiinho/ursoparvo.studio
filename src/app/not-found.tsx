import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-4 px-6">
      <p className="text-title text-ink">Página não encontrada</p>
      <Link href="/" className="text-body text-ink/70 transition-colors hover:text-ink">
        Voltar ao início
      </Link>
    </div>
  );
}
