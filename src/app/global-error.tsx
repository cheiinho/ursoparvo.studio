"use client";

import { useEffect } from "react";
import { sohne } from "@/lib/fonts";
import "./globals.css";

export default function GlobalError({
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
    <html lang="pt" className={sohne.variable}>
      <body className={sohne.className}>
        <div className="flex min-h-dvh flex-col items-center justify-center gap-4 px-6">
          <p className="text-display">Algo correu mal</p>
          <button type="button" className="text-body opacity-70" onClick={() => reset()}>
            Tentar de novo
          </button>
        </div>
      </body>
    </html>
  );
}
