"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-4 px-6">
      <p className="text-title text-ink">Algo correu mal</p>
      <button type="button" className="text-body text-ink/70" onClick={() => reset()}>
        Tentar de novo
      </button>
    </div>
  );
}
