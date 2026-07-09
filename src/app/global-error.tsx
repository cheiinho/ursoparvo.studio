"use client";

import { useEffect } from "react";
import { inter } from "@/lib/fonts";
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
    <html lang="pt-PT" className={inter.variable}>
      <body className={inter.className}>
        <div
          className="flex min-h-dvh flex-col items-center justify-center gap-6"
          style={{ padding: "var(--space-6)" }}
        >
          <p className="type-display">Isto falhou.</p>
          <p className="type-corpo text-secondary">
            Tente de novo. <span lang="en">Something broke, please try again.</span>
          </p>
          <button type="button" className="form-submit" onClick={() => reset()}>
            Tentar de novo
          </button>
        </div>
      </body>
    </html>
  );
}
